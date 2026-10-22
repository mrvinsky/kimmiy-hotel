import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking, BookingStatus } from './entities/booking.entity';
import { Repository } from 'typeorm';
import { MailService } from '../mail/mail.service';
import { RoomsService } from '../rooms/rooms.service';
import { ConfigService } from '@nestjs/config';

const formatDate = (date: Date | string) =>
  new Date(date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private bookingsRepository: Repository<Booking>,
    private mailService: MailService,
    private roomsService: RoomsService,
    private configService: ConfigService,
  ) { }

  async create(createBookingDto: CreateBookingDto) {
    // Verify room exists
    const room = await this.roomsService.findOne(createBookingDto.roomId);
    if (!room) {
      throw new NotFoundException(
        `Room with ID ${createBookingDto.roomId} not found`,
      );
    }

    // Check for availability
    const isAvailable = await this.checkAvailability(
      createBookingDto.roomId,
      createBookingDto.checkInDate,
      createBookingDto.checkOutDate,
    );

    if (!isAvailable) {
      throw new BadRequestException(
        'Selected dates are not available for this room.',
      );
    }

    const booking = this.bookingsRepository.create({
      ...createBookingDto,
      room,
      status: BookingStatus.PENDING,
    });

    const savedBooking = await this.bookingsRepository.save(booking);

    // Send acknowledgement email
    try {
      await this.mailService.sendMail(
        savedBooking.guestEmail,
        'We Received Your Booking Request - Kimmiy Hotel',
        `Dear ${savedBooking.guestName},\n\nThank you for your booking request. We have received it and will get back to you as soon as possible.\n\nKind regards,\nKimmiy Hotel`,
      );
    } catch (error) {
      console.error('Email sending failed:', error);
    }

    // Notify the hotel about the new request
    const notifyEmail = this.configService.get<string>('BOOKING_NOTIFY_EMAIL');
    if (notifyEmail) {
      const roomName =
        room.name?.en || room.name?.tr || Object.values(room.name || {})[0] || `#${room.id}`;
      try {
        await this.mailService.sendMail(
          notifyEmail,
          `New Booking Request #${savedBooking.id} - ${savedBooking.guestName}`,
          [
            'A new booking request has arrived.',
            '',
            `Guest: ${savedBooking.guestName}`,
            `Email: ${savedBooking.guestEmail}`,
            `Phone: ${savedBooking.guestPhone}`,
            `Room: ${roomName}`,
            `Check-in: ${formatDate(savedBooking.checkInDate)}`,
            `Check-out: ${formatDate(savedBooking.checkOutDate)}`,
            `Adults: ${savedBooking.adults}, Children: ${savedBooking.children ?? 0}`,
            `Special requests: ${savedBooking.specialRequests || '-'}`,
            '',
            'Log in to the admin panel to confirm or decline it.',
          ].join('\n'),
          undefined,
          savedBooking.guestEmail,
        );
      } catch (error) {
        console.error('Hotel notification email failed:', error);
      }
    }

    return savedBooking;
  }

  async checkAvailability(roomId: number, checkIn: string, checkOut: string): Promise<boolean> {
    const overlappingBookings = await this.bookingsRepository
      .createQueryBuilder('booking')
      .where('booking.roomId = :roomId', { roomId })
      .andWhere('booking.status IN (:...statuses)', { statuses: [BookingStatus.CONFIRMED] })
      .andWhere(
        '(booking.checkInDate < :checkOut AND booking.checkOutDate > :checkIn)',
        { checkIn, checkOut },
      )
      .getCount();

    return overlappingBookings === 0;
  }

  async getRoomAvailability(roomId: number) {
    const bookings = await this.bookingsRepository.find({
      where: {
        room: { id: roomId },
        status: BookingStatus.CONFIRMED,
      },
      select: ['checkInDate', 'checkOutDate', 'status'],
    });

    return bookings.map(b => ({
      from: b.checkInDate,
      to: b.checkOutDate,
      status: b.status
    }));
  }

  findAllByRoom(roomId: number) {
    return this.bookingsRepository.find({
      where: { room: { id: roomId } },
      relations: ['room'],
      order: { checkInDate: 'ASC' },
    });
  }

  findAll() {
    return this.bookingsRepository.find({
      relations: ['room'],
      order: { id: 'DESC' },
    });
  }

  findOne(id: number) {
    return this.bookingsRepository.findOne({
      where: { id },
      relations: ['room'],
    });
  }

  update(id: number, updateBookingDto: UpdateBookingDto) {
    return this.bookingsRepository.update(id, updateBookingDto);
  }

  async approve(id: number) {
    const booking = await this.findOne(id);
    if (!booking) throw new NotFoundException('Booking not found');

    booking.status = BookingStatus.CONFIRMED;
    await this.bookingsRepository.save(booking);

    await this.mailService.sendMail(
      booking.guestEmail,
      'Your Booking Is Confirmed - Kimmiy Hotel',
      `Dear ${booking.guestName},\n\nWe are happy to let you know that your booking is CONFIRMED.\n\nDetails:\nCheck-in: ${formatDate(booking.checkInDate)}\nCheck-out: ${formatDate(booking.checkOutDate)}\n\nWe look forward to welcoming you!\n\nKind regards,\nKimmiy Hotel`,
    );

    return booking;
  }

  async reject(id: number) {
    const booking = await this.findOne(id);
    if (!booking) throw new NotFoundException('Booking not found');

    booking.status = BookingStatus.REJECTED;
    await this.bookingsRepository.save(booking);

    await this.mailService.sendMail(
      booking.guestEmail,
      'About Your Booking Request - Kimmiy Hotel',
      `Dear ${booking.guestName},\n\nUnfortunately we are fully booked for the dates you selected, so we are unable to confirm your booking request.\n\nThank you for your understanding.\n\nKind regards,\nKimmiy Hotel`,
    );

    return booking;
  }

  async remove(id: number) {
    return this.bookingsRepository.delete(id);
  }
}

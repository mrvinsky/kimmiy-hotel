import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking, BookingStatus } from './entities/booking.entity';
import { Repository } from 'typeorm';
import { MailService } from '../mail/mail.service';
import { RoomsService } from '../rooms/rooms.service';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private bookingsRepository: Repository<Booking>,
    private mailService: MailService,
    private roomsService: RoomsService,
  ) { }

  async create(createBookingDto: CreateBookingDto) {
    // Verify room exists
    const room = await this.roomsService.findOne(createBookingDto.roomId);
    if (!room) {
      throw new NotFoundException(
        `Room with ID ${createBookingDto.roomId} not found`,
      );
    }

    const booking = this.bookingsRepository.create({
      ...createBookingDto,
      room,
      status: BookingStatus.PENDING,
    });

    const savedBooking = await this.bookingsRepository.save(booking);

    // Send acknowledgement email
    await this.mailService.sendMail(
      savedBooking.guestEmail,
      'Rezervasyon Talebiniz Alındı - Kimmiy Hotel',
      `Sayın ${savedBooking.guestName},\n\nRezervasyon talebiniz alınmıştır. En kısa sürede size dönüş yapacağız.\n\nTeşekkürler,\nKimmiy Hotel`,
    );

    return savedBooking;
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
      'Rezervasyonunuz Onaylandı - Kimmiy Hotel',
      `Sayın ${booking.guestName},\n\nRezervasyon talebiniz ONAYLANMIŞTIR.\n\nDetaylar:\nGiriş: ${new Date(booking.checkInDate).toLocaleDateString('tr-TR')}\nÇıkış: ${new Date(booking.checkOutDate).toLocaleDateString('tr-TR')}\n\nİyi yolculuklar dileriz!`,
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
      'Rezervasyon Hakkında - Kimmiy Hotel',
      `Sayın ${booking.guestName},\n\nMaalesef seçtiğiniz tarihlerde müsaitlik bulunmadığından rezervasyon talebiniz onaylanamamıştır.\n\nAnlayışınız için teşekkürler.`,
    );

    return booking;
  }

  async remove(id: number) {
    return this.bookingsRepository.delete(id);
  }
}

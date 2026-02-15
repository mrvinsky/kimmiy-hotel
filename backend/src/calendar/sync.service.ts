import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Room } from '../rooms/entities/room.entity';
import { Booking, BookingStatus, BookingSource } from '../bookings/entities/booking.entity';
import * as ical from 'node-ical';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SyncService {
    private readonly logger = new Logger(SyncService.name);

    constructor(
        @InjectRepository(Room)
        private roomsRepository: Repository<Room>,
        @InjectRepository(Booking)
        private bookingsRepository: Repository<Booking>,
        private configService: ConfigService,
    ) { }

    @Cron(CronExpression.EVERY_30_MINUTES)
    async handleCron() {
        this.logger.debug('Running scheduled calendar sync...');
        await this.syncCalendars();
    }

    async syncCalendars() {
        const rooms = await this.roomsRepository.find();

        for (const room of rooms) {
            if (room.icalFeedUrl) {
                try {
                    this.logger.log(`Syncing room ${room.id} from ${room.icalFeedUrl}`);
                    const events = await ical.async.fromURL(room.icalFeedUrl);

                    for (const k in events) {
                        if (events.hasOwnProperty(k)) {
                            const event = events[k];
                            if (event && event.type === 'VEVENT') {
                                await this.processEvent(room, event);
                            }
                        }
                    }
                } catch (error) {
                    this.logger.error(`Failed to sync room ${room.id}: ${error.message}`);
                }
            }
        }
    }

    private async processEvent(room: Room, event: any) {
        const uid = event.uid;
        const start = new Date(event.start); // node-ical returns Date objects usually
        const end = new Date(event.end);

        // Check if booking already exists
        const existingBooking = await this.bookingsRepository.findOne({
            where: { externalId: uid },
        });

        if (existingBooking) {
            // Could check for updates here (e.g. dates changed)
            if (existingBooking.checkInDate.getTime() !== start.getTime() ||
                existingBooking.checkOutDate.getTime() !== end.getTime()) {

                existingBooking.checkInDate = start;
                existingBooking.checkOutDate = end;
                await this.bookingsRepository.save(existingBooking);
                this.logger.log(`Updated external booking ${uid} for room ${room.id}`);
            }
            return;
        }

        // Create new external booking
        const newBooking = this.bookingsRepository.create({
            room: room,
            guestName: 'External Reservation', // Privacy: usually iCal doesn't send guest names
            guestEmail: 'details@ota.com',
            guestPhone: '-',
            adults: 1, // Default
            checkInDate: start,
            checkOutDate: end,
            status: BookingStatus.CONFIRMED,
            source: BookingSource.BOOKING_COM, // Or generic EXTERNAL check
            externalId: uid,
            specialRequests: `Imported from iCal. Summary: ${event.summary || 'Blocked'}`,
        });

        await this.bookingsRepository.save(newBooking);
        this.logger.log(`Created new external booking ${uid} for room ${room.id}`);
    }
}

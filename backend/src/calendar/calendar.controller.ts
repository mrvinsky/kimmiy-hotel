import { Controller, Get, Param, Res, Post, NotFoundException } from '@nestjs/common';
import type { Response } from 'express';
import ical from 'ical-generator';
import { BookingsService } from '../bookings/bookings.service';
import { RoomsService } from '../rooms/rooms.service';
import { SyncService } from './sync.service';

@Controller('calendar')
export class CalendarController {
    constructor(
        private readonly bookingsService: BookingsService,
        private readonly roomsService: RoomsService,
        private readonly syncService: SyncService,
    ) { }

    @Get('rooms/:id/export.ics')
    async exportCalendar(@Param('id') id: string, @Res() res: Response) {
        const room = await this.roomsService.findOne(+id);
        if (!room) {
            throw new NotFoundException('Room not found');
        }

        const bookings = await this.bookingsService.findAllByRoom(+id);

        const calendar = ical({
            name: `Kimmiy Hotel - ${room.name['EN'] || 'Room ' + room.id}`,
            timezone: 'Europe/Belgrade',
        });

        bookings.forEach((booking) => {
            if (booking.status === 'CONFIRMED') {
                calendar.createEvent({
                    start: booking.checkInDate,
                    end: booking.checkOutDate,
                    summary: 'Reserved',
                    description: 'Blocked via Kimmiy Hotel Website',
                    id: `kimmiy-${booking.id}`,
                });
            }
        });

        res.set('Content-Type', 'text/calendar; charset=utf-8');
        res.set('Content-Disposition', `attachment; filename="room-${id}.ics"`);
        res.send(calendar.toString());
    }

    @Post('sync')
    async triggerSync() {
        await this.syncService.syncCalendars();
        return { message: 'Sync triggered' };
    }
}

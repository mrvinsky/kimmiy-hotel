import { Module } from '@nestjs/common';
import { CalendarController } from './calendar.controller';
import { SyncService } from './sync.service';
import { BookingsModule } from '../bookings/bookings.module';
import { RoomsModule } from '../rooms/rooms.module';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [BookingsModule, RoomsModule, ConfigModule],
    controllers: [CalendarController],
    providers: [SyncService],
})
export class CalendarModule { }

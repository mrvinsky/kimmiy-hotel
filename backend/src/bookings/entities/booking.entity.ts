import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Room } from '../../rooms/entities/room.entity';

export enum BookingStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  REJECTED = 'REJECTED',
}

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  guestName: string;

  @Column()
  guestEmail: string;

  @Column()
  guestPhone: string;

  @Column({ type: 'date' })
  checkInDate: Date;

  @Column({ type: 'date' })
  checkOutDate: Date;

  @Column()
  adults: number;

  @Column({ default: 0 })
  children: number;

  @Column('text', { nullable: true })
  specialRequests: string;

  @Column({
    type: 'enum',
    enum: BookingStatus,
    default: BookingStatus.PENDING,
  })
  status: BookingStatus;

  @ManyToOne(() => Room, (room) => room.bookings, { onDelete: 'SET NULL' })
  room: Room;
}

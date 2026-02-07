import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Booking } from '../../bookings/entities/booking.entity';

@Entity()
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('jsonb')
  name: Record<string, string>;

  @Column('jsonb')
  description: Record<string, string>;

  @Column('decimal')
  price: number;

  @Column()
  capacity: number;

  @Column('simple-array', { nullable: true })
  images: string[];

  @OneToMany(() => Booking, (booking) => booking.room)
  bookings: Booking[];
}

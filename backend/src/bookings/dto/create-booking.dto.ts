import {
  IsString,
  IsEmail,
  IsPhoneNumber,
  IsDateString,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class CreateBookingDto {
  @IsNumber()
  roomId: number;

  @IsString()
  guestName: string;

  @IsEmail()
  guestEmail: string;

  @IsString()
  guestPhone: string;

  @IsDateString()
  checkInDate: string;

  @IsDateString()
  checkOutDate: string;

  @IsNumber()
  adults: number;

  @IsNumber()
  children: number;

  @IsString()
  @IsOptional()
  specialRequests?: string;
}

import { IsString, IsNumber, IsArray, IsOptional, IsObject } from 'class-validator';

export class CreateRoomDto {
  @IsObject()
  name: Record<string, string>;

  @IsObject()
  description: Record<string, string>;

  @IsNumber()
  price: number;

  @IsNumber()
  capacity: number;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  images?: string[];
}

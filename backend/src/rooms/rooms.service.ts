import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from './entities/room.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room)
    private roomsRepository: Repository<Room>,
  ) {}

  create(createRoomDto: CreateRoomDto) {
    const room = this.roomsRepository.create(createRoomDto);
    return this.roomsRepository.save(room);
  }

  findAll() {
    return this.roomsRepository.find();
  }

  findOne(id: number) {
    return this.roomsRepository.findOneBy({ id });
  }

  async update(id: number, updateRoomDto: UpdateRoomDto) {
    const room = await this.findOne(id);
    if (!room) {
      throw new NotFoundException(`Room with ID ${id} not found`);
    }
    Object.assign(room, updateRoomDto);
    return this.roomsRepository.save(room);
  }

  async remove(id: number) {
    const result = await this.roomsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Room with ID ${id} not found`);
    }
    return result;
  }
}

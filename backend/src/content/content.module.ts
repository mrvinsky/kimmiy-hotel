import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContentService } from './content.service';
import { ContentController } from './content.controller';
import { Content } from './entities/content.entity';
import { GalleryImage } from './entities/gallery-image.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Content, GalleryImage])],
  controllers: [ContentController],
  providers: [ContentService],
})
export class ContentModule {}

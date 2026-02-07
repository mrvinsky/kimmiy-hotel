import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Content } from './entities/content.entity';
import { GalleryImage } from './entities/gallery-image.entity';

@Injectable()
export class ContentService {
  constructor(
    @InjectRepository(Content)
    private contentRepository: Repository<Content>,
    @InjectRepository(GalleryImage)
    private galleryRepository: Repository<GalleryImage>,
  ) {}

  async getText(key: string) {
    const content = await this.contentRepository.findOneBy({ key });
    return content ? content.value : '';
  }

  async updateText(key: string, value: string) {
    const content = this.contentRepository.create({ key, value });
    return this.contentRepository.save(content);
  }

  getAllGallery() {
    return this.galleryRepository.find();
  }

  async addGalleryImage(url: string, description?: string) {
    const img = this.galleryRepository.create({ url, description });
    return this.galleryRepository.save(img);
  }

  async removeGalleryImage(id: number) {
    return this.galleryRepository.delete(id);
  }
}

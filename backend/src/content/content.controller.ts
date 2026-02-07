import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Put,
} from '@nestjs/common';
import { ContentService } from './content.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('content')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @Get('text/:key')
  getText(@Param('key') key: string) {
    return this.contentService.getText(key);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('text/:key')
  updateText(@Param('key') key: string, @Body('value') value: string) {
    return this.contentService.updateText(key, value);
  }

  @Get('gallery')
  getGallery() {
    return this.contentService.getAllGallery();
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('gallery')
  addGalleryImage(@Body() body: { url: string; description?: string }) {
    return this.contentService.addGalleryImage(body.url, body.description);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('gallery/:id')
  removeGalleryImage(@Param('id') id: string) {
    return this.contentService.removeGalleryImage(+id);
  }
}

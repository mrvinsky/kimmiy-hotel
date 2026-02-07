import { Injectable } from '@nestjs/common';

@Injectable()
export class UploadService {
  // Logic is mostly handled by Multer middleware in Controller,
  // but we can add post-processing here if needed.
  getFilePath(file: Express.Multer.File) {
    // Return relative path to be stored in DB
    return `/uploads/${file.filename}`;
  }
}

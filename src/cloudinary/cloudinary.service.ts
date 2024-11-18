import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import toStream = require('buffer-to-stream');
@Injectable()
export class CloudinaryService {
  private readonly allowedImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
  async uploadImage(
    file: Express.Multer.File,
    folder: string = 'upload',
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    if (!this.allowedImageTypes.includes(file.mimetype)) {
      throw new BadRequestException('Only image files are allowed!');
    }
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream({ folder }, (error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
      toStream(file.buffer).pipe(upload);
    });
  }
  async uploadImages(
    files: Express.Multer.File[],
    folder: string = 'upload',
  ): Promise<(UploadApiResponse | UploadApiErrorResponse)[]> {
    const uploadPromises = files.map((file) => this.uploadImage(file, folder));
    return Promise.all(uploadPromises);
  }
  async deleteImage(publicId: string): Promise<boolean> {
    try {
      const result = await v2.uploader.destroy(publicId);
      if (result.result === 'ok') {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw new Error(
        `Could not delete image with publicId: ${publicId}. Error: ${error.message}`,
      );
    }
  }
}

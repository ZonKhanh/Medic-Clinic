// import { Injectable } from '@nestjs/common';
// import { UPLOAD } from '../../config/constants';
// import * as sharp from 'sharp';
// import * as path from 'path';
// import * as fs from 'fs/promises';

// @Injectable()
// export class FileUploadService {
//   async uploadAndResizeAvatar(file: Express.Multer.File): Promise<string[]> {
//     const filename = this.generateFilename(file.originalname);
//     const avatarUrls: string[] = [];

//     for (const size of UPLOAD.SIZES) {
//       let resizeOptions: sharp.ResizeOptions = { fit: 'cover' };

//       if (size.width !== 'auto') {
//         resizeOptions.width = Number(size.width);
//       }
//       if (size.height !== 'auto') {
//         resizeOptions.height = Number(size.height);
//       }

//       const resizedBuffer = await sharp(file.buffer)
//         .resize(resizeOptions)
//         .toBuffer();

//       const filePath = path.join(UPLOAD.PATH_FOLDER, `${size.name}_${filename}`);
//       await fs.writeFile(filePath, resizedBuffer);

//       avatarUrls.push(`${size.name}_${filename}`);
//     }

//     return avatarUrls;
//   }

//   private generateFilename(originalname: string): string {
//     const extension = path.extname(originalname);
//     const randomName = Array(32)
//       .fill(null)
//       .map(() => Math.round(Math.random() * 16).toString(16))
//       .join('');
//     return `${randomName}${extension}`;
//   }
// }
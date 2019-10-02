import sharp from 'sharp';
import { resolve } from 'path';
import RemoveFile from './RemoveFile';

export default async function(pathFile, path, width = 550, height = 500) {
  await sharp(pathFile)
    .withMetadata()
    .rotate()
    .jpeg({ quality: 50 })
    .resize(width, height)
    .toFile(
      resolve(__dirname, '..', '..', '..', 'tmp', 'uploads', `h_${path}`)
    );

  await RemoveFile(path);

  return `h_${path}`;
}

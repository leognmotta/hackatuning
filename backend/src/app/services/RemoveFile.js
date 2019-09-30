import * as fs from 'fs';
import { resolve } from 'path';

export default async function(path) {
  const dir = resolve(__dirname, '..', '..', '..', 'tmp', 'uploads', path);

  const fileExists = await fs.existsSync(dir);

  if (fileExists) {
    await fs.unlinkSync(dir);
  }
}

import { argon2d, hash } from 'argon2';
import { DiskStorageOptions } from 'multer';
import { extname } from 'path';

export const hashString = (value: string): Promise<string> =>
  hash(value, {
    type: argon2d,
    hashLength: 50,
    saltLength: 32,
    timeCost: 4,
  });

export const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(new Error('Only image files are allowed!'), false);
  }
  callback(null, true);
};

export const editFileName = (req, file, callback) => {
  const name = file.originalname.split('.')[0];
  const fileExtName = extname(file.originalname);
  const randomName = Date.now();
  callback(null, `${name}-${randomName}${fileExtName}`);
};

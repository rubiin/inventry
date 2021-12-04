import { argon2d, hash } from 'argon2';
import { classToPlain } from 'class-transformer';
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

export function hasNext(
  page: number,
  totalPages: number,
  hostAddress: string,
): string {
  if (page === totalPages) {
    return '';
  } else {
    return `${hostAddress.replace('\n', '')}?page=${page + 1}`;
  }
}

export function hasPrevious(
  page: number,
  totalPages: number,
  hostAddress: string,
): string {
  if (page <= 1) {
    return '';
  } else {
    return `${hostAddress.replace('\n', '')}?page=${page - 1}`;
  }
}

export function paginate(
  pages: number,
  page: number,
  total: number,
  result: Array<any>,
  host: string = 'localhost:8000',
) {
  return {
    total_pages: pages,
    total_items: total,
    next: hasNext(page, pages, host),
    previous: hasPrevious(page, pages, host),
    current_page: page,
    items: classToPlain(result),
  };
}

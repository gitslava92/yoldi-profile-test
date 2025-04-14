import type { Image } from '@shared/types';

export interface User {
  name: 'string';
  email: 'string';
  slug: 'string';
  description: 'string';
  image?: Image;
  cover?: Image;
}

export interface UserRequest {
  name: 'string';
  email: 'string';
  slug: 'string';
  description: 'string';
  imageId: string;
  coverId: st;
}

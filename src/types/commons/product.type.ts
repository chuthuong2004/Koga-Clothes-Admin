import { ReactNode } from 'react';
import { StoreRepository } from '../entities';

export type StoreColor = {
  images: string[];
  imageSmall: string;
  imageMedium: string;
  colorName: string;
  sizes: StoreSize[];
  _id: string;
};
export type StoreSize = {
  size: string;
  quantity: string;
  _id: string;
};

export type StoredProduct = {
  colors: StoreColor[];
  repository: StoreRepository | string;
};
export type StoreTabContent = {
  _id: string;
  title: string;
  content: string | ReactNode;
};

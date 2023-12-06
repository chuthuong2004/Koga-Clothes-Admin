export type StoreReview = {
  orderedProductDetail: StoreOrderedInfo;
  _id: string;
  user: string;
  product: string;
  content: string;
  star: number;
  deleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
type StoreOrderedInfo = {
  size: string;
  color: string;
  quantity: number;
};

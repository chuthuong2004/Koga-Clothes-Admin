import { StoredProduct } from '@/types/commons';
import {
  StoreCategory,
  StoreMessage,
  StoreProvinceAddress,
  StoreUserAddress,
} from '@/types/entities';
import { GenderUser } from '@/types/unions';
import { OrderStatus } from '@/types/unions/order.union';

import { Socket } from 'socket.io-client';
import { DisconnectDescription } from 'socket.io-client/build/esm/socket';

export interface ServerToClientEvents {
  connect: () => void;
  connect_error: (err: Error) => void;
  disconnect: (reason: Socket.DisconnectReason, description?: DisconnectDescription) => void;
  'emit-ws-error': () => void;
  'emit-connection': ({ message }: { message: string }) => void;

  'emit-join-conversation': (response: { message: string; status: string }) => void;
  'emit-create-message': (message: StoreMessage) => void;
  'emit-typing-on': (response: ResponseTyping) => void;
  'emit-typing-off': (response: ResponseTyping) => void;
  'emit-joined-conversation': ({ conversation_id }: { conversation_id: string }) => void;
}

export type ResponseTyping = {
  conversationId: string;
  userId: string;
};
export interface ClientToServerEvents {
  connection: ({ user_id }: { user_id: string }) => void;
  'remove-user': () => void;
  'join-conversation': ({ conversation_id }: { conversation_id: string }) => void;
  'joined-conversation': ({ conversation_id }: { conversation_id: string }) => void;
  'create-message': (message: ParamCreateMessage) => void;
  'typing-on': () => void;
  'typing-off': () => void;
}

export type ParamLogin = {
  username: string;
  password: string;
  saveAccount: boolean;
};
export type ParamRegister = {
  email: string;
  password: string;
  phone: string;
};
export type ParamResetPassword = {
  email: string;
  newPassword: string;
};
export type QueryOptions = {
  page: number;
  limit?: number;
  offset?: number;
  search?: string;
  parent?: string; // with category
  brand?: string;
  category?: string;
  creator?: string;
  role?: string;
};

export type ParamAddToCart = {
  size: string;
  color: string;
  product: string;
  quantity?: number;
};
export type ParamCreateConversation = {
  receiverId: string;
};
export type ParamCreateMessage = {
  conversation?: string;
  sender?: string;
  text: string;
  image?: string;
};

export type ParamCreateOrder = {
  deliveryInformation: StoreProvinceAddress;
  cartItemsId: string[];
  isPaid?: boolean;
  shippingPrice?: number;
};
export type ParamUpdateOrder = {
  orderStatus: OrderStatus;
} & Partial<ParamCreateOrder>;

export type ParamCancelOrder = {
  canceledReason: string;
};
export type ParamCreateReview = {
  orderItemId: string;
  content: string;
  star: number;
};

export type VerifyOTPParams = {
  code: string;
  email: string;
};

export type ParamUpdateProfile = {
  username: string;
  email: string;
  phone: string;
  avatar: string;
  gender: GenderUser;
  firstName: string;
  lastName: string;
  birthday: string;
};
export type ParamChangePassword = {
  currentPassword: string;
  newPassword: string;
};
export type OTPParams = {
  code: string;
};
export type ParamCreateAddress = Omit<StoreUserAddress, '_id'>;

export type ParamCreateProduct = {
  name: string;
  code: string;
  description: string;
  category: string;
  gender: string[];
  brand: string;
  preserveInformation: string;
  deliveryReturnPolicy: string;
  price: number;
  discount: number;
  keywords: string[];
  storedProducts: StoredProduct[];
};
export type FolderUpload = 'avatars' | 'brands' | 'categories' | 'stores' | 'products' | 'reviews';

export type ParamCreateBrand = {
  name: string;
  history: string;
  image: string;
  logo: string;
};

export type ParamCreateRepository = {
  name: string;
  description: string;
  code: string;
  images: string[];
  address: StoreProvinceAddress;
};

export type ParamsCreateCategory = Pick<StoreCategory, 'name'> & {
  parent: string;
  gender: string[];
};

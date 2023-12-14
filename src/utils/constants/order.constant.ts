import { UpdateStatusOrder } from '@/types/commons/order.type';

export const OptionsUpdateStatusOrder: UpdateStatusOrder = {
  Processing: {
    label: 'Đang vận chuyển',
    value: 'Shipping',
  },
  Shipping: {
    label: 'Giao hàng',
    value: 'Delivery',
  },
  Delivery: {
    label: 'Đã giao',
    value: 'Delivered',
  },
  Delivered: {
    label: 'Đã giao',
    value: 'Delivered',
  },
  Canceled: {
    label: 'Đã giao',
    value: 'Delivered',
  },
};

export const OptionsStatusOrderDefault: UpdateStatusOrder = {
  Processing: {
    label: 'Đang xử lý',
    value: 'Processing',
  },
  Shipping: {
    label: 'Đang vận chuyển',
    value: 'Shipping',
  },
  Delivery: {
    label: 'Đang giao',
    value: 'Delivery',
  },
  Delivered: {
    label: 'Đã giao',
    value: 'Delivered',
  },
  Canceled: {
    label: 'Đã huỷ',
    value: 'Canceled',
  },
};

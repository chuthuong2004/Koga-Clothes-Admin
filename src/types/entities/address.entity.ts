
export type StoreAddress = {
  firstName: string;
  lastName: string;
  phone: string;
  _id: string;
} & StoreProvinceAddress;

export type StoreProvinceAddress = {
  province: string;
  district: string;
  ward: string;
  specific: string;
}

export type StoreUserAddress = StoreAddress & {
  isDefault: boolean;
};

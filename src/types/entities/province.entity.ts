import { Nullable } from "../commons/common.type";

export interface StoreProvince extends StoreProvinceInformation {
  phone_code: number;
  districts: Array<StoreDistrict>;
}

export interface StoreDistrict extends StoreProvinceInformation {
  short_codename: string;
  wards: Array<StoreWard>;
}
export type StoreWard = StoreProvinceInformation &
  Pick<StoreDistrict, 'short_codename'>;

export interface StoreProvinceInformation {
  name: string;
  code: number;
  codename: string;
  division_type: string;
}

export type KeyOfProvince = 'province' | 'district' | 'ward';
export type ParamAddress = Nullable<Record<KeyOfProvince, string>>;

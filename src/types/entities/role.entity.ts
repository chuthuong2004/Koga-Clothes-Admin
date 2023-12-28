import { ERoleDefault } from '../enums/role.enum';

export type StoreRole = {
  _id: string;
  name: ERoleDefault;
  permissions: StorePermission[];
};

export type StorePermission = {
  _id: string;
  can: boolean;
  action: string;
  subject: string;
};

import { ERoleDefault } from '../enums/role.enum';

export type StoreRole = {
  _id: string;
  name: string;
  default: boolean; 
  permissions: string[];
};

export type StorePermission = {
  _id: string;
  can: boolean;
  action: string;
  subject: string;
};

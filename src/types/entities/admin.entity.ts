import { ERoleDefault } from '../enums/role.enum';
import { StoreAccount } from './account.entity';
import { StoreRole } from './role.entity';

export type StoreAdmin = StoreAccount & {
  roles: StoreRole[];
  type: ERoleDefault;
};

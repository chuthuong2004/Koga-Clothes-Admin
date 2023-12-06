import { StoreProvinceAddress } from "./address.entity";
import { StoreAdmin } from "./admin.entity";

export type StoreRepository = {
    _id: string;
    name: string;
    description: string;
    code: string;
    creator: StoreAdmin;
    slug: string;
    images: Array<string>
    address: StoreProvinceAddress
}
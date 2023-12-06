import { StoreAdmin } from "./admin.entity";

export type StoreBrand = {
    _id: string;
    name: string;
    logo: string;
    image: string;
    history: string;
    slug: string;
    creator: StoreAdmin;
    createdAt: string;
    updatedAt: string;
}
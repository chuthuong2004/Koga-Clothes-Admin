import { StoredProduct } from "../commons";
import { StoreBrand } from "./brand.entity";
import { StoreCategory } from "./category.entity";

export type StoreProduct = {
    name: string;
    description: string;
    price: number;
    discount: number;
    category: StoreCategory;
    likeCount: number;
    quantitySold: number;
    favorites: string[];
    rate: number;
    keywords: string[];
    reviews: string[];
    storedProducts: StoredProduct[];
    brand: Omit<StoreBrand, 'products'>;
    gender: string;
    preserveInformation?: string;
    deliveryReturnPolicy?: string;
    slug: string;
    createdAt: string;
    deleted: boolean;
    updatedAt: string;
    _id: string;
    deletedAt?: string;
}
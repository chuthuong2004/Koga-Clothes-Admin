import { StoreUserAddress } from "./address.entity";

export type StoreAccount = {
    _id: string;
    username: string;
    email:string;
    phone: string;
    firstName: string;
    lastName: string;
    addresses: StoreUserAddress[]
}
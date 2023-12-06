export type StoreRole = {
    _id: string;
    name: string;
    permissions: StorePermission[]
}

export type StorePermission = {
    _id: string;
    can: boolean;
    action: string;
    subject: string
}
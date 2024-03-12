import { StoreMessage } from "./message.entity";
import { StoreUser } from "./user.entity";

export type StoreConversation = {
    _id: string;
    members: StoreMemberConversation[];
    lastMessage: StoreMessage;
    createdAt: string;
    updatedAt: string
}

export type StoreMemberConversation = {
    userId: StoreUser;
    docModel: 'Admin' | 'User'
}
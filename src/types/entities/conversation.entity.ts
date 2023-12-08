import { StoreMessage } from "./message.entity";
import { StoreUser } from "./user.entity";

export type StoreConversation = {
    _id: string;
    members: StoreUser[];
    lastMessage: StoreMessage;
    createdAt: string;
    updatedAt: string
}
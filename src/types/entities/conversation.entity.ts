import { StoreMessage } from "./message.entity";

export type StoreConversation = {
    _id: string;
    members: string[];
    lastMessage: StoreMessage;
    createdAt: string;
    updatedAt: string
}
import { model, Schema, Types } from 'mongoose';

export interface IChat {
    user_consumer: number;
    user_recipient: number;
    message: string;
    created_at: Date;
}

export const ChatSchema = new Schema<IChat>({

    user_consumer: { type: 'number', required: true },
    user_recipient: { type: 'number', required: true },
    message: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    },
    
    { timestamps: true },
);

export const Chat = model <IChat>('chat', ChatSchema, 'chat'); 
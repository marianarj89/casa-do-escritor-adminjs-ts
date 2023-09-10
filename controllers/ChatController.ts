import { Chat } from '../models/chat.entity';

export default class ChatController {
    generatePagination(limit:number, page:number){
        const _limit = limit || 10;
        const _page = page || 1;

        return {
            limit: _limit,
            offset: (_page - 1) * _limit
        }
    }

    async sendMessage(message: string, user_consumer: number, user_recipient: number) {
        await this.insertMessage(message, user_consumer, user_recipient);
    }

    async loadMessage(page: number=10, _limit: number=10) {
        const { offset, limit } = this.generatePagination(_limit, page);

        const chat = await Chat.find().skip(offset).limit(limit).sort({ created_at: -1 });
        const count =  await Chat.countDocuments();
        const total = Math.ceil(count / limit);
        
        return {
            rows: chat, 
            total:total,
            count: count,
            status: 200
        }
    }

    async insertMessage (message: string, user_consumer: number, user_recipient: number) {
       const chat = new Chat ({
        message:message,
        user_consumer: user_consumer,
        user_recipient: user_recipient
       });
       await chat.save(); 
    }

}

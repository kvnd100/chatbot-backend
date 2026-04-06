import { Injectable, NotFoundException } from '@nestjs/common';
import { ConversationEntity } from './conversation/entities/conversaton.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MessageEntity, MessageRole } from './message/entities/message.entity';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(ConversationEntity)
    private conversationRepo: Repository<ConversationEntity>,

    @InjectRepository(MessageEntity)
    private messageRepo: Repository<MessageEntity>,
  ) {}

  async createConversation(title?: string) {
    return await this.conversationRepo.save(
      this.conversationRepo.create({
        title,
      }),
    );
  }

  async getConversations() {
    return await this.conversationRepo.find();
  }

  async getConversation(id: string) {
    const conversation = await this.conversationRepo.findOne({
      where: { id },
    });
    if (!conversation) {
      throw new NotFoundException('Conversation not found');
    }
    return conversation;
  }

  async getMessages(conversationId: string) {
    const messages = await this.messageRepo.find({
      where: { conversation: { id: conversationId } },
      order: { createdAt: 'ASC' },
    });
    return messages;
  }

  async createMessage(
    conversationId: string,
    content: string,
    role: MessageRole,
  ) {
    const conversation = await this.getConversation(conversationId);

    const message = this.messageRepo.create({
      content,
      role,
      conversation,
    });
    return this.messageRepo.save(message);
  }
}

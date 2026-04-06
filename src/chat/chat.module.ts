import { TypeOrmModule } from '@nestjs/typeorm';
import { ConversationEntity } from './conversation/entities/conversaton.entity';
import { MessageEntity } from './message/entities/message.entity';
import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';

@Module({
  imports: [TypeOrmModule.forFeature([ConversationEntity, MessageEntity])],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}

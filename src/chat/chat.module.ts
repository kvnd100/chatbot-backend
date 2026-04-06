import { TypeOrmModule } from '@nestjs/typeorm';
import { ConversationEntity } from './entities/conversaton.entity';
import { MessageEntity } from './entities/message.entity';
import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([ConversationEntity, MessageEntity])],
  controllers: [ChatController],
  providers: [ChatService, ChatGateway],
})
export class ChatModule {}

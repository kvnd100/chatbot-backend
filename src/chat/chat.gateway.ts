import { Logger, UseFilters, UsePipes } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { ValidationPipe } from '@nestjs/common';
import { SendMessageDto } from './dto/send-message.dto';
import { WsExceptionFilter } from 'src/common/filters/ws-exception.filter';
import { ConversationRoomDto } from './dto/conversation-room.dto';

@UseFilters(new WsExceptionFilter())
@UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
@WebSocketGateway({ cors: { origin: '*' } }) //Remove cors for production
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(ChatGateway.name);

  constructor(private readonly chatService: ChatService) {}

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('joinConversation')
  async handleJoinConversation(
    @MessageBody() data: ConversationRoomDto,
    @ConnectedSocket() client: Socket,
  ) {
    await client.join(data.conversationId);
    this.logger.log(
      `Client ${client.id} joined conversation: ${data.conversationId}`,
    );
  }

  @SubscribeMessage('sendMessage')
  async handleMessage(
    @MessageBody()
    data: SendMessageDto,
    @ConnectedSocket() client: Socket,
  ) {
    this.logger.log(`Client ${client.id} sent message: ${data.content}`);
    const message = await this.chatService.createMessage(
      data.conversationId,
      data.content,
      data.role,
    );
    this.server.to(data.conversationId).emit('newMessage', message);
    return message;
  }

  @SubscribeMessage('leaveConversation')
  async handleLeaveConversation(
    @MessageBody() data: ConversationRoomDto,
    @ConnectedSocket() client: Socket,
  ) {
    await client.leave(data.conversationId);
    this.logger.log(
      `Client ${client.id} left conversation: ${data.conversationId}`,
    );
  }
}

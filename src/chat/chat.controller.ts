import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { CreateMessageDto } from './dto/create-message.dto';

@Controller('chat')
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Post('conversation')
  async createConversation(@Body() body: CreateConversationDto) {
    return await this.chatService.createConversation(body.title);
  }

  @Get('conversation')
  async getConversations() {
    return await this.chatService.getConversations();
  }

  @Get('conversation/:id')
  async getConversation(@Param('id') id: string) {
    return await this.chatService.getConversation(id);
  }

  @Get('conversation/:id/messages')
  async getMessages(@Param('id') id: string) {
    return await this.chatService.getMessages(id);
  }

  @Post('conversation/:id/messages')
  async createMessage(@Param('id') id: string, @Body() body: CreateMessageDto) {
    return await this.chatService.createMessage(id, body.content, body.role);
  }
}

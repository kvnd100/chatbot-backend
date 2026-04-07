import { Transform } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { MessageRole } from '../enums/message-role.enum';

export class SendMessageDto {
  @IsUUID()
  conversationId: string;

  @Transform(({ value }: { value: unknown }): unknown =>
    typeof value === 'string' ? value.trim() : value,
  )
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsEnum(MessageRole)
  @IsNotEmpty()
  role: MessageRole;
}

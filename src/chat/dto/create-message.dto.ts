import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { MessageRole } from '../enums/message-role.enum';
import { Transform } from 'class-transformer';

export class CreateMessageDto {
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

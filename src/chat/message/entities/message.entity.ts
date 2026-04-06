import { ConversationEntity } from 'src/chat/conversation/entities/conversaton.entity';
import { MessageRole } from 'src/chat/enums/message-role.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('messages')
export class MessageEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  content!: string;

  @Column({ type: 'enum', enum: MessageRole })
  role!: MessageRole;

  @CreateDateColumn()
  createdAt!: Date;

  @ManyToOne(() => ConversationEntity, (conversation) => conversation.messages)
  conversation!: ConversationEntity;
}
export { MessageRole };

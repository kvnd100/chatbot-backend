import { MessageEntity } from 'src/chat/entities/message.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('conversations')
export class ConversationEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title?: string;

  @CreateDateColumn()
  createdAt!: Date;

  @OneToMany(() => MessageEntity, (message) => message.conversation)
  messages!: MessageEntity[];
}

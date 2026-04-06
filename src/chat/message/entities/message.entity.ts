import { ConversationEntity } from "src/chat/conversation/entities/conversaton.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('messages')
export class MessageEntity { 

    @PrimaryGeneratedColumn('uuid')
    id!:string

    @Column()
    content!:string

    @Column()
    role!:string

    @CreateDateColumn()
    createdAt!:Date

    @ManyToOne(() => ConversationEntity, (conversation) => conversation.messages)
    conversation!: ConversationEntity
  }
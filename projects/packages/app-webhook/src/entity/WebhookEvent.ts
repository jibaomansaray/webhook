import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne
} from "typeorm";
import { WebhookTopic } from "./WebhookTopic";

@Entity()
export class WebhookEvent {

  @PrimaryGeneratedColumn()
  id: number;  // ID column

  @ManyToOne(() => WebhookTopic)
  @JoinColumn()
  topic: number;

  @Column({ type: "text" })
  payload: string

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

}
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn
} from "typeorm";
import { WebhookTopic } from "./WebhookTopic";

@Entity()
export class WebhookEvent {

  @PrimaryGeneratedColumn()
  id: number;  // ID column

  @OneToOne(() => WebhookTopic)
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
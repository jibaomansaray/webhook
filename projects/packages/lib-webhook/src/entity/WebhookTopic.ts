import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  JoinColumn,
  OneToOne
} from "typeorm";
import { WebhookApp } from "./WebhookApp";

@Entity()
export class WebhookTopic {

  @PrimaryGeneratedColumn()
  id: number;  // ID column

  name: string  // there can only be unique topic

  @Column({ type: "text", nullable: true })
  example: string // an example of how the payload data may look

  @OneToOne(() => WebhookApp)
  @JoinColumn()
  app: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

}
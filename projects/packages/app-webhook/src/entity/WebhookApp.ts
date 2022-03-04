import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, Column, CreateDateColumn, UpdateDateColumn, VersionColumn, DeleteDateColumn } from "typeorm";

@Entity()
export class WebhookApp {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({type: "text", nullable: true})
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

}
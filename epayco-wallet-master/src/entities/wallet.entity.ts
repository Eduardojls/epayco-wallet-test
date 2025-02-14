import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { Client } from './client.entity';

@Entity()
export class Wallet {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  balance: number;

  @ManyToOne(() => Client)
  @JoinColumn()
  client: Client;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}

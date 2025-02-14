import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, JoinColumn, AfterInsert } from 'typeorm';
import { Wallet } from './wallet.entity';

@Entity()
export class Client {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column({ unique: true, name: 'document_number' })
  documentNumber: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  phone: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => Wallet, (wallet) => wallet.client)
  wallets: Wallet[];
}

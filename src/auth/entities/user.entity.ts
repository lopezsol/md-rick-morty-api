import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Address } from './address.embedded';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 15 })
  name: string;

  @Column({ type: 'varchar', length: 15, nullable: true })
  nickname?: string;

  // @Column({ type: 'varchar', unique: true, length: 50 })
  // mail: string;
  @Column('text', {
    unique: true,
  })
  mail: string;

  // @Column({ type: 'varchar', unique: true, length: 50 })
  // mail: string;

  @Column({ type: 'varchar', length: 100, select: false })
  password: string;

  @Column({ type: 'timestamptz', nullable: true })
  birthday?: Date;

  @Column({ type: 'varchar', length: 15, nullable: true })
  phone?: string;

  @Column(() => Address)
  address?: Address;

  @Column('text', { default: 'user' })
  role: string;

  // @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @CreateDateColumn()
  date: Date;

  @Column('int', { array: true, nullable: true })
  favoriteEpisodes?: number[];

  @Column({ type: 'varchar', length: 2048, nullable: true })
  avatarUrl?: string;

  @BeforeInsert()
  normalize() {
    this.mail = this.mail.toLowerCase().trim();
  }

  @BeforeUpdate()
  normalizeUpdate() {
    this.normalize();
  }
}

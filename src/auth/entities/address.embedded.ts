// src/auth/entities/address.embedded.ts
import { Column } from 'typeorm';

export class Address {
  @Column({ type: 'varchar', length: 50, nullable: true })
  street: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  location: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  city: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  country: string;

  @Column({ type: 'varchar', length: 4, nullable: true })
  cp: string;
}

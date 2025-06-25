import { Column } from 'typeorm';

export class Address {
  @Column({ type: 'varchar', length: 50 })
  street: string;

  @Column({ type: 'varchar', length: 50 })
  location: string;

  @Column({ type: 'varchar', length: 50 })
  city: string;

  @Column({ type: 'varchar', length: 50 })
  country: string;

  @Column({ type: 'varchar', length: 4 })
  cp: string;
}

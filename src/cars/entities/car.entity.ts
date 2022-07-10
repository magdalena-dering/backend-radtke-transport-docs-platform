import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Car {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  registration_number: string;

  @Column()
  date: string;

  @Column()
  distance: string;

  @Column()
  note: string;
}

import { User } from './../../auth/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ExclusionMetadata } from 'typeorm/metadata/ExclusionMetadata';
import { Exclude } from 'class-transformer';

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

  @ManyToOne((_type) => User, (user) => user.cars, { eager: false })
  @Exclude({ toPlainOnly: true })
  user: User;
}

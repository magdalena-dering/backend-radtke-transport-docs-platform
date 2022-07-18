import { Car } from './../../cars/entities/car.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true }) // The username must be unique.
  username: string;

  @Column()
  password: string;

  @OneToMany((_type) => Car, (car) => car.user, { eager: true })
  cars: Car[];
}

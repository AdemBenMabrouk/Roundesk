import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Agent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  phoneNumber: string;

  @Column()
  email: string;

  @Column()
  group: string;

  @Column()
  registrationDate: Date;

  @Column()
  canMakeCalls: boolean;

  @Column({ nullable: true })
  photo: string;
}

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  fullname: string;

  @Column()
  password: string;

  @Column({
    nullable: true,
  })
  verifyAt: Date;

  @Column({ default: false })
  isActive: boolean;
}

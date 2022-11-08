import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

enum userRole {
  ADMIN = 'admin',
  EDITOR = 'editor',
  STANDAR = 'standar',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 20, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 15 })
  password: string;

  @Column({
    type: 'set',
    enum: userRole,
    default: [userRole.STANDAR],
  })
  role: string;
}

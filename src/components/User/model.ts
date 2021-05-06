import { hash } from "bcryptjs";
import {
    BaseEntity,
    BeforeInsert,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import { Role } from "./../Role/model";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  phoneNumber: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  profileUrl: string;

  @Column({ nullable: true })
  fcmToken: string;

  @Column({ default: 0 })
  tokenVersion: number;

  @ManyToOne(() => Role, (role) => role)
  role: Role;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert() async hashPassword() {
    this.password = await hash(this.password, 12);
  }
}

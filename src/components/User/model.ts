import { hash } from "bcryptjs";
import { Exclude } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";
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
import { IsNotBlank } from "../../utils/IsNotBlank";
import { Role } from "./../Role/model";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @IsString()
  @IsNotBlank()
  @Column()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @IsNotBlank()
  @Column()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @IsNotBlank()
  @Column({ unique: true })
  email: string;

  @IsNotEmpty()
  @IsString()
  @IsNotBlank()
  @Length(10, 10)
  @Column({ unique: true })
  phoneNumber: string;

  @IsNotEmpty()
  @IsString()
  @IsNotBlank()
  @Length(8, 20)
  @Exclude()
  @Column()
  password: string;

  @Column({ nullable: true })
  profileUrl: string;

  @Exclude()
  @Column({ nullable: true })
  fcmToken: string;

  @Exclude()
  @Column({ default: true })
  isActive: boolean;

  @Column({ default: false })
  isEmailConfirmed: boolean;

  @Column({ default: false })
  isPhoneConfirmed: boolean;

  @Exclude()
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

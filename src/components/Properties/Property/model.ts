import {
    IsNotEmpty,
    IsNumber,
    IsString,
    IsUrl,
    Max,
    Min
} from "class-validator";
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import { IsNotBlank } from "../../../utils/IsNotBlank";
import { State } from "../../State/model";
import { User } from "../../User/model";
import { PropertyOptionProperty } from "../PropertyOptionProperty/model";
import { PropertyType } from "../PropertyType/model";
import { PropertyMedia } from "./../PropertyMedia/model";

@Entity()
export class Property extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @IsString()
  @IsNotBlank()
  @IsUrl()
  @Column()
  displayUrl: string;

  @IsNotEmpty()
  @IsString()
  @IsNotBlank()
  @Column()
  description: string;

  @IsNotEmpty()
  @IsString()
  @IsNotBlank()
  @Column()
  addressLine1: string;

  @IsString()
  @Column({ nullable: true })
  addressLine2: string;

  @IsString()
  @Column({ nullable: true })
  community: string;

  @IsNotEmpty()
  @IsString()
  @IsNotBlank()
  @Column()
  city: string;

  @IsNotEmpty()
  @IsString()
  @IsNotBlank()
  @Column()
  zipCode: string;

  @IsNotEmpty()
  @IsNumber()
  @Column()
  squareFeet: number;

  @IsNotEmpty()
  @IsNumber()
  @Max(100)
  @Min(0)
  @Column({ default: 0 })
  numberOfFloor: number;

  @Column({ default: true })
  isActive: boolean;

  @ManyToOne(() => State, (state) => state.properties)
  state: State;

  @Column()
  userId: number;

  @ManyToOne(() => User, (user) => user.properties)
  @JoinColumn({ name: "userId" })
  user: User;

  @ManyToOne(() => PropertyType, (propertyType) => propertyType)
  propertyType: PropertyType;

  @OneToMany(
    () => PropertyOptionProperty,
    (propertyOptionProperty) => propertyOptionProperty.property
  )
  propertyOptionsConnection: PropertyOptionProperty[];

  @OneToMany(() => PropertyMedia, (propertyMedia) => propertyMedia.property)
  propertyMedia: PropertyMedia[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

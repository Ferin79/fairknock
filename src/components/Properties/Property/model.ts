import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import { State } from "../../State/model";
import { User } from "../../User/model";
import { PropertyOptionProperty } from "../PropertyOptionProperty/model";
import { PropertyType } from "../PropertyType/model";
import { PropertyMedia } from "./../PropertyMedia/model";

@Entity()
export class Property extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  displayUrl: string;

  @Column()
  description: string;

  @Column()
  addressLine1: string;

  @Column({ nullable: true })
  addressLine2: string;

  @Column({ nullable: true })
  community: string;

  @Column()
  city: string;

  @Column()
  zipCode: string;

  @Column()
  squareFeet: number;

  @Column({ default: 0 })
  numberOfFloor: number;

  @ManyToOne(() => State, (state) => state.properties)
  state: State;

  @ManyToOne(() => User, (user) => user.properties)
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

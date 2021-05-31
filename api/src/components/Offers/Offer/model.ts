import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Property } from "./../../Properties/Property/model";
import { User } from "./../../User/model";
import { OfferAnswer } from "./../OfferAnswer/model";

@Entity()
export class Offer extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  price: number;

  @Column()
  expiration: Date;

  @ManyToOne(() => Property, (property) => property.offers)
  property: Property;

  @ManyToOne(() => User, (user) => user.offers)
  user: User;

  @OneToMany(() => OfferAnswer, (offerAnswer) => offerAnswer.offer)
  offerAnswers: OfferAnswer[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

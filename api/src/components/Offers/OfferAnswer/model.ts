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
import { Offer } from "../Offer/model";
import { OfferAnswerOption } from "./../OfferAnswerOption/model";
import { OfferQuestion } from "./../OfferQuestion/model";

@Entity()
export class OfferAnswer extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  answer: string;

  @ManyToOne(() => Offer, (offer) => offer.offerAnswers)
  offer: Offer;

  @ManyToOne(() => OfferQuestion, (offerQuestion) => offerQuestion.offerAnswers)
  offerQuestion: OfferQuestion;

  @OneToMany(
    () => OfferAnswerOption,
    (offerAnswerOption) => offerAnswerOption.offerAnswer
  )
  offerAnswerOptions: OfferAnswerOption[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

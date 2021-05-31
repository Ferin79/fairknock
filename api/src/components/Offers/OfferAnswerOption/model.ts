import {
  BaseEntity,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { OfferAnswer } from "./../OfferAnswer/model";
import { OfferOption } from "./../OfferOption/model";

@Entity()
export class OfferAnswerOption extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => OfferAnswer, (offerAnswer) => offerAnswer.offerAnswerOptions)
  offerAnswer: OfferAnswer;

  @ManyToOne(() => OfferOption, (offerOption) => offerOption.offerAnswerOption)
  offerOption: OfferOption;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

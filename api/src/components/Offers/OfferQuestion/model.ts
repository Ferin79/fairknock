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
import { QuestionType } from "./../../Disclouser/QuestionType/model";
import { OfferAnswer } from "./../OfferAnswer/model";
import { OfferOption } from "./../OfferOption/model";

@Entity()
export class OfferQuestion extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  isCompulsory: boolean;

  @ManyToOne(() => QuestionType, (questionType) => questionType.offerQuestions)
  questionType: QuestionType;

  @OneToMany(() => OfferOption, (offerOption) => offerOption.offerQuestion)
  offerOptions: OfferOption[];

  @OneToMany(() => OfferAnswer, (offerAnswer) => offerAnswer.offerQuestion)
  offerAnswers: OfferAnswer[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

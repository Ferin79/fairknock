import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Question } from "../Question/model";
import { OfferQuestion } from "./../../Offers/OfferQuestion/model";

@Entity()
export class QuestionType extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => OfferQuestion, (offerQuestion) => offerQuestion.questionType)
  offerQuestions: OfferQuestion[];

  @OneToMany(() => Question, (question) => question.questionType)
  questions: Question[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

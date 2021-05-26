import {
  BaseEntity,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { QuestionOption } from "./../OuestionOption/model";
import { UserAnswer } from "./../UserAnswer/model";

@Entity()
export class UserAnswerOption extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserAnswer, (userAnswer) => userAnswer.userAnswerOptions)
  userAnswer: UserAnswer;

  @ManyToOne(
    () => QuestionOption,
    (questionOption) => questionOption.userAnswerOptions
  )
  questionOption: QuestionOption;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

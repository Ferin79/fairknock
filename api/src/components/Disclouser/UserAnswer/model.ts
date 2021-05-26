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
import { Question } from "./../Question/model";
import { UserAnswerOption } from "./../UserAnswerOption/model";
import { UserAnswerTemplate } from "./../UserAnswerTemplate/model";

@Entity()
export class UserAnswer extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text", nullable: true })
  answer: string;

  @Column({ type: "text", nullable: true })
  justification: string;

  @ManyToOne(() => Question, (question) => question.userAnswers)
  question: Question;

  @ManyToOne(
    () => UserAnswerTemplate,
    (userAnswerTemplate) => userAnswerTemplate.userAnswers
  )
  userAnswerTemplate: UserAnswerTemplate;

  @OneToMany(
    () => UserAnswerOption,
    (userAnswerOption) => userAnswerOption.userAnswer
  )
  userAnswerOptions: UserAnswerOption[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

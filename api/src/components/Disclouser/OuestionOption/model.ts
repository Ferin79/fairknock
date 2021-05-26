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
import { Question } from "../Question/model";
import { UserAnswerOption } from "./../UserAnswerOption/model";

@Entity()
export class QuestionOption extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  key: string;

  @Column()
  name: string;

  @ManyToOne(() => Question, (question) => question.questionOptions)
  question: Question;

  @OneToMany(
    () => UserAnswerOption,
    (userAnswerOption) => userAnswerOption.questionOption
  )
  userAnswerOptions: UserAnswerOption[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

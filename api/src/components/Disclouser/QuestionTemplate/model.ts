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
import { State } from "../../State/model";
import { Question } from "../Question/model";
import { UserAnswerTemplate } from "./../UserAnswerTemplate/model";

@Entity()
export class QuestionTemplate extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  uniqueName: string;

  @ManyToOne(() => State, (state) => state.questionTemplates)
  state: State;

  @OneToMany(() => Question, (question) => question.questionTemplate)
  questions: Question[];

  @OneToMany(
    () => UserAnswerTemplate,
    (userAnswerTemplate) => userAnswerTemplate.questionTemplate
  )
  userAnswerTemplates: UserAnswerTemplate[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

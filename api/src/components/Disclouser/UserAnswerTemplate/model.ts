import {
    BaseEntity,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import { Property } from "./../../Properties/Property/model";
import { User } from "./../../User/model";
import { QuestionTemplate } from "./../QuestionTemplate/model";
import { UserAnswer } from "./../UserAnswer/model";

@Entity()
export class UserAnswerTemplate extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    () => QuestionTemplate,
    (questionTemplate) => questionTemplate.userAnswerTemplates,
    { onDelete: "CASCADE" }
  )
  questionTemplate: QuestionTemplate;

  @ManyToOne(() => Property, (property) => property.userAnswerTemplates, {
    onDelete: "CASCADE",
  })
  property: Property;

  @ManyToOne(() => User, (user) => user.userAnswerTemplate)
  user: User;

  @OneToMany(() => UserAnswer, (userAnswer) => userAnswer.userAnswerTemplate)
  userAnswers: UserAnswer[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

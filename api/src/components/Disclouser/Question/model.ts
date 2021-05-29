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
import { UserType } from "../../../types/UserType";
import { QuestionOption } from "../OuestionOption/model";
import { QuestionTemplate } from "../QuestionTemplate/model";
import { QuestionType } from "../QuestionType/model";
import { UserAnswer } from "./../UserAnswer/model";

@Entity()
export class Question extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column("text")
  description: string;

  @Column({ nullable: true })
  fileType: string;

  @Column({ nullable: true })
  fileUrl: string;

  @Column({ default: UserType.seller })
  askTo: string;

  @Column({ unique: true })
  sequenceNumber: number;

  @Column({ default: false })
  isCompulsory: boolean;

  @ManyToOne(() => QuestionType, (questionType) => questionType.questions)
  questionType: QuestionType;

  @ManyToOne(
    () => QuestionTemplate,
    (questionTemplate) => questionTemplate.questions
  )
  questionTemplate: QuestionTemplate;

  @OneToMany(() => QuestionOption, (questionOption) => questionOption.question)
  questionOptions: QuestionOption[];

  @OneToMany(() => UserAnswer, (userAnswer) => userAnswer.question)
  userAnswers: UserAnswer[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

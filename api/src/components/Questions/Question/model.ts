import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import { QuestionOption } from "./../OuestionOption/model";
import { QuestionTemplate } from "./../QuestionTemplate/model";
import { QuestionType } from "./../QuestionType/model";

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

  @Column()
  askTo: string;

  @Column()
  sequenceNumber: number;

  @ManyToOne(() => QuestionType, (questionType) => questionType.questions)
  questionType: QuestionType;

  @ManyToOne(() => QuestionTemplate, (questionTemplate) => questionTemplate)
  questionTemplate: QuestionTemplate;

  @OneToMany(() => QuestionOption, (questionOption) => questionOption.question)
  questionOptions: QuestionOption[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

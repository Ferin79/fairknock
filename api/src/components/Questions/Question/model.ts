import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import { PropertyType } from "./../../Properties/PropertyType/model";
import { State } from "./../../State/model";
import { QuestionOption } from "./../OuestionOption/model";
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

  @ManyToOne(() => QuestionType, (questionType) => questionType.questions)
  questionType: QuestionType;

  @OneToMany(() => QuestionOption, (questionOption) => questionOption.question)
  questionOptions: QuestionOption[];

  @ManyToOne(() => State, (state) => state.questions)
  state: State;

  @ManyToMany(() => PropertyType, (propertyType) => propertyType, {
    cascade: true,
  })
  @JoinTable()
  propertyTypes: PropertyType[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

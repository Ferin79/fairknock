import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn
} from "typeorm";
import { Property } from "../Properties/Property/model";
import { Country } from "./../Country/model";
import { Question } from "./../Questions/Question/model";

@Entity()
export class State extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ unique: true })
  abbreviation: string;

  @ManyToOne(() => Country, (country) => country)
  country: Country;

  @OneToMany(() => Property, (property) => property.state)
  properties: Property[];

  @OneToMany(() => Question, (question) => question.state)
  questions: Question[];

  @CreateDateColumn()
  createdAt: Date;
}

import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToMany,
    OneToMany,
    PrimaryGeneratedColumn
} from "typeorm";
import { Property } from "../Property/model";
import { Question } from "./../../Questions/Question/model";

@Entity()
export class PropertyType extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => Property, (property) => property.propertyType)
  properties: Property[];

  @ManyToMany(() => Question, (question) => question.propertyTypes)
  questions: Question[];

  @Column({ nullable: true })
  description: string;

  @CreateDateColumn()
  createdAt: number;
}

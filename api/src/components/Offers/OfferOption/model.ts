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
import { OfferAnswerOption } from "./../OfferAnswerOption/model";
import { OfferQuestion } from "./../OfferQuestion/model";

@Entity()
export class OfferOption extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  key: string;

  @ManyToOne(() => OfferQuestion, (offerQuestion) => offerQuestion.offerOptions)
  offerQuestion: OfferQuestion;

  @OneToMany(
    () => OfferAnswerOption,
    (offerAnswerOption) => offerAnswerOption.offerOption
  )
  offerAnswerOption: OfferAnswerOption[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn
} from "typeorm";
import { State } from "./../State/model";

@Entity()
export class Country extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ unique: true })
  abbreviation: string;

  @OneToMany(() => State, (state) => state.country)
  states: State[];

  @CreateDateColumn()
  createdAt: Date;
}

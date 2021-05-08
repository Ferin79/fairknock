import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn
} from "typeorm";
import { Country } from "./../Country/model";

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

  @CreateDateColumn()
  createdAt: Date;
}

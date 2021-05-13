import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn
} from "typeorm";
import { Property } from "../Property/model";

@Entity()
export class PropertyType extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => Property, (property) => property.propertyType)
  properties: Property[];

  @Column({ nullable: true })
  description: string;

  @CreateDateColumn()
  createdAt: number;
}

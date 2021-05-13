import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import { PropertyOptionProperty } from "../PropertyOptionProperty/model";

@Entity()
export class PropertyOption extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  @OneToMany(
    () => PropertyOptionProperty,
    (propertyOptionProperty) => propertyOptionProperty.propertyOption
  )
  propertiesConnection: PropertyOptionProperty[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

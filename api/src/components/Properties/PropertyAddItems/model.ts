import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Property } from "./../Property/model";
import { PropertyAdditionalCategory } from "./../PropertyAddCategory/model";

@Entity()
export class PropertyAdditionalItem extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(
    () => PropertyAdditionalCategory,
    (propertyAdditionalCategory) =>
      propertyAdditionalCategory.propertyAdditionalItem
  )
  propertyAdditionalCategory: PropertyAdditionalCategory;

  @ManyToMany(() => Property, (property) => property.propertyAdditionalItems)
  properties: Property[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import { PropertyAdditionalItem } from "./../PropertyAddItems/model";

@Entity()
export class PropertyAdditionalCategory extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ enum: ["Checkbox", "Radio"] })
  type: string;

  @OneToMany(
    () => PropertyAdditionalItem,
    (propertyAdditionalItem) =>
      propertyAdditionalItem.propertyAdditionalCategory
  )
  propertyAdditionalItem: PropertyAdditionalItem[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

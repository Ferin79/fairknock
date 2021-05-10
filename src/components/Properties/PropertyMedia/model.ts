import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import { Property } from "./../Property/model";
import { PropertyMediaType } from "./propertyMediaType";

@Entity()
export class PropertyMedia extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "enum", enum: PropertyMediaType })
  mediaType: string;

  @Column()
  url: string;

  @ManyToOne(() => Property, (property) => property.propertyMedia)
  property: Property;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

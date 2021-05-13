import { IsNotEmpty, IsString, IsUrl } from "class-validator";
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import { IsNotBlank } from "../../../utils/IsNotBlank";
import { Property } from "./../Property/model";
import { PropertyMediaType } from "./propertyMediaType";

@Entity()
export class PropertyMedia extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotBlank()
  @IsString()
  @IsNotEmpty()
  @Column({ type: "enum", enum: PropertyMediaType })
  mediaType: string;

  @IsNotBlank()
  @IsNotEmpty()
  @IsString()
  @IsUrl()
  @Column()
  url: string;

  @ManyToOne(() => Property, (property) => property.propertyMedia)
  property: Property;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

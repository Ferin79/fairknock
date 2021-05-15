import { IsNotEmpty, IsNumber, Min } from "class-validator";
import {
    BaseEntity,
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryColumn
} from "typeorm";
import { Property } from "../Property/model";
import { PropertyOption } from "../PropertyOption/model";

@Entity()
export class PropertyOptionProperty extends BaseEntity {
  @PrimaryColumn()
  propertyId: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @PrimaryColumn()
  propertyOptionId: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Column({ default: 1 })
  count: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Column({ default: 0 })
  height: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Column({ default: 0 })
  width: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Column({ default: 0 })
  length: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Column({ nullable: true })
  squareFeet: number;

  @ManyToOne(() => Property, (property) => property.propertyOptionsConnection, {
    primary: true,
  })
  @JoinColumn({ name: "propertyId" })
  property: Property;

  @ManyToOne(
    () => PropertyOption,
    (propertyOption) => propertyOption.propertiesConnection,
    {
      primary: true,
    }
  )
  @JoinColumn({ name: "propertyOptionId" })
  propertyOption: PropertyOption;
}

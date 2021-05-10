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

  @PrimaryColumn()
  propertyOptionId: number;

  @Column({ default: 1 })
  count: number;

  @Column()
  height: number;

  @Column()
  width: number;

  @Column()
  length: number;

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

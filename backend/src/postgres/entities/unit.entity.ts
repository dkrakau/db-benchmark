import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export abstract class Unit {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    unit: string;

    @Column()
    asset_id: number;

}
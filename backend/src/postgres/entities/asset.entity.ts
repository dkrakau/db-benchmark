import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Asset {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    iscc: string;

    @Column()
    metadata: number;

}

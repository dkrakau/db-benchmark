import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Asset {

    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: string;

    @Column({ length: 60 })
    iscc: string;

    @Column()
    source: string;

}
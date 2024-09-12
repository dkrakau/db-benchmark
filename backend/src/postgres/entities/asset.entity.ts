import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class AssetEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    iscc: string;

    @Column()
    metadata: number;

}

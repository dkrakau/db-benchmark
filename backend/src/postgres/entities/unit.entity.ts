import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Asset } from "./asset.entity";

@Entity()
export abstract class Unit {

    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: string;

    @Column({ type: 'bit', length: 64 })
    meta: string;

    @Column({ type: 'bit', length: 64 })
    content: string;

    @Column({ type: 'bit', length: 64 })
    data: string;

    @Column({ type: 'bit', length: 64 })
    instance: string;

    /* 
    @Column({ type: 'bigint' })
    assetId: string;
    */

    @OneToOne(() => Asset, (asset) => asset.id)
    @JoinColumn()
    asset: Asset;

}

@Entity()
export class AudioUnit extends Unit { }

@Entity()
export class ImageUnit extends Unit { }

@Entity()
export class TextUnit extends Unit { }

@Entity()
export class VideoUnit extends Unit { }
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

    @OneToOne(() => Asset, (asset) => asset.id)
    @JoinColumn()
    asset: Asset;

    /* 
    @Column({ type: 'bigint' })
    assetId: string;
    */

}

@Entity()
export class Audio extends Unit { }

@Entity()
export class Image extends Unit { }

@Entity()
export class Text extends Unit { }

@Entity()
export class Video extends Unit { }
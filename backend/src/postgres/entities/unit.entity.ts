import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export abstract class Unit {

    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: string;

    @Column({ type: 'bit', length: 64 })
    unit: string;

    @Column({ type: 'bigint' })
    asset_id: string;

    /* @Column()
    hd?: number; */
}

@Entity()
export class AudioUnit extends Unit { }

@Entity()
export class ImageUnit extends Unit { }

@Entity()
export class TextUnit extends Unit { }

@Entity()
export class VideoUnit extends Unit { }
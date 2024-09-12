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

@Entity()
export class AudioUnit extends Unit { }

@Entity()
export class ImageUnit extends Unit { }

@Entity()
export class TextUnit extends Unit { }

@Entity()
export class VideoUnit extends Unit { }
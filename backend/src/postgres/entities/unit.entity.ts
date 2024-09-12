import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export abstract class UnitEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    unit: string;

    @Column()
    asset_id: number;

}

@Entity()
export class AudioUnitEntity extends UnitEntity { }

@Entity()
export class ImageUnitEntity extends UnitEntity { }

@Entity()
export class TextUnitEntity extends UnitEntity { }

@Entity()
export class VideoUnitEntity extends UnitEntity { }
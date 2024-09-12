import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class InfoResponseDto {

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    asset_count: number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    audio_unit_count: number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    image_unit_count: number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    text_unit_count: number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    video_unit_count: number;

}
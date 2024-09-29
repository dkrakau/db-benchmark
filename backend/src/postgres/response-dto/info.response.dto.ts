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
    audio_count: number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    image_count: number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    text_count: number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    video_count: number;

}
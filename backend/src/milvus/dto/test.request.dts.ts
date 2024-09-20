import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsString, Matches } from "class-validator";

export class TestRequestDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @Matches("^[0-1]{64}$", "", { message: "Invalid unit format" })
    unit: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @IsEnum(["audio", "image", "text", "video"])
    mode: string;

}
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, Matches } from "class-validator";

export class ResultDto {

    @ApiProperty({
        example: 10,
        description: "Bits diffrent"
    })
    @IsNumber()
    @IsNotEmpty()
    score: number;

    @ApiProperty({
        example: "1001011110100111011111111100011011000000100110000101011000010001",
        description: "ISCC unit"
    })
    @IsString()
    @IsNotEmpty()
    @Matches("^[0-1]{64}$", "", { message: "Invalid unit format" })
    unit: string;

    @ApiProperty({
        example: "465464341",
        description: "Asset id"
    })
    @IsString()
    @IsNotEmpty()
    asset_id: string;

    @ApiProperty({
        example: "-",
        description: "Asset source"
    })
    @IsString()
    @IsNotEmpty()
    source: string;

}
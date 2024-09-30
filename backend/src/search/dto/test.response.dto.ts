import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";
import { ResultDto } from "./result.dto";

export class TestResponseDto {

    @ApiProperty({ example: 123456789 })
    @IsNumber()
    @IsNotEmpty()
    milliseconds: number;

    @ApiProperty({ type: [ResultDto] })
    results: ResultDto[];

}
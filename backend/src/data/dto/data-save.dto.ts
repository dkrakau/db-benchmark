import { ApiProperty } from "@nestjs/swagger";
import { TestResponseDto } from "src/search/dto/test.response.dto";

export class DataSaveDto {

    @ApiProperty({
        name: "db",
        required: true,
        description: "Database name",
        example: "milvus"
    })
    db: string;

    @ApiProperty({
        name: "foldername",
        required: true,
        description: "Foldername",
        example: "2024-9-2_13-37-46_Milvus"
    })
    foldername: string;

    @ApiProperty({
        name: "filename",
        required: true,
        description: "Filname",
        example: "1-query.json"
    })
    filename: string;

    @ApiProperty({
        name: "testdata",
        required: true,
        description: "Testdata to be saved",
        type: TestResponseDto
    })
    testdata: TestResponseDto;

}
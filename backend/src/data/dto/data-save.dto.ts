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
        name: "testdata",
        required: true,
        description: "Testdata to be saved",
        type: [TestResponseDto]
    })
    testdata: TestResponseDto[];

}
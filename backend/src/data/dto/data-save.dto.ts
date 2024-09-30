import { ApiProperty } from "@nestjs/swagger";

export class DataSaveDto {

    @ApiProperty({
        name: "db",
        required: true,
        description: "Database name",
        example: "milvus"
    })
    db: string;

    @ApiProperty({
        name: "data",
        required: true,
        description: "Data"
    })
    data: string;

}
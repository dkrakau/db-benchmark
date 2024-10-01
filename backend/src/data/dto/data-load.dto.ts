import { ApiProperty } from "@nestjs/swagger";

export class DataLoadDto {

    @ApiProperty({
        name: "db",
        required: true,
        description: "Database name",
        example: "milvus"
    })
    db: string;

    @ApiProperty({
        name: "path",
        required: true,
        description: "Path",
        example: "2024-9-2_13-37-46_Milvus/1-query.json"
    })
    path: string;

}
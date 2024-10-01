import { ApiProperty } from "@nestjs/swagger";

export class DataListDto {

    @ApiProperty({
        name: "db",
        required: true,
        description: "Database name",
        example: "milvus"
    })
    db: string;

}
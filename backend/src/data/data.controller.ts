import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { ApiOkResponse, ApiQuery, ApiTags } from "@nestjs/swagger";
import { TestResponseDto } from "src/search/dto/test.response.dto";
import { DataService } from "./data.service";
import { DataListDto } from "./dto/data-list.dto";
import { DataLoadDto } from "./dto/data-load.dto";
import { DataSaveDto } from "./dto/data-save.dto";


@ApiTags("Data")
@Controller("data")
export class DataController {

  constructor(private readonly dataService: DataService) { }

  @Get("/list")
  @ApiQuery({ name: "db", required: true, description: "Database name", schema: { type: "string" }, example: "milvus" })
  @ApiOkResponse({
    description: "Filenames",
    type: String,
    isArray: true
  })
  list(@Query() dataListDto: DataListDto): string[] {
    return this.dataService.list(dataListDto);
  }

  @Get("/load")
  @ApiQuery({ name: "db", required: true, description: "Database name", schema: { type: "string" }, example: "milvus" })
  @ApiQuery({ name: "file", required: true, description: "File name", schema: { type: "string" }, example: "filename.json" })
  @ApiOkResponse({
    status: 200,
    description: "Testdata",
    type: TestResponseDto,
    isArray: true
  })
  load(@Query() dataLoadDto: DataLoadDto): Promise<TestResponseDto[]> {
    return this.dataService.load(dataLoadDto);
  }

  @Post("/save")
  @ApiOkResponse({
    status: 201,
    description: "Testdata saved successfully",
    isArray: false
  })
  save(@Body() dataSaveDto: DataSaveDto) {
    return this.dataService.save(dataSaveDto);
  }

}
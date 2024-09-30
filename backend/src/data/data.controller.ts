import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { ApiOkResponse, ApiQuery, ApiTags } from "@nestjs/swagger";
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
    description: "Result",
    isArray: false
  })
  list(@Query() dataListDto: DataListDto): string[] {
    return this.dataService.list(dataListDto);
  }

  @Get("/load")
  @ApiQuery({ name: "db", required: true, description: "Database name", schema: { type: "string" }, example: "milvus" })
  @ApiQuery({ name: "file", required: true, description: "File name", schema: { type: "string" }, example: "filename.json" })
  @ApiOkResponse({
    description: "Result",
    isArray: false
  })
  load(@Query() dataLoadDto: DataLoadDto) {
    return this.dataService.load(dataLoadDto);
  }

  @Post("/save")
  @ApiOkResponse({
    description: "Result",
    isArray: false
  })
  save(@Body() dataSaveDto: DataSaveDto) {
    return this.dataService.save(dataSaveDto);
  }

}
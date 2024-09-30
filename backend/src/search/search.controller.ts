import { Controller, Get, Query } from "@nestjs/common";
import { ApiOkResponse, ApiQuery, ApiTags } from "@nestjs/swagger";
import { Modes } from "src/model/ISCCGenerator.model";
import { TestRequestDto } from "./dto/test.request.dto";
import { TestResponseDto } from "./dto/test.response.dto";
import { SearchService } from "./search.service";

@ApiTags('Nearest Neighbor Search')
@Controller("nns")
export class SearchController {

  constructor(private readonly searchService: SearchService) { }

  @Get("/milvus/test")
  @ApiQuery({ name: "unit", required: true, description: "Binary iscc string", schema: { type: "string" }, example: "1001011110100111011111111100011011000000100110000101011000010001" })
  @ApiQuery({ name: "mode", enum: Modes, required: true, description: "Mode of unit", schema: { type: "string" }, example: "image" })
  @ApiOkResponse({
    description: "Result",
    type: TestResponseDto,
    isArray: true
  })
  milvusTest(@Query() testRequestDto: TestRequestDto): Promise<TestResponseDto> {
    return this.searchService.milvusTest(testRequestDto);
  }

  @Get("/postgres/test")
  @ApiQuery({ name: "unit", required: true, description: "Binary iscc string", schema: { type: "string" }, example: "1001011110100111011111111100011011000000100110000101011000010001" })
  @ApiQuery({ name: "mode", enum: Modes, required: true, description: "Mode of unit", schema: { type: "string" }, example: "image" })
  @ApiOkResponse({
    description: "Result",
    isArray: false
  })
  postgresTest(@Query() testRequestDto: TestRequestDto): Promise<TestResponseDto> {
    return this.searchService.postgresTest(testRequestDto);
  }

}

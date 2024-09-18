import { Controller, Get, Query } from "@nestjs/common";
import { ApiOkResponse, ApiQuery, ApiTags } from "@nestjs/swagger";
import { Modes } from "src/model/ISCCGenerator.model";
import { Unit } from "./entities/unit.entity";
import { PostgresService } from "./postgres.service";
import { TestRequestDto } from "./request-dto/test.request.dto";
import { InfoResponseDto } from "./response-dto/info.response.dto";
import { TestResponseDto } from "./response-dto/test.response.dto";

@ApiTags("PostgreSQL")
@Controller("postgres")
export class PostgresController {

  constructor(private readonly postgresService: PostgresService) { }

  @Get("fill")
  setup() {
    return this.postgresService.fill();
  }

  @Get("/test")
  @ApiQuery({ name: "unit", required: true, description: "Binary iscc string", schema: { type: "string" }, example: "0110011110101100001111100000111010011111011101001000000011110111" })
  @ApiQuery({ name: "mode", enum: Modes, required: true, description: "Mode of unit", schema: { type: "string" }, example: "image" })
  @ApiOkResponse({
    description: "Result",
    type: TestResponseDto,
    isArray: false
  })
  test(@Query() testRequestDto: TestRequestDto): Promise<Unit[]> {
    return this.postgresService.test(testRequestDto);
  }

  @Get("info")
  @ApiOkResponse({
    description: "Result",
    type: InfoResponseDto,
    isArray: false
  })
  info(): Promise<InfoResponseDto> {
    return this.postgresService.info();
  }
}

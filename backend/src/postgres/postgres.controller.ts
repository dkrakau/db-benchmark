import { Controller, Get } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { PostgresMessage } from "./entities/postgres.message.entity";
import { PostgresService } from "./postgres.service";
import { InfoResponseDto } from "./response-dto/info.response.dto";

@ApiTags("PostgreSQL")
@Controller("postgres")
export class PostgresController {

  constructor(private readonly postgresService: PostgresService) { }

  @Get("/fill-samples")
  fillSamples(): Promise<PostgresMessage> {
    return this.postgresService.fillSamples();
  }

  @Get("/info")
  @ApiOkResponse({
    description: "Result",
    type: InfoResponseDto,
    isArray: false
  })
  info(): Promise<InfoResponseDto> {
    return this.postgresService.info();
  }
}

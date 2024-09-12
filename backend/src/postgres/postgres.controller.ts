import { Controller, Get, Query } from '@nestjs/common';
import { PostgresService } from './postgres.service';
import { SearchPostgresDto } from './dto/search.postgres.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

export enum Modes {
  audio = 'audio',
  image = 'image',
  text = 'text',
  video = 'video'
}

@ApiTags("PostgreSQL")
@Controller('postgres')
export class PostgresController {

  constructor(private readonly postgresService: PostgresService) { }

  @Get("create")
  create() {
    return this.postgresService.create();
  }

  @Get("drop")
  drop() {
    return this.postgresService.drop();
  }

  @Get("fill")
  setup() {
    return this.postgresService.fill();
  }

  @Get("/test")
  @ApiQuery({ name: "unit", required: true, description: 'Binary iscc string', schema: { type: 'string' }, example: "0110011110101100001111100000111010011111011101001000000011110111" })
  @ApiQuery({ name: 'mode', enum: Modes, required: true, description: 'Mode of unit', schema: { type: 'string' }, example: "image" })
  test(@Query() searchPostgreDto: SearchPostgresDto): SearchPostgresDto {
    return this.postgresService.test(searchPostgreDto);
  }

  @Get("info")
  info() {
    return this.postgresService.info();
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PostgresService } from './postgres.service';
import { SearchPostgresDto } from './dto/search.postgres.dto';
import { ApiTags } from '@nestjs/swagger';

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

  @Get("test")
  testing(@Body() searchPostgresDto: SearchPostgresDto) {
    return this.postgresService.test(searchPostgresDto);
  }

  @Get("info")
  info() {
    return this.postgresService.info();
  }
}

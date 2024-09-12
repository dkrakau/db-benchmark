import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PostgresService } from './postgres.service';
import { SearchPostgreDto } from './dto/search.postgres.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("PostgreSQL")
@Controller('postgres')
export class PostgresController {
  constructor(private readonly postgresService: PostgresService) { }

  @Get("create")
  create(@Body() createMilvusDto: SearchPostgreDto) {
    return this.postgresService.create(createMilvusDto);
  }

  @Get("drop")
  drop(@Body() createMilvusDto: SearchPostgreDto) {
    return this.postgresService.create(createMilvusDto);
  }

  @Get("setup")
  setup(@Body() createMilvusDto: SearchPostgreDto) {
    return this.postgresService.create(createMilvusDto);
  }

  @Get("testing")
  testing(@Body() createMilvusDto: SearchPostgreDto) {
    return this.postgresService.create(createMilvusDto);
  }

  @Get("info")
  info() {
    return this.postgresService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostgreDto: SearchPostgreDto) {
    return this.postgresService.update(+id, updatePostgreDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postgresService.remove(+id);
  }
}

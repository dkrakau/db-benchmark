import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PostgresService } from './postgres.service';
import { CreatePostgreDto } from './dto/create-postgre.dto';
import { UpdatePostgreDto } from './dto/update-postgre.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("PostgreSQL")
@Controller('postgres')
export class PostgresController {
  constructor(private readonly postgresService: PostgresService) {}

  @Get("create")
  create(@Body() createMilvusDto: CreatePostgreDto) {
    return this.postgresService.create(createMilvusDto);
  }

  @Get("drop")
  drop(@Body() createMilvusDto: CreatePostgreDto) {
    return this.postgresService.create(createMilvusDto);
  }

  @Get("setup")
  setup(@Body() createMilvusDto: CreatePostgreDto) {
    return this.postgresService.create(createMilvusDto);
  }

  @Get("testing")
  testing(@Body() createMilvusDto: CreatePostgreDto) {
    return this.postgresService.create(createMilvusDto);
  }

  @Get("info")
  info() {
    return this.postgresService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostgreDto: UpdatePostgreDto) {
    return this.postgresService.update(+id, updatePostgreDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postgresService.remove(+id);
  }
}

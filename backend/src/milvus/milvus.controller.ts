import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MilvusService } from './milvus.service';
import { CreateMilvusDto } from './dto/create-milvus.dto';
import { UpdateMilvusDto } from './dto/update-milvus.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Milvus')
@Controller('milvus')
export class MilvusController {
  
  constructor(private readonly milvusService: MilvusService) {}

  @Get("create")
  create(@Body() createMilvusDto: CreateMilvusDto) {
    return this.milvusService.create(createMilvusDto);
  }

  @Get("drop")
  drop(@Body() createMilvusDto: CreateMilvusDto) {
    return this.milvusService.create(createMilvusDto);
  }

  @Get("setup")
  setup(@Body() createMilvusDto: CreateMilvusDto) {
    return this.milvusService.create(createMilvusDto);
  }

  @Get("testing")
  testing(@Body() createMilvusDto: CreateMilvusDto) {
    return this.milvusService.create(createMilvusDto);
  }

  @Get("info")
  info() {
    return this.milvusService.info();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMilvusDto: UpdateMilvusDto) {
    return this.milvusService.update(+id, updateMilvusDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.milvusService.remove(+id);
  }
}

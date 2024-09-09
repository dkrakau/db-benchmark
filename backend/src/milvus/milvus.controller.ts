import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MilvusService } from './milvus.service';
import { ApiParam, ApiTags } from '@nestjs/swagger';

export enum Modes {
  audio = 'audio',
  image = 'image',
  text = 'text',
  video = 'video'
}

@ApiTags('Milvus')
@Controller('milvus')
export class MilvusController {
  
  constructor(private readonly milvusService: MilvusService) {}

  @Get('create')
  create() {
    return this.milvusService.create();
  }

  @Get('drop')
  drop() {
    return this.milvusService.drop();
  }

  @Get('fill')
  setup() {
    return this.milvusService.fill();
  }

  @Get('/test/:unit/:mode')
  @ApiParam({name: 'unit', required: true, description: 'Binary iscc string', schema: { type: 'string'}, example: "0110011110101100001111100000111010011111011101001000000011110111"})
  @ApiParam({name: 'mode', required: true, description: 'Mode of unit', schema: { type: 'string'}, example: "image"})
  test(@Param('unit') unit: string, @Param('mode') mode: string) {
    return this.milvusService.test(unit, mode);
  } 

  @Get('info')
  info() {
    return this.milvusService.info();
  }

}

import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MilvusService } from './milvus.service';

@ApiTags('Milvus')
@Controller('milvus')
export class MilvusController {

  constructor(private readonly milvusService: MilvusService) { }

  @Get('create')
  create() {
    return this.milvusService.create();
  }

  @Get('drop')
  drop() {
    return this.milvusService.drop();
  }

  @Get('/fill-samples')
  fillSamples() {
    return this.milvusService.fillSamples();
  }

  @Get('/list-import-jobs')
  listImportJobs() {
    return this.milvusService.listImportJobs();
  }

  @Get('info')
  info() {
    return this.milvusService.info();
  }

}

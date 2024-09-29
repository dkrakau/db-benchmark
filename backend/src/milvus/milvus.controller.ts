import { Controller, Get, Query } from '@nestjs/common';
import { ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Modes } from "src/model/ISCCGenerator.model";
import { TestRequestDto } from "./dto/test.request.dts";
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

  @Get('/fill/samples')
  fillSamples() {
    return this.milvusService.fillSamples();
  }

  @Get('/fill/random')
  fillRandom() {
    return this.milvusService.fillRandom();
  }

  @Get('/test')
  @ApiQuery({ name: "unit", required: true, description: "Binary iscc string", schema: { type: "string" }, example: "1001011110100111011111111100011011000000100110000101011000010001" })
  @ApiQuery({ name: "mode", enum: Modes, required: true, description: "Mode of unit", schema: { type: "string" }, example: "image" })
  @ApiOkResponse({
    description: "Result",
    isArray: true
  })
  test(@Query() testRequestDto: TestRequestDto) {
    return this.milvusService.test(testRequestDto);
  }

  @Get('/list/import/jobs')
  listImportJobs() {
    return this.milvusService.listImportJobs();
  }

  @Get('info')
  info() {
    return this.milvusService.info();
  }

}

import { Module } from '@nestjs/common';
import { CsvParser } from "nest-csv-parser";
import { ISCCGenerator } from 'src/model/ISCCGenerator.model';
import { DataProvider } from "src/provider/data.provider";
import { MilvusProvider } from '../provider/milvus.provider';
import { MilvusController } from './milvus.controller';
import { MilvusService } from './milvus.service';

@Module({
  imports: [],
  controllers: [MilvusController],
  providers: [MilvusService, MilvusProvider, ISCCGenerator, CsvParser, DataProvider],
})
export class MilvusModule { }

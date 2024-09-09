import { Module } from '@nestjs/common';
import { MilvusService } from './milvus.service';
import { MilvusController } from './milvus.controller';
import { MilvusProvider } from '../provider/milvus.provider';
import { ISCCGenerator } from 'src/model/ISCCGenerator.model';

@Module({
  controllers: [MilvusController],
  providers: [MilvusService, MilvusProvider, ISCCGenerator],
})
export class MilvusModule {}

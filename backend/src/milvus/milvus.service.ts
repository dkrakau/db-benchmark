import { Injectable } from '@nestjs/common';
import { CreateMilvusDto } from './dto/create-milvus.dto';
import { UpdateMilvusDto } from './dto/update-milvus.dto';
import { MilvusProvider } from '../provider/milvus.provider';
import { GetVersionResponse } from '@zilliz/milvus2-sdk-node';
import { ISCCGenerator } from 'src/model/ISCCGenerator.model';

@Injectable()
export class MilvusService {

  constructor(private readonly milvusProvider: MilvusProvider, private readonly isccGenerator: ISCCGenerator) {}

  create(createMilvusDto: CreateMilvusDto) {
    return 'This action adds a new milvus';
  }

  findAll() {
    return `This action returns all milvus`;
  }

  async info() {
    let res: GetVersionResponse = await this.milvusProvider.getVersion();
    console.log(res.version);
    console.log(this.isccGenerator.generateISCC());
    console.log(this.isccGenerator.generateUNIT());
    return `This action returns milvus` + res.version;
  }

  update(id: number, updateMilvusDto: UpdateMilvusDto) {
    return `This action updates a #${id} milvus`;
  }

  remove(id: number) {
    return `This action removes a #${id} milvus`;
  }
}

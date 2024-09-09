import { Injectable } from '@nestjs/common';
import { CreateMilvusDto } from './dto/info-milvus.dto';
import { UpdateMilvusDto } from './dto/update-milvus.dto';
import { MilvusProvider } from '../provider/milvus.provider';
import { BinaryVector, CreateIndexParam, CreateIndexSimpleReq, DataType, DescribeCollectionResponse, FieldType, GetLoadStateResponse, GetVersionResponse, MetricType, ResStatus, SearchResults, ShowCollectionsResponse, ShowPartitionsResponse, VectorTypes } from '@zilliz/milvus2-sdk-node';
import { ISCCGenerator } from 'src/model/ISCCGenerator.model';
import { MilvusMessage } from './entities/message.milvus.entity';
import { start } from 'repl';
import { Binary } from 'typeorm';

@Injectable()
export class MilvusService {

  constructor(private readonly milvusProvider: MilvusProvider, private readonly isccGenerator: ISCCGenerator) { }

  public async create(): Promise<MilvusMessage> {
    const indexParams: CreateIndexSimpleReq = {
      index_name: "vector_index",
      collection_name: "iscc",
      field_name: "vector",
      index_type: "BIN_IVF_FLAT",
      metric_type: MetricType.HAMMING,
      params: { nlist: 1024 }
    };
    const fields: FieldType[] = [{
      name: "id",
      data_type: DataType.Int64,
      is_primary_key: true,
      autoID: true
    },
    {
      name: "vector",
      data_type: DataType.BinaryVector,
      dim: 64
    },
    {
      name: "asset_id",
      data_type: DataType.Int64
    }];
    let resColleciton = null;
    let resPartitionAudio = null;
    let resPartitionImage = null;
    let resPartitionText = null;
    let resPartitionVideo = null;
    try {
      await this.milvusProvider.createCollection("iscc", "description", 64, MetricType.HAMMING, "Bounded", indexParams, fields, true);
      await this.milvusProvider.createPartition("iscc", "audio");
      await this.milvusProvider.createPartition("iscc", "image");
      await this.milvusProvider.createPartition("iscc", "text");
      await this.milvusProvider.createPartition("iscc", "video");
    } catch (err) {
      console.error(err);
    }
    const milvusMessage: MilvusMessage = { response_status: [resColleciton, resPartitionAudio, resPartitionImage, resPartitionText, resPartitionVideo] }
    return milvusMessage;
  }

  public async drop(): Promise<MilvusMessage> {
    let response = null;
    try {
      response = await this.milvusProvider.dropCollection('iscc');
    } catch (err) {
      console.error(err);
    }
    const milvusMessage: MilvusMessage = { response_status: [response] };
    return milvusMessage;
  }

  public async fill(): Promise<MilvusMessage> {

    const startTime = new Date().getTime();

    let dataSetAudio = [];
    let dataSetImage = [];
    let dataSetText = [];
    let dataSetVideo = [];

    for (let i = 0; i < 976563; i++) { // 976563

      for (let i = 0; i < 1024; i++) { // 1024
        dataSetAudio.push({ vector: this.isccUnitToBinaryVector(this.isccGenerator.generateUNIT()), asset_id: new Date().getTime() });
        dataSetImage.push({ vector: this.isccUnitToBinaryVector(this.isccGenerator.generateUNIT()), asset_id: new Date().getTime() });
        dataSetText.push({ vector: this.isccUnitToBinaryVector(this.isccGenerator.generateUNIT()), asset_id: new Date().getTime() });
        dataSetVideo.push({ vector: this.isccUnitToBinaryVector(this.isccGenerator.generateUNIT()), asset_id: new Date().getTime() });
      }

      await this.milvusProvider.insert("iscc", dataSetAudio, "audio");
      await this.milvusProvider.insert("iscc", dataSetImage, "image");
      await this.milvusProvider.insert("iscc", dataSetText, "text");
      await this.milvusProvider.insert("iscc", dataSetVideo, "video");

      dataSetAudio = [];
      dataSetImage = [];
      dataSetText = [];
      dataSetVideo = [];

      await this.milvusProvider.flush({ collection_names: ["iscc"] });
    }

    const endTime = new Date().getTime();

    const milvusMessage: MilvusMessage = { fill_duration: this.getFillDuration(startTime, endTime) }
    return milvusMessage;
  }

  private getFillDuration(startTime: number, endTime: number): string {
    let milliseconds: number = endTime - startTime;
    let seconds: number = Math.floor(milliseconds / 1000);
    return Math.floor(seconds / 3600) + ":" + Math.floor(seconds / 60 % 60) + ":" + (seconds % 60)
  }

  private async isccUnitToBinaryVector(isccUnit: string): Promise<BinaryVector> {
    let bytes: number[] = [];
    for (let i = 0; i < 64; i = i + 8) {
      bytes.push(parseInt(isccUnit.substring(i, i + 8), 2));
    }
    return bytes;
  }

  public async test(isccUnit: string, mode: string): Promise<SearchResults> {
    const searchVector: BinaryVector = await this.isccUnitToBinaryVector(isccUnit);
    console.log(searchVector);
    const searchParams = {
      anns_field: "vector",
      topk: 100,
      metric_type: MetricType.HAMMING,
      params: JSON.stringify({ nprobe: 10 })
    };
    return await this.milvusProvider.nns("iscc", [searchVector], DataType.BinaryVector, searchParams, ["asset_id"], [mode]);
  }

  public async info(): Promise<MilvusMessage> {
    let version = null;
    let collections = null;
    let isccCollection = null;
    let isccPartitions = null;
    let isccLoadState = null
    try {
      version = await this.milvusProvider.getVersion();
      collections = await this.milvusProvider.listCollections();
      isccCollection = await this.milvusProvider.describeColleciton('iscc');
      isccPartitions = await this.milvusProvider.listPartitionsInCollection("iscc");
      isccLoadState = await this.milvusProvider.getLoadState('iscc');
    } catch (err) {
      console.log(err);
    }
    const milvusMessage: MilvusMessage = {
      version: version,
      collections: collections,
      iscc_collection: isccCollection,
      iscc_partitions: isccPartitions,
      iscc_load_state: isccLoadState
    }
    return milvusMessage;
  }
}

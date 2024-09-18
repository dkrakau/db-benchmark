import { Injectable } from '@nestjs/common';
import { BinaryVector, ConsistencyLevelEnum, CreateIndexSimpleReq, DataType, FieldType, FlushResult, MetricType, SearchParam, SearchReq, SearchResults } from '@zilliz/milvus2-sdk-node';
import { ISCCGenerator } from 'src/model/ISCCGenerator.model';
import { getFillDuration } from "src/model/time.model";
import { MilvusProvider } from '../provider/milvus.provider';
import { MilvusMessage } from './entities/message.milvus.entity';


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
      resColleciton = await this.milvusProvider.createCollection("iscc", "description", 64, MetricType.HAMMING, "Bounded", indexParams, fields, true);
      resPartitionAudio = await this.milvusProvider.createPartition("iscc", "audio");
      resPartitionImage = await this.milvusProvider.createPartition("iscc", "image");
      resPartitionText = await this.milvusProvider.createPartition("iscc", "text");
      resPartitionVideo = await this.milvusProvider.createPartition("iscc", "video");
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

    for (let i = 0; i < 10; i++) { // 976563

      for (let j = 0; j < 1024; j++) { // 1024
        dataSetAudio.push({ vector: await this.unitToBinaryVector(this.isccGenerator.generateUNIT()), asset_id: new Date().getTime() });
        dataSetImage.push({ vector: await this.unitToBinaryVector(this.isccGenerator.generateUNIT()), asset_id: new Date().getTime() });
        dataSetText.push({ vector: await this.unitToBinaryVector(this.isccGenerator.generateUNIT()), asset_id: new Date().getTime() });
        dataSetVideo.push({ vector: await this.unitToBinaryVector(this.isccGenerator.generateUNIT()), asset_id: new Date().getTime() });
      }

      await this.milvusProvider.insert("iscc", dataSetAudio, "audio");
      await this.milvusProvider.insert("iscc", dataSetImage, "image");
      await this.milvusProvider.insert("iscc", dataSetText, "text");
      await this.milvusProvider.insert("iscc", dataSetVideo, "video");

      dataSetAudio = [];
      dataSetImage = [];
      dataSetText = [];
      dataSetVideo = [];

      let flushResult: FlushResult = await this.milvusProvider.flush({ collection_names: ["iscc"] });
      console.log(flushResult);
    }

    const endTime = new Date().getTime();

    const milvusMessage: MilvusMessage = { fill_duration: getFillDuration(startTime, endTime) }
    return milvusMessage;
  }

  private async unitToBinaryVector(unit: string): Promise<BinaryVector> {
    let bytes: number[] = [];
    for (let i = 0; i < 64; i = i + 8) {
      bytes.push(parseInt(unit.substring(i, i + 8), 2));
    }
    return bytes;
  }
  private async binaryVectorToUnit(vec: BinaryVector): Promise<string> {
    let unit = "";
    for (let i = 0; i < vec.length; i++) {
      let unitSegment = "";
      let binaryString = (vec[i] >>> 0).toString(2);
      let numberOfZerosToFill = 8 - binaryString.length;
      if (numberOfZerosToFill !== 0) {
        for (let i = 0; i < numberOfZerosToFill; i++) {
          unitSegment = unitSegment + "0";
        }
        unitSegment = unitSegment + binaryString;
      } else {
        unitSegment = binaryString;
      }
      unit = unit + unitSegment;
    }
    return unit;
  }

  public async test(unit: string, mode: string): Promise<SearchResults> {

    const searchVector: BinaryVector = await this.unitToBinaryVector(unit);

    const searchParam: SearchParam = {
      anns_field: "vector",
      topk: 50,
      metric_type: MetricType.HAMMING,
      params: JSON.stringify({ nprobe: 10 })
    };
    const searchReq: SearchReq = {
      anns_field: "vector",
      collection_name: "iscc",
      partition_names: ["image"],
      vectors: [searchVector],
      vector_type: DataType.BinaryVector,
      search_params: searchParam,
      consistency_level: ConsistencyLevelEnum.Bounded,
      output_fields: ["id", "vector", "asset_id"]
    }

    let response: SearchResults = await this.milvusProvider.nns(searchReq);
    console.log({ id: response.results[0].id, unit: await this.binaryVectorToUnit(response.results[0]["vector"]), distance: response.results[0].score });

    return response;
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

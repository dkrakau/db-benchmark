import { Injectable } from '@nestjs/common';
import { BinaryVector, ConsistencyLevelEnum, CreateIndexSimpleReq, DataType, FieldType, KeyValuePair, MetricType, ResStatus, SearchParam, SearchReq, SearchResults } from '@zilliz/milvus2-sdk-node';
import { ISCCGenerator, Modes } from 'src/model/ISCCGenerator.model';
import { getFillDuration } from "src/model/time.model";
import { Data, DataProvider } from "src/provider/data.provider";
import { MilvusProvider, MilvusResponse } from '../provider/milvus.provider';
import { TestRequestDto } from "./dto/test.request.dts";
import { MilvusMessage } from './entities/message.milvus.entity';

@Injectable()
export class MilvusService {

  constructor(
    private readonly milvusProvider: MilvusProvider,
    private readonly isccGenerator: ISCCGenerator,
    private readonly dataProvider: DataProvider
  ) { }

  private log(key: string, response: ResStatus): KeyValuePair {
    return { key: key, value: (response.error_code === MilvusResponse.success ? response.error_code : response.error_code + ", " + response.reason) }
  }

  public async create(): Promise<KeyValuePair[]> {

    const modes: string[] = [Modes.audio, Modes.image, Modes.text, Modes.video];

    const responses: KeyValuePair[] = [];
    let response: ResStatus = null;

    try {

      response = await this.milvusProvider.createDatabase("iscc");
      responses.push(this.log("create_db_iscc", response));
      await this.milvusProvider.useDatabase("iscc");

      for (let i = 0; i < modes.length; i++) {
        const indexParams: CreateIndexSimpleReq = {
          index_name: "index_" + modes[i],
          collection_name: modes[i],
          field_name: "vector",
          index_type: "BIN_IVF_FLAT",
          metric_type: MetricType.HAMMING,
          params: { nlist: 4096 }
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
        response = await this.milvusProvider.createCollection(modes[i], "description", 64, MetricType.HAMMING, "Bounded", indexParams, fields, true);
        responses.push(this.log("create_col_" + modes[i], response));
        response = await this.milvusProvider.createPartition(modes[i], "meta");
        responses.push(this.log("create_par_meta", response));
        response = await this.milvusProvider.createPartition(modes[i], "content");
        responses.push(this.log("create_par_content", response));
        response = await this.milvusProvider.createPartition(modes[i], "data");
        responses.push(this.log("create_par_data", response));
        response = await this.milvusProvider.createPartition(modes[i], "instance");
        responses.push(this.log("create_par_instance", response));
      }
    } catch (err) {
      console.error(err);
    }
    return responses;
  }

  public async drop(): Promise<KeyValuePair[]> {

    const modes: string[] = [Modes.audio, Modes.image, Modes.text, Modes.video];

    let response: ResStatus = null;
    const responses: KeyValuePair[] = [];

    try {
      for (let i = 0; i < modes.length; i++) {
        response = await this.milvusProvider.dropCollection({ collection_name: modes[i], db_name: "iscc" });
        responses.push(this.log("del_col_" + modes[i], response));
      }
      response = await this.milvusProvider.dropDatabase("iscc");
      responses.push(this.log("del_db_iscc", response));
    } catch (err) {
      console.error(err);
    }
    return responses;
  }

  public async fillSamples(): Promise<MilvusMessage> {

    await this.milvusProvider.useDatabase("iscc");

    await this.dataProvider.load("./src/data/data-original.csv");
    const data: Data[] = this.dataProvider.get();

    const startTime = new Date().getTime();
    let insertCount: number = 0;

    for (let i = 0; i < data.length; i++) {
      await this.milvusProvider.insert("image", [{ vector: await this.unitToBinaryVector(data[i].meta), asset_id: data[i].id }], "meta");
      await this.milvusProvider.insert("image", [{ vector: await this.unitToBinaryVector(data[i].content), asset_id: data[i].id }], "content");
      await this.milvusProvider.insert("image", [{ vector: await this.unitToBinaryVector(data[i].data), asset_id: data[i].id }], "data");
      await this.milvusProvider.insert("image", [{ vector: await this.unitToBinaryVector(data[i].instance), asset_id: data[i].id }], "instance");
      insertCount++;
      console.log(insertCount + " insertions");
    }

    const endTime = new Date().getTime();

    const milvusMessage: MilvusMessage = { fill_duration: getFillDuration(startTime, endTime) }
    return milvusMessage;
  }

  public async fillRandom(): Promise<MilvusMessage> {

    await this.milvusProvider.useDatabase("iscc");

    const startTime = new Date().getTime();
    let insertCountPerCollection: number = 0;

    const insertChunks: number = 10; // 976563
    const flushCounts: number = 1024; // 1024

    let audioMetaEntries = [];
    let audioContentEntries = [];
    let audioDataEntries = [];
    let audioInstanceEntries = [];

    let imageMetaEntries = [];
    let imageContentEntries = [];
    let imageDataEntries = [];
    let imageInstanceEntries = [];

    let textMetaEntries = [];
    let textContentEntries = [];
    let textDataEntries = [];
    let textInstanceEntries = [];

    let videoMetaEntries = [];
    let videoContentEntries = [];
    let videoDataEntries = [];
    let videoInstanceEntries = [];

    for (let i = 0; i < insertChunks; i++) {
      for (let j = 0; j < flushCounts; j++) {
        let assetId: number = new Date().getTime();
        audioMetaEntries.push({ vector: await this.unitToBinaryVector(this.isccGenerator.generateUNIT()), asset_id: assetId });
        audioContentEntries.push({ vector: await this.unitToBinaryVector(this.isccGenerator.generateUNIT()), asset_id: assetId });
        audioDataEntries.push({ vector: await this.unitToBinaryVector(this.isccGenerator.generateUNIT()), asset_id: assetId });
        audioInstanceEntries.push({ vector: await this.unitToBinaryVector(this.isccGenerator.generateUNIT()), asset_id: assetId });

        assetId = new Date().getTime();
        imageMetaEntries.push({ vector: await this.unitToBinaryVector(this.isccGenerator.generateUNIT()), asset_id: assetId });
        imageContentEntries.push({ vector: await this.unitToBinaryVector(this.isccGenerator.generateUNIT()), asset_id: assetId });
        imageDataEntries.push({ vector: await this.unitToBinaryVector(this.isccGenerator.generateUNIT()), asset_id: assetId });
        imageInstanceEntries.push({ vector: await this.unitToBinaryVector(this.isccGenerator.generateUNIT()), asset_id: assetId });

        assetId = new Date().getTime();
        textMetaEntries.push({ vector: await this.unitToBinaryVector(this.isccGenerator.generateUNIT()), asset_id: assetId });
        textContentEntries.push({ vector: await this.unitToBinaryVector(this.isccGenerator.generateUNIT()), asset_id: assetId });
        textDataEntries.push({ vector: await this.unitToBinaryVector(this.isccGenerator.generateUNIT()), asset_id: assetId });
        textInstanceEntries.push({ vector: await this.unitToBinaryVector(this.isccGenerator.generateUNIT()), asset_id: assetId });

        assetId = new Date().getTime();
        videoMetaEntries.push({ vector: await this.unitToBinaryVector(this.isccGenerator.generateUNIT()), asset_id: assetId });
        videoContentEntries.push({ vector: await this.unitToBinaryVector(this.isccGenerator.generateUNIT()), asset_id: assetId });
        videoDataEntries.push({ vector: await this.unitToBinaryVector(this.isccGenerator.generateUNIT()), asset_id: assetId });
        videoInstanceEntries.push({ vector: await this.unitToBinaryVector(this.isccGenerator.generateUNIT()), asset_id: assetId });
      }
      try {
        await this.milvusProvider.insert("audio", audioMetaEntries, "meta");
        await this.milvusProvider.insert("audio", audioContentEntries, "content");
        await this.milvusProvider.insert("audio", audioDataEntries, "data");
        await this.milvusProvider.insert("audio", audioInstanceEntries, "instance");

        await this.milvusProvider.insert("image", imageMetaEntries, "meta");
        await this.milvusProvider.insert("image", imageContentEntries, "content");
        await this.milvusProvider.insert("image", imageDataEntries, "data");
        await this.milvusProvider.insert("image", imageInstanceEntries, "instance");

        await this.milvusProvider.insert("text", textMetaEntries, "meta");
        await this.milvusProvider.insert("text", textContentEntries, "content");
        await this.milvusProvider.insert("text", textDataEntries, "data");
        await this.milvusProvider.insert("text", textInstanceEntries, "instance");

        await this.milvusProvider.insert("video", videoMetaEntries, "meta");
        await this.milvusProvider.insert("video", videoContentEntries, "content");
        await this.milvusProvider.insert("video", videoDataEntries, "data");
        await this.milvusProvider.insert("video", videoInstanceEntries, "instance");

        await this.milvusProvider.flush({
          collection_names: [
            "audio",
            "image",
            "text",
            "video"
          ],
          db_name: "iscc"
        });
      } catch (err) {
        console.error(err);
      }
      insertCountPerCollection = insertCountPerCollection + flushCounts;
      console.log(insertCountPerCollection + " insertions flushed");
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

  public async test(testRequestDto: TestRequestDto): Promise<SearchResults> {

    await this.milvusProvider.useDatabase("iscc");

    const searchVector: BinaryVector = await this.unitToBinaryVector(testRequestDto.unit);

    const searchParam: SearchParam = {
      anns_field: "vector",
      topk: 50,
      metric_type: MetricType.HAMMING,
      params: JSON.stringify({ nprobe: 128 })
    };
    const searchReq: SearchReq = {
      anns_field: "vector",
      collection_name: testRequestDto.mode,
      partition_names: ["content"],
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

  public async info(): Promise<any[]> {

    const modes: string[] = [Modes.audio, Modes.image, Modes.text, Modes.video];

    const responses: any[] = [];

    try {
      responses.push(await this.milvusProvider.getVersion());
      responses.push(await this.milvusProvider.listCollections());

      for (let i = 0; i < modes.length; i++) {
        responses.push(await this.milvusProvider.describeColleciton({ collection_name: modes[i], db_name: "iscc" }));
        responses.push(await this.milvusProvider.listPartitionsInCollection({ collection_name: modes[i], db_name: "iscc" }));
        responses.push(await this.milvusProvider.getLoadState({ collection_name: modes[i], db_name: "iscc" }));
      }
    } catch (err) {
      console.log(err);
    }
    return responses;
  }
}

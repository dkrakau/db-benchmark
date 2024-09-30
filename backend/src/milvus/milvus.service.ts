import { Injectable } from '@nestjs/common';
import { BinaryVector, CreateIndexSimpleReq, DataType, FieldType, KeyValuePair, MetricType, ResStatus } from '@zilliz/milvus2-sdk-node';
import { Modes } from 'src/model/ISCCGenerator.model';
import { getFillDuration } from "src/model/time.model";
import { Data, DataProvider } from "src/provider/data.provider";
import { MilvusProvider, MilvusResponse } from '../provider/milvus.provider';
import { MilvusMessage } from './entities/message.milvus.entity';

@Injectable()
export class MilvusService {

  constructor(
    private readonly milvusProvider: MilvusProvider,
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

    await this.dataProvider.load("./src/files/data-original.csv");
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

  private async unitToBinaryVector(unit: string): Promise<BinaryVector> {
    let bytes: number[] = [];
    for (let i = 0; i < 64; i = i + 8) {
      bytes.push(parseInt(unit.substring(i, i + 8), 2));
    }
    return bytes;
  }

  public async listImportJobs() {
    let post = {
      method: "POST",
      body: JSON.stringify({
        dbName: "iscc",
        collectionName: "image",
        partitionName: "content"
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    };
    let response = await fetch("http://localhost:19530/v2/vectordb/jobs/import/list", post).then(response => response.json());
    return response.data.records;
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

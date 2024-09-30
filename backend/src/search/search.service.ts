import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { BinaryVector, ConsistencyLevelEnum, DataType, MetricType, SearchParam, SearchReq, SearchResults } from "@zilliz/milvus2-sdk-node";
import { ISCCGenerator, Modes } from "src/model/ISCCGenerator.model";
import { getFillDuration } from "src/model/time.model";
import { Asset } from "src/postgres/entities/asset.entity";
import { PostgresMessage } from "src/postgres/entities/postgres.message.entity";
import { Audio, Image, Text, Video } from "src/postgres/entities/unit.entity";
import { DataProvider } from "src/provider/data.provider";
import { MilvusProvider } from "src/provider/milvus.provider";
import { Repository } from "typeorm";
import { TestRequestDto } from "./dto/test.request.dto";
import { TestResponseDto } from "./dto/test.response.dto";

@Injectable()
export class SearchService {

  constructor(
    private readonly milvusProvider: MilvusProvider,
    private readonly isccGenerator: ISCCGenerator,
    private readonly dataProvider: DataProvider,
    @InjectRepository(Asset) private readonly assetRepository: Repository<Asset>,
    @InjectRepository(Audio) private readonly audioRepository: Repository<Audio>,
    @InjectRepository(Image) private readonly imageRepository: Repository<Image>,
    @InjectRepository(Text) private readonly textRepository: Repository<Text>,
    @InjectRepository(Video) private readonly videoRepository: Repository<Video>,
  ) { }

  private async unitToBinaryVector(unit: string): Promise<BinaryVector> {
    let bytes: number[] = [];
    for (let i = 0; i < 64; i = i + 8) {
      bytes.push(parseInt(unit.substring(i, i + 8), 2));
    }
    return bytes;
  }

  public async milvusTest(testRequestDto: TestRequestDto): Promise<TestResponseDto> {

    const startTime = new Date().getTime();

    await this.milvusProvider.useDatabase("iscc");

    const searchVector: BinaryVector = await this.unitToBinaryVector(testRequestDto.unit);

    const searchParam: SearchParam = {
      anns_field: "vector",
      topk: 100,
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

    const endTime = new Date().getTime();
    const time = endTime - startTime;

    const testResult: TestResponseDto = { milliseconds: time, results: [] };

    response.results.forEach(result => (
      testResult.results.push({
        score: result.score,
        //unit: this.milvusProvider.binaryVectorToUnit(result.vector),
        asset_id: result.asset_id,
        //source: "-"
      })
    ));

    return testResult;
  }

  async postgresTest(testRequestDto: TestRequestDto): Promise<TestResponseDto> {

    const startTime = new Date().getTime();

    let result = [];

    let topK = 100;
    let hammingDistance = 64;
    let select: string = "query_" + testRequestDto.mode + ".id, meta, content, data, instance, asset.source, bit_count(content # B'" + testRequestDto.unit + "') as score";
    //let where: string = "bit_count(content # B'" + testRequestDto.unit + "') < " + hammingDistance;
    let orderBy: string = "score";

    if (testRequestDto.mode === Modes.audio) {
      result = await this.audioRepository
        .createQueryBuilder("query_audio")
        .leftJoinAndSelect("query_audio.asset", "asset")
        .select(select)
        //.where(where)
        .orderBy(orderBy)
        .limit(topK)
        .getRawMany();
    }
    if (testRequestDto.mode === Modes.image) {
      result = await this.imageRepository
        .createQueryBuilder("query_image")
        .leftJoinAndSelect("query_image.asset", "asset")
        .select(select)
        //.where(where)
        .orderBy(orderBy)
        .limit(topK)
        .getRawMany();
    }
    if (testRequestDto.mode === Modes.text) {
      result = await this.textRepository
        .createQueryBuilder("query_text")
        .leftJoinAndSelect("query_text.asset", "asset")
        .select(select)
        //.where(where)
        .orderBy(orderBy)
        .limit(topK)
        .getRawMany();
    }
    if (testRequestDto.mode === Modes.video) {
      result = await this.videoRepository
        .createQueryBuilder("query_video")
        .leftJoinAndSelect("query_video.asset", "asset")
        .select(select)
        //.where(where)
        .orderBy(orderBy)
        .limit(topK)
        .getRawMany();
    }

    const endTime = new Date().getTime();
    const time = endTime - startTime;

    const testResult: TestResponseDto = { milliseconds: time, results: [] };

    result.forEach(unit => (
      testResult.results.push({
        score: parseInt(unit.score),
        //unit: unit.content,
        asset_id: unit.id,
        //source: unit.source
      })
    ));

    const postgresMessage: PostgresMessage = { fill_duration: getFillDuration(startTime, endTime) }

    return testResult;
  }
}

import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ISCCGenerator, Modes } from "src/model/ISCCGenerator.model";
import { getFillDuration } from "src/model/time.model";
import { Data, DataProvider } from "src/provider/data.provider";
import { Repository } from "typeorm";
import { Asset } from "./entities/asset.entity";
import { PostgresMessage } from "./entities/postgres.message.entity";
import { Audio, Image, Text, Unit, Video } from "./entities/unit.entity";
import { TestRequestDto } from "./request-dto/test.request.dto";
import { InfoResponseDto } from "./response-dto/info.response.dto";

@Injectable()
export class PostgresService {

  constructor(
    private readonly isccGenerator: ISCCGenerator,
    private readonly dataProvider: DataProvider,
    @InjectRepository(Asset) private readonly assetRepository: Repository<Asset>,
    @InjectRepository(Audio) private readonly audioRepository: Repository<Audio>,
    @InjectRepository(Image) private readonly imageRepository: Repository<Image>,
    @InjectRepository(Text) private readonly textRepository: Repository<Text>,
    @InjectRepository(Video) private readonly videoRepository: Repository<Video>,
  ) { }

  async fillSamples(): Promise<PostgresMessage> {

    const startTime = new Date().getTime();

    await this.dataProvider.load("./src/files/data-original.csv");
    const data: Data[] = this.dataProvider.get();

    data.forEach(async (data) => {
      const asset: Asset = {
        id: "" + data.id,
        iscc: data.iscc,
        source: data.source
      }
      await this.assetRepository.insert(asset);

      const content: Image = {
        id: "" + (new Date().getTime()),
        meta: data.meta,
        content: data.content,
        data: data.data,
        instance: data.instance,
        asset: asset
      }
      await this.imageRepository.insert(content);
    });

    const endTime = new Date().getTime();
    const postgresMessage: PostgresMessage = { fill_duration: getFillDuration(startTime, endTime) }
    return postgresMessage;
  }

  async fillRandom(): Promise<PostgresMessage> {

    const startTime = new Date().getTime();

    for (let i = 0; i < 1000000000; i++) {
      const assetId: string = "" + new Date().getTime();
      const asset: Asset = {
        id: assetId,
        iscc: this.isccGenerator.generateISCC(),
        source: ""
      }
      await this.assetRepository.insert(asset);

      const image: Image = {
        id: "" + (new Date().getTime()),
        meta: this.isccGenerator.generateUNIT(),
        content: this.isccGenerator.generateUNIT(),
        data: this.isccGenerator.generateUNIT(),
        instance: this.isccGenerator.generateUNIT(),
        asset: asset
      }
      await this.imageRepository.insert(image);
    }

    const endTime = new Date().getTime();
    const postgresMessage: PostgresMessage = { fill_duration: getFillDuration(startTime, endTime) }
    return postgresMessage;
  }

  async test(testRequestDto: TestRequestDto): Promise<Unit[]> {

    /* SELECT
    unit,
      asset_id,
      bit_count(unit # B'0000001110110111100011110100011001000100000010010111000110000110') as hd
    FROM
    image_unit
    WHERE
    bit_count(unit # B'0000001110110111100011110100011001000100000010010111000110000110') < 16
    ORDER BY hd; */

    let result: Unit[] = [];

    let topK = 100;
    let hammingDistance = 16;
    let select: string = "query_" + testRequestDto.mode + ".id, meta, content, data, instance, asset.source, bit_count(content # B'" + testRequestDto.unit + "') as hd";
    let where: string = "bit_count(content # B'" + testRequestDto.unit + "') < " + hammingDistance;
    let orderBy: string = "hd";

    const startTime = new Date().getTime();

    if (testRequestDto.mode === Modes.audio) {
      result = await this.audioRepository
        .createQueryBuilder("query_audio")
        .leftJoinAndSelect("query_audio.asset", "asset")
        .select(select)
        .where(where)
        .orderBy(orderBy)
        .limit(topK)
        .getRawMany();
    }
    if (testRequestDto.mode === Modes.image) {
      result = await this.imageRepository
        .createQueryBuilder("query_image")
        .leftJoinAndSelect("query_image.asset", "asset")
        .select(select)
        .where(where)
        .orderBy(orderBy)
        .limit(topK)
        .getRawMany();
    }
    if (testRequestDto.mode === Modes.text) {
      result = await this.textRepository
        .createQueryBuilder("query_text")
        .leftJoinAndSelect("query_text.asset", "asset")
        .select(select)
        .where(where)
        .orderBy(orderBy)
        .limit(topK)
        .getRawMany();
    }
    if (testRequestDto.mode === Modes.video) {
      result = await this.videoRepository
        .createQueryBuilder("query_video")
        .leftJoinAndSelect("query_video.asset", "asset")
        .select(select)
        .where(where)
        .orderBy(orderBy)
        .limit(topK)
        .getRawMany();
    }

    const endTime = new Date().getTime();
    const postgresMessage: PostgresMessage = { fill_duration: getFillDuration(startTime, endTime) }

    console.log(postgresMessage);

    return result;
  }

  async info(): Promise<InfoResponseDto> {

    const infoResponseDto: InfoResponseDto = {
      asset_count: await this.assetRepository.count(),
      audio_count: await this.audioRepository.count(),
      image_count: await this.imageRepository.count(),
      text_count: await this.textRepository.count(),
      video_count: await this.videoRepository.count()
    }

    return infoResponseDto;
  }
}

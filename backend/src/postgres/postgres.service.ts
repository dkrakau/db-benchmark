import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ISCCGenerator, Modes } from "src/model/ISCCGenerator.model";
import { getFillDuration } from "src/model/time.model";
import { Data, DataProvider } from "src/provider/data.provider";
import { Repository } from "typeorm";
import { Asset } from "./entities/asset.entity";
import { PostgresMessage } from "./entities/postgres.message.entity";
import { AudioUnit, ImageUnit, TextUnit, Unit, VideoUnit } from "./entities/unit.entity";
import { TestRequestDto } from "./request-dto/test.request.dto";
import { InfoResponseDto } from "./response-dto/info.response.dto";

@Injectable()
export class PostgresService {

  constructor(
    private readonly isccGenerator: ISCCGenerator,
    private readonly dataProvider: DataProvider,
    @InjectRepository(Asset) private readonly assetRepository: Repository<Asset>,
    @InjectRepository(AudioUnit) private readonly audioUnitRepository: Repository<AudioUnit>,
    @InjectRepository(ImageUnit) private readonly imageUnitRepository: Repository<ImageUnit>,
    @InjectRepository(TextUnit) private readonly textUnitRepository: Repository<TextUnit>,
    @InjectRepository(VideoUnit) private readonly videoUnitRepository: Repository<VideoUnit>,
  ) { }

  async fillSamples(): Promise<PostgresMessage> {

    const startTime = new Date().getTime();

    await this.dataProvider.load("./src/data/data-original.csv");
    const data: Data[] = this.dataProvider.get();

    data.forEach(async (data) => {
      const asset: Asset = {
        id: "" + data.id,
        iscc: data.iscc,
        source: data.source
      }
      await this.assetRepository.insert(asset);

      const contentUnit: ImageUnit = {
        id: "" + (new Date().getTime()),
        meta: data.meta,
        content: data.content,
        data: data.data,
        instance: data.instance,
        asset: asset
      }
      await this.imageUnitRepository.insert(contentUnit);
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

      const imageUnit: ImageUnit = {
        id: "" + (new Date().getTime()),
        meta: this.isccGenerator.generateUNIT(),
        content: this.isccGenerator.generateUNIT(),
        data: this.isccGenerator.generateUNIT(),
        instance: this.isccGenerator.generateUNIT(),
        asset: asset
      }
      await this.imageUnitRepository.insert(imageUnit);
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
    bit_count(unit # B'0000001110110111100011110100011001000100000010010111000110000110') > 16
    ORDER BY hd; */

    let result: Unit[] = [];

    let topK = 10;
    let hammingDistance = 16;
    let select: string = "query_" + testRequestDto.mode + "_unit.id, meta, content, data, instance, asset.source, bit_count(content # B'" + testRequestDto.unit + "') as hd";
    let where: string = "bit_count(content # B'" + testRequestDto.unit + "') < " + hammingDistance;
    let orderBy: string = "hd";

    if (testRequestDto.mode === Modes.audio) {
      result = await this.audioUnitRepository
        .createQueryBuilder("query_audio_unit")
        .leftJoinAndSelect("query_audio_unit.asset", "asset")
        .select(select)
        .where(where)
        .orderBy(orderBy)
        .limit(topK)
        .getRawMany();
    }
    if (testRequestDto.mode === Modes.image) {
      result = await this.imageUnitRepository
        .createQueryBuilder("query_image_unit")
        .leftJoinAndSelect("query_image_unit.asset", "asset")
        .select(select)
        .where(where)
        .orderBy(orderBy)
        .limit(topK)
        .getRawMany();
    }
    if (testRequestDto.mode === Modes.text) {
      result = await this.textUnitRepository
        .createQueryBuilder("query_text_unit")
        .leftJoinAndSelect("query_text_unit.asset", "asset")
        .select(select)
        .where(where)
        .orderBy(orderBy)
        .limit(topK)
        .getRawMany();
    }
    if (testRequestDto.mode === Modes.video) {
      result = await this.videoUnitRepository
        .createQueryBuilder("query_video_unit")
        .leftJoinAndSelect("query_video_unit.asset", "asset")
        .select(select)
        .where(where)
        .orderBy(orderBy)
        .limit(topK)
        .getRawMany();
    }
    return result;
  }

  async info(): Promise<InfoResponseDto> {

    const infoResponseDto: InfoResponseDto = {
      asset_count: await this.assetRepository.count(),
      audio_unit_count: await this.audioUnitRepository.count(),
      image_unit_count: await this.imageUnitRepository.count(),
      text_unit_count: await this.textUnitRepository.count(),
      video_unit_count: await this.videoUnitRepository.count()
    }

    return infoResponseDto;
  }
}

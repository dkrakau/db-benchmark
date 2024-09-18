import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ISCCGenerator, Modes } from "src/model/ISCCGenerator.model";
import { Data, DataProvider } from "src/provider/data.provider";
import { Repository } from "typeorm";
import { Asset } from "./entities/asset.entity";
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

  async fill() {

    await this.dataProvider.load("./src/data/data-original.csv");
    const data: Data[] = this.dataProvider.get();

    data.forEach(async (data) => {
      const asset: Asset = {
        id: "" + data.id,
        iscc: data.iscc,
        source: data.source
      }
      await this.assetRepository.save(asset);

      const contentUnit: ImageUnit = {
        id: "" + (new Date().getTime()),
        meta: data.meta,
        content: data.content,
        data: data.data,
        instance: data.instance,
        asset_id: "" + data.id
      }
      await this.imageUnitRepository.save(contentUnit);
    });
  }

  async fill2() {
    const assetId: string = "" + new Date().getTime();
    const asset: Asset = {
      id: assetId,
      iscc: this.isccGenerator.generateISCC(),
      source: ""
    }
    await this.assetRepository.save(asset);

    const audioUnit: AudioUnit = {
      id: "" + (new Date().getTime()),
      meta: this.isccGenerator.generateUNIT(),
      content: this.isccGenerator.generateUNIT(),
      data: this.isccGenerator.generateUNIT(),
      instance: this.isccGenerator.generateUNIT(),
      asset_id: assetId
    }
    await this.audioUnitRepository.save(audioUnit);

    const imageUnit: ImageUnit = {
      id: "" + (new Date().getTime()),
      meta: this.isccGenerator.generateUNIT(),
      content: this.isccGenerator.generateUNIT(),
      data: this.isccGenerator.generateUNIT(),
      instance: this.isccGenerator.generateUNIT(),
      asset_id: assetId
    }
    await this.imageUnitRepository.save(imageUnit);

    const textUnit: TextUnit = {
      id: "" + (new Date().getTime()),
      meta: this.isccGenerator.generateUNIT(),
      content: this.isccGenerator.generateUNIT(),
      data: this.isccGenerator.generateUNIT(),
      instance: this.isccGenerator.generateUNIT(),
      asset_id: assetId
    }
    await this.textUnitRepository.save(textUnit);

    const videoUnit: VideoUnit = {
      id: "" + (new Date().getTime()),
      meta: this.isccGenerator.generateUNIT(),
      content: this.isccGenerator.generateUNIT(),
      data: this.isccGenerator.generateUNIT(),
      instance: this.isccGenerator.generateUNIT(),
      asset_id: assetId
    }
    await this.videoUnitRepository.save(videoUnit);
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

    let hammingDistance = 16;
    let select: string = "id, meta, content, data, instance, asset_id, source, bit_count(content # B'" + testRequestDto.unit + "') as hd";
    let where: string = "bit_count(content # B'" + testRequestDto.unit + "') < " + hammingDistance;
    let orderBy: string = "hd";

    if (testRequestDto.mode === Modes.audio) {
      result = await this.audioUnitRepository
        .createQueryBuilder("query_audio_unit")
        .select(select)
        .where(where)
        .orderBy(orderBy)
        .execute();
    }
    if (testRequestDto.mode === Modes.image) {
      result = await this.imageUnitRepository
        .createQueryBuilder("query_image_unit")
        .select(select)
        .where(where)
        .orderBy(orderBy)
        .execute();
    }
    if (testRequestDto.mode === Modes.text) {
      result = await this.textUnitRepository
        .createQueryBuilder("query_text_unit")
        .select(select)
        .where(where)
        .orderBy(orderBy)
        .execute();
    }
    if (testRequestDto.mode === Modes.video) {
      result = await this.videoUnitRepository
        .createQueryBuilder("query_video_unit")
        .select(select)
        .where(where)
        .orderBy(orderBy)
        .execute();
    }

    return result;
  }

  async info(): Promise<InfoResponseDto> {

    const infoResponseDto: InfoResponseDto = {
      asset_count: await this.assetRepository.count(),
      audio_unit_count: await this.assetRepository.count(),
      image_unit_count: await this.imageUnitRepository.count(),
      text_unit_count: await this.textUnitRepository.count(),
      video_unit_count: await this.videoUnitRepository.count()
    }

    return infoResponseDto;
  }
}

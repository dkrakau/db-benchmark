import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ISCCGenerator } from "src/model/ISCCGenerator.model";
import { Repository } from "typeorm";
import { Asset } from "./entities/asset.entity";
import { AudioUnit, ImageUnit, TextUnit, Unit, VideoUnit } from "./entities/unit.entity";
import { Modes } from "./postgres.controller";
import { TestRequestDto } from "./request-dto/test.request.dto";
import { InfoResponseDto } from "./response-dto/info.response.dto";

@Injectable()
export class PostgresService {

  constructor(
    private readonly isccGenerator: ISCCGenerator,
    @InjectRepository(Asset) private readonly assetRepository: Repository<Asset>,
    @InjectRepository(AudioUnit) private readonly audioUnitRepository: Repository<AudioUnit>,
    @InjectRepository(ImageUnit) private readonly imageUnitRepository: Repository<ImageUnit>,
    @InjectRepository(TextUnit) private readonly textUnitRepository: Repository<TextUnit>,
    @InjectRepository(VideoUnit) private readonly videoUnitRepository: Repository<VideoUnit>,
  ) { }

  async fill() {

    const assetId: string = "" + new Date().getTime();
    const asset: Asset = {
      id: assetId,
      iscc: this.isccGenerator.generateISCC(),
      source: ""
    }
    await this.assetRepository.save(asset);

    const audioUnit: AudioUnit = {
      id: "" + (new Date().getTime()),
      unit: this.isccGenerator.generateUNIT(),
      asset_id: assetId,
    }
    await this.audioUnitRepository.save(audioUnit);

    const imageUnit: ImageUnit = {
      id: "" + (new Date().getTime()),
      unit: this.isccGenerator.generateUNIT(),
      asset_id: assetId,
    }
    await this.imageUnitRepository.save(imageUnit);

    const textUnit: TextUnit = {
      id: "" + (new Date().getTime()),
      unit: this.isccGenerator.generateUNIT(),
      asset_id: assetId,
    }
    await this.textUnitRepository.save(textUnit);

    const videoUnit: VideoUnit = {
      id: "" + (new Date().getTime()),
      unit: this.isccGenerator.generateUNIT(),
      asset_id: assetId,
    }
    await this.videoUnitRepository.save(videoUnit);

    return "";
  }

  async test(testRequestDto: TestRequestDto): Promise<Unit[]> {
    /* let unitBin = this.isccGenerator.generateUNIT();
    let unitDec1 = this.isccGenerator.getBigInt("0000000100000001000000010000000100000001000000010000000100000001");
    let unitDec2 = this.isccGenerator.getBigInt("1111111111111111111111111111111111111111111111111111111111111111");
    console.log(this.isccGenerator.getBitString(BigInt(-7160747828494289348)));
    console.log(this.isccGenerator.getBitString(BigInt(-6250644909106607842))); */

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

    let hammingDistance = 32;
    let select: string = "unit, asset_id, bit_count(unit # B'" + testRequestDto.unit + "') as hd";
    let where: string = "bit_count(unit # B'" + testRequestDto.unit + "') < " + hammingDistance;
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
      audio_unit_count: await this.audioUnitRepository.count(),
      image_unit_count: await this.imageUnitRepository.count(),
      text_unit_count: await this.textUnitRepository.count(),
      video_unit_count: await this.videoUnitRepository.count()
    }

    return infoResponseDto;
  }
}

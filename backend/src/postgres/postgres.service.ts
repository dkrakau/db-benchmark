import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Asset } from "./entities/asset.entity";
import { AudioUnit, ImageUnit, TextUnit, VideoUnit } from "./entities/unit.entity";
import { TestRequestDto } from "./request-dto/test.request.dto";
import { InfoResponseDto } from "./response-dto/info.response.dto";


@Injectable()
export class PostgresService {

  constructor(
    @InjectRepository(Asset) private readonly assetRepository: Repository<Asset>,
    @InjectRepository(AudioUnit) private readonly audioUnitRepository: Repository<AudioUnit>,
    @InjectRepository(ImageUnit) private readonly imageUnitRepository: Repository<ImageUnit>,
    @InjectRepository(TextUnit) private readonly textUnitRepository: Repository<TextUnit>,
    @InjectRepository(VideoUnit) private readonly videoUnitRepository: Repository<VideoUnit>
  ) { }

  fill() {
    return "";
  }

  test(testRequestDto: TestRequestDto): TestRequestDto {
    return testRequestDto;
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

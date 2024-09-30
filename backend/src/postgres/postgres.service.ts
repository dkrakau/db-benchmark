import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { getFillDuration } from "src/model/time.model";
import { Data, DataProvider } from "src/provider/data.provider";
import { Repository } from "typeorm";
import { Asset } from "./entities/asset.entity";
import { PostgresMessage } from "./entities/postgres.message.entity";
import { Audio, Image, Text, Video } from "./entities/unit.entity";
import { InfoResponseDto } from "./response-dto/info.response.dto";

@Injectable()
export class PostgresService {

  constructor(
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

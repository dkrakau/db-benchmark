import { Injectable } from '@nestjs/common';
import { SearchPostgresDto } from './dto/search.postgres.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asset } from './entities/asset.entity';
import { AudioUnit, ImageUnit, TextUnit, VideoUnit } from './entities/unit.entity';

@Injectable()
export class PostgresService {

  constructor(
    @InjectRepository(Asset) private readonly assetRepository: Repository<Asset>,
    @InjectRepository(AudioUnit) private readonly audioUnitRepository: Repository<AudioUnit>,
    @InjectRepository(ImageUnit) private readonly imageUnitRepository: Repository<ImageUnit>,
    @InjectRepository(TextUnit) private readonly textUnitRepository: Repository<TextUnit>,
    @InjectRepository(VideoUnit) private readonly videoUnitRepository: Repository<VideoUnit>
  ) { }
  create() {
    return "";
  }

  drop() {
    return "";
  }

  fill() {
    return "";
  }

  test(searchPostgreDto: SearchPostgresDto): SearchPostgresDto {
    return searchPostgreDto;
  }

  info() {
    return "";
  }
}

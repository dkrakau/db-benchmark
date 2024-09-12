import { Module } from '@nestjs/common';
import { PostgresService } from './postgres.service';
import { PostgresController } from './postgres.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AudioUnit, ImageUnit, TextUnit, VideoUnit } from './entities/unit.entity';
import { Asset } from './entities/asset.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Asset,
      AudioUnit,
      ImageUnit,
      TextUnit,
      VideoUnit
    ])
  ],
  controllers: [PostgresController],
  providers: [PostgresService],
})
export class PostgresModule { }

import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CsvParser } from "nest-csv-parser";
import { ISCCGenerator } from "src/model/ISCCGenerator.model";
import { DataProvider } from "src/provider/data.provider";
import { Asset } from "./entities/asset.entity";
import { AudioUnit, ImageUnit, TextUnit, VideoUnit } from "./entities/unit.entity";
import { PostgresController } from "./postgres.controller";
import { PostgresService } from "./postgres.service";

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
  providers: [PostgresService, ISCCGenerator, CsvParser, DataProvider],
})
export class PostgresModule { }

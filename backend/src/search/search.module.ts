import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CsvParser } from "nest-csv-parser";
import { ISCCGenerator } from "src/model/ISCCGenerator.model";
import { Asset } from "src/postgres/entities/asset.entity";
import { Audio, Image, Text, Video } from "src/postgres/entities/unit.entity";
import { DataProvider } from "src/provider/data.provider";
import { MilvusProvider } from "src/provider/milvus.provider";
import { SearchController } from "./search.controller";
import { SearchService } from "./search.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Asset,
      Audio,
      Image,
      Text,
      Video
    ])],
  controllers: [SearchController],
  providers: [SearchService, MilvusProvider, ISCCGenerator, CsvParser, DataProvider],
})
export class SearchModule { }

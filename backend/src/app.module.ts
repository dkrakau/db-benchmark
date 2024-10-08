import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MilvusModule } from "./milvus/milvus.module";
import { Asset } from "./postgres/entities/asset.entity";
import { Audio, Image, Text, Video } from "./postgres/entities/unit.entity";
import { PostgresModule } from "./postgres/postgres.module";

@Module({
  imports:
    [
      ConfigModule.forRoot({ isGlobal: true }),
      TypeOrmModule.forRoot({
        type: "postgres",
        host: process.env.POSTGRES_HOST,
        port: parseInt(<string>process.env.POSTGRES_PORT),
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        entities: [Asset, Audio, Image, Text, Video],
        database: process.env.POSTGRES_DATABASE,
        synchronize: true,
        logging: true
      }),
      MilvusModule,
      PostgresModule
    ]
})
export class AppModule { }

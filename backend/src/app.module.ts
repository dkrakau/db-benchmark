import { Module } from '@nestjs/common';
import { MilvusModule } from './milvus/milvus.module';
import { PostgresModule } from './postgres/postgres.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Asset } from './postgres/entities/asset.entity';
import { AudioUnit, ImageUnit, TextUnit, VideoUnit } from './postgres/entities/unit.entity';

@Module({
  imports:
    [
      ConfigModule.forRoot({ isGlobal: true }),
      TypeOrmModule.forRoot({
        type: 'postgres',
        host: process.env.POSTGRES_HOST,
        port: parseInt(<string>process.env.POSTGRES_PORT),
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        entities: [Asset, AudioUnit, ImageUnit, TextUnit, VideoUnit],
        database: process.env.POSTGRES_DATABASE,
        synchronize: true,
        logging: true
      }),
      MilvusModule,
      PostgresModule
    ]
})
export class AppModule { }

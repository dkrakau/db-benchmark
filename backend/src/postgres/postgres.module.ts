import { Module } from '@nestjs/common';
import { PostgresService } from './postgres.service';
import { PostgresController } from './postgres.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AudioUnitEntity, ImageUnitEntity, TextUnitEntity, VideoUnitEntity } from './entities/unit.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([
      AudioUnitEntity,
      ImageUnitEntity,
      TextUnitEntity,
      VideoUnitEntity
    ])
  ],
  controllers: [PostgresController],
  providers: [PostgresService],
})
export class PostgresModule { }

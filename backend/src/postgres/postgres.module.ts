import { Module } from '@nestjs/common';
import { PostgresService } from './postgres.service';
import { PostgresController } from './postgres.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [PostgresController],
  providers: [PostgresService],
})
export class PostgresModule {}

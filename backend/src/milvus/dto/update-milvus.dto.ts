import { PartialType } from '@nestjs/mapped-types';
import { CreateMilvusDto } from './info-milvus.dto';

export class UpdateMilvusDto extends PartialType(CreateMilvusDto) {}

import { PartialType } from '@nestjs/mapped-types';
import { CreateMilvusDto } from './create-milvus.dto';

export class UpdateMilvusDto extends PartialType(CreateMilvusDto) {}

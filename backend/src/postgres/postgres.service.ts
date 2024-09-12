import { Injectable } from '@nestjs/common';
import { SearchPostgreDto } from './dto/search.postgres.dto';


@Injectable()
export class PostgresService {
  create(createPostgreDto: SearchPostgreDto) {
    return 'This action adds a new postgre';
  }

  findAll() {
    return `This action returns all postgres`;
  }

  findOne(id: number) {
    return `This action returns a #${id} postgre`;
  }

  update(id: number, updatePostgreDto: SearchPostgreDto) {
    return `This action updates a #${id} postgre`;
  }

  remove(id: number) {
    return `This action removes a #${id} postgre`;
  }
}

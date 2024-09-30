import { Injectable } from "@nestjs/common";
import { TestDataProvider } from "src/provider/testdata.provider";
import { DataListDto } from "./dto/data-list.dto";
import { DataLoadDto } from "./dto/data-load.dto";
import { DataSaveDto } from "./dto/data-save.dto";

@Injectable()
export class DataService {

  path: string = "src/files/tests/";

  constructor(
    private readonly testDataProvider: TestDataProvider
  ) { }

  list(dataListDto: DataListDto): string[] {
    console.log(dataListDto.db);
    return this.testDataProvider.listFiles(this.path + dataListDto.db);;
  }

  async load(dataLoadDto: DataLoadDto): Promise<string | Buffer> {
    return await this.testDataProvider.readFileData(this.path + dataLoadDto.db + "/" + dataLoadDto.file);
  }

  save(dataSaveDto: DataSaveDto): void {
    const date = new Date();
    let filename = date.getFullYear() + "-"
      + date.getMonth() + "-"
      + date.getDay() + "_"
      + date.getHours() + "-"
      + date.getMinutes() + "-"
      + date.getSeconds() + "_"
      + dataSaveDto.db + ".json";
    this.testDataProvider.createFile(this.path + dataSaveDto.db, filename, dataSaveDto.data);
  }
}

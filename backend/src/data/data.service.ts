import { Injectable } from "@nestjs/common";
import { TestDataProvider } from "src/provider/testdata.provider";
import { TestResponseDto } from "src/search/dto/test.response.dto";
import { DataListDto } from "./dto/data-list.dto";
import { DataLoadDto } from "./dto/data-load.dto";
import { DataSaveDto } from "./dto/data-save.dto";

@Injectable()
export class DataService {

  rootPath: string = "src/files/tests";

  constructor(
    private readonly testDataProvider: TestDataProvider
  ) { }

  list(dataListDto: DataListDto): string[] {
    return this.testDataProvider.listFiles(this.rootPath + "/" + dataListDto.db);;
  }

  async load(dataLoadDto: DataLoadDto): Promise<TestResponseDto> {
    let dataString: string = (await this.testDataProvider.readFileData(this.rootPath + "/" + dataLoadDto.db + "/" + dataLoadDto.path)).toString();
    let testdata: TestResponseDto = JSON.parse(dataString);
    return testdata;
  }

  save(dataSaveDto: DataSaveDto): void {
    this.testDataProvider.createFile(this.rootPath + "/" + dataSaveDto.db + "/" + dataSaveDto.foldername, dataSaveDto.filename, JSON.stringify(dataSaveDto.testdata));
  }
}

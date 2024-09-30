import { Module } from "@nestjs/common";
import { TestDataProvider } from "src/provider/testdata.provider";
import { DataController } from "./data.controller";
import { DataService } from "./data.service";

@Module({
  controllers: [DataController],
  providers: [DataService, TestDataProvider],
})
export class DataModule { }

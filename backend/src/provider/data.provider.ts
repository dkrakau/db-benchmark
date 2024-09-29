import { Injectable } from "@nestjs/common";
import * as fs from "fs";
import { CsvParser } from "nest-csv-parser";

export class Data {
    id: number;
    iscc: string;
    meta: string;
    content: string;
    data: string;
    instance: string;
    source: string;
}

@Injectable()
export class DataProvider {

    data: Data[];

    constructor(
        private readonly csvParser: CsvParser
    ) { }

    get(): Data[] {
        return this.data;
    }

    async load(file: string) {
        const stream = fs.createReadStream(file);
        this.data = (await this.csvParser.parse(stream, Data, undefined, undefined, { separator: ';' })).list;
    }
}
import { Injectable } from "@nestjs/common";
import * as fs from "fs";
import { promisify } from "util";

@Injectable()
export class TestDataProvider {

    constructor() { }

    listFiles(directory: string): string[] {
        return fs.readdirSync(directory);
    }

    checkIfFileOrDirectoryExists(path: string): boolean {
        return fs.existsSync(path);
    };

    async createFile(path: string, fileName: string, data: string): Promise<void> {
        if (!this.checkIfFileOrDirectoryExists(path)) {
            fs.mkdirSync(path);
        }
        const writeFile = promisify(fs.writeFile);
        return await writeFile(`${path}/${fileName}`, data, 'utf8');
    };

    async readFileData(path: string): Promise<string | Buffer> {
        const readFile = promisify(fs.readFile);
        return await readFile(path, "utf-8");
    };
}
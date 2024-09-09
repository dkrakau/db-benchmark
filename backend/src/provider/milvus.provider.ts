import { Injectable } from "@nestjs/common";
import { GetVersionResponse, MilvusClient } from "@zilliz/milvus2-sdk-node";

@Injectable()
export class MilvusProvider {
    
    client: MilvusClient;

    constructor() {
        this.client = new MilvusClient("http://localhost:19530");
    }

    async getVersion(): Promise<GetVersionResponse> {
        return await this.client.getVersion();
    }
}
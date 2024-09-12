import { Injectable } from "@nestjs/common";
import {
    BoolResponse, CreateIndexSimpleReq,
    DataType,
    DeleteReq,
    DescribeCollectionResponse,
    FieldType,
    FlushReq,
    FlushResult,
    GetLoadStateResponse,
    GetVersionResponse,
    HybridSearchReq,
    ImportReq,
    ImportResponse,
    InsertReq,
    MilvusClient,
    MutationResult,
    ResStatus,
    RowData,
    SearchParam,
    SearchReq,
    SearchResults,
    SearchSimpleReq,
    ShowCollectionsResponse,
    ShowPartitionsResponse,
    VectorTypes
} from "@zilliz/milvus2-sdk-node";

export interface NNSParams {
    collectionName: string,
    vectors: VectorTypes[],
    vectorType: DataType.BinaryVector | DataType.FloatVector,
    searchParams: SearchParam,
    outputFields: string[],
    partitionNames?: string[]
}

@Injectable()
export class MilvusProvider {

    client: MilvusClient;

    constructor() {
        this.client = new MilvusClient("http://localhost:19530");
    }

    getClient(): MilvusClient {
        return this.client;
    }

    public async nns(request: SearchReq | SearchSimpleReq | HybridSearchReq): Promise<SearchResults> {
        const response: SearchResults = await this.client.search(request);
        return response;
    }

    public async insert(collectionName: string, data: RowData[], partitionName?: string): Promise<MutationResult> {
        const insertRequest: InsertReq = {
            collection_name: collectionName,
            data: data
        }
        if (partitionName !== null || partitionName !== undefined) {
            insertRequest["partition_name"] = partitionName;
        }
        const response: MutationResult = await this.client.insert(insertRequest);
        return response;
    }

    public async bulkInsert(data: ImportReq): Promise<ImportResponse> {
        /* if (partitionName !== null || partitionName !== undefined) {
            insertRequest["partition_name"] = partitionName;
        } */
        const response: ImportResponse = await this.client.bulkInsert(data);
        return response;
    }

    // either insert or update an entity based on whether its primary key already exists
    public async upsert(collectionName: string, data: RowData[], partitionName?: string): Promise<MutationResult> {
        const upsertRequest: InsertReq = {
            collection_name: collectionName,
            data: data
        }
        if (partitionName !== null || partitionName !== undefined) {
            upsertRequest["partition_name"] = partitionName;
        }
        const response: MutationResult = await this.client.upsert(upsertRequest);
        return response;
    }

    public async delete(collectionName: string, filter: string, partitionName?: string): Promise<MutationResult> {
        const deleteRequest: DeleteReq = {
            collection_name: collectionName,
            filter: filter
        }
        if (partitionName !== null || partitionName !== undefined) {
            deleteRequest["partition_name"] = partitionName;
        }
        const response: MutationResult = await this.client.delete(deleteRequest);
        return response;
    }

    public async flush(flushReqs: FlushReq): Promise<FlushResult> {
        const response = await this.client.flush(flushReqs);
        return response;
    }

    public async createCollection(
        collectionName: string,
        description: string,
        dim: number,
        metricType: string,
        consistencyLevel: 'Strong' | 'Session' | 'Bounded' | 'Eventually' | 'Customized',
        indexParams: CreateIndexSimpleReq,
        fields: FieldType[],
        autoId: boolean): Promise<ResStatus> {

        const response: ResStatus = await this.client.createCollection({
            collection_name: collectionName,
            description: description,
            dimension: dim,
            metric_type: metricType,
            consistency_level: consistencyLevel,
            index_params: indexParams,
            fields: fields,
            auto_id: autoId
        });

        return response;
    }

    public async dropCollection(collectionName: string): Promise<ResStatus> {
        const response: ResStatus = await this.client.dropCollection({
            collection_name: collectionName
        });
        return response;
    }

    public async createPartition(collectionName: string, partitionName: string): Promise<ResStatus> {
        const response: ResStatus = await this.client.createPartition({
            collection_name: collectionName,
            partition_name: partitionName
        });
        return response;
    }

    public async dropPartition(collectionName: string, partitionName: string): Promise<ResStatus> {
        const response: ResStatus = await this.client.dropPartition({
            collection_name: collectionName,
            partition_name: partitionName
        });
        return response;
    }

    public async loadCollection(collectionName: string): Promise<ResStatus> {
        const response: ResStatus = await this.client.loadCollection({
            collection_name: collectionName
        });
        return response;
    }

    public async releaseCollection(collectionName: string): Promise<ResStatus> {
        const response: ResStatus = await this.client.releaseCollection({
            collection_name: collectionName
        });
        return response;
    }

    public async hasCollection(collectionName: string): Promise<BoolResponse> {
        const response: BoolResponse = await this.client.hasCollection({
            collection_name: collectionName
        });
        return response;
    }

    public async getLoadState(collectionName: string): Promise<GetLoadStateResponse> {
        const response: GetLoadStateResponse = await this.client.getLoadState({
            collection_name: collectionName
        });
        return response;
    }

    public async loadPartition(collectionName: string, partitionNames: string[]): Promise<ResStatus> {
        const response: ResStatus = await this.client.loadPartitions({
            collection_name: collectionName,
            partition_names: partitionNames
        });
        return response;
    }

    public async releasePartition(collectionName: string, partitionNames: string[]): Promise<ResStatus> {
        const response: ResStatus = await this.client.releasePartitions({
            collection_name: collectionName,
            partition_names: partitionNames
        });
        return response;
    }

    public async hasPartition(collectionName: string, partitionName: string): Promise<BoolResponse> {
        const response: BoolResponse = await this.client.hasPartition({
            collection_name: collectionName,
            partition_name: partitionName
        });
        return response;
    }

    public async listCollections(): Promise<ShowCollectionsResponse> {
        return await this.client.listCollections();
    }

    public async describeColleciton(collectionName: string): Promise<DescribeCollectionResponse> {
        const response: DescribeCollectionResponse = await this.client.describeCollection({
            collection_name: collectionName
        });
        return response;
    }

    public async listPartitionsInCollection(collectionName: string): Promise<ShowPartitionsResponse> {
        const response: ShowPartitionsResponse = await this.client.listPartitions({
            collection_name: collectionName
        })
        return response;
    }

    public async getVersion(): Promise<GetVersionResponse> {
        return await this.client.getVersion();
    }

}
import { Injectable } from "@nestjs/common";
import { CreateIndexParam,
    DescribeCollectionResponse,
    FieldType,
    GetVersionResponse,
    MilvusClient,
    ResStatus,
    SearchParam,
    SearchResults,
    ShowCollectionsResponse,
    ShowPartitionsResponse, 
    VectorTypes} from "@zilliz/milvus2-sdk-node";

@Injectable()
export class MilvusProvider {
    
    client: MilvusClient;

    constructor() {
        this.client = new MilvusClient("http://localhost:19530");
    }

    getClient(): MilvusClient {
        return this.client;
    }

    async nns(
        collectionName: string,
        vectors: VectorTypes[], 
        partitionNames: string[],
        searchParams: SearchParam,
        outputFields: string[],
        limit: number): Promise<SearchResults> {
        
        const response = await this.client.search({
            collection_name: collectionName,
            vectors: vectors,
            partition_names: partitionNames,
            search_params: searchParams,
            output_fields: outputFields,
            limit: limit,
        });

        return response;
    }
    
    async createCollection(
        collectionName: string,
        description: string,
        dim: number,
        metricType: string,
        consistencyLevel: 'Strong' | 'Session' | 'Bounded' | 'Eventually' | 'Customized',
        indexParams: CreateIndexParam,
        fields: FieldType[],
        autoId: boolean): Promise<ResStatus> {

        const response = await this.client.createCollection({
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

    async dropCollection(collectionName: string): Promise<ResStatus> {
        const response = await this.client.dropCollection({
            collection_name: collectionName
        });
        return response;
    }

    async createPartition(collectionName: string, partitionName: string): Promise<ResStatus> {
        const response = await this.client.createPartition({
            collection_name: collectionName,
            partition_name: partitionName
        });
        return response;
    }

    async dropPartition(collectionName: string, partitionName: string): Promise<ResStatus> {
        const response = await this.client.dropPartition({
            collection_name: collectionName,
            partition_name: partitionName
        });
        return response;
    }

    async loadCollection(collectionName: string): Promise<ResStatus> {
        const response = await this.client.loadCollection({
            collection_name: collectionName
        });
        return response;
    }

    async releaseCollection(collectionName: string): Promise<ResStatus> {
        const response = await this.client.releaseCollection({
            collection_name: collectionName
        });
        return response;
    }

    async listCollections(): Promise<ShowCollectionsResponse> {
       return await this.client.listCollections();
    }

    async describeColleciton(collectionName: string): Promise<DescribeCollectionResponse> {
        const response = await this.client.describeCollection({
            collection_name: collectionName
        });
        return response;
    }

    async listPartitionsInCollection(collectionName: string): Promise<ShowPartitionsResponse> {
        const response = await this.client.listPartitions({
            collection_name: collectionName
        })
        return response;
    }

    async getVersion(): Promise<GetVersionResponse> {
        return await this.client.getVersion();
    }
    
}
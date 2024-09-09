import { DescribeCollectionResponse, GetLoadStateResponse, GetVersionResponse, ResStatus, ShowCollectionsResponse, ShowPartitionsResponse } from "@zilliz/milvus2-sdk-node"

export class MilvusMessage {
    version?: GetVersionResponse;
    collections?: ShowCollectionsResponse;
    iscc_collection?: DescribeCollectionResponse;
    iscc_partitions?: ShowPartitionsResponse;
    iscc_load_state?: GetLoadStateResponse;
    response_status?: ResStatus[];
    fill_duration?: string;
}
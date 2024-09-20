import { DescribeCollectionResponse, GetLoadStateResponse, GetVersionResponse, ResStatus, ShowCollectionsResponse, ShowPartitionsResponse } from "@zilliz/milvus2-sdk-node";

export class MilvusMessage {
    version?: GetVersionResponse;
    collections?: ShowCollectionsResponse;
    audio_collection?: DescribeCollectionResponse;
    audio_partitions?: ShowPartitionsResponse;
    audio_load_state?: GetLoadStateResponse;
    image_collection?: DescribeCollectionResponse;
    image_partitions?: ShowPartitionsResponse;
    image_load_state?: GetLoadStateResponse;
    text_collection?: DescribeCollectionResponse;
    text_partitions?: ShowPartitionsResponse;
    text_load_state?: GetLoadStateResponse;
    video_collection?: DescribeCollectionResponse;
    video_partitions?: ShowPartitionsResponse;
    video_load_state?: GetLoadStateResponse;
    response_status?: ResStatus[];
    fill_duration?: string;
}
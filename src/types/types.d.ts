// image upload
interface FileUploadItem {
  file: File;
  status: "pending" | "success" | "error";
  height?: number;
  width?: number;
  aria: string;
}

// queue types
interface QueueMessageBody {
  id:
    | "log"
    | "R2 Delete"
    | "New Image"
    | "Vectorize Upsert"
    | "Vectorize Delete";
  body: string;
}
// upsert to Vectorize data
interface VectorizeUpsertQueueItem {
  id: string;
  value: string;
}

// response from vectorize
interface EmbeddingResponse {
  shape: number[];
  data: number[][];
}

export interface SmBulkSendParams {
  username: string;
  password: string;
  Encoding_PostIn?: Encode;
  objectID?: string;
}

export type Encode = "Big5" | "UTF8";

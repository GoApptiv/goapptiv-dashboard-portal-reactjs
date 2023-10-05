import { HttpConstants } from "../http/http-constants";

export interface HttpGetClient {
  get: (params: HttpGetClient.Params) => Promise<any>;
}

export namespace HttpGetClient {
  export type Params = {
    url: string;
    query?: any;
    headers?: {
      [key: string]: string;
    };
    authHeaders?: boolean;
    responseType?: HttpConstants.RESPONSE_TYPES;
  };
}

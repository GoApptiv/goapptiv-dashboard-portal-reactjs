import { HttpConstants } from "./http-constants";

export interface HttpPostClient {
  post: (params: HttpPostClient.Params) => Promise<any>;
}

export namespace HttpPostClient {
  export type Params = {
    url: string;
    body?: any;
    headers?: {
      [key: string]: string;
    };
    authHeaders?: boolean;
    responseType?: HttpConstants.RESPONSE_TYPES;
  };
}

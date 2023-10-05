import { HttpConstants } from "./http-constants";

export interface HttpPutClient {
    put: (params: HttpPutClient.Params) => Promise<any>;
}

export namespace HttpPutClient {
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

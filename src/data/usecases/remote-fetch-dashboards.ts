import { FetchDashboards } from "../../domain/usages/fetch-dashboards";
import { HttpConstants } from "../protocols/http/http-constants";
import { HttpGetClient } from "../protocols/http/http-get-client";

export class RemoteFetchDashboards implements FetchDashboards {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient
  ) {}

  async fetch(params?: FetchDashboards.Params): Promise<any> {
    const httpResponse = await this.httpGetClient.get({
      url: this.url,
      query: params,
      headers: {
        [HttpConstants.CONTENT_TYPE]: HttpConstants.APPLICATION_JSON,
        [HttpConstants.ACCEPT]: HttpConstants.APPLICATION_JSON,
      },
      authHeaders: true,
    });

    return httpResponse;
  }
}

import { Constants } from "../../../common/Constants";
import { User } from "../../../domain/models/auth/user";
import { ChangePassword } from "../../../domain/usages/auth/change-password";
import { HttpConstants } from "../../protocols/http/http-constants";
import { HttpPostClient } from "../../protocols/http/http-post-client";

export class RemoteChangePassword implements ChangePassword {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient
  ) {}

  async change(params: ChangePassword.Params): Promise<any> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
      body: params,
      headers: {
        [HttpConstants.CONTENT_TYPE]: HttpConstants.APPLICATION_JSON,
        [HttpConstants.ACCEPT]: HttpConstants.APPLICATION_JSON,
      },
      authHeaders: true,
    });

    if (!httpResponse) {
      let response: User = {} as User;
      response.errors = {
        message: Constants.SERVER_ERROR,
      };
      return response;
    } else {
      return httpResponse;
    }
  }
}

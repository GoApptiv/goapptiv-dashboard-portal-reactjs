import Swal from "sweetalert2";
import { Constants } from "../../../common/Constants";
import { User } from "../../../domain/models/auth/user";
import { UserLogin } from "../../../domain/usages/auth/user-login";
import { HttpConstants } from "../../protocols/http/http-constants";
import { HttpPostClient } from "../../protocols/http/http-post-client";
import { error } from "console";

export class RemoteUserLogin implements UserLogin {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient
  ) {}

  async login(params: UserLogin.Params): Promise<any> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
      body: params,
      headers: {
        [HttpConstants.CONTENT_TYPE]: HttpConstants.APPLICATION_JSON,
        [HttpConstants.ACCEPT]: HttpConstants.APPLICATION_JSON,
      },
      authHeaders: false,
    });

    if (!httpResponse) {
     
      Swal.fire(Constants.SERVER_ERROR, "", "error")
     
     
    } else  {
      return httpResponse;
    } 
  }
}

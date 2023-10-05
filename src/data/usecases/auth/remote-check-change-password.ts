import Swal from "sweetalert2";
import { Constants } from "../../../common/Constants";
import { CheckChangePassword } from "../../../domain/usages/auth/check-change-password";
import { HttpConstants } from "../../protocols/http/http-constants";
import { HttpGetClient } from "../../protocols/http/http-get-client";

export class RemoteCheckChangePassword implements CheckChangePassword {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient
  ) {}

  async check(params?: CheckChangePassword.Params): Promise<any> {
    const httpResponse = await this.httpGetClient.get({
      url: this.url,
      query: params,
      headers: {
        [HttpConstants.CONTENT_TYPE]: HttpConstants.APPLICATION_JSON,
        [HttpConstants.ACCEPT]: HttpConstants.APPLICATION_JSON,
      },
      authHeaders: true,
    });
    if(httpResponse){
      return httpResponse;
    } else {
      Swal.fire(Constants.SERVER_ERROR, "", "error")
    }
      
    
  }
}

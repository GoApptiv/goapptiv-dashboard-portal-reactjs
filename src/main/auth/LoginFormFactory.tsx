import React from "react";
import { AUTH_API_URL, AUTH_HEADER, AUTH_TOKEN_KEY } from "../../base";
import { LocalLoggedInUser } from "../../data/usecases/auth/local-logged-in-user";
import Endpoints from "../../domain/endpoints";
import { AxiosHttpClient } from "../../infra/http/axios-http-client";
import { LocalJsonStorage } from "../../infra/http/local-json-storage";
import LoginPage from "../../presentation/pages/auth/LoginPage";
import { RemoteUserLogin } from "../../data/usecases/auth/remote-user-login";
import { RemoteCheckChangePassword } from "../../data/usecases/auth/remote-check-change-password";

type Props = {};

export const OtpLoginFormFactory = (props: Props) => {
  const axiosHttpClient = AxiosHttpClient.getInstance();
  const storage = LocalJsonStorage.getInstance();
  const loggedInUser = new LocalLoggedInUser(storage);

  const remoteUserLogin = new RemoteUserLogin(
    `${AUTH_API_URL}${Endpoints.USER_LOGIN}`,
    axiosHttpClient
  );

  return (
    <LoginPage
      remoteUserLogin={remoteUserLogin}
      loggedInUser={loggedInUser}
      {...props}
    />
  );
};

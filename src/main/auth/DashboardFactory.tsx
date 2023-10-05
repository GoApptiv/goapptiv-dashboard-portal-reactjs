import React from "react";
import { useNavigate } from "react-router-dom";
import { AxiosHttpClient } from "../../infra/http/axios-http-client";
import { LocalJsonStorage } from "../../infra/http/local-json-storage";
import { AUTH_API_URL, AUTH_HEADER, AUTH_TOKEN_KEY } from "../../base";
import { LocalLoggedInUser } from "../../data/usecases/auth/local-logged-in-user";
import DashboardPage from "../../presentation/pages/DashboardPage";
import { RemoteFetchDashboards } from "./../../data/usecases/remote-fetch-dashboards";
import Endpoints from "../../domain/endpoints";
import { RemoteChangePassword } from "../../data/usecases/auth/remote-change-password";
import { RemoteCheckChangePassword } from "../../data/usecases/auth/remote-check-change-password";

const DashboardFactory = () => {
  const navigate = useNavigate();
  const axiosHttpClient = AxiosHttpClient.getInstance();
  const storage = LocalJsonStorage.getInstance();
  const loggedInUser = new LocalLoggedInUser(storage);
  const token = storage.get(AUTH_TOKEN_KEY);

  axiosHttpClient.setAuthHeaders({
    [AUTH_HEADER]: atob(token),
  });

  const remoteFetchDashboards = new RemoteFetchDashboards(
    `${AUTH_API_URL}${Endpoints.FETCH_DASHBOARDS}`,
    axiosHttpClient
  );
  const remoteCheckChangePassword = new RemoteCheckChangePassword(
    `${AUTH_API_URL}${Endpoints.CHECK_CHANGE_PASSWORD}`,
    axiosHttpClient
  );
  const remoteChangePassword = new RemoteChangePassword(
    `${AUTH_API_URL}${Endpoints.CHANGE_PASSWORD}`,
    axiosHttpClient
  );

  if (!loggedInUser) {
    navigate("/auth/login");
  }
  return (
    <div>
      <DashboardPage
        loggedInUser={loggedInUser}
        remoteFetchDashboards={remoteFetchDashboards}
        remoteChangePassword={remoteChangePassword}
        remoteCheckChangePassword={remoteCheckChangePassword}
      />
    </div>
  );
};

export default DashboardFactory;

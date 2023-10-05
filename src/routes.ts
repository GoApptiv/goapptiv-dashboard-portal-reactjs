import React from "react";
import DashboardFactory from "./main/auth/DashboardFactory";
import { OtpLoginFormFactory } from "./main/auth/LoginFormFactory";
export const pageRoutes = {
  login: "/auth/login",
  dashboard: "/dashboard",
};

export interface AppRoute {
  path: string;
  name: string;
  component: React.FC;
  children?: AppRoute[];
}

let indexRoutes: AppRoute[] = [
  {
    path: pageRoutes.login,
    name: "Login Page",
    component: OtpLoginFormFactory,
  } as AppRoute,
  {
    path: pageRoutes.dashboard,
    name: "Dashboard",
    component: DashboardFactory,
  },
 
];

export default indexRoutes;

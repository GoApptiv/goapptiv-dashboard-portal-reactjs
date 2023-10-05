import React, { useState } from "react";
import { Card, Grid, Stack, Typography, useMediaQuery } from "@mui/material";
import ICONS from "../../../assests/images";
import { Constants } from "../../../common/Constants";
import { LoggedInUser } from "../../../domain/usages/auth/logged-in-user";
import LoginForm from "../../components/LoginForm/index";

import { useNavigate } from "react-router-dom";
import { UserLogin } from "../../../domain/usages/auth/user-login";
import { CheckChangePassword } from "../../../domain/usages/auth/check-change-password";

type Props = {
  remoteUserLogin: UserLogin;
  loggedInUser: LoggedInUser;
};

const LoginPage: React.FC<Props> = ({ remoteUserLogin, loggedInUser }) => {
  const mobile = !useMediaQuery(Constants.MOBILE);
  const loggedInUserDetails = loggedInUser.getUser();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (loggedInUserDetails) navigate("/dashboard");
  }, []);

  return (
    <>
      {mobile ? (
        <div className="grid place-items-center w-screen">
          <Stack margin={2}>
            <Typography variant="h6" fontWeight={550}>
              Dashboard Module
            </Typography>
          </Stack>
          <img
            src={ICONS.homeLogo}
            alt=""
            title="Admin Logo"
            className="m-[30px] h-52 w-52"
          ></img>
          <div style={{ margin: 2 }}>
            <Card
              color={"white"}
              className="grid place-items-center  rounded-[39px] w-screen"
            >
              <div className="mx-7 pb-7">
                <LoginForm
                  remoteUserLogin={remoteUserLogin}
                  loggedInUser={loggedInUser}
                />
              </div>
            </Card>
          </div>
        </div>
      ) : (
        <Stack>
          <Grid
            container
            marginX={4}
            bgcolor={"white"}
            width={"95%"}
            padding={5}
            borderRadius={10}
            position={"fixed"}
          >
            <Grid item xs={6}>
              <Stack direction={"column"} alignItems={"center"} height={"90vh"}>
                <img src={ICONS.homeLogo} />
              </Stack>
            </Grid>
            <Grid item xs={6}>
              <Stack
                justifyContent={"center"}
                height={"95%"}
                width={"90%"}
                alignItems={"center"}
                border={"1px solid"}
                bgcolor={"secondary.main"}
                borderRadius={5}
              >
                <Stack
                  alignItems={"center"}
                  width={"80%"}
                  bgcolor={"white"}
                  height={"60%"}
                  borderRadius={5}
                  paddingTop={10}
                >
                  <Stack spacing={2} width={"80%"}>
                    <Stack spacing={2} width={"100%"}>
                      <Typography
                        variant="h6"
                        fontWeight={550}
                        textAlign={"center"}
                      >
                        Dashboard Module
                      </Typography>
                    </Stack>
                    <LoginForm
                      remoteUserLogin={remoteUserLogin}
                      loggedInUser={loggedInUser}
                    />
                  </Stack>
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </Stack>
      )}
    </>
  );
};

export default LoginPage;

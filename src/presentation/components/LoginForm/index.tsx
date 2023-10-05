import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { LoggedInUser } from "../../../domain/usages/auth/logged-in-user";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { UserLogin } from "../../../domain/usages/auth/user-login";
import { pageRoutes } from "../../../routes";
import {
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Visibility, VisibilityOff } from "@mui/icons-material";

type OtpLoginFormInput = {
  user_name: string;
  password: string;
  terms_is_agreed: boolean;
};

type Props = {
  remoteUserLogin: UserLogin;
  loggedInUser: LoggedInUser;
};
const LoginForm: React.FC<Props> = ({ remoteUserLogin, loggedInUser }) => {
  const navigate = useNavigate();
  const [loadingLogin, setLoadingLogin] = useState(false);

  const {
    formState: { errors },
    handleSubmit,
    control,
  } = useForm<OtpLoginFormInput>();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  // const secretPass = "12345";
  const onSubmit: SubmitHandler<OtpLoginFormInput> = async (data) => {
    // const iv = CryptoJS.enc.Hex.parse("Sharan Raj");
    // let payload = {
    //   user_name: data.user_name,
    //   password: CryptoJS.AES.encrypt(
    //     JSON.stringify(data.password),
    //     secretPass,
    //     { iv: iv }
    //   ).toString(),
    // };
    // let payload = {
    //   user_name: data.user_name,
    //   password: data.password,
    // };
    let payload = {
      user_name: data.user_name,
      password: btoa(data.password),
    };
    console.log(payload, "payload");
    setLoadingLogin(true);
    let result = await remoteUserLogin.login(payload);

    if (result.status == 200) {
      loggedInUser.setToken(result.data.token);
      navigate(pageRoutes.dashboard);
    } else if (result.status == 400) {
      setLoadingLogin(false);
      Swal.fire(
        "Invalid Credentials",
        "Please enter correct credentials and try again",
        "error"
      );
    } else {
      Swal.fire("Error", "Some Error occured Please try again Later", "error");
    }
  };
  return (
    <Stack spacing={2}>
      <Stack>
        <Typography fontWeight={550}> User Name:</Typography>
        <Controller
          name="user_name"
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              fullWidth
              size="small"
              value={value}
              onChange={onChange}
              error={!!error}
              helperText={error?.message}
            />
          )}
          rules={{
            required: { value: true, message: "Field Required" },
          }}
        />
      </Stack>
      <Stack>
        <Typography fontWeight={550}>Password:</Typography>
        <Controller
          name="password"
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              fullWidth
              type={showPassword ? "text" : "password"}
              size="small"
              onChange={onChange}
              value={value}
              error={!!error}
              helperText={error?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? (
                        <VisibilityOff fontSize="small" />
                      ) : (
                        <Visibility fontSize="small" />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          )}
          rules={{
            required: { value: true, message: "Field Required" },
          }}
        />
      </Stack>
      <Stack>
        <LoadingButton
          loading={loadingLogin}
          onClick={handleSubmit(onSubmit)}
          variant="contained"
          color="secondary"
          loadingPosition="center"
        >
          <Typography color="white" textTransform={"none"} fontWeight={550}>
            Login
          </Typography>
        </LoadingButton>
      </Stack>
    </Stack>
  );
};

export default LoginForm;

import { Visibility, VisibilityOff } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { set } from "lodash";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { ChangePassword } from "../../domain/usages/auth/change-password";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { pageRoutes } from "../../routes";
import CryptoJS from "crypto-js";
import { Constants } from "../../common/Constants";
import HTTPStatusCode from "../../domain/enums/httpStatusCode";

type Props = {
  remoteChangePassword: ChangePassword;
  open: boolean;
  handleClose: Function;
  CheckForChangePassword: Function;
  logout: Function;
};

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  height: "70%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

type FormFields = {
  newPassword: string;
  confirmNewPassword: string;
  oldPassword: string;
};

const ChangePasswordModal: React.FC<Props> = ({
  remoteChangePassword,
  open,
  handleClose,
  CheckForChangePassword,
  logout,
}) => {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { handleSubmit, control, watch } = useForm<FormFields>({
    mode: "onChange",
  });

  const handleClickShowOldPassword = () => setShowOldPassword((show) => !show);
  const handleClickShowNewPassword = () => setShowNewPassword((show) => !show);
  const handleClickShowConfirmNewPassword = () =>
    setShowConfirmNewPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const [passwordError, setPasswordError] = useState<string[]>([]);

  const encrptyValue = (value: string) => {
    let Cryptokey = CryptoJS.enc.Utf8.parse(Constants.CRYPTO_KEY);
    let encrptyed = CryptoJS.AES.encrypt(value, Cryptokey, {
      mode: CryptoJS.mode.ECB,
    }).toString();
    return encrptyed;
  };

  const onSubmit = async (data: FormFields) => {
    let payload = {
      password: encrptyValue(data.oldPassword),
      new_password: encrptyValue(data.newPassword),
      confirm_new_password: encrptyValue(data.confirmNewPassword),
    };
    setLoading(true);
    let result = await remoteChangePassword.change(payload);
    if (result.status == HTTPStatusCode.OK) {
      setLoading(false);
      handleClose();
      CheckForChangePassword();
      Swal.fire({
        icon: "success",
        title: result.data.message,
        timer: 2000,
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
      });
    } else if (result.status == HTTPStatusCode.FORBIDDEN) {
      logout();
    } else {
      setLoading(false);
      Swal.fire({
        icon: "error",
        title: result.data.message,
        customClass: {
          container: "swal2-style",
        },
      });
    }
  };

  return (
    <Modal open={open}>
      <Box sx={style}>
        <Stack
          alignItems={"center"}
          justifyContent={"center"}
          width={"100%"}
          height={"90%"}
        >
          <Stack
            width={"30%"}
            alignItems={"center"}
            spacing={2}
            border="40px solid #14008D"
            borderRadius={5}
            padding={5}
          >
            <Typography
              variant="subtitle2"
              fontWeight={550}
              textAlign={"center"}
            >
              To enhance the security of your account. We recommend to reset the
              default password
            </Typography>
            <Controller
              name="oldPassword"
              control={control}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  fullWidth
                  size="small"
                  onChange={onChange}
                  value={value}
                  type={showOldPassword ? "text" : "password"}
                  error={!!error}
                  helperText={error?.message}
                  label="Current Password"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowOldPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showOldPassword ? (
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
            <Controller
              name="newPassword"
              control={control}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  fullWidth
                  type={showNewPassword ? "text" : "password"}
                  size="small"
                  onChange={onChange}
                  value={value}
                  error={!!error}
                  helperText={error?.message}
                  label="New Password"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowNewPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showNewPassword ? (
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
                // pattern: {
                //   value:
                //     /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/,
                //   message:
                //     "Password must contain at least 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character",
                // },
                validate: (value) => {
                  let errors: string[] = [];
                  if (!value.match(/(?=.{8,})/)) {
                    errors.push("Password must contain at least 8 characters");
                  }
                  if (!value.match(/(?=.*[a-z])/)) {
                    errors.push("Password must contain at least 1 lowercase");
                  }
                  if (!value.match(/(?=.*[A-Z])/)) {
                    errors.push("Password must contain at least 1 uppercase");
                  }
                  if (!value.match(/(?=.*[0-9])/)) {
                    errors.push("Password must contain at least 1 number");
                  }
                  if (!value.match(/(?=.*[^A-Za-z0-9])/)) {
                    errors.push(
                      "Password must contain at least 1 special character"
                    );
                  }
                  if (errors.length > 0) {
                    setPasswordError(errors);
                    return "";
                  } else {
                    setPasswordError([]);
                  }
                },
              }}
            />
            {passwordError && passwordError.length > 0 && (
              <Stack>
                {passwordError.map((error) => (
                  <Typography
                    variant="caption"
                    fontWeight={550}
                    color={"error.main"}
                    textAlign={"start"}
                  >
                    {error}
                  </Typography>
                ))}
              </Stack>
            )}

            <Controller
              name="confirmNewPassword"
              control={control}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  fullWidth
                  size="small"
                  label="Confirm New Password"
                  type={showConfirmNewPassword ? "text" : "password"}
                  onChange={onChange}
                  value={value}
                  error={!!error}
                  helperText={error?.message}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowConfirmNewPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showConfirmNewPassword ? (
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
                validate: (value) => {
                  if (value != watch("newPassword")) {
                    return "Confirm password should match with new password";
                  }
                },
              }}
            />
            <LoadingButton
              variant="contained"
              color="secondary"
              fullWidth
              onClick={handleSubmit(onSubmit)}
              loading={loading}
            >
              <Typography fontWeight={550} textTransform={"none"}>
                Submit
              </Typography>
            </LoadingButton>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
};

export default ChangePasswordModal;

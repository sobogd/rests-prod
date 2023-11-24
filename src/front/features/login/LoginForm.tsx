import { FC, useEffect } from "react";
import { Button, Stack, TextField } from "@mui/material";
import { useAppDispatch } from "../../app/store";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import * as yup from "yup";
import { LoginHeader } from "./LoginHeader";
import { useTranslation } from "react-i18next";
import { loginActions } from "./slice";
import { ELoginTabs } from "./enums";
import { useAuthByCompanyLoginAndPasswordMutation } from "./api";
import { LoadingInside } from "../../shared/LoadingInside";
import { commonActions } from "../common/slice";

interface ILoginForm {
  restsLogin: string;
  restsPassword: string;
}

const schema = yup
  .object({
    restsLogin: yup
      .string()
      .required("User login is required")
      .min(4, "User login must be more than 4 letters"),
    restsPassword: yup
      .string()
      .required("User password is required")
      .min(4, "User password must be more than 4 letters"),
  })
  .required();

export const LoginForm: FC = () => {
  const dispatch = useAppDispatch();

  const { i18n } = useTranslation();
  const [auth, { data, isLoading }] = useAuthByCompanyLoginAndPasswordMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginForm>({
    resolver: yupResolver(schema),
    reValidateMode: "onSubmit",
  });

  const onSubmit: SubmitHandler<ILoginForm> = ({ restsLogin, restsPassword }) => {
    auth({
      login: restsLogin,
      password: restsPassword,
    });
  };

  useEffect(() => {
    if (data?.id && data?.token) {
      dispatch(commonActions.setLoggedUser(data));
      dispatch(commonActions.setUserCreds({ name: data.name, creds: data.loginHash }));
    }
  }, [data, dispatch, i18n]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} name="restsLogin">
      <Stack
        direction="column"
        spacing={2}
        padding={2}
        alignItems="center"
        justifyContent="space-around"
        px={{ xs: 4, md: 8 }}
      >
        <LoadingInside isLoading={isLoading} />
        <LoginHeader title="Welcome to workplace" subtitle="Enter your credentials:" />
        <Controller
          name="restsLogin"
          control={control}
          render={({ field }) => (
            <TextField
              fullWidth
              label="User login"
              error={!!errors["restsLogin"]?.message}
              helperText={errors["restsLogin"]?.message?.toString()}
              variant="outlined"
              {...field}
            />
          )}
        />
        <Controller
          name="restsPassword"
          control={control}
          render={({ field }) => (
            <TextField
              fullWidth
              label="User password"
              type="password"
              error={!!errors["restsPassword"]?.message}
              helperText={errors["restsPassword"]?.message?.toString()}
              variant="outlined"
              style={{ marginBottom: 10 }}
              {...field}
            />
          )}
        />
        <Button variant="contained" color="primary" size="large" type="submit" fullWidth>
          Log In
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          fullWidth
          onClick={() => dispatch(loginActions.setTab(ELoginTabs.REGISTRATION))}
        >
          Company registration
        </Button>
      </Stack>
    </form>
  );
};

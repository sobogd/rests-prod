import { FC, useEffect } from "react";
import { Button, Stack } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/store";
import * as yup from "yup";
import { LoginHeader } from "./LoginHeader";
import { useTranslation } from "react-i18next";
import { loginActions } from "./slice";
import { ELoginTabs } from "./enums";
import { useAuthByHashMutation } from "./api";
import { LoadingInside } from "../../shared/LoadingInside";
import { commonActions } from "../common/slice";

export const RememberLogin: FC = () => {
  const dispatch = useAppDispatch();

  const { i18n } = useTranslation();
  const [auth, { data, isLoading }] = useAuthByHashMutation();
  const userCreds = useAppSelector((s) => s.common.userCreds);
  const userName = useAppSelector((s) => s.common.userName);

  const handleLogin = () => {
    if (!!userCreds) auth(userCreds);
  };

  useEffect(() => {
    if (data?.id && data?.token) {
      dispatch(commonActions.setLoggedUser(data));
      dispatch(commonActions.setUserCreds({ name: data.name, creds: data.loginHash }));
    }
  }, [data, dispatch, i18n]);

  return (
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
      <Button variant="contained" color="primary" size="large" onClick={handleLogin} fullWidth>
        Log in as {userName ?? ""}
      </Button>
      <Button
        variant="contained"
        color="secondary"
        size="large"
        fullWidth
        onClick={() => dispatch(loginActions.setTab(ELoginTabs.LOGIN))}
      >
        Another user
      </Button>
    </Stack>
  );
};

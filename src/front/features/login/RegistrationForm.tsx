import { FC, Fragment } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Autocomplete, Button, Stack, TextField, Typography } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import * as yup from "yup";
import { currencies, languages, timezones } from "../../utils/timezones";
import { useAppDispatch } from "../../app/store";
import { LoginHeader } from "./LoginHeader";
import { IOption } from "../../app/interfaces";
import { loginActions } from "./slice";
import { ELoginTabs } from "./enums";
import { useRegisterCompanyMutation } from "./api";
import { LoadingInside } from "../../shared/LoadingInside";

interface IRegistrationForm {
  email: string;
  title: string;
  login: string;
  tin: string;
  password: string;
  passwordRepeat: string;
  timezone: string;
  currency: { name: string; symbol: string };
  language: { name: string; code: string };
}

const schema = yup
  .object({
    email: yup.string().required("Company email is required").email("Company email have incorrect format"),
    title: yup
      .string()
      .required("Organization name is required")
      .min(4, "Organization name must be more than 4 letters"),
    login: yup
      .string()
      .required("Login for company is required")
      .min(2, "Login must contain at least 2 characters")
      .matches(/^[A-Za-z0-9]*$/, {
        message: "Login must contain only numbers or letters",
      }),
    tin: yup
      .string()
      .required("Tax identification number is required")
      .min(9, "Tax identification number must contains 9 numbers")
      .max(9, "Tax identification number must contains 9 numbers"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must contain at least 8 characters"),
    passwordRepeat: yup
      .string()
      .required()
      .oneOf([yup.ref("password")], "Passwords must match"),
    timezone: yup.string().required("Timezone is required"),
    language: yup.object().required("Language is required"),
    currency: yup.object().required("Currency is required"),
  })
  .required();

export const RegistrationForm: FC = () => {
  const dispatch = useAppDispatch();

  const [register, { data, isLoading }] = useRegisterCompanyMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegistrationForm>({
    resolver: yupResolver(schema),
    reValidateMode: "onSubmit",
  });

  const onSubmit: SubmitHandler<IRegistrationForm> = (form) => {
    register({
      email: form.email,
      title: form.title,
      tin: form.tin,
      login: form.login,
      password: form.password,
      timezone: form.timezone,
      lang: form.language.code,
      currency: form.currency.symbol,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} name="restsRegistration" autoComplete="off">
      <Stack
        direction="column"
        spacing={2}
        padding={2}
        alignItems="center"
        justifyContent="space-around"
        px={{ xs: 4, md: 8 }}
      >
        <LoadingInside isLoading={isLoading} />
        {!data?.id ? (
          <Fragment>
            <LoginHeader title="Create an account" subtitle="Sign up your own company" />
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  fullWidth
                  label="Company email"
                  error={!!errors["email"]?.message}
                  helperText={errors["email"]?.message?.toString()}
                  variant="outlined"
                  {...field}
                />
              )}
            />
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <TextField
                  fullWidth
                  label="Organization name"
                  error={!!errors["title"]?.message}
                  helperText={errors["title"]?.message?.toString()}
                  variant="outlined"
                  {...field}
                />
              )}
            />
            <Controller
              name="tin"
              control={control}
              render={({ field }) => (
                <TextField
                  fullWidth
                  label="Tax identification number"
                  error={!!errors["tin"]?.message}
                  helperText={errors["tin"]?.message?.toString()}
                  variant="outlined"
                  {...field}
                />
              )}
            />
            <Controller
              name="login"
              control={control}
              render={({ field }) => (
                <TextField
                  fullWidth
                  label="Login for company"
                  error={!!errors["login"]?.message}
                  helperText={errors["login"]?.message?.toString()}
                  variant="outlined"
                  {...field}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  fullWidth
                  type="password"
                  label="Password for administrator"
                  error={!!errors["password"]?.message}
                  helperText={errors["password"]?.message?.toString()}
                  variant="outlined"
                  {...field}
                />
              )}
            />
            <Controller
              name="passwordRepeat"
              control={control}
              render={({ field }) => (
                <TextField
                  fullWidth
                  type="password"
                  label="Repeat password"
                  error={!!errors["passwordRepeat"]?.message}
                  helperText={errors["passwordRepeat"]?.message?.toString()}
                  variant="outlined"
                  {...field}
                />
              )}
            />
            {/* <Controller
              name="timezone"
              control={control}
              render={({ field }) => (
                <Autocomplete
                  {...field}
                  fullWidth
                  options={timezones}
                  onChange={(e, value) => {
                    field.onChange(value);
                  }}
                  getOptionLabel={(option) => option}
                  isOptionEqualToValue={(option: string, value: string) => option === value}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      variant="outlined"
                      label="Timezone"
                      placeholder="Select categories"
                      helperText={errors["timezone"]?.message?.toString()}
                      error={!!errors["timezone"]?.message}
                    />
                  )}
                />
              )}
            /> */}
            <Controller
              name="language"
              control={control}
              render={({ field }) => (
                <Autocomplete
                  {...field}
                  fullWidth
                  options={languages}
                  onChange={(e, value) => {
                    field.onChange(value);
                  }}
                  getOptionLabel={(option) => option.name}
                  isOptionEqualToValue={(option: IOption, value: IOption) => option.code === value.code}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      InputLabelProps={undefined}
                      fullWidth
                      variant="outlined"
                      label="Language"
                      placeholder="Select categories"
                      helperText={errors["language"]?.message?.toString()}
                      error={!!errors["language"]?.message}
                    />
                  )}
                />
              )}
            />
            <Controller
              name="currency"
              control={control}
              render={({ field }) => (
                <Autocomplete
                  {...field}
                  options={currencies}
                  fullWidth
                  onChange={(e, value) => {
                    field.onChange(value);
                  }}
                  getOptionLabel={(option) => option.name}
                  isOptionEqualToValue={(
                    option: { name: string; symbol: string },
                    value: { name: string; symbol: string }
                  ) => option.symbol === value.symbol}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      InputLabelProps={undefined}
                      fullWidth
                      variant="outlined"
                      label="Currency"
                      placeholder="Select currency"
                      helperText={errors["currency"]?.message?.toString()}
                      error={!!errors["currency"]?.message}
                    />
                  )}
                />
              )}
            />
            <Button variant="contained" color="primary" size="large" type="submit" fullWidth>
              Register company
            </Button>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              fullWidth
              onClick={() => dispatch(loginActions.setTab(ELoginTabs.LOGIN))}
            >
              Sign in
            </Button>
          </Fragment>
        ) : (
          <Fragment>
            <LoginHeader title="Account was created" subtitle="You can sign in with next data:" />
            <Stack
              direction="row"
              spacing={1}
              justifyContent="flex-start"
              alignItems="center"
              marginBottom="-15px !important"
            >
              <Typography>Login:</Typography>
              <Typography fontWeight={600}>{data?.login}-admin</Typography>
            </Stack>
            <Stack
              direction="row"
              spacing={1}
              justifyContent="flex-start"
              alignItems="center"
              marginBottom="20px !important"
            >
              <Typography>Password:</Typography>
              <Typography fontWeight={600}>your password</Typography>
            </Stack>
            <Button
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              onClick={() => dispatch(loginActions.setTab(ELoginTabs.LOGIN))}
            >
              Sign in
            </Button>
          </Fragment>
        )}
      </Stack>
    </form>
  );
};

import React, { useEffect } from "react";
import { Button, Stack } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { EUserType, usersModel } from "../../entities/users";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import * as yup from "yup";
import { InputControlled } from "../../shared/InputControlled";
import { SelectControlled } from "../../shared/SelectControlled";
import { ModalForForm } from "../../shared/ModalForForm";
import { CheckBoxControlled } from "../../shared/CheckBoxControlled";
import { getUsersForCompany, updateUserData, createNewUser, removeUser } from "../../api";

interface IUserEditForm {
  name: string;
  login: string;
  type: {
    code: EUserType;
    name: string;
  };
  newPassword: string;
  newPasswordRepeat: string;
  userId?: number;
  setNewPassword: boolean;
}

const userTypes = [
  { code: EUserType.ADMIN, name: "Administrator" },
  { code: EUserType.KITCHEN, name: "Kitchen worker" },
  { code: EUserType.MANAGER, name: "Manager" },
  { code: EUserType.PERSONAL, name: "Waiter / Waitress" },
];

const schema = yup
  .object({
    name: yup.string().required("Name is required"),
    login: yup
      .string()
      .required("Login is required")
      .min(4, "Login must contain at least 4 characters")
      .matches(/^[A-Za-z0-9]*$/, {
        message: "Login must contain only numbers or letters",
      }),
    type: yup.object().required("Type is required"),
    setNewPassword: yup.boolean(),
    newPassword: yup
      .string()
      .when("setNewPassword", (setNewPassword, schema) =>
        setNewPassword[0] === true
          ? schema.required("Password is required").min(8, "Password must contain at least 8 characters")
          : schema.min(0)
      ),
    newPasswordRepeat: yup
      .string()
      .when("setNewPassword", (setNewPassword, schema) =>
        setNewPassword[0] === true
          ? schema.required("Password is required").oneOf([yup.ref("newPassword")], "Passwords must match")
          : schema.min(0)
      ),
  })
  .required();

export const UserModal: React.FC = () => {
  const { form } = useAppSelector((s) => s.users);
  const dispatch = useAppDispatch();

  const methods = useForm<IUserEditForm>({
    resolver: yupResolver(schema),
    reValidateMode: "onSubmit",
    defaultValues: {
      setNewPassword: false,
    },
  });
  const { handleSubmit, setError, watch, reset, setValue } = methods;

  useEffect(() => {
    if (form.formData?.id && form.isOpen) {
      setValue("name", form.formData?.name);
      setValue("login", form.formData?.login);
      setValue("setNewPassword", false);
      setValue("newPassword", "");
      setValue("newPasswordRepeat", "");
      setValue("type", userTypes.find(({ code }) => form?.formData?.type === code) || userTypes[3]);
    }
    if (!form.formData?.id) {
      setValue("setNewPassword", true);
      setValue("newPassword", "");
      setValue("newPasswordRepeat", "");
    }
  }, [form.formData, form.isOpen]);

  useEffect(() => {
    if (!form.isOpen) reset();
  }, [form.isOpen]);

  const handleCloseAndUpdate = () => {
    dispatch(usersModel.actions.closeEditForm());
    dispatch(getUsersForCompany());
  };

  const onSubmit: SubmitHandler<IUserEditForm> = ({ newPassword, type: { code }, login, name }) => {
    (form.formData?.id
      ? dispatch(
          updateUserData({
            newPassword,
            type: code,
            name,
            login,
            id: form.formData.id,
          })
        )
      : dispatch(
          createNewUser({
            newPassword,
            type: code,
            name,
            login,
          })
        )
    ).then(handleCloseAndUpdate);
  };

  const handleRemoveUser = () => {
    if (form.formData?.id) {
      dispatch(removeUser(form.formData.id)).then(handleCloseAndUpdate);
    }
  };

  const isSetNewPassword = watch("setNewPassword") === true;
  const isShowSettingNewPassword = !!form.formData?.id;

  return (
    <ModalForForm
      open={form.isOpen}
      onCloseModal={() => dispatch(usersModel.actions.closeEditForm())}
      maxWidth={400}
      title="User form"
    >
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} name="restsUser">
          <Stack spacing={2}>
            <SelectControlled name="type" label="User type" options={userTypes} />
            <InputControlled name="name" label="Name" />
            <InputControlled name="login" label="Login" />
            {isShowSettingNewPassword && (
              <CheckBoxControlled name="setNewPassword" label="Set new password" />
            )}
            {isSetNewPassword && <InputControlled name="newPassword" label="New password" type="password" />}
            {isSetNewPassword && (
              <InputControlled name="newPasswordRepeat" label="Repeat new password" type="password" />
            )}
            <Button variant="contained" color="primary" size="medium" fullWidth type="submit">
              {form.formData?.id ? "Save user" : "Add user"}
            </Button>
            {/* {form.formData?.id && user?.id !== form.formData?.id && (
              <Button
                variant="contained"
                color="secondary"
                size="medium"
                fullWidth
                onClick={handleRemoveUser}
              >
                Remove user
              </Button>
            )} */}
          </Stack>
        </form>
      </FormProvider>
    </ModalForForm>
  );
};

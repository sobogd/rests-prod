import { FC, useEffect } from "react";
import { Button, Stack } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import * as yup from "yup";
import { InputControlled } from "../../shared/InputControlled";
import { ModalForForm } from "../../shared/ModalForForm";
import { billingActions } from "../../slices/billing";
import { billingApi } from "../../api/billing";

interface IForm {
  amount: number;
}

const schema = yup
  .object({
    amount: yup
      .number()
      .min(1, "Minimal amount is 1$")
      .max(100, "Maximum amount is 100$")
      .required("Amount is required"),
  })
  .required();

export const MakePayment: FC = () => {
  const dispatch = useAppDispatch();
  const { isOpenMakePayment, token } = useAppSelector((s) => s.billing);

  const methods = useForm<IForm>({
    resolver: yupResolver(schema),
    reValidateMode: "onSubmit",
  });
  const { handleSubmit, watch, reset } = methods;

  useEffect(() => {
    reset();
  }, [isOpenMakePayment]);

  const handleCloseAndUpdate = () => {
    dispatch(billingActions.closeMakePayment());
    dispatch(billingApi.updateCompanyInfo());
    dispatch(billingApi.paymentList());
  };

  const onSubmit: SubmitHandler<IForm> = ({ amount }) => {
    dispatch(billingApi.makePayment({ amount }));
  };

  return (
    <ModalForForm
      open={isOpenMakePayment}
      onCloseModal={handleCloseAndUpdate}
      maxWidth={600}
      minWidth={300}
      title="Make payment"
    >
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} name="restsMakePayment">
          {token == null ? (
            <Stack spacing={2}>
              <InputControlled name="amount" label="Amount" type="number" />
              <Button
                variant="contained"
                color="primary"
                size="medium"
                fullWidth
                type="submit"
              >
                Pay {Number(watch("amount")) > 0 ? `${watch("amount")}₺` : null}
              </Button>
            </Stack>
          ) : (
            <iframe
              style={{ minWidth: 300, height: "80vh" }}
              src={`https://www.paytr.com/odeme/guvenli/${token}`}
            ></iframe>
          )}
        </form>
      </FormProvider>
    </ModalForForm>
  );
};

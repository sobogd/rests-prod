import React, { FC, useEffect, useMemo } from "react";
import {
  Alert,
  AlertColor,
  Box,
  Button,
  List,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { billingApi } from "../../api/billing";
import { ECompanyStatuses } from "../../entities/companies/model";
import {
  getDateDifference,
  getDateTimeInFormat,
} from "../../utils/timeInFormat";
import { grey } from "@mui/material/colors";
import { MakePayment } from "./MakePayment";
import { billingActions } from "../../slices/billing";
import { PaymentList } from "./PaymentList";
import { Header } from "../../shared/Header";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { borderColorDefault } from "../../app/styles";
import AddIcon from "@mui/icons-material/Add";

export const Billing: FC = () => {
  const dispatch = useAppDispatch();
  const { company, isLoading } = useAppSelector((s) => s.billing);

  const handleUpdateBilling = () => {
    dispatch(billingApi.updateCompanyInfo());
    dispatch(billingApi.paymentList());
  };

  const handleMakePayment = () => {
    dispatch(billingActions.openMakePayment());
  };

  useEffect(() => {
    handleUpdateBilling();
  }, []);

  const messageAboutPayment = useMemo(() => {
    if (company?.id) {
      const dateDifference = getDateDifference(undefined, company.nextPayment);
      const diffInMonth = dateDifference?.months || 0;
      const diffInDays = dateDifference?.days || 0;
      const balance = company?.balance || 0;
      const perMonth = company?.rate?.perMonth || 0;

      let severity: AlertColor = "info";
      let message = (
        <>
          Your subscription is valid until{" "}
          {getDateTimeInFormat(company?.nextPayment)}. After that, it will be
          automatically renewed, if there are {company?.rate?.perMonth}$ on the
          account.
        </>
      );

      if (company?.status === ECompanyStatuses.UNPAID) {
        severity = "error";
        message = (
          <>
            To continue using the functionality, you need to deposit to your
            account for {company?.rate?.perMonth}$
          </>
        );
      }

      if (
        company?.status === ECompanyStatuses.ACTIVE &&
        company?.nextPayment &&
        diffInMonth <= 0 &&
        diffInDays >= 0 &&
        diffInDays < 10 &&
        balance < perMonth
      ) {
        severity = "error";
        message = (
          <>
            You need to deposit {company?.rate?.perMonth}$ before{" "}
            {getDateTimeInFormat(company?.nextPayment)}
          </>
        );
      }

      return (
        <Alert icon={false} severity={severity} sx={{ marginTop: 2 }}>
          {message}
        </Alert>
      );
    }
    return null;
  }, [company]);

  return (
    <Stack
      direction="column"
      width="100%"
      height="100%"
      paddingRight={2}
      paddingTop={2}
      paddingLeft={2}
    >
      <Header
        title={`Balance: ${company?.balance}₺`}
        subtitle={`Next payment date: ${getDateTimeInFormat(
          company?.nextPayment
        )}`}
        endIcon={<RefreshIcon onClick={handleUpdateBilling} />}
        isHaveBorder
      />
      <MakePayment />
      {messageAboutPayment}
      <PaymentList />
      {!isLoading && (
        <Box
          sx={{
            borderTop: 1,
            borderColor: borderColorDefault,
            paddingTop: "16px",
            paddingBottom: "16px",
            marginBottom: 0,
            marginTop: 0,
          }}
        >
          <Button
            variant="contained"
            color="primary"
            size="medium"
            fullWidth
            onClick={handleMakePayment}
          >
            Make payment
          </Button>
        </Box>
      )}
    </Stack>
  );
};

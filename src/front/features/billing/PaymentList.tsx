import React, { FC } from "react";
import { Chip, List, ListItem, Stack, Typography } from "@mui/material";
import { useAppSelector } from "../../app/store";
import { getDateTimeInFormat } from "../../utils/timeInFormat";
import { EPaymentStatuses, EPaymentTypes } from "../../slices/billing";
import { grey } from "@mui/material/colors";
import { LoadingInside } from "../../shared/LoadingInside";

const getStatusName = (status: EPaymentStatuses): string => {
  switch (status) {
    case EPaymentStatuses.ERROR:
      return "Error";
    case EPaymentStatuses.PAID:
      return "Paid";
    default:
      return "Draft";
  }
};

const getStatusColor = (
  status: EPaymentStatuses
): "error" | "success" | "secondary" => {
  switch (status) {
    case EPaymentStatuses.ERROR:
      return "error";
    case EPaymentStatuses.PAID:
      return "success";
    default:
      return "secondary";
  }
};

export const PaymentList: FC = () => {
  const { items, isLoading } = useAppSelector((s) => s.billing);

  return (
    <List
      sx={{
        height: "100%",
        flex: "100% 0 1",
        position: "relative",
        overflowY: "scroll",
      }}
    >
      <LoadingInside isLoading={isLoading} />
      {items?.map((payment, index) => (
        <ListItem key={`${payment?.id}+${index}`}>
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            justifyContent="space-between"
            width="100%"
          >
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography
                variant="body1"
                color={
                  payment?.type === EPaymentTypes.DEPOSIT ? "green" : "error"
                }
              >
                {payment?.type === EPaymentTypes.DEPOSIT ? "+" : "-"}
                {payment?.amount}₺
              </Typography>
              <Typography variant="body2" color={grey[500]}>
                From {getDateTimeInFormat(payment?.date)}. ID: {payment?.id}
              </Typography>
            </Stack>
            <Chip
              label={getStatusName(payment?.status)}
              color={getStatusColor(payment?.status)}
            />
          </Stack>
        </ListItem>
      ))}
    </List>
  );
};

import React, { FC, useEffect } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { Header } from "../../shared/Header";
import { useLazyGetDayDetailsQuery, useLazyGetStatisticQuery } from "./api";
import { LoadingInside } from "../../shared/LoadingInside";
import { useAppSelector } from "../../app/store";
import { getTimeInFormat } from "../../utils/timeInFormat";
import { IDayDetailsReport } from "./types";
import { borderColorDefault, primaryColorHover } from "../../app/styles";
import PaidIcon from "@mui/icons-material/Paid";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PaymentIcon from "@mui/icons-material/Payment";
import NumbersIcon from "@mui/icons-material/Numbers";
import PercentIcon from "@mui/icons-material/Percent";
import CommentIcon from "@mui/icons-material/Comment";

const sxForColumn = { display: "flex", alignItems: "center" };
const sxForIcon = { marginRight: 1, color: primaryColorHover, fontSize: 18 };

export const DetailsReport: FC<{
  day: string | null;
}> = ({ day }) => {
  const currencySymbol = useAppSelector((s) => s.common?.user?.company?.currencySymbol);
  const paymentMethods = useAppSelector((s) => s.paymentMethods?.paymentMethods);
  const discounts = useAppSelector((s) => s.discounts?.discounts);

  const [load, { data, isLoading, isFetching }] = useLazyGetDayDetailsQuery();

  const loading = isLoading || isFetching;

  useEffect(() => {
    if (day != null) {
      load(day);
    }
  }, [day]);

  return (
    <Stack
      sx={{
        padding: 2,
        boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
        borderRadius: "10px",
        marginTop: 2,
      }}
    >
      <Header title="Day details" subtitle="Details information about orders" isHaveBorder />
      <Stack position="relative" minHeight={200}>
        <LoadingInside isLoading={loading} />
        {data?.map((order: IDayDetailsReport) => (
          <Stack
            sx={{
              borderBottom: `1px solid ${borderColorDefault}`,
              paddingTop: 2,
              paddingBottom: 2,
            }}
            spacing={1}
          >
            <Stack direction="row" spacing={2}>
              <Stack>
                <Typography variant="body2" sx={sxForColumn}>
                  <AccessTimeIcon sx={sxForIcon} /> {getTimeInFormat(order?.created || null)}
                </Typography>
                <Typography variant="body2" sx={sxForColumn}>
                  <NumbersIcon sx={sxForIcon} />
                  {order?.id}
                </Typography>
                <Typography variant="body2" sx={sxForColumn}>
                  <PaidIcon sx={sxForIcon} />
                  {order?.total} {currencySymbol}
                </Typography>
              </Stack>
              <Stack>
                <Typography variant="body2" sx={sxForColumn}>
                  <PercentIcon sx={sxForIcon} />{" "}
                  {discounts?.find((d) => d.id === order?.discountId)?.title || "-"}
                </Typography>
                <Typography variant="body2" sx={sxForColumn}>
                  <PaymentIcon sx={sxForIcon} />
                  {paymentMethods?.find((p) => p.id === order?.paymentMethodId)?.title || "-"}
                </Typography>
                <Typography variant="body2" sx={sxForColumn}>
                  <CommentIcon sx={sxForIcon} />
                  {order?.comment || "-"}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};

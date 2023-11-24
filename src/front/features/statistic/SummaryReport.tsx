import React, { FC, Fragment, useEffect, useMemo } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { getDateInFormat } from "../../utils/timeInFormat";
import { Header } from "../../shared/Header";
import { useLazyGetStatisticQuery } from "./api";
import { LoadingInside } from "../../shared/LoadingInside";
import { GraphRestHorizontal } from "../../shared/GraphRestHorizontal";
import { TextSpan } from "../../app/styles";
import { useAppSelector } from "../../app/store";
import { grey } from "@mui/material/colors";

export const SummaryReport: FC<{
  startDate: string | null;
  endDate: string | null;
}> = ({ startDate, endDate }) => {
  const { paymentMethods } = useAppSelector((s) => s.paymentMethods);

  const [load, { data, isLoading, isFetching }] = useLazyGetStatisticQuery();

  const loading = isLoading || isFetching;

  useEffect(() => {
    if (startDate != null && endDate != null) {
      load({ startDate, endDate });
    }
  }, [startDate, endDate]);

  const totalForPeriod = React.useMemo(() => {
    let total = 0;
    data?.forEach((report) => {
      total = total + report.totalSummary;
    });

    return total;
  }, [data]);

  const totalOrdersCount = React.useMemo(() => {
    let total = 0;

    data?.forEach((report) => {
      total = total + report.ordersCount;
    });

    return total;
  }, [data]);

  const averageReceipt = React.useMemo(() => {
    return Math.round(totalForPeriod / totalOrdersCount);
  }, [data]);

  const options = useMemo(() => {
    return (
      data?.map((report) => ({
        label: report.date,
        value: report.totalSummary,
        separating: report.summary.map((sum) => ({
          label:
            paymentMethods.find((method) => method.id === sum.paymentMethodId)
              ?.title || "",
          value: sum.total,
        })),
      })) || []
    );
  }, [data]);

  const isNoItems = !data || data?.length <= 0;

  return (
    <Stack
      sx={{
        padding: 2,
        boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
        borderRadius: "10px",
        marginTop: 2,
      }}
    >
      <Header
        title="Summary"
        subtitle="Summary information about prices and revenue"
        isHaveBorder
      />
      <Stack position="relative" minHeight={450} justifyContent="center">
        <LoadingInside isLoading={loading} />
        {isNoItems && (
          <Typography
            width="100%"
            height="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
            color={grey[600]}
          >
            No items for this period
          </Typography>
        )}
        {!loading && !isNoItems && (
          <Fragment>
            <GraphRestHorizontal options={options} />
            <TextSpan top={12} bottom={5}>
              Total for period: {totalForPeriod}
            </TextSpan>
            <TextSpan bottom={5}>Average receipt: {averageReceipt}</TextSpan>
            <TextSpan bottom={5}>Orders count: {totalOrdersCount}</TextSpan>
          </Fragment>
        )}
      </Stack>
    </Stack>
  );
};

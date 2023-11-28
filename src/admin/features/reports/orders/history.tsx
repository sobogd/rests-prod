import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import {
  Box,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { ButtonStyled, TextSpan, WrapperScrolled } from "../../../app/styles";
import React, { FC, Fragment, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import {
  EReportTypes,
  getOrdersHistory,
  getReports,
  IOrdersHistory,
  IReport,
  orderReturn,
  reportsSlice,
} from "../../../entities/reports";
import { format } from "date-fns";
import dayjs from "dayjs";
import { priceFormatter } from "../../../utils/priceFormatter";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { grey } from "@mui/material/colors";

export const OrdersHistory: FC = () => {
  const dispatch = useAppDispatch();
  const [workDay, setWorkDay] = useState<string>(format(new Date(), "yyyy-MM-dd"));
  const { paymentMethods } = useAppSelector((s) => s.paymentMethods);
  const { discounts } = useAppSelector((s) => s.discounts);
  const { items: tables } = useAppSelector((s) => s.tables);
  const { ordersHistory } = useAppSelector((s) => s.reports);
  const [openedId, setOpenedId] = useState<number | undefined>(undefined);

  React.useEffect(() => {
    dispatch(getOrdersHistory({ workDay }));
  }, [workDay]);

  const handleChangeWorkDay = (e: Date | null) => {
    if (e) setWorkDay(format(e, "yyyy-MM-dd"));
  };

  const handleReturnOrder = (id: number) => {
    dispatch(orderReturn({ id })).then(() => {
      dispatch(getOrdersHistory({ workDay }));
    });
  };

  const handleClickOpen = (id: number) => () => {
    setOpenedId(id === openedId ? undefined : id);
  };

  const columns: {
    id: keyof IOrdersHistory;
    label: string;
    format: (value: any) => any;
  }[] = [
    {
      // @ts-ignore
      id: "id",
      label: "",
      format: (id: number) => (
        <IconButton aria-label="expand row" size="small" onClick={handleClickOpen(id)}>
          {openedId === id ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>
      ),
    },
    {
      // @ts-ignore
      id: "id",
      label: "ID",
      format: (value: number) => value,
    },
    {
      // @ts-ignore
      id: "created",
      label: "From",
      format: (value: string) => dayjs(value).format("HH:mm"),
    },
    {
      // @ts-ignore
      id: "total",
      label: "Total",
      format: (value: number) => priceFormatter.format(value),
    },
    {
      // @ts-ignore
      id: "comment",
      label: "Comment",
      format: (value: string) => value,
    },
    {
      // @ts-ignore
      id: "paymentMethodId",
      label: "Payment",
      format: (value: number) => paymentMethods.find((pm) => pm.id === value)?.title ?? "Undefined",
    },
    {
      // @ts-ignore
      id: "discountId",
      label: "Discount",
      format: (value: number) => discounts.find((pm) => pm.id === value)?.title ?? "Without discount",
    },
    {
      // @ts-ignore
      id: "tableId",
      label: "Table",
      format: (value: number) => tables.find((t) => Number(t.id) === value)?.name ?? "",
    },
    {
      // @ts-ignore
      id: "id",
      label: "",
      format: (value: number) => (
        <ButtonStyled onClick={() => handleReturnOrder(value)} size={14}>
          Return
        </ButtonStyled>
      ),
    },
  ];

  return (
    <WrapperScrolled>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <MobileDatePicker
          label="Work day"
          inputFormat="dd.MM.yyyy"
          value={workDay}
          onChange={handleChangeWorkDay}
          renderInput={(params) => <TextField fullWidth {...params} />}
          closeOnSelect
        />
      </LocalizationProvider>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell sx={{ padding: 1 }} key={column.id}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {/** @ts-ignore */}
            {ordersHistory.map((oh) => {
              return (
                <Fragment>
                  {/** @ts-ignore */}
                  <TableRow key={oh.id}>
                    {columns.map((column) => {
                      return (
                        <TableCell key={column.id} sx={{ padding: 1 }}>
                          {column.format(oh[column.id])}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ border: 0 }} padding="none" colSpan={9}>
                      {/** @ts-ignore */}
                      <Collapse in={openedId === oh.id} unmountOnExit>
                        <Box borderBottom={1} borderColor={grey[300]} px={2} py={1}>
                          <Table>
                            <TableBody>
                              {/** @ts-ignore */}
                              <TableRow key={oh.id}>
                                {columns.map((column) => {
                                  return (
                                    <TableCell key={column.id} sx={{ padding: 1 }}>
                                      {column.format(oh[column.id])}
                                    </TableCell>
                                  );
                                })}
                              </TableRow>
                              {/*{row.history.map((historyRow) => (*/}
                              {/*  <TableRow key={historyRow.date}>*/}
                              {/*    <TableCell component="th" scope="row">*/}
                              {/*      {historyRow.date}*/}
                              {/*    </TableCell>*/}
                              {/*    <TableCell>{historyRow.customerId}</TableCell>*/}
                              {/*    <TableCell align="right">*/}
                              {/*      {historyRow.amount}*/}
                              {/*    </TableCell>*/}
                              {/*    <TableCell align="right">*/}
                              {/*      {Math.round(*/}
                              {/*        historyRow.amount * row.price * 100*/}
                              {/*      ) / 100}*/}
                              {/*    </TableCell>*/}
                              {/*  </TableRow>*/}
                              {/*))}*/}
                            </TableBody>
                          </Table>
                        </Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </Fragment>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </WrapperScrolled>
  );
};

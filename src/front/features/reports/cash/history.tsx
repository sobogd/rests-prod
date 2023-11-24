import { FC, useEffect } from "react";
import { EReportTypes, getReports, IReport } from "../../../entities/reports";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import dayjs from "dayjs";
import { priceFormatter } from "../../../utils/priceFormatter";

const columns: {
  id: keyof IReport;
  label: string;
  format: (value: any) => string;
}[] = [
  {
    id: "created",
    label: "Created at",
    format: (value: string) => dayjs(value).format("DD.MM.YYYY HH:mm"),
  },
  {
    id: "sum",
    label: "Amount",
    format: (value: number) => priceFormatter.format(value),
  },
  {
    id: "description",
    label: "Description",
    format: (value: string) => value,
  },
];

export const HistoryCashReport: FC = () => {
  const dispatch = useAppDispatch();
  const { reports } = useAppSelector((s) => s.reports);

  useEffect(() => {
    dispatch(getReports());
  }, []);

  return (
    <TableContainer sx={{ maxHeight: "100%" }}>
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.id}>{column.label}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {reports.map((report) => {
            return (
              <TableRow hover role="checkbox" tabIndex={-1} key={report.id}>
                {columns.map((column) => {
                  let value = column.format(report[column.id]);

                  if (column.id === "sum") {
                    value =
                      (report.type === EReportTypes.WITHDRAW ? "-" : "+") +
                      value;
                  }

                  return <TableCell key={column.id}>{value}</TableCell>;
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

import React, { FC } from "react";
import { Header } from "../../shared/Header";
import { Box, Stack, TextField, Typography } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";

export const DaysFilter: FC<{
  startDate: string | null;
  endDate: string | null;
  setStartDate: (date: string | null) => void;
  setEndDate: (date: string | null) => void;
}> = ({ startDate, endDate, setStartDate, setEndDate }) => {
  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      spacing={{ xs: 3, md: 2 }}
      justifyContent="space-between"
      sx={{
        padding: 2,
        boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
        borderRadius: "10px",
      }}
    >
      <Header
        title="Period for statistic"
        subtitle="Select dates range for report"
      />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Box display="flex" flexDirection="row" marginTop={1} marginBottom={2}>
          <MobileDatePicker
            label="Start date"
            inputFormat="dd.MM.yyyy"
            value={startDate}
            onChange={(value) => setStartDate(value?.toString() ?? null)}
            renderInput={(params) => (
              <TextField fullWidth style={{ marginRight: 5 }} {...params} />
            )}
            closeOnSelect
          />
          <MobileDatePicker
            label="End date"
            inputFormat="dd.MM.yyyy"
            value={endDate}
            onChange={(value) => setEndDate(value?.toString() ?? null)}
            renderInput={(params) => (
              <TextField fullWidth style={{ marginLeft: 5 }} {...params} />
            )}
            closeOnSelect
          />
        </Box>
      </LocalizationProvider>
    </Stack>
  );
};

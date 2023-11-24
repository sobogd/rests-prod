import React, { FC } from "react";
import { Header } from "../../shared/Header";
import { Box, Stack, TextField, Typography } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";

export const DayFilter: FC<{
  day: string | null;
  setDay: (date: string | null) => void;
}> = ({ day, setDay }) => {
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
        title="Day for details"
        subtitle="Select day for see details report"
      />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Box display="flex" flexDirection="row" marginTop={1} marginBottom={2}>
          <MobileDatePicker
            label="Date"
            inputFormat="dd.MM.yyyy"
            value={day}
            onChange={(value) => setDay(value?.toString() ?? null)}
            renderInput={(params) => <TextField fullWidth {...params} />}
            closeOnSelect
          />
        </Box>
      </LocalizationProvider>
    </Stack>
  );
};

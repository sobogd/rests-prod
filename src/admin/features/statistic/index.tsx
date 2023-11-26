import { FC, useState } from "react";
import { Box, Stack } from "@mui/material";
import { SummaryReport } from "./SummaryReport";
import { DaysFilter } from "./DaysFilter";
import { DayFilter } from "./DayFilter";
import { DetailsReport } from "./DetailsReport";

export const Statistic: FC = () => {
  const [startDate, setStartDate] = useState<string | null>(
    new Date().toString()
  );
  const [endDate, setEndDate] = useState<string | null>(new Date().toString());
  const [day, setDay] = useState<string | null>(new Date().toString());

  return (
    <Stack
      direction="column"
      width="100%"
      height="100%"
      paddingRight={2}
      paddingLeft={2}
    >
      <Stack
        spacing={2}
        sx={{
          height: "100%",
          flex: "100% 0 1",
          position: "relative",
          overflowY: "scroll",
          padding: "16px",
          margin: "0 -16px",
        }}
      >
        <DaysFilter
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
        />
        <SummaryReport startDate={startDate} endDate={endDate} />
        <DayFilter day={day} setDay={setDay} />
        <DetailsReport day={day} />
      </Stack>
    </Stack>
  );
};

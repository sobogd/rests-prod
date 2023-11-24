import { Typography } from "@mui/material";
import React from "react";
import { useAppDispatch } from "../../app/store";

export const Account: React.FC = () => {
  const dispatch = useAppDispatch();

  return (
    <>
      <Typography variant="h6" marginBottom={3}>
        Schema of company area
      </Typography>
    </>
  );
};

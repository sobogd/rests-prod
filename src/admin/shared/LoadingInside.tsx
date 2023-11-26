import { Box, CircularProgress } from "@mui/material";
import React, { FC } from "react";
import { backgroundDefault, primaryColor } from "../app/styles";

export const LoadingInside: FC<{ isLoading: boolean; background?: string }> = ({ isLoading, background }) => {
  return (
    <Box
      sx={{
        position: "absolute",
        width: "100%",
        height: "100%",
        top: 0,
        left: 0,
        background: background || backgroundDefault,
        zIndex: 5,
        display: "flex",
        transition: "none",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: isLoading ? "initial" : "none",
        opacity: isLoading ? "1" : "0",
        svg: {
          color: primaryColor,
        },
        "*": {
          transition: "none",
        },
      }}
    >
      <CircularProgress />
    </Box>
  );
};

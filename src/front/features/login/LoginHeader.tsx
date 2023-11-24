import { Box, Typography } from "@mui/material";
import { FC } from "react";

export const LoginHeader: FC<{ title: string; subtitle: string }> = ({ title, subtitle }) => (
  <Box
    display="flex"
    flexDirection="column"
    alignItems={{ xs: "flex-start", md: "center" }}
    justifyContent="center"
    sx={{
      position: { xs: "absolute", md: "relative" },
      top: { xs: "0", md: "inherit" },
      left: { xs: "32px", md: "inherit" },
      maxWidth: { xs: "60%", md: "100%" },
      height: { xs: "30vh", md: "inherit" },
      textAlign: { xs: "left", md: "center" },
      marginBottom: { xs: 0, md: 1 },
    }}
  >
    <Typography variant="h1" style={{ marginBottom: 10 }}>
      {title}
    </Typography>
    <Typography style={{ marginBottom: 10 }}>{subtitle}</Typography>
  </Box>
);

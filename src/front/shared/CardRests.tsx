import { Card, CardHeader } from "@mui/material";
import { FC, ReactNode } from "react";

type ICardRestsProps = {
  title?: string;
  children: ReactNode;
};

export const CardRests: FC<ICardRestsProps> = ({ title, children }) => {
  return (
    <Card sx={{ padding: { xs: 2, md: 3 } }}>
      <CardHeader
        title={title}
        titleTypographyProps={{ component: "h5", variant: "h5" }}
        sx={{
          padding: 0,
          paddingBottom: { xs: 2, md: 2 },
          marginBottom: { xs: 3, md: 3 },
        }}
      />
      {children}
    </Card>
  );
};

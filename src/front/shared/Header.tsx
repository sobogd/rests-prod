import { FC } from "react";
import { Stack, Typography } from "@mui/material";
import { borderColorDefault } from "../app/styles";
import { grey } from "@mui/material/colors";

export const Header: FC<{
  marginTop?: number;
  marginBottom?: number;
  spacing?: number;
  startIcon?: any;
  endIcon?: any;
  title: string;
  subtitle?: any;
  isHaveBorder?: boolean;
  onClick?: () => void;
}> = ({
  marginTop,
  marginBottom,
  startIcon,
  endIcon,
  subtitle,
  title,
  isHaveBorder,
  spacing = 0,
  onClick,
}) => {
  return (
    <Stack
      marginTop={marginTop}
      marginBottom={marginBottom}
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      spacing={2}
      sx={{
        borderBottom: isHaveBorder ? 1 : 0,
        borderColor: borderColorDefault,
        paddingBottom: isHaveBorder ? "14px" : 0,
        marginBottom: marginBottom || 0,
        marginTop: marginTop || 0,
      }}
      onClick={onClick}
    >
      {startIcon}
      <Stack direction="column" alignItems="flex-start" flex="100%" spacing={spacing}>
        <Typography variant="h2" fontWeight={600}>
          {title}
        </Typography>
        {subtitle != null && (
          <Typography variant="body2" color={grey[600]}>
            {subtitle}
          </Typography>
        )}
      </Stack>
      {endIcon}
    </Stack>
  );
};

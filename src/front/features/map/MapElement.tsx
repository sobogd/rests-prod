import React, { FC, MutableRefObject } from "react";
import { Box } from "@mui/material";
import { motion } from "framer-motion";
import { ETableTypes } from "./enums";
import { CTableTypesIcons } from "./consts";
import { primaryColor } from "../../app/styles";
import { grey } from "@mui/material/colors";

export const MapElement: FC<{
  parentForMap: MutableRefObject<null | HTMLElement>;
  x: number;
  y: number;
  w: number;
  h: number;
  type: ETableTypes;
  onChangeCoordinates: (x: number, y: number) => void;
}> = ({ parentForMap, x, y, w, h, type, onChangeCoordinates }) => {
  const handleUpdate = ({ x, y }: { x: number; y: number }) => {
    const { offsetHeight, offsetWidth } = parentForMap.current as any;
    const xPercent = (x * 100) / offsetWidth;
    const yPercent = (y * 100) / offsetHeight;
    onChangeCoordinates(xPercent, yPercent);
  };

  const position = parentForMap?.current
    ? {
        x: (parentForMap?.current?.offsetWidth * x) / 100,
        y: (parentForMap?.current?.offsetHeight * y) / 100,
      }
    : { x: 0, y: 0 };

  return (
    <Box
      drag
      dragConstraints={parentForMap}
      component={motion.div}
      onUpdate={handleUpdate}
      sx={{
        position: "absolute",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999999,
        transition: "none !important",
        touchAction: "none",
        svg: {
          color: primaryColor,
          width: "100%",
          height: "100%",
        },
      }}
      style={{
        top: 0,
        left: 0,
        x: position.x,
        y: position.y,
        width: w + "%",
        height: h + "%",
        background: type === ETableTypes.WALL ? grey[400] : "none",
      }}
    >
      {type != null && CTableTypesIcons[type]}
    </Box>
  );
};

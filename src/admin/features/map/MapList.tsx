import React from "react";
import { Box } from "@mui/material";
import { MapBlock } from "./MapBlock";
import { tablesSlice } from "./slice";
import { useAppDispatch, useAppSelector } from "../../app/store";

export const MapList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((s) => s.tables);

  return (
    <Box
      maxWidth={{ xs: "auto", md: "70vh" }}
      width="100%"
      overflow="hidden"
      position="relative"
      style={{ marginLeft: "auto", marginRight: "auto" }}
    >
      <MapBlock items={items} onClickTable={(table) => dispatch(tablesSlice.actions.startEditItem(table))} />
    </Box>
  );
};

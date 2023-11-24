import React from "react";
import { Button, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import UpdateIcon from "@mui/icons-material/Update";
import { MapModal } from "./MapModal";
import { MapList } from "./MapList";
import { useAppDispatch } from "../../app/store";
import { searchTables } from "./api";
import { tablesSlice } from "./slice";

export const Map: React.FC = () => {
  const dispatch = useAppDispatch();

  return (
    <Stack
      spacing={2}
      direction="column"
      width="100%"
      height="100%"
      paddingRight={2}
      paddingTop={2}
      paddingLeft={2}
    >
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={{ xs: 1, md: 2 }}
        width="100%"
      >
        <Button
          variant="contained"
          color="primary"
          size="medium"
          type="submit"
          fullWidth
          onClick={() => dispatch(tablesSlice.actions.startEditItem())}
        >
          <AddIcon style={{ marginRight: 10 }} />
          Add new element
        </Button>
        <Button
          variant="contained"
          color="primary"
          size="medium"
          type="submit"
          fullWidth
          onClick={() => dispatch(searchTables())}
        >
          <UpdateIcon style={{ marginRight: 10 }} />
          Update map
        </Button>
      </Stack>
      <MapModal />
      <MapList />
    </Stack>
  );
};

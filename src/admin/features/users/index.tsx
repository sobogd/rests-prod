import { FC, useEffect } from "react";
import { Button, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import UpdateIcon from "@mui/icons-material/Update";
import { useAppDispatch } from "../../app/store";
import { getUsersForCompany } from "../../api";
import { UsersList } from "./UsersList";
import { usersModel } from "../../entities/users";
import { UserModal } from "./UserModal";

export const Users: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUsersForCompany());
  }, []);

  return (
    <Stack spacing={2} direction="column">
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
          onClick={() => dispatch(usersModel.actions.openEditFormWithData())}
        >
          <AddIcon style={{ marginRight: 10 }} />
          Add new user
        </Button>
        <Button
          variant="contained"
          color="primary"
          size="medium"
          type="submit"
          fullWidth
          onClick={() => dispatch(getUsersForCompany())}
        >
          <UpdateIcon style={{ marginRight: 10 }} />
          Update users list
        </Button>
      </Stack>
      <UsersList />
      <UserModal />
    </Stack>
  );
};

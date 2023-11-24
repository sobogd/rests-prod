import React from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { usersModel } from "../../entities/users";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import { getDateTimeInFormat } from "../../utils/timeInFormat";

export const UsersList: React.FC = () => {
  const { usersForCompany } = useAppSelector((s) => s.users);
  const dispatch = useAppDispatch();

  return (
    <List>
      {usersForCompany?.map((user, index) => (
        <ListItem key={`${user?.id}+${index}`}>
          <ListItemText
            primary={user.name}
            secondary={
              <Stack>
                <Typography variant="body2">Login: {user.login}</Typography>
                <Typography variant="body2">
                  Last login: {getDateTimeInFormat(user.lastLogin)}
                </Typography>
              </Stack>
            }
          />
          <ListItemIcon
            onClick={() =>
              dispatch(usersModel.actions.openEditFormWithData(user))
            }
          >
            <ModeEditOutlineIcon />
          </ListItemIcon>
        </ListItem>
      ))}
    </List>
  );
};

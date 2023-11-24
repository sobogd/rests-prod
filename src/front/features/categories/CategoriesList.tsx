import React, { useMemo, useState } from "react";
import {
  Box,
  Button,
  List,
  ListItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { Header } from "../../shared/Header";
import { borderColorDefault } from "../../app/styles";
import { LoadingInside } from "../../shared/LoadingInside";
import { grey } from "@mui/material/colors";
import AddIcon from "@mui/icons-material/Add";
import { categoriesActions } from "./slice";
import { searchCategories } from "../../api/categories";
import RefreshIcon from "@mui/icons-material/Refresh";
import { ICategory } from "./types";
import { ECategoriesTabs } from "./enums";

export const CategoriesList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, isLoading } = useAppSelector((s) => s.categories);

  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleClickRefresh = () => {
    dispatch(searchCategories());
  };

  const handleClickAdd = () => {
    dispatch(categoriesActions.setTab(ECategoriesTabs.FORM));
  };

  const handleClickCategory = (categoryId: number) => () => {
    dispatch(categoriesActions.setCategoryId(categoryId));
    dispatch(categoriesActions.setTab(ECategoriesTabs.FORM));
  };

  const filteredCategories: ICategory[] = useMemo(
    () =>
      items.filter((category) => {
        if (
          searchQuery !== "" &&
          !category.name.toLowerCase().includes(searchQuery.toLowerCase())
        ) {
          return false;
        } else {
          return true;
        }
      }),
    [items, searchQuery]
  );

  return (
    <Stack
      direction="column"
      width="100%"
      height="100%"
      paddingRight={2}
      paddingTop={2}
      paddingLeft={2}
    >
      <Header
        title={"Categories"}
        subtitle={`List all of categories`}
        endIcon={<RefreshIcon onClick={handleClickRefresh} />}
        isHaveBorder
      />
      <Box
        sx={{
          borderBottom: 1,
          borderColor: borderColorDefault,
          paddingTop: "16px",
          paddingBottom: "16px",
          marginBottom: 0,
        }}
      >
        <TextField
          fullWidth
          label="Search category"
          variant="outlined"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </Box>
      <List
        sx={{
          height: "100%",
          flex: "100% 0 1",
          position: "relative",
          overflowY: "scroll",
        }}
      >
        <LoadingInside isLoading={isLoading} />
        {filteredCategories?.map((category, index) => (
          <ListItem
            key={`${category?.id}+${index}`}
            onClick={handleClickCategory(category.id ?? 0)}
          >
            <Stack spacing={0} width="100%">
              <Typography>{category.name}</Typography>
              <Typography variant="body2" color={grey[600]}>
                {category.description}
              </Typography>
            </Stack>
          </ListItem>
        ))}
      </List>
      {!isLoading && (
        <Box
          sx={{
            borderTop: 1,
            borderColor: borderColorDefault,
            paddingTop: "16px",
            paddingBottom: "16px",
            marginBottom: 0,
            marginTop: 0,
          }}
        >
          <Button
            variant="contained"
            color="primary"
            size="medium"
            fullWidth
            onClick={handleClickAdd}
          >
            <AddIcon style={{ marginRight: 8 }} />
            Add new category
          </Button>
        </Box>
      )}
    </Stack>
  );
};

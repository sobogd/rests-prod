import { FC } from "react";
import { Box, Button, List, ListItem, Stack, Typography } from "@mui/material";
import { Header } from "../../shared/Header";
import { LoadingInside } from "../../shared/LoadingInside";
import { borderColorDefault } from "../../app/styles";
import AddIcon from "@mui/icons-material/Add";
import { useAppDispatch } from "../../app/store";
import { grey } from "@mui/material/colors";
import { positionsActions } from "./slice";
import { EPositionsTabs } from "./enums";
import { useListCategoriesQuery } from "./api";
import { useTranslation } from "react-i18next";

export const CategoriesFilter: FC = () => {
  const dispatch = useAppDispatch();
  const i18n = useTranslation();

  const { data, isLoading, isFetching } = useListCategoriesQuery();

  const handleClickCategory = (categoryId: number) => () => {
    dispatch(positionsActions.setCategoryId(categoryId));
    dispatch(positionsActions.setTab(EPositionsTabs.POSITIONS));
  };

  const handleClickAdd = () => {};

  return (
    <Stack direction="column" width="100%" height="100%" paddingRight={2} paddingTop={2} paddingLeft={2}>
      <Header
        title={i18n.t("positions.categories.title")}
        subtitle={i18n.t("positions.categories.subtitle")}
        isHaveBorder
      />
      <List
        sx={{
          height: "100%",
          flex: "100% 0 1",
          position: "relative",
          overflowY: "scroll",
        }}
      >
        <LoadingInside isLoading={isLoading || isFetching} />
        {data?.length ? (
          data?.map((category) => (
            <ListItem key={category.id} disablePadding onClick={handleClickCategory(category.id ?? 0)}>
              <Stack spacing={0} width="100%">
                <Typography>{category.name}</Typography>
                <Typography variant="body2" color={grey[600]}>
                  {category.description}
                </Typography>
              </Stack>
            </ListItem>
          ))
        ) : (
          <Stack
            width="100%"
            height="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
          >
            <Typography color={grey[600]}>{i18n.t("positions.categories.empty")}</Typography>
            <Button variant="text" color="primary" size="medium" fullWidth onClick={handleClickAdd}>
              {i18n.t("positions.categories.add")}
            </Button>
          </Stack>
        )}
      </List>
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
        <Button variant="contained" color="primary" size="medium" fullWidth onClick={handleClickAdd}>
          <AddIcon style={{ marginRight: 8 }} />
          {i18n.t("positions.categories.add")}
        </Button>
      </Box>
    </Stack>
  );
};

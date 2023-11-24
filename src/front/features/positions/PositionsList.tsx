import { FC, useEffect, useMemo, useState } from "react";
import { Box, Button, List, ListItem, Stack, TextField, Typography } from "@mui/material";
import { Header } from "../../shared/Header";
import { LoadingInside } from "../../shared/LoadingInside";
import { borderColorDefault } from "../../app/styles";
import AddIcon from "@mui/icons-material/Add";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { grey } from "@mui/material/colors";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { positionsActions } from "./slice";
import { EPositionsTabs } from "./enums";
import { IItem } from "./types";
import { useLazyListForCategoryIdQuery } from "./api";
import { useTranslation } from "react-i18next";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

export const PositionsList: FC = () => {
  const dispatch = useAppDispatch();
  const i18n = useTranslation();

  const [loadItems, { data, isLoading, isFetching }] = useLazyListForCategoryIdQuery();

  const categoryId = useAppSelector((s) => s.positions.categoryId);
  const currencySymbol = useAppSelector((s) => s.common?.user?.company?.currencySymbol);

  useEffect(() => {
    if (!!categoryId) {
      loadItems(categoryId);
    }
  }, [categoryId]);

  const [searchQuery, setSearchQuery] = useState<string>("");

  const loading = false;

  const handleClickBack = () => {
    dispatch(positionsActions.setTab(EPositionsTabs.CATEGORIES));
    dispatch(positionsActions.setCategoryId(undefined));
  };

  const handleClickAdd = () => {
    dispatch(positionsActions.setTab(EPositionsTabs.FORM));
  };

  const handleClickPosition = (positionId: number) => () => {
    dispatch(positionsActions.setPositionId(positionId));
    dispatch(positionsActions.setTab(EPositionsTabs.FORM));
  };

  const handleCopyPosition = (positionId: number) => () => {
    dispatch(positionsActions.setCopyPositionId(positionId));
    dispatch(positionsActions.setTab(EPositionsTabs.FORM));
  };

  const filteredPositions: IItem[] = useMemo(
    () =>
      data?.filter((item) => {
        if (searchQuery !== "" && !item?.n?.toLowerCase().includes(searchQuery.toLowerCase())) {
          return false;
        } else {
          return true;
        }
      }) ?? [],
    [data, searchQuery]
  );

  return (
    <Stack direction="column" width="100%" height="100%" paddingRight={2} paddingTop={2} paddingLeft={2}>
      <Header
        title={i18n.t("positions.list.title")}
        subtitle={i18n.t("positions.list.subtitle")}
        startIcon={<ArrowBackIcon onClick={handleClickBack} />}
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
          label={i18n.t("positions.list.search")}
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
        <LoadingInside isLoading={loading || isLoading || isFetching} />
        {!!filteredPositions?.length ? (
          filteredPositions.map((item) => (
            <ListItem key={item.id} disablePadding>
              <Stack direction="row" alignItems="center" justifyContent="space-between" width="100%">
                <Stack spacing={0} width="100%" onClick={handleClickPosition(item.id ?? 0)}>
                  <Typography>{item.n}</Typography>
                  <Typography variant="body2" color={grey[600]}>
                    {item?.p} {currencySymbol} / {i18n.t("positions.list.sort")}: {item?.s}
                  </Typography>
                </Stack>
                <ContentCopyIcon onClick={handleCopyPosition(item.id ?? 0)} />
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
            <Typography color={grey[600]}>{i18n.t("positions.list.empty")}</Typography>
            <Button variant="text" color="primary" size="medium" fullWidth onClick={handleClickAdd}>
              {i18n.t("positions.list.add")}
            </Button>
          </Stack>
        )}
      </List>
      {!loading && (
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
            {i18n.t("positions.list.add")}
          </Button>
        </Box>
      )}
    </Stack>
  );
};

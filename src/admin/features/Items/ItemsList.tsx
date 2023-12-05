import { FC, useMemo, useState } from "react";
import { useAppSelector } from "../../app/store";
import { useDeleteItemMutation, useItemsQuery } from "./api";
import { useTranslation } from "react-i18next";
import Loading from "../../shared/loading";
import { ModalRests } from "../../shared/ModalRests";
import { ItemForm } from "./ItemForm";
import { UniversalList, UniversalListItemBordered } from "../../app/styles";
import InputWithClear from "../../shared/InputWithClear";
import NoData from "../../shared/NoData";
import styled from "@emotion/styled";
import { DialogRests } from "../../shared/DialogRests";
import { IItem } from "../../../back/types";
import { useAuth } from "../Auth/Context";

const UniversalListItemBorderedPos = styled(UniversalListItemBordered)`
  width: 100%;
  margin-left: 0;
  margin-right: 0;
`;

export const ItemsList: FC = () => {
  const i18n = useTranslation();
  const symbol = useAuth()?.whoami?.company?.symbol;

  const [selectedItemId, setSelectedItemId] = useState<number | null | undefined>(undefined);
  const [itemIdForDialog, setItemIdForDialog] = useState<number | undefined>(undefined);
  const [selectedCopyItemId, setSelectedCopyItemId] = useState<number | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const { data, isLoading, isFetching, refetch } = useItemsQuery(undefined);
  const [deleteItem, { isLoading: isDeleting }] = useDeleteItemMutation();

  const handleRemoveItem = (id: number) => {
    deleteItem(id).then(() => refetch());
  };

  const filteredItems: IItem[] = useMemo(
    () =>
      data?.filter((item: IItem) =>
        searchQuery !== "" && !item?.n?.toLowerCase().includes(searchQuery.toLowerCase()) ? false : true
      ) ?? [],
    [data, searchQuery]
  );

  const handleUpdate = () => {
    setSelectedItemId(undefined);
    setSelectedCopyItemId(undefined);
    refetch();
  };

  const itemModal =
    selectedItemId !== undefined || selectedCopyItemId !== undefined ? (
      <ItemForm
        onBack={handleUpdate}
        selectedItemId={selectedItemId}
        selectedCopyItemId={selectedCopyItemId}
      />
    ) : null;

  const emptyItems = !filteredItems?.length ? <NoData text={"Items not found"} /> : null;

  const itemsList = (
    <UniversalList>
      {filteredItems.map((item) => (
        <UniversalListItemBorderedPos key={item.id} onClick={() => setItemIdForDialog(item.id)}>
          <p>{item.n}</p>
          <p>
            <span>
              {item?.p} {symbol}
            </span>
            <span>
              {i18n.t("items.list.sort")}: {item?.s}
            </span>
          </p>
        </UniversalListItemBorderedPos>
      ))}
    </UniversalList>
  );

  const itemDialog = useMemo(
    () =>
      itemIdForDialog !== undefined ? (
        <DialogRests
          onClose={() => {
            setItemIdForDialog(undefined);
          }}
          buttons={[
            {
              title: i18n.t("items.list.edit"),
              onClick: () => {
                setSelectedItemId(itemIdForDialog);
              },
            },
            {
              title: i18n.t("items.list.clone"),
              onClick: () => {
                setSelectedCopyItemId(itemIdForDialog);
              },
            },
            {
              title: i18n.t("items.list.remove"),
              onClick: () => {
                handleRemoveItem(itemIdForDialog);
              },
            },
          ]}
          title={i18n.t("items.list.dialog")}
        />
      ) : null,
    [itemIdForDialog]
  );

  return (
    <ModalRests
      title={i18n.t("menu.names.POSITIONS")}
      isHaveMenu={true}
      footerButton={{
        title: i18n.t("items.list.add"),
        onClick: () => {
          setSelectedItemId(null);
        },
      }}
      withPadding
    >
      <Loading isLoading={isLoading || isFetching || isDeleting} />
      <InputWithClear
        placeholder={"Item name"}
        value={searchQuery}
        onChangeValue={(value) => setSearchQuery(value as string)}
      />
      {itemModal}
      {emptyItems}
      {itemsList}
      {itemDialog}
    </ModalRests>
  );
};

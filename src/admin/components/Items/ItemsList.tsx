import { FC, useMemo, useState } from "react";
import { useItemsQuery } from "./api";
import { useTranslation } from "react-i18next";
import { ModalRests } from "../ModalRests";
import { ItemForm } from "./ItemForm";
import InputWithClear from "../InputWithClear";
import NoData from "../NoData";
import { IItem } from "../../../back/types";
import { useAuth } from "../Auth/Context";
import List from "../List";

export const ItemsList: FC = () => {
  const i18n = useTranslation();
  const symbol = useAuth()?.whoami?.company?.symbol;

  const [selectedItemId, setSelectedItemId] = useState<number | null | undefined>(undefined);
  const [selectedCopyItemId, setSelectedCopyItemId] = useState<number | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const { data, isLoading, isFetching, refetch } = useItemsQuery(undefined);

  const filteredItems: IItem[] = useMemo(
    () =>
      data?.filter((item: IItem) =>
        searchQuery !== "" && !item?.n?.toLowerCase().includes(searchQuery.toLowerCase()) ? false : true
      ) ?? [],
    [data, searchQuery]
  );

  return (
    <>
      <ModalRests
        title={i18n.t("menu.names.POSITIONS")}
        footerSticks={[
          {
            icon: "new",
            onClick: () => {
              setSelectedItemId(null);
            },
          },
        ]}
        withPadding
        moreButtons={[{ title: i18n.t("items.list.update"), onClick: () => refetch() }]}
        isOpenAdditional={selectedItemId !== undefined || selectedCopyItemId !== undefined}
        isGeneral
        isLoading={isLoading || isFetching}
      >
        <InputWithClear
          placeholder={i18n.t("items.list.search")}
          value={searchQuery}
          onChangeValue={(value) => setSearchQuery(value as string)}
        />
        {!filteredItems?.length ? (
          <NoData text={i18n.t("items.list.empty")} />
        ) : (
          <List
            items={filteredItems.map((item) => ({
              buttonType: "next",
              onClick: () => setSelectedItemId(item.id),
              id: item.id,
              title: item.n,
              description: `${i18n.t("items.list.sort")}: ${item?.s} / ${i18n.t("items.list.price")}: ${
                item?.p
              } ${symbol}`,
            }))}
          />
        )}
      </ModalRests>
      <ItemForm
        onBack={() => {
          setSelectedItemId(undefined);
          setSelectedCopyItemId(undefined);
        }}
        onCopy={() => {
          const copyId = selectedItemId ?? undefined;
          setSelectedItemId(undefined);
          setSelectedCopyItemId(copyId);
        }}
        refetch={refetch}
        selectedItemId={selectedItemId}
        selectedCopyItemId={selectedCopyItemId}
      />
    </>
  );
};

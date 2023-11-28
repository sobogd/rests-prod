import { FC, useMemo, useState } from "react";
import { useAppSelector } from "../../app/store";
import { useDeletePositionMutation, usePositionsQuery } from "./api";
import { useTranslation } from "react-i18next";
import { IItem } from "../../../back/mappers/items";
import Loading from "../../shared/loading";
import { ModalRests } from "../../shared/ModalRests";
import { PositionsForm } from "./PositionsForm";
import { UniversalList, UniversalListItemBordered } from "../../app/styles";
import InputWithClear from "../../shared/InputWithClear";
import NoData from "../../shared/NoData";
import styled from "@emotion/styled";
import { DialogRests } from "../../shared/DialogRests";

const UniversalListItemBorderedPos = styled(UniversalListItemBordered)`
  width: 100%;
  margin-left: 0;
  margin-right: 0;
`;

export const PositionsList: FC = () => {
  const i18n = useTranslation();
  const currencySymbol = useAppSelector((s) => s.common?.user?.company?.currencySymbol);

  const [selectedPositionId, setSelectedPositionId] = useState<number | null | undefined>(undefined);
  const [positionIdForDialog, setPositionIdForDialog] = useState<number | undefined>(undefined);
  const [selectedCopyPositionId, setSelectedCopyPositionId] = useState<number | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const { data, isLoading, isFetching, refetch } = usePositionsQuery(undefined);
  const [deletePosition, { isLoading: isDeleting }] = useDeletePositionMutation();

  const handleRemovePosition = (id: number) => {
    deletePosition(id).then(() => refetch());
  };

  const filteredPositions: IItem[] = useMemo(
    () =>
      data?.filter((item: IItem) =>
        searchQuery !== "" && !item?.n?.toLowerCase().includes(searchQuery.toLowerCase()) ? false : true
      ) ?? [],
    [data, searchQuery]
  );

  const handleSavePosition = () => {
    setSelectedPositionId(undefined);
    setSelectedCopyPositionId(undefined);
    refetch();
  };

  const positionModal =
    selectedPositionId !== undefined || selectedCopyPositionId !== undefined ? (
      <ModalRests
        title={
          selectedPositionId === null || selectedCopyPositionId !== undefined
            ? "New position"
            : "Edit position"
        }
        onBack={handleSavePosition}
      >
        <PositionsForm
          onSave={handleSavePosition}
          selectedPositionId={selectedPositionId}
          selectedCopyPositionId={selectedCopyPositionId}
        />
      </ModalRests>
    ) : null;

  const emptyPositions = !filteredPositions?.length ? <NoData text={"Positions not found"} /> : null;

  const positionsList = (
    <UniversalList>
      {filteredPositions.map((item) => (
        <UniversalListItemBorderedPos key={item.id} onClick={() => setPositionIdForDialog(item.id)}>
          <p>{item.n}</p>
          <p>
            <span>
              {item?.p} {currencySymbol}
            </span>
            <span>
              {i18n.t("positions.list.sort")}: {item?.s}
            </span>
          </p>
        </UniversalListItemBorderedPos>
      ))}
    </UniversalList>
  );

  const positionDialog = useMemo(
    () =>
      positionIdForDialog !== undefined ? (
        <DialogRests
          onClose={() => {
            setPositionIdForDialog(undefined);
          }}
          buttons={[
            {
              title: "Edit",
              onClick: () => {
                setSelectedPositionId(positionIdForDialog);
              },
            },
            {
              title: "Clone",
              onClick: () => {
                setSelectedCopyPositionId(positionIdForDialog);
              },
            },
            {
              title: "Remove",
              onClick: () => {
                handleRemovePosition(positionIdForDialog);
              },
            },
          ]}
          title={i18n.t("orders.positionDialogTitle")}
        />
      ) : null,
    [positionIdForDialog]
  );

  return (
    <ModalRests
      title={i18n.t("menu.names.POSITIONS")}
      isHaveMenu={true}
      footerButton={{
        title: i18n.t("orders.addPosition"),
        onClick: () => {
          setSelectedPositionId(null);
        },
      }}
      withPadding
    >
      <Loading isLoading={isLoading || isFetching || isDeleting} />
      <InputWithClear
        placeholder={"Position name"}
        value={searchQuery}
        onChangeValue={(value) => setSearchQuery(value as string)}
      />
      {positionModal}
      {emptyPositions}
      {positionsList}
      {positionDialog}
    </ModalRests>
  );
};

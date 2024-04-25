import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { KitchenFilter } from "./KitchenFilter";
import { EFilterStatuses } from "./types";
import {
  useDonePositionMutation,
  useLazyListPositionsByCategoriesQuery,
  useListCategoriesForFilterQuery,
  useRestartPositionMutation,
} from "./api";
import styled from "@emotion/styled";
import { ModalRests } from "../ModalRests";
import Loading from "../loading";
import { useAllTablesQuery } from "../Orders/api";
import {
  EUserTypes,
  IAllPositionsForKitchen,
  IPositionForOrder,
  ITable,
} from "../../../back/types";
import { useAuth } from "../Auth/Context";
import { getPositionTitleForList } from "../../utils/getPositionTitleForList";
import { getPositionDescriptionForList } from "../../utils/getPositionDescriptionForList";
import List from "../List";
import {
  backgroundDefault,
  newBorderColor,
  textDefaultColor,
  newPallet,
} from "../../styles";
import { dateMs } from "../../utils/timeInFormat";

const ListKitchenTables = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  overflow-x: scroll;
  background: ${backgroundDefault};
`;

const ListKitchenTablesItem = styled.div`
  width: 280px;
  min-width: 280px;
  background: white;
  margin: 25px 0 0 25px;
  border: 1px solid ${newBorderColor};
  border-radius: 10px;
  overflow-x: hidden;
  max-height: calc(100% - 50px);
  overflow-y: scroll;
`;

const ListKitchenTablesHeader = styled.div`
  width: 100%;
  background: ${textDefaultColor};
  padding: 10px 20px;
  font-weight: 600;
  font-size: 17px;
  display: flex;
  flex-direction: column;
  color: white;
  span {
    font-size: 15px;
    font-weight: 400;
  }
`;

const ListKitchenTablesPosition = styled.div`
  width: 100%;
  padding: 15px 20px;
  border-bottom: 1px solid ${newBorderColor};
  :last-child {
    border-bottom: 0;
  }
  p {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    font-weight: 400;
    font-size: 15px;
    :first-child {
      color: ${textDefaultColor};
      font-weight: 600;
      font-size: 17px;
      span {
        :last-child {
          background: ${newPallet.orange1};
          color: white;
          border-radius: 5px;
          font-size: 13px;
          padding: 3px 5px;
          margin-left: 15px;
          white-space: nowrap;
        }
      }
    }
  }
`;

const PositionAction = styled.button<{ isDone: boolean }>`
  background: ${({ isDone }) => (isDone ? newBorderColor : textDefaultColor)};
  width: 100%;
  color: ${({ isDone }) => (isDone ? textDefaultColor : "white")};
  font-weight: 600;
  font-size: 17px;
  border: 0;
  border-radius: 10px;
  height: 40px;
  margin-top: 15px;
`;

export const Kitchen: React.FC = () => {
  const i18n = useTranslation();
  const { whoami, logout } = useAuth();
  const isKitchen = whoami?.user?.type === EUserTypes.KITCHEN;
  const [isOpenFilter, setIsOpenFilter] = useState<boolean>(false);
  const {
    data: categories,
    isLoading: isLoadingCategories,
    isFetching: isFetchingCategories,
  } = useListCategoriesForFilterQuery();
  const [
    loadAllPositions,
    {
      data: positions,
      isLoading: isLoadingPositions,
      isFetching: isFetchingPositions,
    },
  ] = useLazyListPositionsByCategoriesQuery();
  const [filter, setFilter] = useState<{
    status: EFilterStatuses;
    categoryIds: number[];
  }>({
    status: EFilterStatuses.ALL,
    categoryIds: [],
  });
  const {
    data: tables,
    isFetching: isFetchingTables,
    isLoading: isLoadingTables,
  } = useAllTablesQuery();
  const [donePosition, { isLoading: isLoadingDone, isSuccess: isSuccessDone }] =
    useDonePositionMutation();
  const [
    restartPosition,
    { isLoading: isLoadingRestart, isSuccess: isSuccessRestart },
  ] = useRestartPositionMutation();

  useEffect(() => {
    loadAllPositions();
  }, [filter]);

  useEffect(() => {
    if (isSuccessRestart) {
      loadAllPositions();
    }
  }, [isSuccessRestart]);

  useEffect(() => {
    if (isSuccessDone) {
      loadAllPositions();
    }
  }, [isSuccessDone]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isOpenFilter) {
        loadAllPositions();
      }
    }, 30000);
    return () => {
      clearInterval(timer);
    };
  }, [isOpenFilter]);

  const getTablesWithPositions = () => {
    const tablesObject: any = {};
    positions?.forEach((position) => {
      tablesObject[`table${position.tab}`] = {
        table: tables?.find((t) => Number(t.id) === Number(position.tab)),
        positions: (
          tablesObject[`table${position.tab}`]?.positions ?? []
        ).concat([position]),
      };
    });

    const positionsByTables = Object.values(tablesObject) as {
      positions: IAllPositionsForKitchen[];
      table: ITable;
    }[];

    const positionsByTablesSorted = positionsByTables.map((table) => {
      const sortedPositions = table.positions
        .sort((a, b) => {
          if ((a.crt ?? 0) > (b.crt ?? 0)) {
            return 1;
          }
          if ((a.crt ?? 0) < (b.crt ?? 0)) {
            return -1;
          }
          return 0;
        })
        .sort((a, b) => {
          if (!!a.f && !b.f) {
            return 1;
          }
          if (!a.f && !!b.f) {
            return -1;
          }
          return 0;
        });

      const filteredPositions = sortedPositions
        .filter((position) => {
          if (filter.status === EFilterStatuses.DONE) {
            return !!position.f;
          } else if (filter.status === EFilterStatuses.WAITING) {
            return !position.f;
          } else {
            return true;
          }
        })
        .filter((position) =>
          filter.categoryIds?.length
            ? filter.categoryIds.includes(Number(position.cat))
            : true
        );

      return {
        ...table,
        positions: filteredPositions,
      };
    });

    const tableSortedByHavingPositions = positionsByTablesSorted.filter(
      (table) => table.positions.length > 0
    );

    return tableSortedByHavingPositions;
  };

  return (
    <>
      <ModalRests
        title={i18n.t("menu.names.KITCHEN")}
        isFullScreen={isKitchen}
        isGeneral={true}
        onFilter={() => setIsOpenFilter(true)}
        onBack={isKitchen ? () => logout() : undefined}
        isOpenAdditional={isOpenFilter}
        isHaveLangs={isKitchen}
      >
        <Loading
          isLoading={
            isLoadingCategories ||
            isFetchingCategories ||
            isLoadingPositions ||
            isFetchingPositions ||
            isFetchingTables ||
            isLoadingTables ||
            isLoadingDone ||
            isLoadingRestart
          }
        />
        <ListKitchenTables>
          {getTablesWithPositions()?.map((table) => (
            <ListKitchenTablesItem>
              <ListKitchenTablesHeader>
                {i18n.t("kitchen.tableNo")}
                {table?.table?.number}
                <span>{table?.table?.name}</span>
              </ListKitchenTablesHeader>
              <List
                items={table?.positions?.map((position) => ({
                  title: getPositionTitleForList(
                    position as IPositionForOrder,
                    0,
                    "",
                    "time"
                  ),
                  description: getPositionDescriptionForList(
                    position as IPositionForOrder
                  ),
                  buttonType: "primary",
                  onClick: () => {
                    if (
                      position.on &&
                      position.i !== undefined &&
                      position.i >= 0
                    ) {
                      if (!position.f) {
                        donePosition({
                          orderNumber: position.on,
                          positionIndex: position.i,
                          doneTime: dateMs(),
                        });
                      } else {
                        restartPosition({
                          orderNumber: position.on,
                          positionIndex: position.i,
                        });
                      }
                    }
                  },
                  id: JSON.stringify(position),
                  primaryButtonText: !position.f
                    ? i18n.t("kitchen.done")
                    : i18n.t("kitchen.restart"),
                  primaryButtonColor: !position.f
                    ? textDefaultColor
                    : newPallet.gray2,
                  opacity:
                    position.f && filter.status !== EFilterStatuses.DONE
                      ? 0.4
                      : 1,
                }))}
                withPadding
                withMargin={false}
              />
            </ListKitchenTablesItem>
          ))}
        </ListKitchenTables>
      </ModalRests>
      <KitchenFilter
        onClose={() => setIsOpenFilter(false)}
        categories={categories ?? []}
        filter={filter}
        setFilter={setFilter}
        isShow={isOpenFilter}
      />
    </>
  );
};

import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { KitchenModalFilter } from "./KitchenModalFilter";
import { EFilterStatuses } from "./types";
import {
  useDonePositionMutation,
  useLazyListPositionsByCategoriesQuery,
  useListCategoriesForFilterQuery,
  useRestartPositionMutation,
} from "./api";
import styled from "@emotion/styled";
import { utcToZonedTime } from "date-fns-tz";
import { ModalRests } from "../../shared/ModalRests";
import Loading from "../../shared/loading";
import { ITable } from "../map/types";
import { useAllTablesQuery } from "../orders/api";
import { prePrimaryColor } from "../../app/styles";
import { IAllPositionsForKitchen } from "../../../back/types/k";

const ListKitchenTables = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  overflow-x: scroll;
  background: #fbfbfb;
`;

const ListKitchenTablesItem = styled.div`
  width: 280px;
  min-width: 280px;
  background: white;
  margin: 25px 0 0 25px;
  border: 1px solid #ede7ff;
  border-radius: 10px;
  overflow-x: hidden;
  max-height: calc(100% - 50px);
  overflow-y: scroll;
`;

const ListKitchenTablesHeader = styled.div`
  width: 100%;
  background: ${prePrimaryColor};
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
  border-bottom: 1px solid #ede7ff;
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
      color: #2f2f2f;
      font-weight: 600;
      font-size: 17px;
      span {
        :last-child {
          background: #ffc858;
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
  background: ${({ isDone }) => (isDone ? "#f8f6ff" : "#cf7ff8")};
  width: 100%;
  color: ${({ isDone }) => (isDone ? "#505050" : "white")};
  font-weight: 600;
  font-size: 17px;
  border: 0;
  border-radius: 10px;
  height: 40px;
  margin-top: 15px;
`;

export const Kitchen: React.FC = () => {
  const i18n = useTranslation();
  const [isOpenFilter, setIsOpenFilter] = useState<boolean>(false);
  const {
    data: categories,
    isLoading: isLoadingCategories,
    isFetching: isFetchingCategories,
  } = useListCategoriesForFilterQuery();
  const [
    loadAllPositions,
    { data: positions, isLoading: isLoadingPositions, isFetching: isFetchingPositions },
  ] = useLazyListPositionsByCategoriesQuery();
  const [filter, setFilter] = useState<{ status: EFilterStatuses; categoryIds: number[] }>({
    status: EFilterStatuses.ALL,
    categoryIds: [],
  });
  const { data: tables, isFetching: isFetchingTables, isLoading: isLoadingTables } = useAllTablesQuery();
  const [donePosition, { isLoading: isLoadingDone, isSuccess: isSuccessDone }] = useDonePositionMutation();
  const [restartPosition, { isLoading: isLoadingRestart, isSuccess: isSuccessRestart }] =
    useRestartPositionMutation();

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

  const filterWindow = useMemo(
    () =>
      isOpenFilter && categories ? (
        <KitchenModalFilter
          onClose={() => setIsOpenFilter(false)}
          categories={categories}
          filter={filter}
          setFilter={setFilter}
        />
      ) : null,
    [isOpenFilter]
  );

  const getTablesWithPositions = () => {
    const tablesObject: any = {};
    positions?.forEach((position) => {
      tablesObject[`table${position.tab}`] = {
        table: tables?.find((t) => Number(t.id) === Number(position.tab)),
        positions: (tablesObject[`table${position.tab}`]?.positions ?? []).concat([position]),
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
          filter.categoryIds?.length ? filter.categoryIds.includes(Number(position.cat)) : true
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

  const utcTime = Number(utcToZonedTime(new Date(), "UTC").valueOf());

  console.log(getTablesWithPositions(), utcTime);
  const listOfTables = (
    <ListKitchenTables>
      {getTablesWithPositions()?.map((table) => (
        <ListKitchenTablesItem>
          <ListKitchenTablesHeader>
            {i18n.t("kitchen.tableNo")}
            {table?.table?.number}
            <span>{table?.table?.name}</span>
          </ListKitchenTablesHeader>
          {table?.positions?.map((position) => (
            <ListKitchenTablesPosition>
              <p
                style={{
                  marginBottom: position?.v?.n || position?.o?.length || position.c ? "5px" : undefined,
                }}
              >
                <span>{position?.n}</span>
                <span style={{ opacity: !position.f ? 1 : 0 }}>
                  {Math.round((utcTime - Number(position.crt)) / 60000)} min
                </span>
              </p>
              <p>{position?.v?.n}</p>
              {position?.o?.map((option, index) => (
                <p style={{ marginTop: index === 0 ? 5 : 0 }}>
                  {option.q}x - {option.n}
                </p>
              ))}
              {position.c && position.c !== "" && <p style={{ marginTop: 5 }}>{position.c}</p>}
              {position.oc && position.c !== "" && <p style={{ marginTop: 5 }}>{position.oc}</p>}
              <PositionAction
                isDone={!!position.f}
                onClick={() => {
                  if (position.on && position.i !== undefined && position.i >= 0) {
                    if (!position.f) {
                      donePosition({ orderNumber: position.on, positionIndex: position.i });
                    } else {
                      restartPosition({ orderNumber: position.on, positionIndex: position.i });
                    }
                  }
                }}
              >
                {!position.f ? i18n.t("kitchen.done") : i18n.t("kitchen.restart")}
              </PositionAction>
            </ListKitchenTablesPosition>
          ))}
        </ListKitchenTablesItem>
      ))}
    </ListKitchenTables>
  );

  return (
    <ModalRests title={i18n.t("menu.names.KITCHEN")} isHaveMenu={true} onFilter={() => setIsOpenFilter(true)}>
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
      {filterWindow}
      {listOfTables}
    </ModalRests>
  );
};

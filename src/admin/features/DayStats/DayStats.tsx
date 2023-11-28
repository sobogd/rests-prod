import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ModalRests } from "../../shared/ModalRests";
import Loading from "../../shared/loading";
import styled from "@emotion/styled";
import {} from "date-fns";
import { format } from "date-fns-tz";
import { prePrimaryColor } from "../../app/styles";
import { useLazyDayStatsQuery, useOrderReturnMutation } from "./api";
import { DayStatsList } from "./DayStatsList";
import NoData from "../../shared/NoData";

const Input = styled.input`
  width: calc(100% - 30px);
  margin: 15px 15px 0;
  padding: 0 15px;
  background: white;
  border-radius: 10px;
  border: 1px solid rgb(237, 231, 255);
  font-size: 15px;
  outline-color: ${prePrimaryColor};
  height: 50px;
  min-height: 50px;
  line-height: 50px;
  -webkit-appearance: none;
`;

export const DayStats: React.FC = () => {
  const i18n = useTranslation();
  const [day, setDay] = useState<string>(format(new Date(), "yyyy-MM-dd"));

  const [load, { data: orders, isLoading, isFetching }] = useLazyDayStatsQuery();
  const [orderReturn, { isLoading: isLoadingReturn }] = useOrderReturnMutation();

  useEffect(() => {
    if (day && day !== "") {
      load({ day });
    }
  }, [day]);

  const orderReturnHandler = (id: number) => {
    orderReturn({ id }).then(() => {
      load({ day });
    });
  };

  return (
    <ModalRests title={i18n.t("menu.names.DAY_STATS")} isHaveMenu={true}>
      <Loading isLoading={isLoading || isFetching || isLoadingReturn} />
      <Input defaultValue={day} value={day} type="date" onChange={(e) => setDay(e.target.value)} />
      {!orders || orders?.length <= 0 ? (
        <NoData text={i18n.t("dayStats.noItem")} />
      ) : (
        <DayStatsList orders={orders} onReturn={orderReturnHandler} />
      )}
    </ModalRests>
  );
};

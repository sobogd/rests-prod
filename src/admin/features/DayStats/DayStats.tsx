import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ModalRests } from "../../shared/ModalRests";
import Loading from "../../shared/loading";
import styled from "@emotion/styled";
import {} from "date-fns";
import { format } from "date-fns-tz";
import { TbFileOff } from "react-icons/tb";
import { prePrimaryColor } from "../../app/styles";
import { useLazyDayStatsQuery } from "./api";
import { DayStatsList } from "./DayStatsList";

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
`;

const NoData = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  padding-bottom: 60px;
  color: rgb(168 168 168);
  svg {
    margin-bottom: 10px;
  }
`;

export const DayStats: React.FC = () => {
  const i18n = useTranslation();
  const [day, setDay] = useState<string>(format(new Date(), "yyyy-MM-dd"));

  const [load, { data: orders, isLoading, isFetching }] = useLazyDayStatsQuery();

  useEffect(() => {
    if (day && day !== "") {
      load({ day });
    }
  }, [day]);
  return (
    <ModalRests title={i18n.t("menu.names.DAY_STATS")} isHaveMenu={true}>
      <Loading isLoading={isLoading || isFetching} />
      <Input defaultValue={day} value={day} type="date" onChange={(e) => setDay(e.target.value)} />
      {!orders || orders?.length <= 0 ? (
        <NoData>
          <TbFileOff size={100} color={"rgb(210 210 210)"} />
          {i18n.t("dayStats.noItem")}
        </NoData>
      ) : (
        <DayStatsList orders={orders} />
      )}
    </ModalRests>
  );
};

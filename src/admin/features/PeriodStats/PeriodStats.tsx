import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ModalRests } from "../../shared/ModalRests";
import Loading from "../../shared/loading";
import { format } from "date-fns";
import NoData from "../../shared/NoData";
import { useLazyPeriodStatsQuery } from "./api";
import styled from "@emotion/styled";
import { prePrimaryColor } from "../../app/styles";
import { PeriodDetails } from "./PeriodDetails";

const PeriodController = styled.div`
  display: flex;
`;

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

export const PeriodStats: React.FC = () => {
  const i18n = useTranslation();
  const [dayStart, setDayStart] = useState<string>(format(new Date(), "yyyy-MM-dd"));
  const [dayEnd, setDayEnd] = useState<string>(format(new Date(), "yyyy-MM-dd"));

  const [load, { data, isLoading, isFetching }] = useLazyPeriodStatsQuery();

  useEffect(() => {
    if (dayStart && dayStart !== "" && dayEnd && dayEnd !== "") {
      load({ dayStart, dayEnd });
    }
  }, [dayStart, dayEnd]);

  return (
    <ModalRests title={i18n.t("menu.names.PERIOD")} isHaveMenu={true}>
      <Loading isLoading={isLoading || isFetching} />
      <PeriodController>
        <Input
          defaultValue={dayStart}
          value={dayStart}
          type="date"
          onChange={(e) => setDayStart(e.target.value)}
        />
        <Input defaultValue={dayEnd} value={dayEnd} type="date" onChange={(e) => setDayEnd(e.target.value)} />
      </PeriodController>
      {!data || data?.count <= 0 ? (
        <NoData text={i18n.t("dayStats.noItem")} />
      ) : (
        <PeriodDetails data={data} />
      )}
    </ModalRests>
  );
};

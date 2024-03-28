import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { ModalRests } from "../ModalRests";
import Loading from "../loading";
import { format } from "date-fns";
import { useLazyPeriodStatsQuery } from "./api";
import styled from "@emotion/styled";
import { newBorderColor, textDefaultColor } from "../../styles";
import { IOrder } from "../../../back/types";
import getSummForOrder from "../../../utils/getSummForOrder";
import { usePaymentMethodsQuery } from "../Orders/api";
import { DayWithOrders } from "./types";
import { StatisticsDay } from "./StatisticsDay";

const getInitialDates = (): { startDate: Date; endDate: Date } => {
  const startDate = new Date();
  const endDate = new Date();

  startDate.setDate(startDate.getDate() - 7);

  return {
    startDate,
    endDate,
  };
};

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
  outline-color: ${textDefaultColor};
  height: 50px;
  min-height: 50px;
  line-height: 50px;
  -webkit-appearance: none;
`;

const GraphicForPeriod = styled.div`
  width: 100%;
  height: 400px;
  display: flex;
  align-items: flex-end;
  overflow-x: auto;
  border-top: 1px solid ${newBorderColor};
  background: white;
  margin-top: 15px;
  padding-top: 60px;
`;

const GraphicForPeriodDay = styled.div`
  width: 0;
  height: 0;
  display: flex;
  flex-direction: column-reverse;
  border-right: 1px solid white;
  min-width: 24px;
  position: relative;
`;

const GraphicForPeriodDayDate = styled.div`
  position: absolute;
  transform: rotate(-90deg);
  bottom: calc(100% + 50px);
  width: 100px;
  height: 23px;
  left: -39px;
  right: 0px;
  margin: auto;
  font-size: 13px;
  line-height: 23px;
`;

const GraphicForPeriodDayMethod = styled.div`
  width: 100%;
  height: 0;
  background: ${textDefaultColor};
  :nth-of-type(1) {
    opacity: 1;
  }
  :nth-of-type(2) {
    opacity: 0.9;
  }
  :nth-of-type(3) {
    opacity: 0.8;
  }
  :nth-of-type(4) {
    opacity: 0.7;
  }
  :nth-of-type(5) {
    opacity: 0.6;
  }
  :nth-of-type(6) {
    opacity: 0.5;
  }
`;

const GraphicLegend = styled.div`
  padding: 15px;
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
`;

const GraphicLegendMethod = styled.div`
  display: flex;
  gap: 10px;
  height: 24px;
  align-items: center;
  ::before {
    content: "";
    background: ${textDefaultColor};
    width: 20px;
    height: 20px;
    display: flex;
    border-radius: 7px;
  }
  :nth-of-type(1) {
    ::before {
      opacity: 1;
    }
  }
  :nth-of-type(2) {
    ::before {
      opacity: 0.9;
    }
  }
  :nth-of-type(3) {
    ::before {
      opacity: 0.8;
    }
  }
  :nth-of-type(4) {
    ::before {
      opacity: 0.7;
    }
  }
  :nth-of-type(5) {
    ::before {
      opacity: 0.6;
    }
  }
  :nth-of-type(6) {
    ::before {
      opacity: 0.5;
    }
  }
`;

export const Statistics: React.FC = () => {
  const i18n = useTranslation();
  const [dayStart, setDayStart] = useState<string>(
    format(getInitialDates().startDate, "yyyy-MM-dd")
  );
  const [dayEnd, setDayEnd] = useState<string>(
    format(getInitialDates().endDate, "yyyy-MM-dd")
  );
  const [selectedDay, setSelectedDay] = useState<DayWithOrders | undefined>();
  const [load, { data, isLoading, isFetching }] = useLazyPeriodStatsQuery();
  const {
    data: paymentMethods,
    isLoading: isLoadingPaymentMethods,
    isFetching: isFetchingPaymentMethods,
  } = usePaymentMethodsQuery();

  useEffect(() => {
    if (dayStart && dayStart !== "" && dayEnd && dayEnd !== "") {
      load({ dayStart, dayEnd });
    }
  }, [dayStart, dayEnd]);

  const ordersByDays: DayWithOrders[] = useMemo(() => {
    if (!paymentMethods) return [];

    const ordersByDaysObject = data?.reduce(
      (acc: { [key: string]: IOrder[] }, order: IOrder) => {
        if (order.crt) {
          const stringDate: string = format(
            new Date(Number(order.crt)),
            "dd.MM-yyyy"
          );
          acc[stringDate] = [...(acc[stringDate] ?? []), order];
        }
        return acc;
      },
      {}
    );

    if (!ordersByDaysObject) return [];

    return Object.keys(ordersByDaysObject).map((key) => {
      const summary = paymentMethods.map(({ title }) => ({
        title: title ?? "",
        total: ordersByDaysObject[key]
          .filter((order) => order.m === title)
          .reduce(
            (acc: number, order: IOrder) =>
              acc + getSummForOrder(order.p, order.d).summWithDiscount,
            0
          ),
      }));

      return {
        date: key,
        orders: ordersByDaysObject[key],
        summary,
        total: summary.reduce((acc, c) => acc + c.total, 0),
      };
    });
  }, [data, paymentMethods]);

  const maxTotal = useMemo(
    () =>
      ordersByDays.reduce((acc, day) => {
        if (day.total >= acc) return day.total;
        return acc;
      }, 0),
    [ordersByDays]
  );

  return (
    <>
      <ModalRests title={i18n.t("menu.names.PERIOD")} isGeneral={true}>
        <Loading
          isLoading={
            isLoading ||
            isFetching ||
            isLoadingPaymentMethods ||
            isFetchingPaymentMethods
          }
        />
        <PeriodController>
          <Input
            defaultValue={dayStart}
            value={dayStart}
            type="date"
            onChange={(e) => setDayStart(e.target.value)}
          />
          <Input
            defaultValue={dayEnd}
            value={dayEnd}
            type="date"
            onChange={(e) => setDayEnd(e.target.value)}
          />
        </PeriodController>
        <GraphicForPeriod>
          {ordersByDays.map((day) => (
            <GraphicForPeriodDay
              key={day.date}
              style={{
                width: `${100 / ordersByDays.length}%`,
                height: `${(day.total * 100) / maxTotal}%`,
              }}
              onClick={() => setSelectedDay(day)}
            >
              <GraphicForPeriodDayDate>
                {day.date.split("-")[0]}
              </GraphicForPeriodDayDate>
              {day.summary.map((method) => (
                <GraphicForPeriodDayMethod
                  key={method.title}
                  style={{
                    height: `${(method.total * 100) / day.total}%`,
                  }}
                />
              ))}
            </GraphicForPeriodDay>
          ))}
        </GraphicForPeriod>
        <GraphicLegend>
          {paymentMethods?.map(({ title }) => (
            <GraphicLegendMethod key={title}>{title}</GraphicLegendMethod>
          ))}
        </GraphicLegend>
      </ModalRests>
      <StatisticsDay
        selectedDay={selectedDay}
        onBack={() => setSelectedDay(undefined)}
      />
    </>
  );
};

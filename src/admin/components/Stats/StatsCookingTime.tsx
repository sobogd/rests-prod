import styled from "@emotion/styled";
import {
  black2,
  black3,
  blackText1,
  blackText2,
  blackText3,
  blue2,
  diagramColors,
  pink1,
  pink2,
  tab1,
  tab2,
} from "../../styles";
import {
  Area,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ComposedChart,
  Line,
  Pie,
  PieChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { DayWithOrders } from "./types";
import { useTranslation } from "react-i18next";
import { memo, useMemo, useState } from "react";
import { useAuth } from "../Auth/Context";
import { formatPrice } from "../../utils/priceFormatter";
import { useCategoriesQuery } from "../Categories/api";
import { dateDurationHHmm } from "../../utils/timeInFormat";

type Props = {
  selectedDay?: DayWithOrders;
  ordersByDays: DayWithOrders[];
};

const Container = styled.div`
  background: ${black2};
  padding: 20px 30px 30px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1;
  max-width: 100%;
`;

const ChartContainer = styled.div`
  width: 100%;
  display: flex;
  height: 400px;

  > div {
    max-width: 100%;
    margin: 0 -25px;
  }
`;

const Title = styled.div`
  color: ${blackText1};
  font-weight: 600;
  font-size: 32px;
  line-height: 36px;
`;

const SubTitle = styled.div`
  color: ${blackText2};
  font-size: 16px;
`;

const ChartLabel = styled.div`
  display: flex;
  gap: 10px;
`;

const ChartLabelTotal = styled.div`
  font-weight: 600;
  color: ${blackText1};
`;

const ChartLabelTitle = styled.div`
  color: ${blackText2};
`;

const ChartLabelColor = styled.div<{ background: string }>`
  background: ${(p) => p.background};
  width: 25px;
  height: 25px;
  border-radius: 20px;
`;

const Tabs = styled.div`
  display: flex;
  gap: 10px;
`;

const Tab = styled.div<{ active: boolean }>`
  background: ${(p) => (p.active ? tab1 : tab2)};
  color: ${blackText1};
  padding: 5px 20px;
  border-radius: 20px;
  cursor: pointer;
  transition: 0.2s;
  font-size: 16px;

  :hover {
    opacity: 0.7;
  }
`;

export const StatsCookingTime = memo((props: Props) => {
  const { selectedDay, ordersByDays } = props;

  const { t } = useTranslation();

  const symbol = useAuth()?.whoami?.company?.symbol;

  const [isFullPeriod, setIsFullPeriod] = useState<boolean>(true);

  const { data: categories } = useCategoriesQuery();

  const summary = useMemo(() => {
    if (!categories?.length) return [];

    const categoriesObject = categories.reduce((acc: any, c) => {
      if (c.id)
        acc[c.id] = {
          id: c.id,
          name: c.name,
          avg: [],
        };
      return acc;
    }, []);

    if (!isFullPeriod) {
      selectedDay?.orders.forEach((order) => {
        order?.p?.forEach((position) => {
          const id = position.cat;
          const time = Number(position.f) - Number(position.crt);
          if (id)
            categoriesObject[id] = {
              ...categoriesObject[id],
              avg: [...categoriesObject[id]?.avg, time],
            };
        });
      });
    }

    if (isFullPeriod && ordersByDays) {
      ordersByDays?.forEach((day) => {
        day?.orders?.forEach((order) => {
          order?.p?.forEach((position) => {
            const id = position?.cat;
            const cookingTime = position?.f
              ? Number(position?.f) - Number(position?.crt)
              : undefined;

            if (id && cookingTime)
              categoriesObject[id] = {
                ...(categoriesObject?.[id] ?? {}),
                avg: [...(categoriesObject?.[id]?.avg ?? []), cookingTime],
              };
          });
        });
      });
    }

    const averageByCategories = Object.values(categoriesObject)
      ?.filter((item: any) => item?.avg?.length > 0)
      ?.map((item: any) => {
        const averageTime =
          item.avg?.reduce((acc: number, time: number) => acc + time, 0) /
          item.avg?.length;

        const maxTime = item.avg?.reduce(
          (acc: number, time: number) => (time >= acc ? time : acc),
          0
        );

        const minTime = item.avg.reduce(
          (acc: number, time: number) => (time <= acc ? time : acc),
          9999999999999
        );

        return {
          name: item.name,
          categoryId: item.id,
          averageTime,
          maxTime,
          minTime,
          avg: item.avg,
        };
      })
      ?.map((item: any) => {
        const hourInMs = 3600000;

        return {
          name: item.name,
          categoryId: item.id,
          averageTime: item.averageTime,
          maxTime:
            item.maxTime - item.averageTime >= hourInMs
              ? item.averageTime + hourInMs
              : item.maxTime,
          minTime:
            item.averageTime - item.minTime >= hourInMs
              ? item.averageTime - hourInMs
              : item.minTime,
          avg: item.avg,
        };
      });

    return averageByCategories ?? [];
  }, [ordersByDays, isFullPeriod, selectedDay, categories]);

  const tickFormatter = (value: number) => dateDurationHHmm(value);

  return (
    <Container>
      <Title>{t("newStats.cookingTime.title")}</Title>
      <SubTitle>{t("newStats.cookingTime.subtitle")}</SubTitle>
      <Tabs>
        <Tab onClick={() => setIsFullPeriod(true)} active={isFullPeriod}>
          {t("newStats.cookingTime.allPeriod")}
        </Tab>
        <Tab onClick={() => setIsFullPeriod(false)} active={!isFullPeriod}>
          {t("newStats.cookingTime.onlyDay")}
        </Tab>
      </Tabs>
      <ChartContainer>
        <ComposedChart
          width={500}
          height={400}
          data={summary}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <XAxis dataKey="name" />
          <YAxis dataKey="maxTime" tickFormatter={tickFormatter} />
          <Line
            dataKey="averageTime"
            stroke={pink1}
            strokeWidth={3}
            dot={false}
            type="monotone"
          />
          <Area
            type="monotone"
            dataKey="maxTime"
            fill={black3}
            stroke={blackText3}
          />
          <Area
            type="monotone"
            dataKey="minTime"
            fill={black2}
            stroke={blackText3}
          />
        </ComposedChart>
      </ChartContainer>
    </Container>
  );
});

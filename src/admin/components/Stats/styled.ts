import styled from "@emotion/styled";
import { ResponsiveContainer } from "recharts";
import { black2, blackText1, black1, blackText2 } from "../../styles";

export const StatisticSummaryDates = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  flex: 1;
  min-width: 250px;
`;

export const StatisticSummaryDatesInput = styled.input`
  width: calc(100% - 30px);
  padding: 0 30px;
  border-radius: 20px;
  font-size: 16px;
  height: 60px;
  line-height: 60px;
  -webkit-appearance: none;
  color-scheme: dark;
  background: ${black2};
  border: 1px solid ${black2};
  outline: none !important;
  color: ${blackText1};
  width: 100%;
`;

export const StatisticSummaryCard = styled.div<{ background: string }>`
  display: flex;
  flex-direction: column;
  padding: 30px;
  height: 140px;
  border-radius: 20px;
  background: ${(p) => p.background};
  justify-content: space-around;
  flex: 1;
  white-space: nowrap;
  min-width: 250px;
`;

export const StatisticSummaryCardTitle = styled.div`
  color: ${blackText1};
  font-size: 16px;
`;

export const StatisticSummaryCardValue = styled.div`
  color: ${blackText1};
  font-size: 32px;
  font-weight: 600;
`;

export const StatisticContainer = styled.div`
  background: ${black1};
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 30px;
  gap: 20px;
  overflow-y: scroll;
`;

export const StatisticGraphicContainer = styled(ResponsiveContainer)`
  max-height: 400px;
  min-height: 400px;
  height: 400px;
  min-width: 100%;
  padding: 0 30px;
`;

export const StatisticGraphicCardScroll = styled.div`
  width: calc(100% + 60px);
  height: 400px;
  overflow-y: hidden;
  overflow-x: scroll;
  margin: 0 -30px;
`;

export const StatisticGraphicTitle = styled.div`
  color: ${blackText1};
  font-weight: 600;
  font-size: 32px;
  line-height: 36px;
`;

export const StatisticGraphicSubTitle = styled.div`
  color: ${blackText2};
  font-size: 16px;
`;

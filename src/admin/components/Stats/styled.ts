import styled from '@emotion/styled';

export const StatisticSummaryDates = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  flex: 1;
  min-width: 250px;
`;

export const StatisticSummaryDatesInput = styled.input`
  padding: 0 30px;
  border-radius: 20px;
  font-size: 16px;
  height: 60px;
  line-height: 60px;
  -webkit-appearance: none;
  color-scheme: ${(props) => props.theme.type};
  background: ${(props) => props.theme.background2};
  border: 1px solid ${(props) => props.theme.background2};
  outline: none !important;
  color: ${(props) => props.theme.text1};
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
  color: ${(props) => props.theme.white1};
  font-size: 16px;
`;

export const StatisticSummaryCardValue = styled.div`
  color: ${(props) => props.theme.white1};
  font-size: 32px;
  font-weight: 600;
`;

export const StatisticContainer = styled.div`
  background: ${(props) => props.theme.background1};
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 30px;
  gap: 20px;
  overflow-y: scroll;
  position: relative;
`;

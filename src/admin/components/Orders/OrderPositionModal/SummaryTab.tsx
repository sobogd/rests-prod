import { FC } from "react";
import { useTranslation } from "react-i18next";
import styled from "@emotion/styled";
import { EPriority } from "../../../../back/types";
import { newBorderColor, newPallet } from "../../../styles";

const TextArea = styled.textarea`
  border-radius: 10px;
  width: 100%;
  height: 120px;
  padding: 15px 20px;
  font-size: 17px;
  overflow: hidden;
  resize: none;
  outline: none;
  background: white;
  border: 1px solid ${newBorderColor};
  margin-bottom: 15px;
`;

const TabContainer = styled.div`
  width: 100%;
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const Subtitle = styled.div`
  width: 100%;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 10px;
`;

const DiscountContainer = styled.div`
  width: calc(100% + 30px);
  margin: 0 -15px 15px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  overflow-x: scroll;
  overflow-y: hidden;
`;

const DiscountTab = styled.div<{ active: boolean }>`
  padding: 5px 10px;
  font-size: 16px;
  background: ${({ active }) => (active ? newPallet.orange1 : newPallet.gray2)};
  border-radius: 10px;
  color: white;
  margin-left: 5px;
  :first-child {
    margin-left: 15px;
  }
  :last-child {
    margin-right: 15px;
  }
`;

export const SummaryTab: FC<{
  comment?: string;
  percent: number;
  setPercent: (number: number) => void;
  priority: EPriority | undefined;
  setPriority: (priority: EPriority | undefined) => void;
  setComment: (comment: string | undefined) => void;
}> = ({ comment, setComment, setPercent, percent, priority, setPriority }) => {
  const i18n = useTranslation();

  const getPriorityTitles = (priority: EPriority | undefined): string => {
    switch (priority) {
      case EPriority.FIRST:
        return i18n.t("priority.first");
      case EPriority.SECOND:
        return i18n.t("priority.second");
      default:
        return i18n.t("priority.no");
    }
  };

  return (
    <TabContainer>
      <Subtitle>{i18n.t("orders.commentPositionTitle")}</Subtitle>
      <TextArea
        placeholder={i18n.t("orders.commentType")}
        value={comment}
        onChange={(e) => {
          setComment(e.target.value);
        }}
      />
      <Subtitle>{i18n.t("orders.discountTitle")}</Subtitle>
      <DiscountContainer>
        {[0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100].map((p) => (
          <DiscountTab active={percent === p} onClick={() => setPercent(p)}>
            {p}%
          </DiscountTab>
        ))}
      </DiscountContainer>
      <Subtitle>{i18n.t("orders.priority")}</Subtitle>
      <DiscountContainer>
        {[undefined, EPriority.FIRST, EPriority.SECOND].map((p) => (
          <DiscountTab active={priority === p} onClick={() => setPriority(p)}>
            {getPriorityTitles(p)}
          </DiscountTab>
        ))}
      </DiscountContainer>
    </TabContainer>
  );
};

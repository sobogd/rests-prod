import styled from "@emotion/styled";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { WindowRests } from "../../../shared/WindowRests";
import { backgroundDefault, prePrimaryColor } from "../../../app/styles";

const DiscountForOrderTitle = styled.div`
  width: 100%;
  padding: 15px 20px;
  background: ${prePrimaryColor};
  font-weight: 600;
  font-size: 20px;
  color: white;
`;

const SaveButton = styled.button`
  width: calc(100% - 40px);
  background: #cf7ff8;
  color: white;
  font-weight: 600;
  font-size: 15px;
  margin: 5px 15px 15px;
  border-radius: 10px;
  height: 45px;
`;

const TextArea = styled.textarea`
  width: calc(100% - 40px);
  border: 0;
  outline: none;
  margin-top: 20px;
  resize: none;
  font-size: 15px;
  background: white;
`;

export const OrderModalComment: FC<{
  comment: string;
  onClose: () => void;
  onSave: (comment: string) => void;
}> = ({ onClose, comment, onSave }) => {
  const i18n = useTranslation();
  const [inputtedComment, setInputtedComment] = useState<string>(comment);

  return (
    <WindowRests
      onClose={() => {
        onClose();
      }}
    >
      <DiscountForOrderTitle>{i18n.t("orders.commentTitle")}</DiscountForOrderTitle>
      <TextArea
        value={inputtedComment}
        placeholder={i18n.t("orders.commentType")}
        onChange={(e) => {
          setInputtedComment(e.target.value ?? "");
        }}
      />
      <SaveButton
        onClick={() => {
          onSave(inputtedComment);
          onClose();
        }}
      >
        {i18n.t("orders.commentButton")}
      </SaveButton>
    </WindowRests>
  );
};

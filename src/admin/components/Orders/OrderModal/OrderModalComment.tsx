import styled from "@emotion/styled";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { ModalRests } from "../../ModalRests";
import { backgroundDefault } from "../../../styles";

const TextArea = styled.textarea`
  border: 0;
  outline: none;
  resize: none;
  background: ${backgroundDefault};
  margin: -15px -15px -65px -15px;
  width: calc(100% + 30px);
  height: calc(100% + 80px);
  padding: 15px;
  font-size: 16px;
`;

export const OrderModalComment: FC<{
  comment: string;
  isShow: boolean;
  onClose: () => void;
  onSave: (comment: string) => void;
}> = ({ onClose, comment, onSave, isShow }) => {
  const i18n = useTranslation();
  const [inputtedComment, setInputtedComment] = useState<string>(comment);

  return (
    <ModalRests
      title={i18n.t("orders.commentTitle")}
      onBack={() => onClose()}
      isAdditionalForAdditional
      isShow={isShow}
      withPadding
      footerSticks={[
        {
          icon: "save",
          onClick: () => {
            onSave(inputtedComment);
            onClose();
          },
        },
      ]}
    >
      <TextArea
        value={inputtedComment}
        placeholder={i18n.t("orders.commentType")}
        onChange={(e) => {
          setInputtedComment(e.target.value ?? "");
        }}
      />
    </ModalRests>
  );
};

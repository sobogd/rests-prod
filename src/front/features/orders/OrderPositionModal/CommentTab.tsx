import { FC } from "react";
import { useTranslation } from "react-i18next";
import styled from "@emotion/styled";
import { backgroundDefault } from "../../../app/styles";

const TextArea = styled.textarea`
  border: 0;
  border-radius: 7px;
  width: 100%;
  height: 80%;
  padding: 15px 20px;
  font-size: 17px;
  overflow: hidden;
  resize: none;
  outline: none;
  background: ${backgroundDefault};
`;

export const CommentTab: FC<{
  comment?: string;
  setComment: (comment: string | undefined) => void;
}> = ({ comment, setComment }) => {
  const i18n = useTranslation();
  return (
    <TextArea
      placeholder={i18n.t("orders.commentType")}
      value={comment}
      onChange={(e) => {
        setComment(e.target.value);
      }}
    />
  );
};

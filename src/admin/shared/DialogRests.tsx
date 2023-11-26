import styled from "@emotion/styled";
import { FC } from "react";
import { prePrimaryColor } from "../app/styles";

const DialogRestsContainer = styled.div`
  position: fixed;
  z-index: 250;
  top: 0;
  left: 0;
  overflow: hidden;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DialogRestsClose = styled.div`
  position: absolute;
  z-index: 251;
  top: 0;
  left: 0;
  overflow: hidden;
  width: 100%;
  height: 100%;
  background: #ffffffc7;
`;

const DialogRestsDiv = styled.div`
  background: white;
  z-index: 255;
  border: 1px solid #ede7ff;
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 0 25px;
`;

const DialogRestsButton = styled.button`
  font-size: 17px;
  font-weight: 600;
  padding: 15px;
  width: calc(100vw - 50px);
  border-top: 1px solid #ede7ff;
  color: #373737;
  :nth-child(1) {
    border-top: 0;
  }
`;

const DialogTitle = styled.span`
  width: 100%;
  padding: 15px 20px;
  background: ${prePrimaryColor};
  font-weight: 600;
  font-size: 20px;
  color: white;
  text-align: center;
`;

export const DialogRests: FC<{
  onClose: () => void;
  buttons: ({ title: string; onClick: () => void } | null)[];
  title?: string;
}> = ({ onClose, buttons, title }) => {
  return (
    <DialogRestsContainer>
      <DialogRestsClose onClick={() => onClose()}></DialogRestsClose>
      <DialogRestsDiv>
        {title ? <DialogTitle>{title}</DialogTitle> : null}
        {buttons
          ?.filter((button) => !!button)
          .map((button) => (
            <DialogRestsButton
              onClick={() => {
                button?.onClick();
                onClose();
              }}
            >
              {button?.title}
            </DialogRestsButton>
          ))}
      </DialogRestsDiv>
    </DialogRestsContainer>
  );
};

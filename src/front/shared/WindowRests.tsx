import styled from "@emotion/styled";
import { FC } from "react";

const WindowRestsContainer = styled.div`
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

const WindowRestsClose = styled.div`
  position: absolute;
  z-index: 251;
  top: 0;
  left: 0;
  overflow: hidden;
  width: 100%;
  height: 100%;
  background: #ffffffc7;
`;

const WindowRestsDiv = styled.div`
  background: white;
  z-index: 255;
  border: 1px solid #ede7ff;
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  margin: 0 25px;
  max-height: 95vh;
  overflow-y: auto;
`;

export const WindowRests: FC<{
  onClose: () => void;
  children: any;
}> = ({ onClose, children }) => {
  return (
    <WindowRestsContainer>
      <WindowRestsClose onClick={() => onClose()}></WindowRestsClose>
      <WindowRestsDiv>{children}</WindowRestsDiv>
    </WindowRestsContainer>
  );
};

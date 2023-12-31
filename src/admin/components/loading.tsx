import React from "react";
import styled from "@emotion/styled";
import { backgroundDefault, textDefaultColor } from "../styles";

export const LoadingContainer = styled.div<{
  isLoading: boolean;
}>`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background: ${backgroundDefault};
  z-index: 9999;
  transition: none;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: ${({ isLoading }) => (isLoading ? "initial" : "none")};
  opacity: ${({ isLoading }) => (isLoading ? "1" : "0")};

  svg {
    color: ${textDefaultColor};
  }
  * {
    transition: none;
  }
`;

const Loading: React.FC<{ isLoading: boolean }> = ({ isLoading }) => {
  return (
    <LoadingContainer isLoading={isLoading} className="loading">
      <div className="background" style={{ background: backgroundDefault }}>
        <div className="lds-ellipsis">
          <div style={{ background: textDefaultColor }}></div>
          <div style={{ background: textDefaultColor }}></div>
          <div style={{ background: textDefaultColor }}></div>
          <div style={{ background: textDefaultColor }}></div>
        </div>
      </div>
    </LoadingContainer>
  );
};

export default Loading;

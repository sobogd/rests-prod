import React from "react";
import styled from "@emotion/styled";
import {
  backgroundDefault,
  black1,
  blackText1,
  textDefaultColor,
} from "../styles";

export const LoadingContainer = styled.div<{
  isLoading: boolean;
  isDark?: boolean;
}>`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background: ${(p) => (p.isDark ? black1 : backgroundDefault)};
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

const Loading: React.FC<{ isLoading: boolean; isDark?: boolean }> = ({
  isLoading,
  isDark,
}) => {
  return (
    <LoadingContainer isLoading={isLoading} isDark={isDark} className="loading">
      <div
        className="background"
        style={{ background: isDark ? black1 : backgroundDefault }}
      >
        <div className="lds-ellipsis">
          <div
            style={{ background: isDark ? blackText1 : textDefaultColor }}
          ></div>
          <div
            style={{ background: isDark ? blackText1 : textDefaultColor }}
          ></div>
          <div
            style={{ background: isDark ? blackText1 : textDefaultColor }}
          ></div>
          <div
            style={{ background: isDark ? blackText1 : textDefaultColor }}
          ></div>
        </div>
      </div>
    </LoadingContainer>
  );
};

export default Loading;

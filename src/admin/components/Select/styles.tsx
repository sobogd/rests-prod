import styled from "@emotion/styled";
import { backgroundDefault, newBorderColor, errorColor, textDefaultColor } from "../../styles";

const Container = styled.div<{ mb?: boolean }>`
  ${({ mb }) => (mb ? `margin-bottom: 15px;` : null)}
  position: relative;
  display: flex;
  flex-direction: column !important;
  position: relative !important;
  width: 100%;
  width: 100%;
  label {
    position: absolute;
    height: 30px;
    top: -15px;
    left: 11px;
    line-height: 30px;
    font-size: 12px;
    white-space: nowrap;
    z-index: 2;
    padding: 0 6px;
    color: #999999;
    ::before {
      content: "";
      background: ${backgroundDefault};
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: calc(50% + 1px);
      z-index: -1;
    }
    ::after {
      content: "";
      position: absolute;
      background: white;
      width: 100%;
      bottom: 0;
      height: 15px;
      left: 0;
      z-index: -1;
    }
  }
`;

const Select = styled.select<{ mb?: boolean }>`
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  padding: 0 15px;
  height: 50px;
  border: 1px solid ${newBorderColor};
  font-size: 16px;
  border-radius: 10px;
  width: 100%;
  background: white;
  outline-color: ${textDefaultColor};
  font-weight: 400;
`;

const Error = styled.div<{ mb?: boolean }>`
  ${({ mb }) => (!mb ? `margin-bottom: 5px;` : null)}
  color: ${errorColor};
  padding: 5px 15px 0;
  font-size: 13px;
`;

export const SelectStyled = {
  Error: Error,
  Select: Select,
  Container: Container,
};

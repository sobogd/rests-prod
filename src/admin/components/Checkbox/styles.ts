import styled from "@emotion/styled";
import { errorColor, newBorderColor, textDefaultColor } from "../../styles";

const Container = styled.div<{ mb?: boolean }>`
  ${({ mb }) => (mb ? `margin-bottom: 15px;` : null)}
  display: flex;
  flex-direction: column !important;
  position: relative !important;
  width: 100%;
`;

const CheckboxLabel = styled.label<{ checked?: boolean }>`
  min-height: 40px;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  svg {
    background: white;
    border: 1px solid ${newBorderColor};
    width: 30px;
    height: 30px;
    min-width: 30px;
    min-height: 30px;
    border-radius: 8px;
    margin-right: 15px;
    padding: 4px;
    color: ${({ checked }) => (checked ? textDefaultColor : "white")};
  }
`;

const Error = styled.div<{ mb?: boolean }>`
  ${({ mb }) => (!mb ? `margin-bottom: 5px;` : null)}
  color: ${errorColor};
  font-size: 13px;
`;

export const CheckboxStyled = {
  Error,
  CheckboxLabel,
  Container,
};

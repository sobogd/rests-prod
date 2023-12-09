import React from "react";
import styled from "@emotion/styled";
import { TbBackspace } from "react-icons/tb";
import { newBorderColor, textDefaultColor } from "../styles";

export const Container = styled.div`
  width: 100%;
  position: relative;
  input {
    width: 100%;
    height: 50px;
    border-radius: 10px;
    border: 1px solid ${newBorderColor};
    outline-color: ${textDefaultColor};
    padding: 0 45px 0 15px;
    font-size: 16px;
  }
  button {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    height: 50px;
    width: 50px;
    svg {
      width: 20px;
      height: 20px;
    }
  }
`;

const InputWithClear: React.FC<{
  placeholder: string;
  value: string | number;
  onChangeValue: (value: string | number) => void;
}> = ({ placeholder, value, onChangeValue }) => {
  return (
    <Container>
      <input placeholder={placeholder} value={value} onChange={(e) => onChangeValue(e.target.value)} />
      <button onClick={() => onChangeValue("")}>
        <TbBackspace />
      </button>
    </Container>
  );
};

export default InputWithClear;

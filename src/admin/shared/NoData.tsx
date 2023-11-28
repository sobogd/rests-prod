import React from "react";
import styled from "@emotion/styled";
import { TbFileOff } from "react-icons/tb";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  padding-bottom: 60px;
  color: rgb(168 168 168);
  svg {
    margin-bottom: 10px;
  }
`;

const NoData: React.FC<{
  text: string;
}> = ({ text }) => {
  return (
    <Container>
      <TbFileOff size={100} color={"rgb(210 210 210)"} />
      {text}
    </Container>
  );
};

export default NoData;

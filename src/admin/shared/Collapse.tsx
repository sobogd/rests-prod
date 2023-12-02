import React, { useState } from "react";
import styled from "@emotion/styled";
import { TbChevronDown, TbChevronUp } from "react-icons/tb";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  span {
    font-size: 20px;
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 15px;
    svg {
      width: 30px;
      height: 30px;
      padding: 4px 0;
      margin-right: -5px;
    }
  }
`;

const Collapse: React.FC<{
  title: string;
  children: any;
  opened?: boolean;
  alwaysOpened?: boolean;
}> = ({ children, title, opened }) => {
  const [open, setOpen] = useState<boolean>(opened ?? false);
  return (
    <Container>
      <span onClick={() => setOpen(!open)}>
        {title}
        {open ? <TbChevronUp /> : <TbChevronDown />}
      </span>
      <div style={{ display: !open ? "none" : undefined }}>{children}</div>
    </Container>
  );
};

export default Collapse;

import React from "react";
import styled from "@emotion/styled";
import { TbChevronRight } from "react-icons/tb";
import { newBorderColor, textDefaultColor } from "../styles";

const ListDiv = styled.div<{ withPadding?: boolean; withMargin?: boolean }>`
  display: flex;
  width: calc(100% + 30px);
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin: ${({ withMargin }) => (withMargin ? "15px" : "0")} -15px;
  border-top: 1px solid ${newBorderColor};
  border-bottom: 1px solid ${newBorderColor};
  padding: ${({ withPadding }) => (withPadding ? "0 15px" : "0")};
`;

const ItemDiv = styled.div<{ paddingRight?: boolean; opacity?: number }>`
  width: 100%;
  border-bottom: 1px solid ${newBorderColor};
  padding: 15px ${({ paddingRight }) => (paddingRight ? "50px" : "20px")} 15px 20px;
  background: white;
  position: relative;
  opacity: ${({ opacity }) => opacity ?? "1"};
  :last-child {
    border-bottom: 0;
  }
`;

const ItemDivTitle = styled.div`
  width: 100%;
  font-size: 18px;
  font-weight: 400;
`;

const ItemDivDescription = styled.div`
  width: 100%;
  font-size: 16px;
  color: gray;
`;

const ItemDivButton = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 50px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    width: 22px;
    height: 22px;
  }
`;

const ItemDivPrimaryButton = styled.div<{ primaryButtonColor?: string; primaryButtonTextColor?: string }>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ primaryButtonColor }) => primaryButtonColor ?? textDefaultColor};
  color: ${({ primaryButtonTextColor }) => primaryButtonTextColor ?? "white"};
  margin-top: 15px;
  border-radius: 10px;
  height: 45px;
  font-weight: 600;
  font-size: 16px;
`;

type ButtonTypes = "next" | "dots" | "primary";

const getIconForButtonType = (buttonType: ButtonTypes) => {
  switch (buttonType) {
    case "next":
      return <TbChevronRight />;
    case "dots":
      return <TbChevronRight />;
    default:
      return null;
  }
};

const List: React.FC<{
  items: {
    title: any;
    description?: any;
    buttonType?: ButtonTypes;
    onClick: () => void;
    id?: number | string;
    primaryButtonText?: string;
    primaryButtonColor?: string;
    primaryButtonTextColor?: string;
    opacity?: number;
  }[];
  withPadding?: boolean;
  withMargin?: boolean;
}> = ({ items, withPadding, withMargin = true }) => {
  return (
    <ListDiv withPadding={withPadding} withMargin={withMargin}>
      {items?.map((item) => (
        <ItemDiv
          onClick={() => {
            if (item.buttonType !== "primary") item.onClick();
          }}
          paddingRight={item.buttonType === "dots" || item.buttonType === "next"}
          opacity={item.opacity}
        >
          <ItemDivTitle>{item.title}</ItemDivTitle>
          {item.description ? <ItemDivDescription>{item.description}</ItemDivDescription> : null}
          {item.buttonType === "primary" ? (
            <ItemDivPrimaryButton
              onClick={() => item.onClick()}
              primaryButtonColor={item.primaryButtonColor}
              primaryButtonTextColor={item.primaryButtonTextColor}
            >
              {item.primaryButtonText}
            </ItemDivPrimaryButton>
          ) : null}
          {item.buttonType === "next" || item.buttonType === "dots" ? (
            <ItemDivButton>{getIconForButtonType(item.buttonType)}</ItemDivButton>
          ) : null}
        </ItemDiv>
      ))}
    </ListDiv>
  );
};

export default List;

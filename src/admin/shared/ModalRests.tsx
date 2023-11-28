import styled from "@emotion/styled";
import { FC, useMemo, useState } from "react";
import { MenuRests } from "./MenuRests";
import { DialogRests } from "./DialogRests";
import { useTranslation } from "react-i18next";
import { backgroundDefault, prePrimaryColor } from "../app/styles";

const ModalRestsDiv = styled.div`
  position: fixed;
  z-index: 200;
  background: white;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 0;
  box-sizing: border-box;
  top: 0;
  left: 0;
  overflow: hidden;
`;

const ModalRestsHeader = styled.div`
  display: flex;
  flex-direction: row;
  padding: 7px;
  justify-content: space-between;
  gap: 5px;
  align-items: center;
  background: ${prePrimaryColor};
  color: white;
`;

const ModalRestsTitle = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 20px;
  font-weight: 600;
  flex: 100%;
  span {
    margin-top: -5px;
    font-size: 15px;
    font-size: 15px;
    font-weight: 400;
    color: #eae2ff;
    white-space: nowrap;
    overflow-x: hidden;
    max-width: 230px;
    text-overflow: ellipsis;
  }
`;

const ModalRestsHeaderButton = styled.button`
  border-radius: 10px;
  width: 45px;
  height: 45px;
  min-width: 45px;
  position: relative;
  span,
  strong,
  b {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 20px;
    height: 2.7px;
    background: white;
    margin: auto;
    transform: rotate(-45deg);
    :nth-child(2) {
      transform: rotate(45deg);
    }
  }
  b {
    width: 12px;
    top: -8px;
    border-radius: 4px;
    left: -8px;
    :nth-child(2) {
      bottom: -7px;
      top: 0;
    }
    :nth-child(3) {
      bottom: 0px;
      left: 2px;
      transform: none;
      top: -1px;
      width: 16px;
    }
  }
  strong {
    width: 5px;
    height: 5px;
    border-radius: 5px;
    :nth-child(2) {
      top: -16px;
    }
    :nth-child(3) {
      bottom: -16px;
    }
  }
`;

const ModalRestsHeaderMenu = styled.button<{ isFilter?: boolean }>`
  border-radius: 10px;
  width: 45px;
  height: 45px;
  min-width: 45px;
  position: relative;
  b {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    height: 2.7px;
    background: white;
    margin: auto;
    width: 22px;
    border-radius: 4px;
    ::before {
      ${({ isFilter }) => (isFilter ? 'content: "";' : "")}
      position: absolute;
      top: -2px;
      left: 3px;
      width: 7px;
      height: 7px;
      background: #a486f8;
      border: 2.7px solid white;
      border-radius: 10px;
      z-index: 3;
    }
    :nth-child(2) {
      top: -14px;
      ::before {
        left: auto;
        right: 3px;
      }
    }
    :nth-child(3) {
      bottom: -14px;
      ::before {
        left: 7px;
      }
    }
  }
`;

const ModalRestsBody = styled.div`
  width: 100%;
  height: 100%;
  flex: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  background: ${backgroundDefault};
  align-items: flex-start;
  display: flex;
  flex-direction: column;
`;

const ModalRestsFooterButton = styled.button`
  display: flex;
  background: #cf7ff8;
  min-height: 50px;
  font-size: 17px;
  font-weight: 600;
  color: white;
  align-items: center;
  justify-content: center;
`;

export const ModalRests: FC<{
  onClose?: () => void;
  onBack?: () => void;
  onFilter?: () => void;
  isHaveMenu?: boolean;
  title: string;
  description?: string;
  moreTitle?: string;
  footerButton?: { title: string; onClick: () => void };
  moreButtons?: ({ title: string; onClick: () => void } | null)[];
  withPadding?: boolean;
  children?: any;
}> = ({
  onClose,
  onBack,
  onFilter,
  title,
  description,
  footerButton,
  children,
  isHaveMenu,
  moreButtons,
  moreTitle,
  withPadding,
}) => {
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);

  const positionDialog = useMemo(
    () =>
      isOpenDialog && !!moreButtons?.length ? (
        <DialogRests
          onClose={() => {
            setIsOpenDialog(false);
          }}
          buttons={moreButtons}
          title={moreTitle ?? undefined}
        />
      ) : null,
    [isOpenDialog]
  );

  return (
    <ModalRestsDiv>
      <ModalRestsHeader>
        {isHaveMenu ? (
          <ModalRestsHeaderMenu onClick={() => setIsOpenMenu(!isOpenMenu)}>
            <b></b>
            <b></b>
            <b></b>
          </ModalRestsHeaderMenu>
        ) : null}
        {isHaveMenu && isOpenMenu ? <MenuRests onClose={() => setIsOpenMenu(false)} /> : null}
        {onBack ? (
          <ModalRestsHeaderButton onClick={onBack}>
            <b></b>
            <b></b>
            <b></b>
          </ModalRestsHeaderButton>
        ) : null}
        <ModalRestsTitle>
          {title}
          {description?.length ? (
            <span style={{ maxWidth: onClose ? "calc(100vw - 120px)" : "calc(100vw - 20px)" }}>
              {description}
            </span>
          ) : null}
        </ModalRestsTitle>
        {moreButtons?.length ? (
          <ModalRestsHeaderButton onClick={() => setIsOpenDialog(true)}>
            <strong></strong>
            <strong></strong>
            <strong></strong>
          </ModalRestsHeaderButton>
        ) : null}
        {isOpenDialog ? positionDialog : null}
        {onClose ? (
          <ModalRestsHeaderButton onClick={onClose}>
            <span></span>
            <span></span>
          </ModalRestsHeaderButton>
        ) : null}
        {onFilter ? (
          <ModalRestsHeaderMenu isFilter={true} onClick={() => onFilter()}>
            <b></b>
            <b></b>
            <b></b>
          </ModalRestsHeaderMenu>
        ) : null}
      </ModalRestsHeader>
      <ModalRestsBody style={withPadding ? { padding: "15px" } : undefined}>{children}</ModalRestsBody>
      {footerButton ? (
        <ModalRestsFooterButton onClick={footerButton.onClick}>{footerButton.title}</ModalRestsFooterButton>
      ) : null}
    </ModalRestsDiv>
  );
};

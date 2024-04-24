import styled from "@emotion/styled";
import { FC, useState } from "react";
import {
  TbAlignJustified,
  TbCheck,
  TbPlus,
  TbChevronLeft,
  TbDotsVertical,
  TbFilter,
  TbChevronRight,
  TbCopy,
  TbTrash,
  TbPercentage,
} from "react-icons/tb";
import { AiOutlineClose } from "react-icons/ai";
import Loading from "./loading";
import { useMenu } from "../components/Menu/Menu";
import {
  boxShadowRight,
  textDefaultColor,
  backgroundDefault,
  boxShadow,
  newBorderColor,
} from "../styles";
import { useTranslation } from "react-i18next";
import { useAuth } from "./Auth/Context";

const ModalRestsDiv = styled.div<{
  isShow?: boolean;
  isGeneral?: boolean;
  isOpenAdditional?: boolean;
  isAdditionalForAdditional?: boolean;
  isFullScreen?: boolean;
  background?: string;
}>`
  position: absolute;
  z-index: 200;
  background: ${({ background }) => background ?? "white"};
  display: flex;
  flex-direction: column;
  width: 100% ${({ isFullScreen }) => (isFullScreen ? "!important" : null)};
  height: 100%;
  padding: 0;
  box-sizing: border-box;
  top: 0;
  overflow: hidden;
  transition: 0.3s;
  right: ${({ isShow }) =>
    isShow === undefined || isShow === true ? "0" : "-100%"};
  .loading {
    position: absolute;
    width: 100%;
    height: calc(100% - 55px);
    top: 55px;
    left: 0;
  }
  @media (min-width: 1000px) {
    box-shadow: ${boxShadowRight};
    width: ${({
      isGeneral,
      isShow,
      isOpenAdditional,
      isAdditionalForAdditional,
    }) => {
      if (isAdditionalForAdditional) {
        return "100%";
      }
      if (!isGeneral && isShow) {
        return "calc((100% - 320px) / 2)";
      }
      if (isGeneral && !isShow) {
        if (isOpenAdditional) {
          return "calc((100% - 320px) / 2)";
        } else {
          return "calc((100% - 320px))";
        }
      }
    }};
    left: ${({
      isGeneral,
      isShow,
      isAdditionalForAdditional,
      isFullScreen,
    }) => {
      if (isFullScreen) {
        return "0";
      }
      if (isAdditionalForAdditional) {
        if (isShow) {
          return "0";
        } else {
          return "100%";
        }
      }
      if (!isGeneral && isShow) {
        return "calc((100% - 320px) / 2 + 320px)";
      }
      if (!isGeneral && !isShow) {
        return "100%";
      }
      if (isGeneral) {
        return "320px";
      }
      return "320px";
    }};
    pointer-events: inherit;
  }
`;

const ModalRestsHeader = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0 15px;
  height: 55px;
  min-height: 55px;
  justify-content: space-between;
  gap: 5px;
  align-items: center;
  background: ${textDefaultColor};
  color: white;
`;

const ModalRestsTitle = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 20px;
  font-weight: 400;
  flex: 100%;
  margin-left: -5px;
  @media (min-width: 1000px) {
    margin-left: 5px;
  }
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

const ModalRestsHeaderButton = styled.span<{ isFilter?: boolean }>`
  width: 55px;
  height: 55px;
  min-width: 55px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: -15px;
  text-transform: uppercase;
  svg {
    width: 22px;
    height: 22px;
  }
`;

const ModalRestsHeaderMenu = styled(ModalRestsHeaderButton)`
  @media (min-width: 1000px) {
    display: none;
  }
`;

const ModalRestsHeaderBack = styled(ModalRestsHeaderButton)`
  svg {
    width: 26px;
    height: 26px;
  }
`;

const ModalRestsHeaderMore = styled(ModalRestsHeaderButton)`
  margin-left: 0;
  margin-right: -15px;
  svg {
    width: 22px;
    height: 22px;
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
  background: ${textDefaultColor};
  min-height: 50px;
  font-size: 16px;
  font-weight: 600;
  color: white;
  align-items: center;
  justify-content: center;
  svg {
    margin-right: 8px;
    width: 22px;
    height: 22px;
  }
`;

const ModalRestsFooterSticks = styled.div`
  position: absolute;
  bottom: 15px;
  right: 15px;
  height: 50px;
  display: flex;
  flex-direction: row-reverse;
  gap: 15px;
`;

const ModalRestsFooterStick = styled.button<{ iconColor?: string }>`
  background: ${({ iconColor }) => iconColor ?? textDefaultColor};
  width: 50px;
  height: 50px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50px;
  box-shadow: ${boxShadow};
  svg {
    width: 22px;
    height: 22px;
  }
`;

const MoreButtons = styled.div<{ isOpenLang: boolean }>`
  backdrop-filter: blur(3px);
  position: absolute;
  z-index: 290;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: ${({ isOpenLang }) => (isOpenLang ? "1" : "0")};
  transition: 0.3s;
  pointer-events: ${({ isOpenLang }) => (isOpenLang ? "inherit" : "none")};
  ul {
    position: absolute;
    top: 70px;
    right: 20px;
    background: #faf8f8;
    display: flex;
    flex-direction: column;
    max-height: 50vh;
    overflow-y: scroll;
    overflow-x: hidden;
    border-radius: 10px;
    list-style: none;
    padding: 0;
    margin: 0;
    box-shadow: ${boxShadow};
    li {
      font-weight: 600;
      font-size: 14px;
      text-align: center;
      border-bottom: 1px solid ${newBorderColor};
      padding: 10px 20px;
      :last-child {
        border: 0;
      }
    }
  }
`;

const MenuRestsHeaderLangs = styled.div<{ isOpenLang: boolean }>`
  backdrop-filter: blur(3px);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  opacity: ${({ isOpenLang }) => (isOpenLang ? "1" : "0")};
  transition: 0.3s;
  pointer-events: ${({ isOpenLang }) => (isOpenLang ? "inherit" : "none")};
  ul {
    position: absolute;
    top: 70px;
    right: 20px;
    background: #faf8f8;
    display: flex;
    flex-direction: column;
    max-height: 50vh;
    overflow-y: scroll;
    overflow-x: hidden;
    border-radius: 10px;
    list-style: none;
    padding: 0;
    margin: 0;
    box-shadow: ${boxShadow};
    li {
      text-transform: uppercase;
      font-weight: 600;
      font-size: 14px;
      text-align: center;
      border-bottom: 1px solid ${newBorderColor};
      padding: 10px 20px;
      color: ${textDefaultColor};
      :last-child {
        border: 0;
      }
    }
  }
`;

type IFooterStickType = "new" | "save" | "copy" | "next" | "trash" | "discount";

const getIconForFooterStick = (icon: IFooterStickType) => {
  switch (icon) {
    case "new":
      return <TbPlus />;
    case "copy":
      return <TbCopy />;
    case "next":
      return <TbChevronRight />;
    case "trash":
      return <TbTrash />;
    case "discount":
      return <TbPercentage />;
    default:
      return <TbCheck />;
  }
};

export const ModalRests: FC<{
  onClose?: () => void;
  onBack?: () => void;
  onFilter?: () => void;
  isHaveMenu?: boolean;
  title: string;
  description?: string;
  moreTitle?: string;
  footerButton?: { title: any; onClick?: () => void; isSubmit?: boolean };
  footerSticks?: {
    icon: IFooterStickType;
    iconColor?: string;
    onClick?: () => void;
  }[];
  moreButtons?: ({ title: string; onClick: () => void } | null)[];
  withPadding?: boolean;
  children?: any;
  isShow?: boolean;
  isLoading?: boolean;
  isGeneral?: boolean;
  isOpenAdditional?: boolean;
  isAdditionalForAdditional?: boolean;
  isFullScreen?: boolean;
  isHaveLangs?: boolean;
  background?: string;
}> = ({
  onClose,
  onBack,
  onFilter,
  title,
  footerButton,
  children,
  moreButtons,
  withPadding,
  isShow,
  footerSticks,
  isLoading,
  isGeneral,
  isOpenAdditional,
  isAdditionalForAdditional,
  isFullScreen,
  isHaveLangs,
  background,
}) => {
  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);
  const [isOpenLang, setIsOpenLang] = useState<boolean>(false);
  const { setIsOpenMenu } = useMenu();
  const { whoami } = useAuth();
  const { i18n } = useTranslation();

  return (
    <ModalRestsDiv
      isShow={isShow}
      isGeneral={isGeneral}
      isAdditionalForAdditional={isAdditionalForAdditional}
      isOpenAdditional={isOpenAdditional}
      isFullScreen={isFullScreen}
      background={background}
    >
      <ModalRestsHeader>
        {onBack ? (
          <ModalRestsHeaderBack onClick={onBack}>
            <TbChevronLeft />
          </ModalRestsHeaderBack>
        ) : !isFullScreen ? (
          <ModalRestsHeaderMenu onClick={() => setIsOpenMenu(true)}>
            <TbAlignJustified />
          </ModalRestsHeaderMenu>
        ) : null}
        <ModalRestsTitle>{title}</ModalRestsTitle>
        {moreButtons?.length ? (
          <ModalRestsHeaderMore onClick={() => setIsOpenDialog(true)}>
            <TbDotsVertical />
          </ModalRestsHeaderMore>
        ) : null}
        {isHaveLangs ? (
          <MenuRestsHeaderLangs
            isOpenLang={isOpenLang}
            onClick={(e) => {
              e.stopPropagation();
              setIsOpenLang(false);
            }}
          >
            <ul>
              <li onClick={() => i18n.changeLanguage(whoami?.company?.lang)}>
                {whoami?.company?.lang}
              </li>
              {whoami?.company?.langs?.map((lang) => (
                <li onClick={() => i18n.changeLanguage(lang)} key={lang}>
                  {lang}
                </li>
              ))}
            </ul>
          </MenuRestsHeaderLangs>
        ) : null}
        {isHaveLangs ? (
          <ModalRestsHeaderMore onClick={() => setIsOpenLang(true)}>
            {i18n.language}
          </ModalRestsHeaderMore>
        ) : null}
        {onClose ? (
          <ModalRestsHeaderMore onClick={onClose}>
            <AiOutlineClose />
          </ModalRestsHeaderMore>
        ) : null}
        {onFilter ? (
          <ModalRestsHeaderMore onClick={onFilter}>
            <TbFilter />
          </ModalRestsHeaderMore>
        ) : null}
      </ModalRestsHeader>
      <ModalRestsBody
        style={{
          padding: withPadding ? "15px" : undefined,
          paddingBottom: footerSticks?.length ? "65px" : undefined,
          background,
        }}
      >
        {children}
      </ModalRestsBody>
      {footerButton ? (
        <ModalRestsFooterButton
          type={footerButton?.isSubmit ? "submit" : undefined}
          onClick={footerButton.onClick}
        >
          {footerButton.title}
        </ModalRestsFooterButton>
      ) : null}
      <MoreButtons
        isOpenLang={isOpenDialog}
        onClick={(e) => {
          e.stopPropagation();
          setIsOpenDialog(false);
        }}
      >
        <ul>
          {moreButtons
            ?.filter((button) => button != null)
            ?.map((button) => (
              <li
                onClick={() => {
                  button?.onClick();
                  setIsOpenDialog(false);
                }}
              >
                {button?.title}
              </li>
            ))}
        </ul>
      </MoreButtons>
      {footerSticks?.length ? (
        <ModalRestsFooterSticks>
          {footerSticks.map((footerStick) => (
            <ModalRestsFooterStick
              onClick={footerStick.onClick}
              iconColor={footerStick.iconColor}
            >
              {getIconForFooterStick(footerStick.icon)}
            </ModalRestsFooterStick>
          ))}
        </ModalRestsFooterSticks>
      ) : null}
      <Loading isLoading={isLoading ?? false} />
    </ModalRestsDiv>
  );
};

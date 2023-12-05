import styled from "@emotion/styled";
import { FC, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { DialogRests } from "./DialogRests";
import { useAppDispatch, useAppSelector } from "../app/store";
import {
  UniversalList,
  UniversalListItem,
  backgroundDefault,
  borderColorDefault,
  boxShadow,
  newBorderColor,
  prePrimaryColor,
  textDefaultColor,
} from "../app/styles";
import { commonActions } from "../features/common/slice";
import { CMenuItems } from "../menu";
import { useAuth } from "../features/Auth/Context";
import { TbBuildingSkyscraper, TbLanguage, TbLogout } from "react-icons/tb";
import { AiOutlineClose } from "react-icons/ai";
import { EPages } from "../features/common/enums";

const MenuRestsContainer = styled.div<{ isOpenMenu: boolean }>`
  position: absolute;
  z-index: 250;
  top: 0;
  left: 0;
  overflow-y: scroll;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  background: ${backgroundDefault};
  flex-direction: column;
  color: ${textDefaultColor};
  transition: 0.3s;
  opacity: ${({ isOpenMenu }) => (isOpenMenu ? "1" : "0")};
  pointer-events: ${({ isOpenMenu }) => (isOpenMenu ? "inherit" : "none")};
`;

const MenuRestsHeader = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  padding-bottom: 25px;
  > span {
    position: absolute;
    top: 0;
    left: 0;
    width: 60px;
    height: 60px;
    :last-child {
      left: auto;
      right: 0;
      align-items: center;
      justify-content: center;
      display: flex;
      font-size: 16px;
      font-weight: 600;
      text-transform: uppercase;
    }
    svg {
      width: 100%;
      height: 100%;
      padding: 18px;
    }
  }
  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding-top: 15px;
    svg {
      width: 70px;
      height: 70px;
      background: ${textDefaultColor};
      color: white;
      border-radius: 100px;
      padding: 10px;
      margin: 15px 0 10px;
    }
    span {
      font-size: 20px;
      font-weight: 600;
    }
    p {
      font-size: 16px;
      margin-top: -2px;
      color: gray;
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
  opacity: ${({ isOpenLang }) => (isOpenLang ? "1" : "0")};
  transition: 0.3s;
  pointer-events: ${({ isOpenLang }) => (isOpenLang ? "inherit" : "none")};
  ul {
    position: absolute;
    top: 60px;
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
      :last-child {
        border: 0;
      }
    }
  }
`;

const MenuRestsLinks = styled.div`
  display: flex;
  background: white;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  margin-bottom: 25px;
  border-top: 1px solid ${newBorderColor};
  > div {
    display: flex;
    width: 100%;
    padding: 0 20px;
    align-items: center;
    justify-content: flex-start;
    border-bottom: 1px solid ${newBorderColor};
    svg {
      max-width: 35px;
      max-height: 35px;
      min-width: 35px;
      min-height: 35px;
      background: ${textDefaultColor};
      color: white;
      padding: 7px;
      border-radius: 10px;
      margin: 7px 0;
    }
    span {
      font-size: 16px;
      margin: 0 15px;
    }
  }
`;

export const MenuRests: FC<{
  onClose: () => void;
  isOpenMenu: boolean;
}> = ({ onClose, isOpenMenu }) => {
  const { i18n, t } = useTranslation();
  const { whoami, setActivePage, logout } = useAuth();
  const [isOpenLang, setIsOpenLang] = useState<boolean>(false);

  const handleGoCompany = () => {
    if (whoami?.user?.type === "admin") {
      setActivePage(EPages.COMPANY);
    }
  };

  return (
    <MenuRestsContainer isOpenMenu={isOpenMenu}>
      <MenuRestsHeader>
        <span onClick={onClose}>
          <AiOutlineClose />
        </span>
        <div>
          <TbBuildingSkyscraper onClick={() => handleGoCompany()} />
          <span onClick={() => handleGoCompany()}>{whoami?.company?.title}</span>
          <p onClick={() => handleGoCompany()}>User: {whoami?.user?.name}</p>
        </div>
        <span
          onClick={(e) => {
            e.stopPropagation();
            setIsOpenLang(true);
          }}
        >
          {i18n.language}
        </span>
      </MenuRestsHeader>
      <MenuRestsHeaderLangs
        isOpenLang={isOpenLang}
        onClick={(e) => {
          e.stopPropagation();
          setIsOpenLang(false);
        }}
      >
        <ul>
          <li onClick={() => i18n.changeLanguage(whoami?.company?.lang)}>{whoami?.company?.lang}</li>
          {whoami?.company?.langs?.map((lang) => (
            <li onClick={() => i18n.changeLanguage(lang)} key={lang}>
              {lang}
            </li>
          ))}
        </ul>
      </MenuRestsHeaderLangs>
      {["work", "stats", "service", "admin"].map((group) => {
        const filteredItems = CMenuItems.filter(
          (item) =>
            item.permissions.includes(whoami?.user?.type || "") && !item.hideFromMenu && item.group === group
        );
        return filteredItems.length ? (
          <MenuRestsLinks>
            {filteredItems.map((i) => (
              <div onClick={() => setActivePage(i.id)}>
                {i.icon}
                <span>{t(`menu.names.${i.id}`)}</span>
              </div>
            ))}
          </MenuRestsLinks>
        ) : null;
      })}
      <MenuRestsLinks>
        <div onClick={() => logout()}>
          <TbLogout />
          <span>Logout</span>
        </div>
      </MenuRestsLinks>
    </MenuRestsContainer>
  );
};

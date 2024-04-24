import { createContext, useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "@emotion/styled";
import { TbCash, TbLogout } from "react-icons/tb";
import { CategoriesList } from "../Categories/CategoriesList";
import { Company } from "../Company/Company";
import { ItemsList } from "../Items/ItemsList";
import { Stats } from "../Stats/Stats";
import { UsersList } from "../Users/UsersList";
import { Map } from "../Map/Map";
import { Kitchen } from "../Kitchen";
import { Login } from "../Login";
import { AiOutlineClose } from "react-icons/ai";
import { useAuth } from "../Auth/Context";
import { TablesMap } from "../Orders/TablesMap/TablesMap";
import { MethodsList } from "../Methods/MethodsList";
import { EUserTypes } from "../../../back/types";
import {
  TbBasket,
  TbBuildingSkyscraper,
  TbChartHistogram,
  TbLayoutList,
  TbMap,
  TbSitemap,
  TbToolsKitchen,
  TbUsers,
} from "react-icons/tb";
import {
  backgroundDefault,
  textDefaultColor,
  boxShadow,
  newBorderColor,
} from "../../styles";

export enum EPages {
  LOGIN = "LOGIN",
  COMPANY = "COMPANY",
  ORDERS = "ORDERS",
  TABLES = "TABLES",
  CATEGORIES = "CATEGORIES",
  KITCHEN = "KITCHEN",
  POSITIONS = "POSITIONS",
  USERS = "USERS",
  BILLING = "BILLING",
  STATS = "STATS",
  METHODS = "METHODS",
}

export const CMenuItems: {
  id: EPages;
  permissions: string[];
  component: any;
  icon: any;
  hideFromMenu?: boolean;
  group: "work" | "admin" | "stats" | "service";
}[] = [
  {
    id: EPages.POSITIONS,
    permissions: ["admin"],
    component: <ItemsList />,
    icon: <TbLayoutList />,
    group: "admin",
  },
  {
    id: EPages.TABLES,
    permissions: ["admin"],
    component: <Map />,
    icon: <TbMap />,
    group: "admin",
  },
  {
    id: EPages.CATEGORIES,
    permissions: ["admin"],
    component: <CategoriesList />,
    icon: <TbSitemap />,
    group: "admin",
  },
  {
    id: EPages.COMPANY,
    permissions: ["admin"],
    component: <Company />,
    icon: <TbBuildingSkyscraper />,
    group: "service",
  },
  {
    id: EPages.USERS,
    permissions: ["admin"],
    component: <UsersList />,
    icon: <TbUsers />,
    group: "admin",
  },
  {
    id: EPages.METHODS,
    permissions: ["admin"],
    component: <MethodsList />,
    icon: <TbCash />,
    group: "admin",
  },
  {
    id: EPages.ORDERS,
    permissions: ["manager", "personal", "admin"],
    component: <TablesMap />,
    icon: <TbBasket />,
    group: "work",
  },
  {
    id: EPages.KITCHEN,
    permissions: ["manager", "kitchen", "admin", "personal"],
    component: <Kitchen />,
    icon: <TbToolsKitchen />,
    group: "work",
  },
  {
    id: EPages.STATS,
    permissions: ["admin"],
    component: <Stats />,
    icon: <TbChartHistogram />,
    group: "stats",
  },
  {
    id: EPages.LOGIN,
    permissions: ["manager", "kitchen", "admin", "personal"],
    component: <Login />,
    icon: null,
    hideFromMenu: true,
    group: "service",
  },
];

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
  left: ${({ isOpenMenu }) => (isOpenMenu ? "0" : "-100%")};
  pointer-events: ${({ isOpenMenu }) => (isOpenMenu ? "inherit" : "none")};
  box-shadow: ${boxShadow};
  @media (min-width: 1000px) {
    left: 0;
    width: 320px;
    box-shadow: ${boxShadow};
    pointer-events: inherit;
  }
`;

const MenuRestsBackground = styled.div<{ isOpenMenu: boolean }>`
  position: absolute;
  z-index: 240;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: 0.5s;
  pointer-events: ${({ isOpenMenu }) => (isOpenMenu ? "inherit" : "none")};
  opacity: ${({ isOpenMenu }) => (isOpenMenu ? "1" : "0")};
  backdrop-filter: blur(3px);
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
    :first-child {
      @media (min-width: 1000px) {
        display: none;
      }
    }
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
  .active {
    background-color: ${textDefaultColor};
    color: white;
    svg {
      background: white;
      color: ${textDefaultColor};
    }
  }
`;

const menuContext = createContext({});

export function MenuProvider({ children }: { children: any }) {
  const menu = useProvideMenu();

  const { i18n, t } = useTranslation();
  const { whoami, setActivePage, logout, activePage } = useAuth();
  const isKitchen = whoami?.user?.type === EUserTypes.KITCHEN;
  const [isOpenLang, setIsOpenLang] = useState<boolean>(false);

  const handleGoCompany = () => {
    if (whoami?.user?.type === "admin") {
      setActivePage(EPages.COMPANY);
      menu.setIsOpenMenu(false);
      setIsOpenLang(false);
    }
  };

  return (
    <menuContext.Provider value={menu}>
      {activePage !== EPages.LOGIN && !isKitchen ? (
        <>
          <MenuRestsContainer isOpenMenu={menu.isOpenMenu}>
            <MenuRestsHeader>
              <span onClick={() => menu.setIsOpenMenu(false)}>
                <AiOutlineClose />
              </span>
              <div>
                <TbBuildingSkyscraper onClick={() => handleGoCompany()} />
                <span onClick={() => handleGoCompany()}>
                  {whoami?.company?.title}
                </span>
                <p onClick={() => handleGoCompany()}>{whoami?.user?.name}</p>
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
            {["work", "stats", "service", "admin"].map((group) => {
              const filteredItems = CMenuItems.filter(
                (item) =>
                  item.permissions.includes(whoami?.user?.type || "") &&
                  !item.hideFromMenu &&
                  item.group === group
              );
              return filteredItems.length ? (
                <MenuRestsLinks>
                  {filteredItems.map((i) => (
                    <div
                      onClick={() => {
                        setActivePage(i.id);
                        menu.setIsOpenMenu(false);
                      }}
                      className={activePage === i.id ? "active" : undefined}
                    >
                      {i.icon}
                      <span>{t(`menu.names.${i.id}`)}</span>
                    </div>
                  ))}
                </MenuRestsLinks>
              ) : null;
            })}
            <MenuRestsLinks>
              <div
                onClick={() => {
                  logout();
                  menu.setIsOpenMenu(false);
                  setIsOpenLang(false);
                }}
              >
                <TbLogout />
                <span>Logout</span>
              </div>
            </MenuRestsLinks>
          </MenuRestsContainer>
          <MenuRestsBackground
            isOpenMenu={menu.isOpenMenu}
            onClick={() => {
              menu.setIsOpenMenu(false);
              setIsOpenLang(false);
            }}
          />
        </>
      ) : null}
      {children}
    </menuContext.Provider>
  );
}

export const useMenu = (): {
  isOpenMenu: boolean;
  setIsOpenMenu: (isOpen: boolean) => void;
} => {
  // @ts-expect-error
  return useContext(menuContext);
};

function useProvideMenu() {
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);

  return {
    isOpenMenu,
    setIsOpenMenu,
  };
}

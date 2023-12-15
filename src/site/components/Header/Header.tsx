import { FC, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CiMenuFries } from "react-icons/ci";
import { HeaderLogo, HeaderMenuButton, HeaderStyled, Menu, MenuContainer } from "./styles";
import { useCompanyQuery } from "../../api";
import { useTranslation } from "react-i18next";

export const Header: FC<{ title: string }> = ({ title }) => {
  const login = useParams()?.login ?? "";
  const { i18n } = useTranslation();

  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
  const [isOpenLang, setIsOpenLang] = useState<boolean>(false);
  const [isScroll, setIsScroll] = useState<boolean>(false);

  const { data } = useCompanyQuery(login);

  const handleScroll = () => {
    setIsScroll((prevState) => {
      const newState = window.scrollY >= 30;
      if (newState !== prevState) {
        return newState;
      }
      return prevState;
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const langs = [data?.lang ?? "en"].concat(data?.langs ?? []);

  return (
    <>
      <HeaderStyled isScroll={isScroll}>
        <HeaderLogo>
          <Link to={`/site/${login}/home`}>{title}</Link>
        </HeaderLogo>
        <HeaderMenuButton onClick={() => setIsOpenLang(!isOpenLang)}>{i18n.language}</HeaderMenuButton>
        <HeaderMenuButton onClick={() => setIsOpenMenu(!isOpenMenu)}>
          <CiMenuFries />
        </HeaderMenuButton>
      </HeaderStyled>
      <MenuContainer open={isOpenMenu} onClick={() => setIsOpenMenu(false)}>
        <Menu onClick={(e) => e.stopPropagation()}>
          {/* <Link to={`/site/${login}/home`} onClick={() => setIsOpenMenu(false)}>
            Home
          </Link> */}
          <Link to={`/site/${login}/menu`} onClick={() => setIsOpenMenu(false)}>
            Menu
          </Link>
          <Link to={`/site/${login}/contacts`} onClick={() => setIsOpenMenu(false)}>
            Contacts
          </Link>
          {/* <Link to={`/site/${login}/about`} onClick={() => setIsOpenMenu(false)}>
            About
          </Link> */}
        </Menu>
      </MenuContainer>
      <MenuContainer open={isOpenLang} onClick={() => setIsOpenLang(false)}>
        <Menu onClick={(e) => e.stopPropagation()}>
          {langs.map((lang) => (
            <span
              onClick={() => {
                i18n.changeLanguage(lang);
                setIsOpenLang(false);
              }}
            >
              {lang}
            </span>
          ))}
        </Menu>
      </MenuContainer>
    </>
  );
};

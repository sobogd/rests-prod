import { FC, useMemo } from "react";
import { EPages } from "../../types";
import { Header } from "../Header/Header";
import { Home } from "../Home/Home";
import { image } from "./consts";
import { sushiandmore } from "./sushiandmore";
import { Background, Container, Wrapper } from "./styles";
import { About } from "../About/About";
import { Menu } from "../Menu/Menu";
import { Contacts } from "../Contacts/Contacts";

export const Layout: FC<{ page: EPages; data: any }> = ({ data, page }) => {
  const renderPage = useMemo(() => {
    switch (page) {
      case EPages.CONTACTS:
        return <Contacts />;
      case EPages.MENU:
        return <Menu />;
      case EPages.ABOUT:
        return <About />;
      default:
        return <Home />;
    }
  }, [page]);

  return (
    <Container>
      <Header title={data?.title ?? ""} />
      <Background src={data?.login === "sushiandmore" ? sushiandmore : image} />
      <Wrapper>{renderPage}</Wrapper>
    </Container>
  );
};

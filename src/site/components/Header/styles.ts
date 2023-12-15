import styled from "@emotion/styled";

export const HeaderStyled = styled.header<{ isScroll: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  z-index: 8;
  :before {
    content: "";
    transition: 700ms;
    background: #0000004a; // ${({ isScroll }) => (isScroll ? "#0000004a" : "none")};
    backdrop-filter: blur(5px); // ${({ isScroll }) => (isScroll ? "blur(5px)" : "none")};
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

export const HeaderLogo = styled.span`
  height: 70px;
  display: flex;
  flex: 100%;
  width: 100%;
  align-items: center;
  justify-content: flex-start;
  padding: 0 0 0 25px;
  a {
    line-height: 23px;
    font-size: 23px;
    font-weight: 100;
    color: white;
    text-decoration: none;
  }
`;

export const HeaderMenuButton = styled.span`
  min-height: 70px;
  max-height: 70px;
  min-width: 50px;
  max-width: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-transform: uppercase;
  font-weight: 100;
  font-size: 18px;
  svg {
    width: 24px;
    height: 24px;
    color: white;
  }
  :last-child {
    margin-right: 10px;
  }
`;

export const MenuContainer = styled.div<{ open: boolean }>`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  backdrop-filter: blur(5px);
  opacity: ${({ open }) => (open ? "1" : "0")};
  pointer-events: ${({ open }) => (open ? "inherit" : "none")};
  transition: 0.3s;
  z-index: 10;
`;

export const Menu = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 70px;
  right: 25px;
  padding: 15px 0;
  background: #0000005e;
  box-shadow: rgba(0, 0, 0, 0.45) 2px 2px 11px -5px;
  border-radius: 10px;
  a,
  span {
    color: white;
    text-decoration: none;
    padding: 10px 40px;
    text-align: center;
    border-bottom: 1px solid #ffffff0d;
    font-weight: 100;
    font-size: 18px;
    :last-child {
      border-bottom: 0;
    }
  }
  span {
    text-transform: uppercase;
  }
`;

import styled from "@emotion/styled";

export const HeaderStyled = styled.header`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const HeaderLogo = styled.span`
  height: 70px;
  display: flex;
  width: calc(100% - 70px);
  align-items: center;
  justify-content: flex-start;
  padding: 0 0 0 25px;
  a {
    line-height: 35px;
    font-size: 23px;
    font-weight: 100;
    color: white;
    text-decoration: none;
  }
`;

export const HeaderMenuButton = styled.span`
  height: 70px;
  width: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    width: 24px;
    height: 24px;
    color: white;
  }
`;

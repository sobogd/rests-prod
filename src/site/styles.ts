import styled from "@emotion/styled";

export const Title = styled.h1`
  width: 100%;
  display: flex;
  font-size: 30px;
  color: white;
  font-weight: 100;
  margin: 0 0 25px;
`;

export const Typography = styled.p<{ withIcon?: boolean }>`
  width: 100%;
  display: flex;
  margin: 0 0 15px;
  color: white;
  font-weight: 100;
  padding-left: ${({ withIcon }) => (withIcon ? "65px" : "0px")};
  min-height: ${({ withIcon }) => (withIcon ? "65px" : "0px")};
  flex-direction: column;
  position: relative;
  align-items: flex-start;
  ${({ withIcon }) =>
    withIcon
      ? `span {
    :first-child {
      position: absolute;
    top: 0;
    left: 0;
    width: 50px;
    height: 50px;
    padding: 15px;
    border-radius: 50px;
    border: 1px solid #ffffff7a;
    color: #ffffff96;
      svg {
        width: 100%;
    height: 100%;
      }
    }
  }`
      : undefined}
  span,
  a {
    line-height: 25px;
    color: white;
    text-decoration: none;
  }
  a {
    position: relative;
    margin: 0;
    height: 25px;
    display: inline-block;
    ::after {
      content: "";
      position: absolute;
      bottom: 2px;
      left: 0;
      width: 100%;
      height: 1px;
      background: #ffffff47;
    }
  }
`;

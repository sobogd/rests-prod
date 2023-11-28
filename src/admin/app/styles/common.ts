import styled from "@emotion/styled";
import { Alert } from "@mui/material";
import { grey, red } from "@mui/material/colors";
import { primaryColor, textDefaultWhiteColor } from "./theme";

export const AlertStyled = styled(Alert)`
  background-color: ${red["900"]};
  color: ${red["50"]};
  margin-bottom: 10px;

  .MuiAlert-icon {
    color: ${red["50"]};
  }
`;

export const MyForm = styled.form`
  justify-content: space-between;
  display: flex;
  flex-direction: column;
`;

export const Container = styled.section`
  background: ${grey[900]};
  width: 100%;
  height: 100%;
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const WrapperScrolled = styled.section`
  height: 100%;
  position: relative;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
`;

export const ErrorBox = styled.span`
  box-shadow: 0 4px 35px rgba(43, 13, 98, 0.1);
  background: rgb(221 18 55 / 2%);
  font-size: 14px;
  padding: 10px 20px;
  border-radius: 10px;
  color: #dd1237;
  margin-bottom: 15px;
  display: flex;
`;

export const ButtonStyled = styled.button<{
  size?: number;
  top?: number;
  bottom?: number;
  background?: string;
  color?: string;
  height?: number;
}>`
  margin-top: ${(p) => p.top + "px" || 0};
  margin-bottom: ${(p) => p.bottom + "px" || 0};
  min-height: ${(p) => p.height || 45}px;
  height: ${(p) => (p.height ? p.height + "px" : "auto")};
  min-width: 45px;
  font-size: ${(p) => p.size || 16}px;
  width: 100%;
  border-radius: 10px;
  cursor: ${(p) => (p.disabled ? "not-allowed" : "pointer")};
  font-weight: 500;
  background: ${(p) => p.background || primaryColor};
  color: ${(p) => p.color || textDefaultWhiteColor};
  padding: 10px 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${(p) => (p.disabled ? "0.4" : "1")};

  svg {
    color: ${(p) => p.color || textDefaultWhiteColor};
    margin-right: 10px;
  }

  :hover {
    opacity: ${(p) => (p.disabled ? "0.4" : "0.8")};
  }
`;

export const TitleH1 = styled.h1<{
  size?: number;
  top?: number;
  bottom?: number;
}>`
  font-size: ${(p) => p.size || 22}px;
  font-weight: 400;
  margin: 0;
  padding: 0;
  margin-top: ${(p) => p.top + "px" || 0};
  margin-bottom: ${(p) => p.bottom + "px" || 0};
  display: flex;
  width: 100%;
`;

export const TextSpan = styled.span<{
  size?: number;
  top?: number;
  bottom?: number;
  color?: string;
}>`
  font-size: ${(p) => p.size || 15}px;
  font-weight: 400;
  margin: 0;
  padding: 0;
  margin-top: ${(p) => p.top || 0}px;
  margin-bottom: ${(p) => p.bottom || 0}px;
  display: flex;
  width: 100%;
  color: ${(p) => p.color || "inherit"};
  justify-content: space-between;
`;

export const Item = styled.div<{
  paddingX?: number;
  paddingY?: number;
  top?: number;
  bottom?: number;
  isHaveIcons?: boolean;
}>`
  border-radius: 10px;
  border: 1px solid #f0e8fd;
  margin-top: ${(p) => p.top || 0}px;
  margin-bottom: ${(p) => p.bottom || 0}px;
  padding: ${(p) => p.paddingY || 0}px ${(p) => p.paddingX || 0}px ${(p) => p.paddingY || 0}px
    ${(p) => p.paddingX || 0}px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  position: relative;
  ${(p) => p.isHaveIcons && `padding-right: ${45 + (p.paddingX || 0)}px;`}
`;

export const ItemIconsBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  width: 45px;
  border-left: 1px solid #ede7fa;

  svg {
    color: ${primaryColor};
  }
`;

export const UniversalList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
`;

export const UniversalListItem = styled.button`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px 20px;
  min-height: 45px;
  font-size: 17px;
  font-weight: 600;
  border-bottom: 1px solid #ede7ff;
`;

export const UniversalListItemBordered = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  min-height: 45px;
  font-size: 17px;
  font-weight: 600;
  width: calc(100% - 30px);
  margin: 15px 15px 0;
  background: white;
  border-radius: 10px;
  border: 1px solid rgb(237, 231, 255);
  :last-child {
    margin-bottom: 15px;
  }
  p {
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    span {
      font-size: 15px;
      font-weight: 400;
      color: #525252;
    }
    :nth-child(1) {
      span {
        font-size: 17px;
        font-weight: 600;
        color: black;
      }
    }
  }
  b {
    font-weight: inherit;
  }
  strong {
    font-weight: inherit;
    float: left;
    background: #ffc858;
    color: white;
    border-radius: 6px;
    font-size: 14px;
    padding: 2px 5px;
    line-height: 14px;
    margin: 2px 5px 0 0;
  }
`;

export const NothingBlock = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  padding: 25px;
`;

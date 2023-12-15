import styled from "@emotion/styled";

export const Categories = styled.div`
  display: flex;
  width: calc(100% + 50px);
  justify-content: flex-start;
  overflow-x: scroll;
  overflow-y: hidden;
  margin: -15px -25px 45px;
  white-space: nowrap;
`;

export const Category = styled.div<{ active?: boolean }>`
  width: auto;
  margin-left: 10px;
  color: white;
  font-size: 16px;
  font-weight: 100;
  background: ${({ active }) => (active ? "#ffffff4a" : "#0000004a")};
  backdrop-filter: blur(5px);
  box-shadow: rgba(0, 0, 0, 0.45) 2px 2px 11px -5px;
  padding: 10px 20px;
  border-radius: 10px;
  cursor: pointer;
  :hover {
    background: #ffffff4a;
  }
  :last-child {
    margin-right: 25px;
  }
  :first-child {
    margin-left: 25px;
  }
`;

export const Positions = styled.div`
  display: flex;
  gap: 25px;
  width: 100%;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: flex-start;
`;

export const Position = styled.div`
  width: 100%;
  max-width: 300px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: space-between;
  @media (max-width: 500px) {
    max-width: 500px;
  }
`;

export const PositionImageContainer = styled.div`
  width: 100%;
  display: flex;
  position: relative;
  border-radius: 10px;
  height: 0px;
  padding-bottom: 75%;
  overflow: hidden;
  background: #0000004a;
  backdrop-filter: blur(5px);
  box-shadow: rgba(0, 0, 0, 0.45) 2px 2px 11px -5px;
  img {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    min-width: 100%;
    min-height: 100%;
  }
  svg {
    width: 50px;
    height: 50px;
    color: #0000006b;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
  }
`;

export const PositionTitle = styled.div`
  font-size: 20px;
  font-weight: 100;
  color: white;
`;

export const PositionBottom = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  height: 100%;
`;

export const PositionVariants = styled.ul`
  font-size: 16px;
  color: #ffffffa1;
  margin: 0;
  font-weight: 100;
`;

export const PositionAddToCart = styled.div`
  font-size: 22px;
  background: #0000004a;
  backdrop-filter: blur(5px);
  box-shadow: rgba(0, 0, 0, 0.45) 2px 2px 11px -5px;
  width: 100px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
  :hover {
    background: #ffffff4a;
  }
  svg {
    width: 20px;
    height: 20px;
  }
`;

export const PositionPrice = styled.div`
  font-size: 22px;
  font-weight: 400;
  color: white;
  line-height: 40px;
  height: 40px;
`;

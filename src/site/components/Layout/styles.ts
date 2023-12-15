import styled from "@emotion/styled";

export const Container = styled.div`
  width: 100%;
`;

export const Background = styled.img`
  min-width: calc(100% + 40px);
  min-height: calc(100% + 40px);
  max-width: inherit;
  filter: blur(4px) brightness(0.6);
  z-index: -1;
  display: flex;
  position: fixed;
  margin: -20px;
`;

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 95px 25px 25px;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

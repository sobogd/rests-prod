import styled from '@emotion/styled';
import React from 'react';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  color: ${(p) => p.theme.text3};
`;

const NoData: React.FC<{
  text: string;
  height?: number;
  pt?: boolean;
}> = ({ text }) => {
  return <Container>{text}</Container>;
};

export default NoData;

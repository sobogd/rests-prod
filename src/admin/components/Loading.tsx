import styled from '@emotion/styled';
import React, { memo } from 'react';

const LoadingItems = styled.div<{ isFullscreen?: boolean }>`
    display: inline-block;
    position: absolute;
    width: 80px;
    height: 40px;
    margin: auto;

    div {
      position: absolute;
      top: 14px;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: ${(p) =>
        p.isFullscreen ? p.theme.divider : p.theme.loading};
      animation-timing-function: cubic-bezier(0, 1, 1, 0);
    }

    div:nth-child(1) {
      left: 18px;
      animation: lds-ellipsis1 0.8s infinite;
    }

    div:nth-child(2) {
      left: 18px;
      animation: lds-ellipsis2 0.8s infinite;
    }

    div:nth-child(3) {
      left: 36px;
      animation: lds-ellipsis2 0.8s infinite;
    }

    div:nth-child(4) {
      left: 53px;
      animation: lds-ellipsis3 0.8s infinite;
    }
  }

  @keyframes lds-ellipsis1 {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }
  @keyframes lds-ellipsis3 {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(0);
    }
  }
  @keyframes lds-ellipsis2 {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(17px, 0);
    }
`;

const LoadingContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(p) => p.theme.background1};
  z-index: 1;
`;

type Props = { isFullscreen?: boolean; isLoading?: boolean };

export const Loading = memo((props: Props) => {
  const { isFullscreen, isLoading } = props;

  if (!isLoading) return null;

  if (!isFullscreen)
    return (
      <LoadingItems>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </LoadingItems>
    );

  return (
    <LoadingContainer>
      <LoadingItems isFullscreen={true}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </LoadingItems>
    </LoadingContainer>
  );
});

import styled from '@emotion/styled';
import { memo, PropsWithChildren } from 'react';
import { TbChevronLeft } from 'react-icons/tb';

const ModalBackground = styled.div`
  position: fixed;
  z-index: 1000;
  background: ${(p) => p.theme.transparent};
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 55px;
  top: 0;
  left: 0;
`;

const ModalContainer = styled.div`
  background: ${(p) => p.theme.background1};
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow: hidden;

  @media (min-width: 800px) {
    width: 450px;
    height: 100%;
  }
`;

const ModalHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0 30px;
  border-bottom: 1px solid ${(p) => p.theme.divider};
  gap: 20px;
  height: 70px;
  background: ${(p) => p.theme.background2};
`;

const ModalTitle = styled.div`
  font-size: 22px;
  line-height: 22px;
  font-weight: 600;
  color: ${(p) => p.theme.text1};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ModalBack = styled(TbChevronLeft)`
  color: ${(p) => p.theme.text2};
  width: 26px;
  height: 26px;
  cursor: pointer;
  transition: 0.2s;
  margin-left: -10px;
  position: relative;
  top: 1px;

  :hover {
    opacity: 0.7;
  }
`;

const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  position: relative;
  padding: 30px;
  overflow-y: auto;
  gap: 30px;
`;

type Props = {
  title: string;
  onClose: () => void;
};

export const Modal = memo((props: Props & PropsWithChildren) => {
  const { children, title, onClose } = props;

  return (
    <ModalBackground>
      <ModalContainer>
        <ModalHeader>
          <ModalBack onClick={onClose} />
          <ModalTitle>{title}</ModalTitle>
        </ModalHeader>
        <ModalBody>{children}</ModalBody>
      </ModalContainer>
    </ModalBackground>
  );
});

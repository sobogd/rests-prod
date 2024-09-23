import styled from '@emotion/styled';
import { memo, ReactNode } from 'react';
import { TbPlus } from 'react-icons/tb';

const Container = styled.div`
  width: calc(100% + 60px);
  margin: 0 -30px;
  padding: 0 30px;
  overflow-y: hidden;
  overflow-x: scroll;
  display: flex;
  gap: 30px;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  background: ${(p) => p.theme.background3};
  border-radius: 15px;
  padding: 20px;
  flex-direction: column;
  gap: 10px;
  max-width: 230px;
  min-width: 230px;
  min-height: 150px;

  > button {
    margin-top: 10px;
  }
`;

const Plus = styled(TbPlus)`
  width: 20px;
  margin: auto;
  height: 20px;
  color: ${(p) => p.theme.text2};
`;

export type CardScrollableProps = {
  elements: ReactNode[];
  onPlus: () => void;
};

export const CardScrollable = memo((props: CardScrollableProps) => {
  const { elements, onPlus } = props;

  return (
    <Container>
      {elements?.map((element, idx) => (
        <Item>{element}</Item>
      ))}
      <Item onClick={onPlus}>
        <Plus />
      </Item>
    </Container>
  );
});

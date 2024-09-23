import styled from '@emotion/styled';
import { MdArrowBack } from 'react-icons/md';

const Title = styled.div<{ size?: 'small' | 'medium' }>`
  color: ${(props) => props.theme.text1};
  font-weight: 600;
  font-size: ${(p) => (p.size === 'small' ? '22' : '28')}px;
  line-height: ${(p) => (p.size === 'small' ? '27' : '33')}px;
`;

const SubTitle = styled.div<{ size?: 'small' | 'medium' }>`
  color: ${(props) => props.theme.text2};
  font-size: ${(p) => (p.size === 'small' ? '14' : '16')}px;
  line-height: ${(p) => (p.size === 'small' ? '20' : '24')}px;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 20px;
  align-items: center;
`;

const HeaderBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

const BackButton = styled(MdArrowBack)`
  color: ${(props) => props.theme.text1};
  font-size: 30px;
  cursor: pointer;
`;

export type HeaderProps = {
  title: string;
  subTitle?: string;
  onBack?: () => void;
  size?: 'small' | 'medium';
};

export const Header = (props: HeaderProps) => {
  const { title, subTitle, onBack, size = 'medium' } = props;

  return (
    <Wrapper>
      {!!onBack && <BackButton onClick={onBack} />}
      <HeaderBody>
        <Title size={size}>{title}</Title>
        {!!subTitle && <SubTitle size={size}>{subTitle}</SubTitle>}
      </HeaderBody>
    </Wrapper>
  );
};

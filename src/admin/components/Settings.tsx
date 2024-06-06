import styled from '@emotion/styled';
import { useTranslation } from 'react-i18next';

import { useTheme } from '../providers/Theme';

const Page = styled.div`
  background: ${(props) => props.theme.background1};
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 30px;
  gap: 20px;
  overflow-y: scroll;
`;

const Card = styled.div`
  background: ${(props) => props.theme.background2};
  padding: 20px 30px 30px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1;
  max-width: 100%;
  align-items: flex-start;
`;

const Title = styled.div`
  color: ${(props) => props.theme.text1};
  font-weight: 600;
  font-size: 32px;
  line-height: 36px;
`;

const SubTitle = styled.div`
  color: ${(props) => props.theme.text2};
  font-size: 16px;
`;

const Tabs = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
  max-width: 100%;
  flex-wrap: wrap;
`;

const Tab = styled.div<{ active: boolean }>`
  background: ${(p) =>
    p.active ? (props) => props.theme.tab1 : (props) => props.theme.tab2};
  color: ${(props) => props.theme.white1};
  padding: 5px 20px;
  border-radius: 20px;
  cursor: pointer;
  transition: 0.2s;
  font-size: 16px;

  :hover {
    opacity: 0.7;
  }
`;

const LogoutButton = styled.div`
  font-size: 16px;
  color: ${(props) => props.theme.white1};
  background: ${(props) => props.theme.tab2};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  border-radius: 20px;
  height: 40px;
  cursor: pointer;
  transition: 0.2s;
  padding: 0 20px;
  opacity: 1;
  margin-top: 10px;

  :hover {
    opacity: 0.7;
  }
`;

export const Settings = () => {
  const { t, i18n } = useTranslation();

  const { changeTheme, themeType } = useTheme();

  const logout = () => {
    localStorage.setItem('restsToken', '');
    location.reload();
  };

  return (
    <Page>
      <Card>
        <Title>{t('settings.lang.title')}</Title>
        <SubTitle>{t('settings.lang.subtitle')}</SubTitle>
        <Tabs>
          <Tab
            active={i18n.language === 'en'}
            onClick={() => i18n.changeLanguage('en')}
          >
            English
          </Tab>
          <Tab
            active={i18n.language === 'ru'}
            onClick={() => i18n.changeLanguage('ru')}
          >
            Русский
          </Tab>
          <Tab
            active={i18n.language === 'tr'}
            onClick={() => i18n.changeLanguage('tr')}
          >
            Turkey
          </Tab>
        </Tabs>
      </Card>
      <Card>
        <Title>{t('settings.theme.title')}</Title>
        <SubTitle>{t('settings.theme.subtitle')}</SubTitle>
        <Tabs>
          <Tab
            active={themeType === 'white'}
            onClick={() => changeTheme('white')}
          >
            {t('settings.theme.white')}
          </Tab>
          <Tab
            active={themeType === 'dark'}
            onClick={() => changeTheme('dark')}
          >
            {t('settings.theme.dark')}
          </Tab>
        </Tabs>
      </Card>
      <Card>
        <Title>{t('settings.logout.title')}</Title>
        <SubTitle>{t('settings.logout.subtitle')}</SubTitle>
        <LogoutButton onClick={logout}>Logout</LogoutButton>
      </Card>
    </Page>
  );
};

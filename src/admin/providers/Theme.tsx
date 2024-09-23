import { ThemeProvider as EmotionThemeProvider, Theme } from '@emotion/react';
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

const ThemeContext = createContext({});

type ThemeType = 'white' | 'dark';

export function ThemeProvider(props: PropsWithChildren) {
  const { children } = props;

  const [isVertical, setIsVertical] = useState<boolean>(
    Number(window?.innerWidth) <= Number(window?.innerHeight),
  );

  useEffect(() => {
    addEventListener('resize', (event) => {
      setIsVertical(Number(window?.innerWidth) <= Number(window?.innerHeight));
    });

    return () => {
      removeEventListener('resize', () => {});
    };
  }, []);

  const defaultTheme =
    (localStorage.getItem('restsTheme') as ThemeType) ?? 'dark';

  const [themeType, setThemeType] = useState<ThemeType>(defaultTheme);

  const changeTheme = useCallback(
    (themeType: ThemeType) => {
      setThemeType(themeType);
      localStorage.setItem('restsTheme', themeType);
    },
    [setThemeType],
  );

  const theme: Theme = useMemo(() => {
    if (themeType === 'white') {
      return {
        type: 'white',
        background1: 'rgb(253 253 255)',
        background2: 'rgb(248 248 252)',
        background3: 'rgb(239 239 243)',
        background4: 'rgb(224 224 232)',
        transparent: '#ffffffbf',
        divider: '#e5e5ee',
        textBackground: '#f7f8f996',
        error: '#e05e5e',
        text1: '#000000bf',
        text2: '#0000007a',
        text3: '#00000057',
        white1: '#ffffffeb',
        white2: '#ffffff7a',
        white3: '#ffffff57',
        diagramColors: [
          '#D870F2',
          '#CBF270',
          '#8AF270',
          '#70CBF2',
          '#1CECE7',
          '#7F1CEC',
          '#EC1C21',
          '#89EC1C',
        ],
        tab1: '#93d4dd',
        tab2: '#e0b0d5',
        primary1: '#e5a1f7',
        primary2: '#a57fff',
        secondary1: '#4bfdf8',
        secondary2: '#8aa0f0',
        primaryGradient: 'linear-gradient(45deg, #e5a1f7, #a57fff)',
        primary2Gradient: 'linear-gradient(45deg, #f0d7f7, #d0c0f7)',
        secondaryGradient: 'linear-gradient(45deg, #4bfdf8, #8aa0f0)',
        disabledGradient: 'linear-gradient(45deg, #4b3364, #2e2c50)',
        errorGradient: 'linear-gradient(45deg, #d57575, #f68989)',
        loading: '#ffffff66',
      };
    } else {
      return {
        type: 'dark',
        background1: 'rgb(17 21 38)',
        background2: 'rgb(23 28 48)',
        background3: '#202538',
        background4: '#363d58',
        transparent: '#000000bf',
        divider: '#262c41',
        textBackground: '#151929',
        error: '#e05e5e',
        text1: '#ffffffbf',
        text2: '#ffffff7a',
        text3: '#ffffff57',
        white1: '#ffffffeb',
        white2: '#ffffff7a',
        white3: '#ffffff57',
        diagramColors: [
          '#D870F2',
          '#CBF270',
          '#8AF270',
          '#70CBF2',
          '#1CECE7',
          '#7F1CEC',
          '#EC1C21',
          '#89EC1C',
        ],
        tab1: '#0e5862',
        tab2: '#593a52',
        primary1: '#d870f2',
        primary2: '#a37ff8',
        secondary1: '#1cece7',
        secondary2: '#627cdb',
        primaryGradient: 'linear-gradient(45deg, #d870f2, #a37ff8)',
        primary2Gradient: 'linear-gradient(45deg, #f0d7f7, #d0c0f7)',
        secondaryGradient: 'linear-gradient(45deg, #1cece7, #627cdb)',
        disabledGradient: 'linear-gradient(45deg, #4b3364, #2e2c50)',
        errorGradient: 'linear-gradient(45deg, #841313, #a72d2d)',
        loading: '#ffffff66',
      };
    }
  }, [themeType]);

  return (
    <ThemeContext.Provider
      value={{ changeTheme, themeType, theme, isVertical }}
    >
      <EmotionThemeProvider theme={theme}>{children}</EmotionThemeProvider>
    </ThemeContext.Provider>
  );
}

type UseThemeProps = {
  theme: Theme;
  themeType: ThemeType;
  changeTheme: (themeType: ThemeType) => void;
  isVertical: boolean;
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export const useTheme = (): UseThemeProps => useContext(ThemeContext);

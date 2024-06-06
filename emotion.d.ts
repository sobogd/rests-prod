import '@emotion/react';

declare module '@emotion/react' {
  export interface Theme {
    type: string;

    background1: string;
    background2: string;
    background3: string;
    background4: string;

    transparent: string;

    divider: string;
    textBackground: string;

    error: string;

    text1: string;
    text2: string;
    text3: string;

    white1: string;
    white2: string;
    white3: string;

    tab1: string;
    tab2: string;

    primary1: string;
    primary2: string;

    secondary1: string;
    secondary2: string;

    primaryGradient: string;
    primary2Gradient: string;
    secondaryGradient: string;
    disabledGradient: string;

    diagramColors: string[];

    loading: string;
  }
}

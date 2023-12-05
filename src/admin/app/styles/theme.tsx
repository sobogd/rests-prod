import { createTheme } from "@mui/material";
import { grey } from "@mui/material/colors";
import { createBreakpoints } from "@mui/system";
import type {} from "@mui/x-date-pickers/themeAugmentation";

export const backgroundDefault = "#faf8f8";
export const textDefaultColor = "#3e3e3e";
export const textDefaultWhiteColor = grey[50];
export const prePrimaryColor = "#a487f8";
export const primaryColor = "#835ff1";
export const buttonColor = "#cf7ff8";
export const primaryColorHover = "#7354d5";
export const primaryColorDark = "#6246b9";
export const primaryColorDarkHover = "#593fab";
export const warningColor = "#cc609e";
export const warningColorHover = "#ad4d85";
export const successColor = "#4eb186";
export const successColorHover = "#3d8d6b";
export const secondaryColor = "#edeef9";
export const secondaryColorHover = "#d8d9e7";
export const grayTextColor = "#666666";
export const borderColorDefault = "#f0e8fd";
export const errorColor = "#cc6060";
export const errorColorHover = "#b05151";
export const bottomHeight = 56;
export const boxShadow = "2px 2px 11px -5px #838383";
export const newBorderColor = "#e2e2e2";

const breakpoints = createBreakpoints({});

export const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        "*::-webkit-scrollbar": {
          display: "none",
        },
        "*::-webkit-scrollbar-track": {
          "-webkit-box-shadow": "none",
        },
        ".notistack-SnackbarContainer": {
          zIndex: 99999999,
        },
        "body, html": {
          height: "100%",
          width: "100%",
          position: "fixed",
          overflow: "hidden",
        },
        "#root": {
          position: "relative",
          width: "100%",
          height: "100%",
        },
        "body, h1, h2, h3, h4, p, figure, blockquote, dl, dd": {
          margin: 0,
        },
        "html:focus-within": {
          scrollBehavior: "smooth",
        },
        "img, picture": {
          maxWidth: "100%",
          display: "block",
        },
        "input, button, textarea, select": {
          font: "inherit",
        },
        "input::-webkit-outer-spin-button": {
          "-webkit-appearance": "none",
        },
        "input::-webkit-inner-spin-button": {
          "-webkit-appearance": "none",
        },
        "input[type=number]": {
          "-moz-appearance": "textfield",
        },
        button: {
          border: "none",
          margin: 0,
          padding: 0,
          width: "auto",
          overflow: "visible",
          background: "transparent",
          color: "inherit",
          font: "inherit",
          lineHeight: "normal",
        },
        body: {
          minHeight: "100%",
          textRendering: "optimizeSpeed",
          lineHeight: 1.5,
          overflow: "hidden",
        },
        [`ul[role="list"], ol[role="list"]`]: {
          listStyle: "none",
        },
        "*,*::before,*::after": {
          boxSizing: "border-box",
          // transition: "0.2s",
          // fontFamily: `'Montserrat', sans-serif`,
        },
        "@media print": {
          "#root": {
            display: "none",
          },
        },
      },
    },
    MuiPickersDay: {
      styleOverrides: {
        root: {
          backgroundColor: backgroundDefault,
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          color: textDefaultWhiteColor,
          svg: {
            color: textDefaultWhiteColor,
          },
          ".MuiTypography-root": {
            color: textDefaultWhiteColor,
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          padding: "16px",
          margin: 0,
        },
      },
    },
    MuiBottomNavigationAction: {
      styleOverrides: {
        label: {
          fontSize: 14,
        },
        root: {
          color: backgroundDefault,
          whiteSpace: "nowrap",
          minWidth: "auto",
          padding: "0px 20px",
          fontSize: 14,
          svg: {
            color: backgroundDefault,
          },
        },
      },
    },
    MuiBottomNavigation: {
      styleOverrides: {
        root: {
          background: primaryColor,
          height: bottomHeight,
          maxHeight: bottomHeight,
          flex: "100%",
          flexGrow: 1,
          justifyContent: "space-between",
          width: "100%",
          overflow: "scroll hidden",
          fontSize: 14,
          ".Mui-selected": {
            background: primaryColorDarkHover,
            color: backgroundDefault,
            fontSize: 14,
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          background: backgroundDefault,
          borderRadius: 10,
          svg: {
            color: primaryColor,
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 10,
        },
        colorSuccess: {
          backgroundColor: successColor,
        },
        colorError: {
          backgroundColor: errorColor,
        },
        colorSecondary: {
          backgroundColor: secondaryColor,
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        popper: {
          transition: "none",
        },
      },
    },
    MuiGrid: {
      styleOverrides: {
        root: {
          ".MuiPaper-root": {
            height: "100%",
            display: "flex",
            flexDirection: "column",
          },
        },
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          "::before": {
            display: "none",
          },
          "::after": {
            display: "none",
          },
        },
        input: {
          borderRadius: 5,
          background: grey[200],
          color: grey[700],
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        filled: {
          color: grey[700],
        },
        root: {
          "&.MuiInputLabel-shrink": {
            color: grey[900],
          },
        },
        sizeSmall: {
          [breakpoints.down("md")]: {
            top: 3,
          },
          [breakpoints.up("md")]: {
            top: 0,
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        filled: {
          color: grey[700],
          background: grey[200],
          borderRadius: 5,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          "&.Mui-disabled": {
            opacity: 0.4,
          },
          borderRadius: 10,
          textTransform: "none",
          [breakpoints.down("md")]: {
            fontSize: 14,
            lineHeight: "16px",
          },
          [breakpoints.up("md")]: {
            fontSize: 17,
            lineHeight: "19px",
          },
          fontWeight: 400,
          minWidth: 20,
          letterSpacing: "inherit",
          outline: "none",
          boxShadow: "none",
          boxSizing: "border-box",
          ":hover": {
            letterSpacing: "inherit",
            outline: "none",
            boxShadow: "none",
            boxSizing: "border-box",
          },
        },
        containedSizeLarge: {
          [breakpoints.down("md")]: {
            height: 45,
          },
          [breakpoints.up("md")]: {
            height: 56,
          },
        },
        containedSizeMedium: {
          [breakpoints.down("md")]: {
            height: 45,
          },
          [breakpoints.up("md")]: {
            height: 45,
          },
        },
        containedSizeSmall: {
          [breakpoints.down("md")]: {
            height: 30,
            fontSize: 14,
          },
          [breakpoints.up("md")]: {
            height: 30,
            fontSize: 14,
          },
        },
        containedPrimary: {
          background: primaryColor,
          color: "white",
          ":hover": {
            background: primaryColorHover,
          },
          svg: {
            color: backgroundDefault + " !important",
          },
        },
        containedError: {
          background: errorColor,
          color: "white",
          ":hover": {
            background: errorColorHover,
          },
          svg: {
            color: backgroundDefault + " !important",
          },
        },
        containedSecondary: {
          background: secondaryColor,
          ":hover": {
            background: secondaryColorHover,
          },
          svg: {
            color: textDefaultColor + " !important",
          },
        },
        containedSuccess: {
          background: successColor,
          ":hover": {
            background: successColorHover,
          },
          svg: {
            color: textDefaultWhiteColor,
          },
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          paddingLeft: 20,
          paddingRight: 20,
          paddingTop: 15,
          paddingBottom: 15,
        },
        message: {
          padding: 0,
        },
        standardError: {
          background: errorColor,
          color: textDefaultWhiteColor,
        },
        standardWarning: {
          background: warningColor,
          color: textDefaultWhiteColor,
        },
        standardInfo: {
          background: backgroundDefault,
          color: textDefaultColor,
          border: 1,
          borderStyle: "solid",
          borderColor: borderColorDefault,
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontSize: 14,
          color: textDefaultColor,
          backgroundColor: backgroundDefault,
          opacity: 0.9,
        },
      },
    },
    MuiList: {
      styleOverrides: {
        root: {
          background: backgroundDefault,
          padding: 16,
          marginLeft: -16,
          marginRight: -16,
          marginTop: 0,
          marginBottom: 0,
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          padding: 16,
          boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
          marginBottom: 16,
          borderRadius: 16,
          ":last-child": {
            marginBottom: 0,
          },
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        root: {
          margin: 0,
        },
        secondary: {
          color: grey[600],
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          marginLeft: -20,
          marginRight: -20,
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: "inherit",
          cursor: "pointer",
        },
      },
    },
    MuiSlider: {
      styleOverrides: {
        root: {
          pointerEvents: "none",
        },
        thumb: {
          pointerEvents: "all",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          boxShadow: "rgba(43, 13, 98, 0.1) 0px 4px 35px",
          outline: "none !important",
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          borderBottom: "1px solid rgb(224 216 238)",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: "rgb(224 216 238)",
          borderStyle: "solid !important",
          borderWidth: "1px !important",
          borderRadius: 10,
        },
        sizeSmall: {
          height: 45,
          fontSize: 14,
        },
        inputSizeSmall: {
          height: 45,
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          ":hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgb(224 216 238) !important",
            borderRadius: 10,
          },
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          paddingTop: 12,
          paddingBottom: 12,
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          borderRadius: 8,
          boxShadow: "rgba(43, 13, 98, 0.1) 0px 4px 35px",
          border: "1px solid rgb(224 216 238)",
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: textDefaultColor,
        },
        colorSecondary: {
          color: secondaryColor,
        },
        colorPrimary: {
          color: primaryColor,
        },
      },
    },
    MuiModal: {
      styleOverrides: {
        root: {
          margin: "0",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          width: "100%",
          padding: "20px",
          height: "100%",
        },
      },
    },
    MuiListItemSecondaryAction: {
      styleOverrides: {
        root: {
          right: "0",
          display: "flex",
          alignItems: "center",
        },
      },
    },
  },
  palette: {
    secondary: {
      main: secondaryColor,
      contrastText: textDefaultColor,
    },
    primary: {
      main: primaryColor,
      contrastText: textDefaultColor,
    },
    background: {
      default: backgroundDefault,
    },
    text: {
      primary: textDefaultColor,
      secondary: textDefaultColor,
    },
  },
  typography: {
    h1: {
      color: textDefaultColor,
      fontWeight: 500,
      fontSize: 30,
      padding: 0,
      margin: 0,
    },
    h2: {
      color: textDefaultColor,
      fontWeight: 500,
      fontSize: 22,
      padding: 0,
      margin: 0,
    },
    h3: { color: textDefaultColor, fontWeight: 400 },
    h4: { color: textDefaultColor, fontWeight: 400 },
    h5: { color: textDefaultColor, fontWeight: 400 },
    h6: { color: textDefaultColor, fontWeight: 400 },
    subtitle1: { color: textDefaultColor },
    subtitle2: { color: textDefaultColor },
    body1: {
      [breakpoints.down("md")]: {
        fontSize: 14,
      },
      [breakpoints.up("md")]: {
        fontSize: 17,
      },
      color: textDefaultColor,
      fontWeight: 400,
    },
    body2: { color: textDefaultColor, fontWeight: 400 },
    // fontFamily: `'Montserrat', sans-serif`,
  },
});

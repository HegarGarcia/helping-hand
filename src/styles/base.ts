import { DefaultTheme, Colors as MaterialColors } from "react-native-paper";

export const Colors = {
  primary: MaterialColors.blueGrey700,
  secondary: MaterialColors.yellowA200,
  white: MaterialColors.white,
  black: MaterialColors.black,
};

export const Spacing = {
  sm: 8,
  md: 16,
  lg: 24,
  xg: 32,
};

export const FontSize = {
  sm: 8,
  md: 16,
  lg: 24,
  xg: 32,
};

export const Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.primary,
    accent: Colors.secondary,
  },
};

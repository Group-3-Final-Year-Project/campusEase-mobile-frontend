import styled, {
  css,
  DefaultTheme as DefaultThemeProps,
} from "styled-components/native";
import { StyleSheet } from "react-native";
import Color from "color";

const fontStyle = css`
  font-family: ${(props) => props.theme.typography.fontFamily.bold};
  font-size: ${(props) => props.theme.typography.sizes.large.size}px;
  color: ${(props) => props.theme.colors.text};
`;

export const Container = styled.View`
  border-radius: 16px;
  background-color: ${(props: DefaultThemeProps) =>
    props.theme.colors.secondaryBackground};
  flex-direction: row;
  overflow: hidden;
  flex-grow: 1;
  /* margin: 25px 0; */
`;

export const TextInput = styled.TextInput.attrs((props: DefaultThemeProps) => ({
  placeholderTextColor: Color(props.theme.colors.secondaryText)
    .fade(0.5)
    .rgb()
    .string(),
}))`
  padding: ${(props: DefaultThemeProps) =>
    props.padding ? props.padding : 15}px;
  flex: 1;
  flex: 1;
  ${fontStyle}
`;

export const CountryCodeContainer = styled.View`
  padding: ${(props: DefaultThemeProps) =>
    props.padding ? props.padding : 15}px;
  align-items: center;
  justify-content: center;
`;
export const CountryCodeText = styled.Text`
  ${fontStyle}
`;

export const Separator = styled.View`
  width: ${StyleSheet.hairlineWidth}px;
  margin: 20px 5px;
  background-color: ${(props: DefaultThemeProps) =>
    props.theme.colors.secondaryText2};
`;

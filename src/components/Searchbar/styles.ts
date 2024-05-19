import styled, {
  css,
  DefaultTheme as DefaultThemeProps,
} from "styled-components/native";
import { StyleSheet } from "react-native";
import Color from "color";

const fontStyle = css`
  font-family: ${(props) => props.theme.typography.fontFamily.medium};
  font-size: ${(props) => props.theme.typography.sizes.regular.size}px;
  color: ${(props) => props.theme.colors.text};
`;

export const Container = styled.View`
  border-radius: 10px;
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
  padding: 10px 15px;
  flex: 1;
  ${fontStyle}
`;

export const IconContainer = styled.View`
  padding: 10px 0 10px 15px;
  align-items: center;
  justify-content: center;
`;
export const IconText = styled.Text`
  ${fontStyle}
`;

export const Separator = styled.View`
  width: ${StyleSheet.hairlineWidth}px;
  margin: 20px 5px;
  background-color: ${(props: DefaultThemeProps) =>
    props.theme.colors.secondaryText2};
`;

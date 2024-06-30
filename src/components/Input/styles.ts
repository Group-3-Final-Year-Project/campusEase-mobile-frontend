import styled, {
  css,
  DefaultTheme as DefaultThemeProps,
} from "styled-components/native";
import { StyleSheet } from "react-native";
import Color from "color";

interface IInput {
  padding: number;
}

const fontStyle = css`
  font-family: ${(props) => props.theme.typography.fontFamily.semiBold};
  font-size: ${(props) => props.theme.typography.sizes.regular.size}px;
  color: ${(props) => props.theme.colors.text};

  /* ::placeholder {
    font-family: ${(props) => props.theme.typography.fontFamily.bold};
    font-size: ${(props) => props.theme.typography.sizes.regular.size}px;
  } */
`;

export const Container = styled.View`
  border-radius: 10px;
  background-color: ${(props: DefaultThemeProps) =>
    props.theme.colors.secondaryBackground};
  flex-direction: row;
  overflow: hidden;
  flex-grow: 1;
  height: 50px;
  /* margin: 25px 0; */
`;

export const TextInput = styled.TextInput.attrs((props: DefaultThemeProps) => ({
  placeholderTextColor: Color(props.theme.colors.secondaryText)
    .fade(0.5)
    .rgb()
    .string(),
}))<IInput>`
  padding-top: ${(props: DefaultThemeProps) =>
    props.padding ? props.padding : 12}px;
  padding-bottom: ${(props: DefaultThemeProps) =>
    props.padding ? props.padding : 12}px;
  padding-left: ${(props: DefaultThemeProps) =>
    props.padding ? props.padding : 10}px;
  padding-right: ${(props: DefaultThemeProps) =>
    props.padding ? props.padding : 10}px;
  flex: 1;
  ${fontStyle}
`;

export const IconContainer = styled.View<IInput>`
  padding-left: ${(props: DefaultThemeProps) =>
    props.padding ? props.padding : 10}px;
  align-items: center;
  justify-content: center;
  vertical-align: top;
`;

export const RightIconContainer = styled.View<IInput>`
  padding-right: ${(props: DefaultThemeProps) =>
    props.padding ? props.padding : 10}px;
  align-items: center;
  justify-content: center;
  /* vertical-align: top; */
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

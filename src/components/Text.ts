import styled, {
  css,
  DefaultTheme as DefaultThemeProps,
} from "styled-components/native";

export interface TextProps {
  fontSize?: keyof DefaultThemeProps["typography"]["sizes"];
  color?: keyof DefaultThemeProps["colors"];
  fontWeight?: keyof DefaultThemeProps["typography"]["fontFamily"];
}

export default styled.Text<TextProps>`
  color: ${(props: DefaultThemeProps) => {
    const { colors } = props.theme;
    return colors?.[props.color ?? "text"];
  }};

  font-family: ${(props: DefaultThemeProps) => {
    const { fontFamily } = props.theme.typography;
    return fontFamily?.[props.fontWeight ?? "regular"];
  }};

  ${(props: DefaultThemeProps) => {
    const { sizes } = props.theme.typography;

    const selectedSize = sizes?.[props.fontSize ?? "regular"];

    return css`
      font-size: ${selectedSize.size}px;
      line-height: ${selectedSize.lineHeight}px;
    `;
  }}
`;

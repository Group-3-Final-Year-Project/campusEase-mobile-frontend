import styled, {
  DefaultTheme as DefaultThemeProps,
} from "styled-components/native";
import Text from "~components/Text";

export const CountryCodeContainer = styled.View`
  border-radius: 10px;
  background-color: ${(props: DefaultThemeProps) =>
    props.theme.colors.secondaryBackground};
  flex-direction: row;
  overflow: hidden;
  height: 50px;
  margin-right: 10px;
  padding: 12px 12px;
  align-items: center;
  justify-content: center;
`;

export const CountryCodeText = styled(Text)`
  font-family: ${(props: DefaultThemeProps) =>
    props.theme.typography.fontFamily.bold};
  font-size: ${(props: DefaultThemeProps) =>
    props.theme.typography.sizes.regular.size}px;
  color: ${(props: DefaultThemeProps) => props.theme.colors.text};
`;

import styled, {
  DefaultTheme as DefaultThemeProps,
} from "styled-components/native";
import Text from "~components/Text";

export const Title = styled(Text).attrs({
  fontSize: "large",
  fontWeight: "medium",
})`
  color: ${(props: DefaultThemeProps) => props.theme.colors.text};
  /* margin-bottom: 5px; */
`;

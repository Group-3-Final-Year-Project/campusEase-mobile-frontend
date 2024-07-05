import styled, {
  DefaultTheme as DefaultThemeProps,
} from "styled-components/native";
import { SafeAreaView } from "react-native-safe-area-context";
import Text from "~components/Text";

export const Description = styled(Text)`
  color: ${(props: DefaultThemeProps) => props.theme.colors.secondaryText};
  text-align: center;
  margin-bottom: 20px;
`;

export const Title = styled(Description).attrs({
  fontSize: "h3",
})`
  font-family: ${(props: DefaultThemeProps) =>
    props.theme.typography.fontFamily.bold};
  margin-bottom: 20px;
  color: ${(props: DefaultThemeProps) => props.theme.colors.text};
`;

import { SafeAreaView } from "react-native-safe-area-context";
import styled, {
  DefaultTheme as DefaultThemeProps,
} from "styled-components/native";
import Text from "~components/Text";

export const CategoryLabel = styled(Text).attrs({
  //   fontSize: "small",
})`
  color: ${(props: DefaultThemeProps) => props.theme.colors.text};
  font-family: ${(props: DefaultThemeProps) =>
    props.theme.typography.fontFamily.regular};
`;

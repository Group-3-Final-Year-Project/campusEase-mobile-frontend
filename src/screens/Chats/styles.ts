import styled, {
  DefaultTheme as DefaultThemeProps,
} from "styled-components/native";
import { SafeAreaView } from "react-native-safe-area-context";
import Text from "~components/Text";

export const Container = styled(SafeAreaView).attrs({
  edges: ["left", "right"],
})`
  flex: 1;
`;

export const ChatCardContainer = styled.TouchableOpacity`
  flex-direction: row;
  padding: 15px;
`;

export const Description = styled(Text).attrs({
  fontSize: "small",
})`
  color: ${(props: DefaultThemeProps) => props.theme.colors.text};
  font-family: ${(props: DefaultThemeProps) =>
    props.theme.typography.fontFamily.regular};
`;

export const ChatCardLabel = styled(Text).attrs({})`
  font-family: ${(props: DefaultThemeProps) =>
    props.theme.typography.fontFamily.bold};
  padding-bottom: 7px;
`;

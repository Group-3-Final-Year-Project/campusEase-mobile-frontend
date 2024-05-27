import styled, {
  DefaultTheme as DefaultThemeProps,
} from "styled-components/native";
import { SafeAreaView } from "react-native-safe-area-context";
import Text from "~components/Text";

export const Container = styled(SafeAreaView).attrs({
  edges: ["left", "right"],
})`
  flex: 1;
  /* padding-left: 15px;
  padding-right: 15px; */
`;

const ServiceInfoContainer = styled.View``;

export const BottomCard = styled.View`
  padding: 15px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  border-top-width: 1px;
  border-top-color: ${(props: DefaultThemeProps) =>
    props.theme.colors.secondaryBackground};
`;

export const Description = styled(Text).attrs({
  fontSize: "regular",
})`
  color: ${(props: DefaultThemeProps) => props.theme.colors.text};
  font-family: ${(props: DefaultThemeProps) =>
    props.theme.typography.fontFamily.regular};
`;

export const HighlightedDescription = styled(Text).attrs({
  fontSize: "large",
})`
  color: ${(props: DefaultThemeProps) => props.theme.colors.primary};
  font-family: ${(props: DefaultThemeProps) =>
    props.theme.typography.fontFamily.bold};
`;

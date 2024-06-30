import styled, {
  DefaultTheme as DefaultThemeProps,
} from "styled-components/native";
import { SafeAreaView } from "react-native-safe-area-context";
import Text from "~components/Text";

export const Container = styled(SafeAreaView).attrs({
  edges: ["left", "right"],
})`
  flex: 1;
  background-color: ${(props: DefaultThemeProps) =>
    props.theme.colors.secondaryBackground};
`;

export const TopCard = styled.View`
  flex: 1;
  background-color: ${(props: DefaultThemeProps) =>
    props.theme.colors.secondaryBackground};
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
`;

export const BottomCard = styled.View`
  background-color: ${(props: DefaultThemeProps) =>
    props.theme.colors.background};
  padding: 20px;
  /* border-top-color: ${(props: DefaultThemeProps) =>
    props.theme.colors.border}; */
  /* border-top-width: 1px; */
  border-top-right-radius: 30px;
  border-top-left-radius: 30px;
`;

export const Description = styled(Text)`
  color: ${(props: DefaultThemeProps) => props.theme.colors.secondaryText};
  text-align: center;
  margin: 10px 0 5px 0;
`;

export const HighlightedDescription = styled(Description)`
  font-family: ${(props: DefaultThemeProps) =>
    props.theme.typography.fontFamily.bold};
  margin-bottom: 20px;
`;

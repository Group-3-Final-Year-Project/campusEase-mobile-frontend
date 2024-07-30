import styled, {
  DefaultTheme as DefaultThemeProps,
} from "styled-components/native";
import { SafeAreaView } from "react-native-safe-area-context";
import Text from "~components/Text";

export const Container = styled(SafeAreaView).attrs({
  edges: ["left", "right"],
})`
  flex: 1;
  padding-left: 15px;
  padding-right: 15px;
`;

export const Description = styled(Text).attrs({
  fontSize: "regular",
})`
  color: ${(props: DefaultThemeProps) => props.theme.colors.text};
  font-family: ${(props: DefaultThemeProps) =>
    props.theme.typography.fontFamily.regular};
`;

export const BookingInfoContainer = styled.View`
  margin-top: 30px;
`;

export const BookingInfoHeaderLabel = styled(Text).attrs({})`
  font-family: ${(props: DefaultThemeProps) =>
    props.theme.typography.fontFamily.bold};
  padding-bottom: 10px;
  font-size:14px;
`;

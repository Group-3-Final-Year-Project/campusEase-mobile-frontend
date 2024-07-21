import styled, {
  DefaultTheme as DefaultThemeProps,
} from "styled-components/native";
import { SafeAreaView } from "react-native-safe-area-context";
import Text from "~components/Text";

export const BookingCardContainer = styled.TouchableOpacity`
  background-color: ${(props: DefaultThemeProps) =>
    props.theme.colors.secondaryBackground};
  border-radius: 10px;
  display: flex;
  padding: 15px;
`;

export const BookingStatusTag = styled(Text).attrs({
  fontSize: "small",
})`
  font-family: ${(props: DefaultThemeProps) =>
    props.theme.typography.fontFamily.regular};
  font-size: 12px;
  line-height: 12px;
  border-radius: 3px;
`;

export const BookingTitle = styled(Text).attrs({
  fontSize: "large",
  fontWeight: "bold",
})`
  color: ${(props: DefaultThemeProps) => props.theme.colors.text};
  margin-bottom: 10px;
`;

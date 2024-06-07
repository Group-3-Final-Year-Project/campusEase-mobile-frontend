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
  color: rgba(50, 205, 50, 1);
  font-family: ${(props: DefaultThemeProps) =>
    props.theme.typography.fontFamily.regular};
  font-size: 8px;
  line-height: 8px;
  padding: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 10px;
  background-color: rgba(50, 205, 50, 0.1);
  max-width: 72px;
  /* margin-bottom: 15px; */
`;

export const BookingTitle = styled(Text).attrs({
  fontSize: "large",
  fontWeight: "bold",
})`
  color: ${(props: DefaultThemeProps) => props.theme.colors.text};
  padding: 7px 0;
`;

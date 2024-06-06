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

export const AddressCard = styled.TouchableOpacity`
  border-color: ${(props: DefaultThemeProps) =>
    props.theme.colors.secondaryBackground};
  border-width: 0.8px;
  border-radius: 15px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
`;

export const Description = styled(Text).attrs({
  fontSize: "regular",
})`
  color: ${(props: DefaultThemeProps) => props.theme.colors.text};
  font-family: ${(props: DefaultThemeProps) =>
    props.theme.typography.fontFamily.regular};
`;

export const AddressLabel = styled(Text).attrs({})`
  font-family: ${(props: DefaultThemeProps) =>
    props.theme.typography.fontFamily.bold};
  padding-bottom: 7px;
`;

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

export const Description = styled(Text).attrs({
  fontSize: "regular",
})`
  color: ${(props: DefaultThemeProps) => props.theme.colors.text};
  font-family: ${(props: DefaultThemeProps) =>
    props.theme.typography.fontFamily.regular};
`;

export const AddAttachmentBtn = styled.TouchableOpacity`
  border-color: ${(props: DefaultThemeProps) =>
    props.theme.colors.secondaryBackground};
  border-width: 2px;
  border-radius: 15px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 15px;
  border-style: dashed;
`;

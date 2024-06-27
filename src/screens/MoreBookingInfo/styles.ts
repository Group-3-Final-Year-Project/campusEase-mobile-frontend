import styled, {
  DefaultTheme as DefaultThemeProps,
  css,
} from "styled-components/native";
import { SafeAreaView } from "react-native-safe-area-context";
import Text from "~components/Text";
import DateTimePicker from "react-native-ui-lib/dateTimePicker";
import Color from "color";

const fontStyle = css`
  font-family: ${(props) => props.theme.typography.fontFamily.semiBold};
  font-size: ${(props) => props.theme.typography.sizes.regular.size}px;
  color: ${(props) => props.theme.colors.text};
`;

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

export const DateContainer = styled(DateTimePicker).attrs(
  (props: DefaultThemeProps) => ({
    placeholderTextColor: Color(props.theme.colors.secondaryText)
      .fade(0.5)
      .rgb()
      .string(),
  })
)`
  border-radius: 16px;
  border-color: ${(props: DefaultThemeProps) =>
    props.theme.colors.secondaryBackground};
  flex-direction: row;
  overflow: hidden;
  flex-grow: 1;
  border-width: 1px;
  padding: ${(props: DefaultThemeProps) =>
    props.padding ? props.padding : 15}px;
  flex: 1;
  ${fontStyle}
`;

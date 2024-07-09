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
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 12px 5px;
  border-style: dashed;
`;

export const DateContainerWrapper = styled.View`
  border-radius: 10px;
  background-color: ${(props: DefaultThemeProps) =>
    props.theme.colors.secondaryBackground};
  flex-direction: row;
  overflow: hidden;
  width: 100%;
  /* flex-grow: 1; */
  height: 50px;
`;

export const DateContainer = styled(DateTimePicker).attrs(
  (props: DefaultThemeProps) => ({
    placeholderTextColor: Color(props.theme.colors.secondaryText)
      .fade(0.5)
      .rgb()
      .string(),
  })
)`
  flex-grow: 1;
  height: 50px;
  width: 100%;
  padding: 12px 10px;
  ${fontStyle}
`;

export const DateIconContainer = styled.View`
  padding-left: 10px;
  align-items: center;
  justify-content: center;
  vertical-align: top;
`;

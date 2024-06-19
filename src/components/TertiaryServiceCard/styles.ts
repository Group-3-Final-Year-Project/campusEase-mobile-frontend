import { TouchableOpacity } from "react-native";
import styled, {
  DefaultTheme as DefaultThemeProps,
} from "styled-components/native";
import Text from "~components/Text";

export const Title = styled(Text).attrs({
  fontSize: "large",
  fontWeight: "bold",
})`
  color: ${(props: DefaultThemeProps) => props.theme.colors.text};
  /* margin-bottom: 5px; */
`;

export const CardContainer = styled.TouchableOpacity`
  flex-direction: row;
  min-height: 80px;
  width: 100%;
`;

export const CardImage = styled.Image`
  height: 100%;
  width: 100px;
  border-radius: 10px;
`;

export const InfoContainer = styled.View`
  margin-left: 15px;
  justify-content: space-between;
  flex-grow: 1;
`;

export const Description = styled(Text).attrs({})`
  font-family: ${(props: DefaultThemeProps) =>
    props.theme.typography.fontFamily.regular};
  // padding-bottom: 10px;
`;

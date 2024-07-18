import styled, {
  DefaultTheme as DefaultThemeProps,
} from "styled-components/native";
import Text from "~components/Text";

export const Title = styled(Text).attrs({
  fontSize: "large",
  fontWeight: "medium",
})`
  color: ${(props: DefaultThemeProps) => props.theme.colors.text};
  /* margin-bottom: 5px; */
`;

export const CardContainer = styled.TouchableOpacity`
  background-color: ${(props: DefaultThemeProps) =>
    props.theme.colors.secondaryBackground};
  border-radius: 10px;
  height: 240px;
  padding: 10px;
  position: relative;
`;

export const CardImage = styled.ImageBackground`
  width: 100%;
  height: 75%;
  border-radius: 10px;
`;

export const CardInfoContainer = styled.View`
  width: 100%;
  height: 25%;
  flex-grow: 1;
  justify-content: center;
`;

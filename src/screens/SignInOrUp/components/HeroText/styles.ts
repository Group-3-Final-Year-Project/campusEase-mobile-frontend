import styled, {
  DefaultTheme as DefaultThemeProps,
} from "styled-components/native";
import Text from "~components/Text";

export const Container = styled.View`
  align-items: center;
  flex-direction: row;
  max-width: 300px;
  flex-wrap: wrap;
  justify-content: flex-start;
`;

export const Title = styled(Text).attrs({
  fontSize: "h2",
  fontWeight: "bold",
})`
  color: ${(props: DefaultThemeProps) => props.theme.colors.text};
`;

export const TextHighlight = styled(Title)`
  color: ${(props: DefaultThemeProps) => props.theme.colors.primary};
`;

export const UnderlineContainer = styled.View`
  align-self: flex-start;
`;

export const Line = styled.View`
  position: absolute;
  right: 0;
  left: 0;
  bottom: 3px;
  height: 4px;
  background-color: ${(props: DefaultThemeProps) => props.theme.colors.primary};
  border-radius: 3px;
`;

export const RotatedRectangle = styled.View`
  position: absolute;
  right: 0;
  left: 0;
  width: 110%;
  margin-left: -1%;
  top: 3px;
  height: 34px;
  transform: rotate(-3deg);
  background-color: ${(props: DefaultThemeProps) => props.theme.colors.primary};
  border-radius: 4px;
`;

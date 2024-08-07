import styled, {
  DefaultTheme as DefaultThemeProps,
} from "styled-components/native";
import Text from "~components/Text";
import { Animated } from "react-native";

export const Container = styled(Animated.View).attrs({
  edges: ["left", "right"],
})`
  flex: 1;
`;

export const ServiceInfoContainer = styled.View`
  margin-top: 30px;
  padding: 0 15px;
`;

export const BottomCard = styled.View`
  padding: 15px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  border-top-width: 1px;
  border-top-color: ${(props: DefaultThemeProps) =>
    props.theme.colors.secondaryBackground};
`;

export const Description = styled(Text).attrs({
  fontSize: "regular",
})`
  color: ${(props: DefaultThemeProps) => props.theme.colors.text};
  font-family: ${(props: DefaultThemeProps) =>
    props.theme.typography.fontFamily.regular};
`;

export const HighlightedDescription = styled(Text).attrs({
  fontSize: "large",
})`
  color: ${(props: DefaultThemeProps) => props.theme.colors.primary};
  font-family: ${(props: DefaultThemeProps) =>
    props.theme.typography.fontFamily.bold};
`;

export const TagLabel = styled(Text).attrs({
  fontSize: "small",
})`
  color: ${(props: DefaultThemeProps) => props.theme.colors.text};
  font-family: ${(props: DefaultThemeProps) =>
    props.theme.typography.fontFamily.regular};
  font-size: 10px;
  line-height: 10px;
`;

export const Title = styled(Text).attrs({
  fontSize: "h2",
  fontWeight: "bold",
})`
  color: ${(props: DefaultThemeProps) => props.theme.colors.text};
`;

export const ServiceInfoHeaderLabel = styled(Text).attrs({})`
  font-family: ${(props: DefaultThemeProps) =>
    props.theme.typography.fontFamily.bold};
  padding-bottom: 10px;
`;

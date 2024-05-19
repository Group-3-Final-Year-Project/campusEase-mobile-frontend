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

const getTopCardProps = (props: DefaultThemeProps) => ({
  imageStyle: {
    opacity: 0.2,
    backgroundColor: props.theme.colors.background,
    transform: [{ scale: 1.05 }],
  },
});

export const TopCard = styled.ImageBackground.attrs(getTopCardProps)`
  flex: 1;
  background-color: ${(props: DefaultThemeProps) =>
    props.theme.colors.background};
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
`;

export const BottomCard = styled.View`
  background-color: ${(props: DefaultThemeProps) =>
    props.theme.colors.background};
  padding: 22px;
  border-top-color: ${(props: DefaultThemeProps) => props.theme.colors.border};
  border-top-width: 1px;
`;

export const Description = styled(Text)`
  color: ${(props: DefaultThemeProps) => props.theme.colors.secondaryText};
  text-align: center;
  margin: 10px 0 5px 0;
`;

export const HighlightedDescription = styled(Description)`
  font-family: ${(props: DefaultThemeProps) =>
    props.theme.typography.fontFamily.bold};
`;

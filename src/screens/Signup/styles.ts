import styled, {
  DefaultTheme as DefaultThemeProps,
} from "styled-components/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "~components";

export const Container = styled(SafeAreaView).attrs({
  edges: ["left", "right"],
})`
  flex: 1;
  padding: 20px 20px 10px 20px;
`;

export const ContentCard = styled.View`
  flex: 1;
  background-color: ${(props: DefaultThemeProps) =>
    props.theme.colors.background};
  justify-content: flex-start;
  align-items: flex-start;
`;

export const Title = styled(Text).attrs({
  fontWeight: "bold",
})`
  color: ${(props: DefaultThemeProps) => props.theme.colors.text};
  font-size: 30px;
  line-height: 35px;
`;

export const Highlight = styled(Title)`
  color: ${(props: DefaultThemeProps) => props.theme.colors.primary};
`;

export const Description = styled(Text)`
  color: ${(props: DefaultThemeProps) => props.theme.colors.text};
  font-family: ${(props: DefaultThemeProps) =>
    props.theme.typography.fontFamily.medium};
`;

export const FormControl = styled.View`
  margin: 10px 0;
  width: 100%;
`;

export const InputLabel = styled(Text)`
  margin-bottom: 10px;
  color: ${(props: DefaultThemeProps) => props.theme.colors.secondaryText};
  font-family: ${(props: DefaultThemeProps) =>
    props.theme.typography.fontFamily.medium};
  width: 100%;
`;

export const ErrorLabel = styled(Text).attrs({
  fontSize: "small",
})`
  margin-top: 10px;
  font-family: ${(props: DefaultThemeProps) =>
    props.theme.typography.fontFamily.regular};
  width: 100%;
  color: ${(props: DefaultThemeProps) => props.theme.colors.secondary};
`;

export const HighlightedDescription = styled(Description)`
  font-family: ${(props: DefaultThemeProps) =>
    props.theme.typography.fontFamily.bold};
`;

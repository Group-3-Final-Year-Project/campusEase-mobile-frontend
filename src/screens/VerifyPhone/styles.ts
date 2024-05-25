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

export const ContentCard = styled.View`
  flex: 1;
  background-color: ${(props: DefaultThemeProps) =>
    props.theme.colors.background};
  justify-content: flex-start;
  align-items: flex-start;
  padding: 40px 20px;
`;

export const Title = styled(Text).attrs({
  fontSize: "h2",
  fontWeight: "bold",
})`
  color: ${(props: DefaultThemeProps) => props.theme.colors.text};
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
  margin: 20px 0;
  width: 100%;
`;

export const InputLabel = styled(Text)`
  margin-bottom: 10px;
  color: ${(props: DefaultThemeProps) => props.theme.colors.secondaryText};
  font-family: ${(props: DefaultThemeProps) =>
    props.theme.typography.fontFamily.medium};
  width: 100%;
`;

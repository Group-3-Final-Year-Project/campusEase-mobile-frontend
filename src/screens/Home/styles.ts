import styled, {
  DefaultTheme as DefaultThemeProps,
} from "styled-components/native";
import { SafeAreaView } from "react-native-safe-area-context";
import Text from "~components/Text";

export const Container = styled(SafeAreaView).attrs({
  edges: ["left", "right"],
})`
  flex: 1;
  padding-left: 15px;
  padding-right: 15px;
`;

export const Description = styled(Text).attrs({
  fontSize: "small",
})`
  color: ${(props: DefaultThemeProps) => props.theme.colors.text};
  font-family: ${(props: DefaultThemeProps) =>
    props.theme.typography.fontFamily.light};
`;

export const ListLabel = styled(Description)`
  font-family: ${(props: DefaultThemeProps) =>
    props.theme.typography.fontFamily.bold};
`;

export const Title = styled(Text).attrs({
  fontSize: "large",
  fontWeight: "bold",
})`
  color: ${(props: DefaultThemeProps) => props.theme.colors.text};
  margin-bottom: 5px;
`;

export const LogoLabel = styled(Text).attrs({
  fontSize: "large",
  fontWeight: "bold",
})`
  color: ${(props: DefaultThemeProps) => props.theme.colors.primary};
  font-size: 20px;
`;

import styled from "styled-components/native";
import { SafeAreaView } from "react-native-safe-area-context";
import Text from "~components/Text";

export const Container = styled(SafeAreaView).attrs({
  edges: ["left", "right"],
})`
  flex: 1;
`;

export const ContentCard = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.background};
  justify-content: flex-start;
  align-items: flex-start;
  padding: 40px 20px;
`;

export const Title = styled(Text).attrs({
  fontSize: "h3",
  fontWeight: "bold",
})`
  color: ${(props) => props.theme.colors.text};
  margin-bottom: 5px;
`;

export const Highlight = styled(Title)`
  color: ${(props) => props.theme.colors.primary};
`;

export const Description = styled(Text)`
  color: ${(props) => props.theme.colors.text};
  font-family: ${(props) => props.theme.typography.fontFamily.medium};
`;

export const FormControl = styled.View`
  margin: 20px 0;
  width: 100%;
`;

export const InputLabel = styled(Text)`
  margin-bottom: 10px;
  color: ${(props) => props.theme.colors.secondaryText};
  font-family: ${(props) => props.theme.typography.fontFamily.medium};
  width: 100%;
`;

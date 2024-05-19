import styled, {
  DefaultTheme as DefaultThemeProps,
} from "styled-components/native";

export const Container = styled.TouchableOpacity`
  padding: 10px;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 10px;
  background-color: ${(props: DefaultThemeProps) =>
    props.theme.colors.secondaryBackground};
`;

import styled, {
  DefaultTheme as DefaultThemeProps,
} from "styled-components/native";

export const ReviewCardContainer = styled.TouchableOpacity`
  border-color: ${(props: DefaultThemeProps) =>
    props.theme.colors.secondaryBackground};
  border-width: 0.8px;
  border-radius: 15px;
  display: flex;
  padding: 15px;
`;

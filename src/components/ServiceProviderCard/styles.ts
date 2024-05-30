import styled, {
  DefaultTheme as DefaultThemeProps,
} from "styled-components/native";
import Text from "~components/Text";

export const Description = styled(Text).attrs({
  fontSize: "regular",
})`
  color: ${(props: DefaultThemeProps) => props.theme.colors.text};
  font-family: ${(props: DefaultThemeProps) =>
    props.theme.typography.fontFamily.regular};
`;

export const ServiceProviderLabel = styled(Text).attrs({})`
  font-family: ${(props: DefaultThemeProps) =>
    props.theme.typography.fontFamily.bold};
  padding-bottom: 7px;
`;

export const ServiceProviderCardContainer = styled.TouchableOpacity`
  border-color: ${(props: DefaultThemeProps) =>
    props.theme.colors.secondaryBackground};
  border-width: 0.8px;
  border-radius: 15px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
`;

export const ContactInfoContainer = styled.View`
  flex-direction: row;
`;

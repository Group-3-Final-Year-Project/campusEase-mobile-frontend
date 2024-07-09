import styled, {
  DefaultTheme as DefaultThemeProps,
} from "styled-components/native";
import Text from "~components/Text";

export const Title = styled(Text).attrs({
  fontSize: "large",
  fontWeight: "bold",
})`
  color: ${(props: DefaultThemeProps) => props.theme.colors.text};
  /* margin-bottom: 5px; */
`;

export const AttachmentContainer = styled.View`
  flex-direction: row;
  height: 70px;
  width: 100%;
  background-color: ${(props: DefaultThemeProps) =>
    props.theme.colors.secondaryBackground};
  border-radius: 15px;
`;

export const AttachmentTypeContainer = styled.View`
  height: 100%;
  width: 100px;
  border-radius: 10px;
`;

export const InfoContainer = styled.View`
  margin-left: 15px;
  justify-content: space-between;
  flex-grow: 1;
  padding: 10px;
`;

export const Description = styled(Text).attrs({})`
  font-family: ${(props: DefaultThemeProps) =>
    props.theme.typography.fontFamily.regular};
  // padding-bottom: 10px;
`;

export const AttachmentName = styled(Text)`
  font-family: ${(props: DefaultThemeProps) =>
    props.theme.typography.fontFamily.semiBold};
`;

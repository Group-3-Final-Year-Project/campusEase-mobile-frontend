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
  margin: 3.5px 0;
  padding-right: 10px;
  align-items: center;
`;

export const AttachmentTypeContainer = styled.View`
  height: 100%;
  width: 70px;
  border-radius: 10px;
`;

export const InfoContainer = styled.View`
  margin-left: 10px;
  justify-content: space-between;
  flex-grow: 1;
  padding: 10px;
  height: 100%;
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

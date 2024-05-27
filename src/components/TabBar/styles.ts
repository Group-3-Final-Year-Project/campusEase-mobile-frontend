import { useColorScheme } from "react-native";
import styled, {
  css,
  DefaultTheme as DefaultThemeProps,
} from "styled-components/native";
import Text from "~components/Text";
interface ITabItemLabel {
  isFocused: boolean;
}

export const Container = styled.View`
  background-color: ${(props: DefaultThemeProps) =>
    props.theme.colors.background};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 70px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  ${css`
    elevation: 0.5;
    shadow-color: #000;
    shadow-offset: 0px 1px;
    shadow-opacity: 0.1;
    shadow-radius: 1px;
  `}
`;

export const TabItem = styled.Pressable`
  flex: 1;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

export const TabItemContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

export const TabItemLabel = styled(Text).attrs({
  fontSize: "small",
  fontWeight: "bold",
})<ITabItemLabel>`
  color: ${(props: DefaultThemeProps) =>
    props.isFocused
      ? props.theme.colors.primary
      : props.theme.colors.secondaryText};
  margin-top: 5px;
  font-family: ${(props: DefaultThemeProps) =>
    props.theme.typography?.fontFamily.medium};
  font-size: 12px;
`;

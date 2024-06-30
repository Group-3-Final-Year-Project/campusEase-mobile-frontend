import styled, {
  DefaultTheme as DefaultThemeProps,
} from "styled-components/native";
import { width } from "~src/shared/constants";

export const containerPadding = 15;
export const numOfColumns = 3;
export const userPictureHeight = 159;
export const userPictureWidth = (width - containerPadding * 2) / numOfColumns;

export const AddRemoveContainer = styled.TouchableOpacity<{
  inverted: boolean;
}>`
  border-radius: 15px;
  width: 30px;
  height: 30px;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: ${(props: DefaultThemeProps) =>
    props.inverted
      ? props.theme.colors.secondaryBackground
      : props.theme.colors.primary};
`;

export const UserPictureContent = styled.ImageBackground<{
  children: React.ReactElement;
}>`
  border-radius: 15px;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  width: 100%;
  flex: 1;
  border: 1px ${(props: DefaultThemeProps) => props.theme.colors.border};
  background-color: ${(props: DefaultThemeProps) =>
    props.theme.colors.secondaryBackground};
`;

export const UserPictureContainer = styled.View`
  padding: 7px;
  flex-grow: 1;
  width: ${userPictureWidth}px;
  height: ${userPictureHeight}px;
`;

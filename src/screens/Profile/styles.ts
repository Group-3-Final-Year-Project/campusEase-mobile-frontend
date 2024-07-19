import styled, {
  DefaultTheme as DefaultThemeProps,
} from "styled-components/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "~components";

export const Container = styled(SafeAreaView).attrs({
  edges: ["left", "right"],
})`
  flex: 1;
  /* padding-left: 15px;
  padding-right: 15px; */
`;

export const HeaderCard = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Title = styled(Text).attrs({
  fontSize: "large",
  fontWeight: "bold",
})`
  color: ${(props: DefaultThemeProps) => props.theme.colors.text};
  margin-bottom: 30px;
`;

export const ProfileImageView = styled.View`
  position: relative;
  width: 120px;
  height: 120px;
  margin: 30px 0 15px 0;
`;

export const ProfileImageContainer = styled.View`
  border-radius: 20px;
  object-fit: cover;
  width: 120px;
  height: 120px;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const ProfileImage = styled.Image.attrs({})`
  border-radius: 20px;
  object-fit: cover;
  width: 120px;
  height: 120px;
  flex: 1;
`;

export const ProfileItemCard = styled.TouchableOpacity`
  width: 100%;
  padding: 25px 15px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const ProfileItemLabel = styled(Text).attrs({
  fontSize: "regular",
})`
  color: ${(props: DefaultThemeProps) => props.theme.colors.text};
  font-family: ${(props: DefaultThemeProps) =>
    props.theme.typography.fontFamily.regular};
  margin-left: 20px;
`;

import styled, {
  DefaultTheme as DefaultThemeProps,
} from "styled-components/native";
import { Dimensions } from "react-native";

const getBannerCardProps = (props: DefaultThemeProps) => ({
  imageStyle: {
    opacity: 0.7,
    backgroundColor: props.theme.colors.secondaryBackground,
    resizeMode: "cover",
    resizeMethod: "scale",
    objectFit: "cover",
    flex: 1,
    width: Dimensions.get("screen").width,
    // height: "100%",
    transform: [{ scale: 1.05 }],
  },
});

export const BannerCard = styled.ImageBackground.attrs(getBannerCardProps)`
  flex: 1;
  width: 100%;
  height: 340px;
  background-color: ${(props: DefaultThemeProps) =>
    props.theme.colors.secondaryBackground};
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
  object-fit: cover;
`;

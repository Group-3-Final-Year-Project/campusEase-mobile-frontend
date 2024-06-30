import styled, {
  css,
  DefaultTheme as DefaultThemeProps,
} from "styled-components/native";
import Text from "~components/Text";
import { TouchableOpacityProps } from "react-native";

interface VariantProps {
  variant?: "outline" | "default";
}

export interface ContainerProps extends VariantProps, TouchableOpacityProps {
  loading?: boolean;
  disabled?: boolean;
}

export const Container = styled.TouchableOpacity<ContainerProps>`
  height: 50px;
  padding: 12px 5px;
  border-radius: 10px;
  justify-content: center;
  align-items: center;

  overflow: hidden;

  border: 0.8px ${(props: DefaultThemeProps) => props.theme.colors.primary};

  ${(props: DefaultThemeProps) =>
    props.variant !== "outline" &&
    css`
      background-color: ${props.theme.colors.primary};
    `}
`;

export const ButtonText = styled(Text).attrs({
  fontWeight: "bold",
})<VariantProps>`
  color: ${(props: DefaultThemeProps) =>
    props.variant === "outline" ? props.theme.colors.primary : "white"};
  font-size: 12px;
`;

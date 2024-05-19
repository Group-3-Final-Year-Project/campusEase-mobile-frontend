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
  padding: 18px;
  border-radius: 20px;
  justify-content: center;
  align-items: center;

  overflow: hidden;
  height: 68px;

  border: 3px ${(props: DefaultThemeProps) => props.theme.colors.primary};

  ${(props: DefaultThemeProps) =>
    props.variant !== "outline" &&
    css`
      background-color: ${props.theme.colors.primary};
    `}
`;

export const ButtonText = styled(Text)<VariantProps>`
  color: ${(props: DefaultThemeProps) =>
    props.variant === "outline" ? props.theme.colors.primary : "white"};
`;

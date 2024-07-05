import React, { useContext } from "react";
import { Container, ButtonText, ContainerProps } from "./styles";
import LoaderScreen from "react-native-ui-lib/loaderScreen";
import { ThemeContext } from "styled-components/native";

interface IButtonProps extends ContainerProps {
  buttonTextWeight?: string;
  buttonTextSize?: string;
}

const Button: React.FC<IButtonProps> = (props) => {
  const enabled = !props.loading && !props.disabled;

  const themeContext = useContext(ThemeContext);

  return (
    <Container
      activeOpacity={enabled ? 0.7 : 1}
      disabled={!enabled}
      onPress={enabled ? props.onPress : undefined}
      {...props}
    >
      {props.loading && (
        <LoaderScreen
          size={"small"}
          loaderColor={
            props.variant === "outline"
              ? themeContext?.colors.primary
              : themeContext?.colors.text
          }
        />
      )}
      {!props.loading && (
        <ButtonText
          fontWeight={props.buttonTextWeight || "bold"}
          fontSize={props.buttonTextSize || "large"}
          variant={props.variant}
        >
          {props.children}
        </ButtonText>
      )}
    </Container>
  );
};
export default Button;

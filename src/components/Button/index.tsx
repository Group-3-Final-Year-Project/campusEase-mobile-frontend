import React from "react";
import { Container, ButtonText, ContainerProps } from "./styles";
import Loading from "~components/Loading";

interface IButtonProps extends ContainerProps {
  buttonTextWeight?: string;
  buttonTextSize?: string;
}

const Button: React.FC<IButtonProps> = (props) => {
  const enabled = !props.loading && !props.disabled;

  return (
    <Container
      activeOpacity={enabled ? 0.7 : 1}
      disabled={!enabled}
      onPress={enabled ? props.onPress : undefined}
      {...props}
    >
      {props.loading && <Loading />}
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

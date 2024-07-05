import React from "react";
import {
  Container,
  TextInput,
  IconContainer,
  RightIconContainer,
} from "./styles";
import { TextInputProps, ViewStyle } from "react-native";

interface InputProps extends TextInputProps {
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  padding?: number;
  inputContainerStyles?: ViewStyle;
}

const Input: React.FC<InputProps> = ({
  padding,
  icon,
  rightIcon,
  inputContainerStyles,
  ...props
}) => {
  return (
    <Container style={inputContainerStyles}>
      {icon && <IconContainer padding={padding}>{icon}</IconContainer>}

      {/* <Separator /> */}
      <TextInput padding={padding} {...(props as any)} />
      {rightIcon && (
        <RightIconContainer padding={padding}>{rightIcon}</RightIconContainer>
      )}
    </Container>
  );
};

export default Input;

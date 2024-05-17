import React, { useState } from "react";
import {
  Container,
  TextInput,
  IconContainer,
  IconText,
  Separator,
} from "./styles";
import { TextInputProps } from "react-native";

interface InputProps extends TextInputProps {
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Input: React.FC<InputProps> = ({ icon, rightIcon, ...props }) => {
  const [inputValue, setInputValue] = useState<string>("");

  return (
    <Container>
      {icon && <IconContainer>{icon}</IconContainer>}

      {/* <Separator /> */}
      <TextInput
        value={inputValue}
        onChangeText={(e: string) => setInputValue(e)}
        {...(props as any)}
      />
      {rightIcon && <IconContainer>{rightIcon}</IconContainer>}
    </Container>
  );
};

export default Input;

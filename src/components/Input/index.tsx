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
  padding: number;
}

const Input: React.FC<InputProps> = ({
  padding,
  icon,
  rightIcon,
  ...props
}) => {
  const [inputValue, setInputValue] = useState<string>("");

  return (
    <Container>
      {icon && <IconContainer padding={padding}>{icon}</IconContainer>}

      {/* <Separator /> */}
      <TextInput
        value={inputValue}
        onChangeText={(e: string) => setInputValue(e)}
        padding={padding}
        {...(props as any)}
      />
      {rightIcon && (
        <IconContainer padding={padding}>{rightIcon}</IconContainer>
      )}
    </Container>
  );
};

export default Input;

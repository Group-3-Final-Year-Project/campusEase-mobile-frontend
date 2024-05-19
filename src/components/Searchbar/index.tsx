import React, { useState } from "react";
import { Container, TextInput, IconContainer } from "./styles";
import { TextInputProps } from "react-native";

interface InputProps extends TextInputProps {
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Searchbar: React.FC<InputProps> = ({ icon, rightIcon, ...props }) => {
  const [inputValue, setInputValue] = useState<string>("");

  return (
    <Container>
      {icon && <IconContainer>{icon}</IconContainer>}

      <TextInput
        value={inputValue}
        onChangeText={(e: string) => setInputValue(e)}
        {...(props as any)}
      />
      {rightIcon && <IconContainer>{rightIcon}</IconContainer>}
    </Container>
  );
};

export default Searchbar;

import React from "react";
import { Container } from "./styles";
import { TouchableOpacityProps } from "react-native";

const IconBtn = ({ children, ...props }: TouchableOpacityProps) => {
  return <Container {...props}>{children}</Container>;
};
export default IconBtn;

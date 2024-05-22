import React from "react";
import { Container } from "./styles";
import { TouchableOpacityProps } from "react-native";

const IconBtn: React.FC<TouchableOpacityProps> = (props, { children }) => {
  return <Container {...props}>{children}</Container>;
};
export default IconBtn;

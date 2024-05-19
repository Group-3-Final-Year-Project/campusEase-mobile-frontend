import React from "react";
import { Container, ContainerProps } from "./styles";

const IconBtn: React.FC<ContainerProps> = (props) => {
  return <Container {...props}>{props.children}</Container>;
};
export default IconBtn;

import React from "react";
import { Container, Gradient } from "./styles";

const Glassmorphism: React.FC<{
  children: React.ReactElement;
  colors: string[];
}> = ({ children, ...props }) => {
  return (
    <Container {...props}>
      <Gradient colors={[...props.colors]}>{children}</Gradient>
    </Container>
  );
};

export default Glassmorphism;

import React from "react";
import {
  Container,
  RotatedRectangle,
  Title,
  Line,
  UnderlineContainer,
} from "./styles";

interface HeroProps {
  isSignup: boolean;
}

export const Underline = ({ children }) => (
  <UnderlineContainer>
    <Line />
    {children}
  </UnderlineContainer>
);

export const RectangleHighLight = ({ children }) => (
  <UnderlineContainer>
    <RotatedRectangle />
    {children}
  </UnderlineContainer>
);

const HeroText: React.FC<HeroProps> = ({ isSignup, ...props }: HeroProps) => {
  return (
    <Container>
      <Title>{isSignup ? "Create" : "Sign"} </Title>
      <RectangleHighLight>
        <Title style={{ color: "white" }}>
          {isSignup ? "account" : "in to"}
        </Title>
      </RectangleHighLight>
      <Title>{isSignup ? "to enjoy" : " your"} </Title>
      <RectangleHighLight>
        <Title style={{ color: "white" }}>
          {isSignup ? "our services" : "account"}
        </Title>
      </RectangleHighLight>
    </Container>
  );
};

export default HeroText;

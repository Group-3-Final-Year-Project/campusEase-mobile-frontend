import React from "react";
import {
  Container,
  RotatedRectangle,
  Title,
  Line,
  UnderlineContainer,
} from "./styles";

interface HeroProps {
  isSignup?: boolean;
  isServiceRegistration?: boolean;
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

const HeroText: React.FC<HeroProps> = ({
  isSignup,
  isServiceRegistration,
  ...props
}: HeroProps) => {
  return (
    <Container>
      <Title>{isServiceRegistration ? "" : isSignup ? "Create" : ""} </Title>
      <RectangleHighLight>
        <Title style={{ color: "white" }}>
          {isServiceRegistration ? "Let's" : isSignup ? "account" : "Sign in"}
        </Title>
      </RectangleHighLight>
      <Title>
        {isServiceRegistration
          ? " set up"
          : isSignup
          ? "to enjoy"
          : " to access"}{" "}
      </Title>
      <RectangleHighLight>
        <Title style={{ color: "white" }}>
          {isServiceRegistration
            ? "your service"
            : isSignup
            ? "our services"
            : "your account"}
        </Title>
      </RectangleHighLight>
    </Container>
  );
};

export default HeroText;

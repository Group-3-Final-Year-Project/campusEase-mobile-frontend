import React from "react";
import {
  Container,
  RotatedRectangle,
  Title,
  Line,
  UnderlineContainer,
} from "./styles";
import { useContext } from "react";
import { ThemeContext } from "styled-components/native";

interface HeroProps {
  text: string;
}

export const Underline = ({ children }: { children: React.ReactElement }) => (
  <UnderlineContainer>
    <Line />
    {children}
  </UnderlineContainer>
);

export const RectangleHighLight = ({
  children,
}: {
  children: React.ReactElement;
}) => (
  <UnderlineContainer>
    {children}
    <RotatedRectangle />
  </UnderlineContainer>
);

const HeroText: React.FC<HeroProps> = ({ text }: HeroProps) => {
  const themeContext = useContext(ThemeContext);

  return (
    <Container>
      <RectangleHighLight>
        <Title style={{ color: themeContext?.colors.text }}>{text}</Title>
      </RectangleHighLight>
    </Container>
  );
};

export default HeroText;

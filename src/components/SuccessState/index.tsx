import { StyleSheet, View } from "react-native";
import React, { useContext } from "react";
import { ThemeContext } from "styled-components/native";
import { Description, Title } from "./styles";
import { Iconify } from "react-native-iconify";
import Button from "../Button";

type SuccessStateProps = {
  onContinue: () => void;
  title: string;
  description: string;
};

const SuccessState = ({
  title,
  description,
  onContinue,
}: SuccessStateProps) => {
  const themeContext = useContext(ThemeContext);

  return (
    <View
      style={{
        padding: 20,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View
        style={{
          width: 120,
          height: 120,
          backgroundColor: `${themeContext?.colors.primary}20`,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 120 / 2,
          marginBottom: 20,
        }}
      >
        <View
          style={{
            width: 80,
            height: 80,
            backgroundColor: `${themeContext?.colors.primary}`,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 80 / 2,
          }}
        >
          <Iconify
            icon="solar:check-circle-outline"
            // size={125}
            color={"#ffffff"}
          />
        </View>
      </View>
      <Title>{title}</Title>
      <Description style={{ fontSize: 12 }}>{description}</Description>
      <Button style={{ width: "100%" }} onPress={onContinue}>
        Let's go
      </Button>
    </View>
  );
};

export default SuccessState;

const styles = StyleSheet.create({});

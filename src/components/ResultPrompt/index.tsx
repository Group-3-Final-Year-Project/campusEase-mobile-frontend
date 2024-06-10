import { Image, Text, View } from "react-native";
import React, { useContext } from "react";
import { Dialog, DialogProps, PanningProvider } from "react-native-ui-lib";
import { Iconify } from "react-native-iconify";
import { ThemeContext } from "styled-components/native";
import { Description, Title } from "./styles";
import { Button } from "~components";

type ResultProps = DialogProps & {
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const ResultPrompt = (props: ResultProps) => {
  const themeContext = useContext(ThemeContext);

  return (
    <Dialog
      useSafeArea
      onDismiss={() => props.setIsVisible(false)}
      panDirection={PanningProvider.Directions.DOWN}
      //   center
      top
      //   bottom
      overlayBackgroundColor="rgba(0,0,0,0.5)"
      containerStyle={{
        backgroundColor: themeContext?.colors.background,
        borderRadius: 12,
      }}
      {...props}
    >
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
        <Title>Booking confirmed successfully</Title>
        <Description>
          Congratulations{"\n"}Your booking has been confirmed
        </Description>
        <Button
          style={{ width: "100%" }}
          onPress={() => props.setIsVisible(false)}
        >
          Done
        </Button>
      </View>
    </Dialog>
  );
};

export default ResultPrompt;

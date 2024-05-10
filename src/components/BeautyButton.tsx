import React from "react";
import { StyleSheet } from "react-native";
import {
  ICustomComponents,
  Button,
  ButtonText,
  useTheme,
} from "@gluestack-ui/themed";
import { theme } from "../shared/theme";

type BProps = {
  title?: string;
  variant: "outline" | "solid" | "link";
  color?: string;
  isRounded?: boolean;
  onPress: () => void;
  styles?: object;
  textStyles?: object;
  leftButtonIcon?: React.ReactNode;
  rightButtonIcon?: React.ReactNode;
};

const BeautyButton = (props: BProps) => {
  const buttonStyles = {
    outlineButtonStyle: {
      borderColor: props.color || theme.PRIMARY_COLOR,
      backgroundColor: "transparent",
    },
    solidButtonStyle: {
      backgroundColor: props.color || theme.PRIMARY_COLOR,
      borderColor: props.color || theme.PRIMARY_COLOR,
    },
    linkButtonStyle: {
      backgroundColor: "transparent",
      borderColor: "transparent",
    },
    outlineButtonTextStyle: {
      color: props.color || theme.PRIMARY_COLOR,
    },
    solidButtonTextStyle: {
      color: theme.BACKGROUND,
    },
    linkButtonTextStyle: {
      color: props.color || theme.PRIMARY_COLOR,
    },
  };

  return (
    <Button
      {...props}
      borderRadius={props.isRounded ? "$full" : 10}
      style={[
        styles.buttonContainer,
        props.variant === "outline"
          ? buttonStyles.outlineButtonStyle
          : props.variant === "solid"
          ? buttonStyles.solidButtonStyle
          : buttonStyles.linkButtonStyle,
        { borderRadius: props.isRounded ? 999 : 10 },
        props.styles,
      ]}
    >
      {props.leftButtonIcon}
      {props.title && (
        <ButtonText
          style={[
            styles.buttonText,
            props.variant === "outline"
              ? buttonStyles.outlineButtonTextStyle
              : props.variant === "solid"
              ? buttonStyles.solidButtonTextStyle
              : buttonStyles.linkButtonTextStyle,
            props.textStyles,
          ]}
        >
          {props.title}
        </ButtonText>
      )}

      {props.rightButtonIcon}
    </Button>
  );
};

export default BeautyButton;

const styles = StyleSheet.create({
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    // height: 46,
    borderWidth: 1,
    // paddingHorizontal: 20,
  },
  buttonText: {
    fontFamily: "Urbanist_700Bold",
    fontSize: 16,
    color: theme.BACKGROUND,
    // fontWeight: "700",
  },
});

import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInputFocusEventData,
} from "react-native";
import React from "react";
import { Input, InputField, ICustomComponents } from "@gluestack-ui/themed";
import { theme } from "../shared/theme";

type InputProps = {
  type?: "text" | "password";
  placeholder?: string;
  value?: string;
  onChangeText?: (e: string) => void;
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  leftInputSlot?: React.ReactElement;
  rightInputSlot?: React.ReactElement;
  styles?: object;
  color?: string;
};

const BeautyInputField = (props: InputProps) => {
  return (
    <Input {...props} style={styles.input}>
      {props.leftInputSlot}
      <InputField
        style={[styles.inputText, props.styles]}
        placeholder={props.placeholder}
        value={props.value}
        onChangeText={props.onChangeText}
        onBlur={props.onBlur}
        type={props.type}
        cursorColor={theme.FOREGROUND}
        selectionColor={theme.FOREGROUND}
        placeholderTextColor={theme.ACCENT2}
        $active-borderColor={props.color || theme.PRIMARY_COLOR}
        $focus-borderColor={props.color || theme.PRIMARY_COLOR}
      />
      {props.rightInputSlot}
    </Input>
  );
};

export default BeautyInputField;

const styles = StyleSheet.create({
  input: {
    // display: "flex",
    // flexDirection: "row",
    // alignItems: "center",
    // height: 46,
    paddingHorizontal: 16,
    // paddingVertical: 8,
    borderRadius: 14,
    borderWidth: 0.7,
    borderColor: theme.ACCENT2,
  },
  inputText: {
    fontFamily: "Urbanist_400Regular",
    fontSize: 12,
    textAlign: "left",
    lineHeight: 18,
    color: theme.FOREGROUND2,
  },
});

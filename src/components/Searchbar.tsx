import { StyleSheet, Text, View } from "react-native";
import React from "react";
import BeautyInputField from "./BeautyInputField";
import { Iconify } from "react-native-iconify";
import { InputIcon, InputSlot, Input, InputField } from "@gluestack-ui/themed";
import { theme } from "../shared/theme";

type SearchbarProps = {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  onSubmitEditing?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onClear?: () => void;
  autoFocus?: boolean;
  editable?: boolean;
  style?: object;
};

const Searchbar = (props: SearchbarProps) => {
  return (
    <Input
      borderRadius={10}
      borderWidth={0}
      flexGrow={1}
      px="$3"
      style={[{ backgroundColor: theme.BACKGROUND }, props.style]}
    >
      <InputSlot mr="$3">
        <Iconify
          icon={"solar:minimalistic-magnifer-outline"}
          size={20}
          color={theme.PRIMARY_COLOR}
        />
      </InputSlot>
      <InputField
        placeholder={props.placeholder || "Search"}
        color={theme.FOREGROUND2}
        cursorColor={theme.PRIMARY_COLOR}
      />
    </Input>
  );
};

export default Searchbar;

const styles = StyleSheet.create({});

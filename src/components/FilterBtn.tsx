import { StyleSheet } from "react-native";
import React from "react";
import BeautyButton from "./BeautyButton";
import { Iconify } from "react-native-iconify";
import { Button, ButtonIcon } from "@gluestack-ui/themed";

type FilterButtonProps = {
  style?: object;
  color?: string;
  iconColor?: string;
};

const FilterBtn = (props: FilterButtonProps) => {
  return (
    // <BeautyButton
    //   onPress={() => null}
    //   variant="solid"
    //   color={props.color || theme.PRIMARY_COLOR}
    //   leftButtonIcon={
    //     <Iconify
    //       icon={"solar:tuning-2-outline"}
    //       size={20}
    //       color={props.iconColor || theme.BACKGROUND}
    //       styles={props.style}
    //     />
    //   }
    //   />
    <Button
      borderRadius={10}
      bgColor={props.color}
      style={props.style}
    >
      <ButtonIcon>
        <Iconify
          icon={"solar:tuning-2-outline"}
          size={20}
          color={props.iconColor || theme.BACKGROUND}
        />
      </ButtonIcon>
    </Button>
  );
};

export default FilterBtn;

const styles = StyleSheet.create({});

import { Text, View } from "react-native";
import React, { useContext } from "react";
import {
  Incubator,
  PanningProvider,
  Picker,
  PickerItemProps,
  PickerModes,
  PickerProps,
} from "react-native-ui-lib";
import {
  PickerSingleValue,
  RenderCustomModalProps,
} from "react-native-ui-lib/src/components/picker/types";
import { ThemeContext } from "styled-components/native";
import { ScrollView } from "react-native";
import { Iconify } from "react-native-iconify";

type ISelectPicker = PickerProps & {
  items: PickerItemProps[];
  placeholderText?: string;
  value: PickerSingleValue;
};

const SelectPicker = ({ items, value, placeholderText }: ISelectPicker) => {
  const themeContext = useContext(ThemeContext);

  //   const renderDialog: PickerProps["renderCustomModal"] = (
  //     modalProps: RenderCustomModalProps
  //   ) => {
  //     const { visible, children, toggleModal, onDone } = modalProps;
  //     return (
  //       <Incubator.Dialog
  //         visible={visible}
  //         onDismiss={() => {
  //           onDone();
  //           toggleModal();
  //         }}
  //         width="100%"
  //         height="45%"
  //         bottom
  //         useSafeArea
  //         containerStyle={{ backgroundColor: themeContext?.colors.background }}
  //         direction={PanningProvider.Directions.DOWN}
  //         headerProps={{ title: "Select category" }}
  //       >
  //         <ScrollView>{children}</ScrollView>
  //       </Incubator.Dialog>
  //     );
  //   };

  return (
    <Picker
      mode={PickerModes.SINGLE}
      value={value}
      placeholder={placeholderText ?? "Select item"}
      onChange={() => console.log("changed")}
      items={items}
      trailingAccessory={
        <Iconify
          color={themeContext?.colors.secondaryText2}
          icon="solar:alt-arrow-down-outline"
        />
      }
      pickerModalProps={{
        backgroundColor: themeContext?.colors.background,
      }}
      //   renderCustomModal={renderDialog}
      containerStyle={{
        borderRadius: 20,
        backgroundColor: themeContext?.colors.secondaryBackground,
        overflow: "hidden",
        flexGrow: 1,
        padding: 15,
      }}
    />
  );
};

export default SelectPicker;

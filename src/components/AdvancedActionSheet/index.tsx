import Color from "color";
import React, { useContext } from "react";
import { ActionSheet } from "react-native-ui-lib";
import { ThemeContext } from "styled-components/native";
import { ActionSheetTitle, Description } from "./styles";
import { Platform, TouchableOpacity } from "react-native";

type AdvancedActionSheetProps = React.ForwardRefExoticComponent<
  ActionSheetProps & React.RefAttributes<any>
> & {};

const AdvancedActionSheet = (props: AdvancedActionSheetProps) => {
  const themeContext = useContext(ThemeContext);
  return (
    <ActionSheet
      visible={false}
      message="Select item"
      title="Items"
      useNativeIOS={Platform.OS === "ios" ? true : false}
      options={[]}
      containerStyle={{
        backgroundColor: themeContext?.colors.background,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        padding: 15,
      }}
      dialogStyle={{
        backgroundColor: "transparent",
      }}
      renderTitle={() => <ActionSheetTitle>{props.title}</ActionSheetTitle>}
      renderAction={(option, index, onOptionPress) => (
        <TouchableOpacity
          style={{ paddingVertical: 15 }}
          key={index}
          onPress={() => onOptionPress(index)}
        >
          <Description>{option.label}</Description>
        </TouchableOpacity>
      )}
      {...props}
    />
  );
};

export default AdvancedActionSheet;

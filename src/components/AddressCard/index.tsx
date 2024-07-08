import { Text, View } from "react-native";
import React, { useContext } from "react";
import { Description, AddressCardContainer, AddressLabel } from "./styles";
import IconBtn from "~components/IconBtn";
import { ThemeContext } from "styled-components/native";
import { Iconify } from "react-native-iconify";

const AddressCard = () => {
  const themeContext = useContext(ThemeContext);

  return (
    <AddressCardContainer>
      <View style={{ flexDirection: "row" }}>
        <IconBtn
          style={{
            backgroundColor: themeContext?.colors.secondaryBackground,
          }}
        >
          <Iconify
            icon="solar:map-point-wave-outline"
            size={16}
            color={themeContext?.colors.primary}
          />
        </IconBtn>
        <View style={{ marginLeft: 15 }}>
          <AddressLabel style={{}}>Home</AddressLabel>
          <Description
            style={{
              fontSize: 12,
              color: themeContext?.colors.secondaryText,
            }}
          >
            1901 Thornbridge Cir. Shiloh, Havel 91064
          </Description>
        </View>
      </View>
    </AddressCardContainer>
  );
};

export default AddressCard;

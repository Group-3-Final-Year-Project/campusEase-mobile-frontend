import { Text, View } from "react-native";
import React, { useContext } from "react";
import { Description, AddressCardContainer, AddressLabel } from "./styles";
import IconBtn from "~components/IconBtn";
import { ThemeContext } from "styled-components/native";
import { Iconify } from "react-native-iconify";
import { LocationObj } from "~src/@types/types";
import { formatLatLng } from "~services";
import { APP_PAGES } from "~src/shared/constants";
import { NavigationProp } from "@react-navigation/native";

type AddressCardProps = {
  address: LocationObj;
  navigation: NavigationProp<any>;
};

const AddressCard = ({ address, navigation }: AddressCardProps) => {
  const themeContext = useContext(ThemeContext);

  return (
    <AddressCardContainer
      onPress={() =>
        navigation.navigate(APP_PAGES.ADD_OR_EDIT_LOCATION, {
          address: address,
        })
      }
    >
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
          <AddressLabel style={{}}>{address.name}</AddressLabel>
          <Description
            style={{
              fontSize: 12,
              color: themeContext?.colors.secondaryText,
            }}
          >
            {address.address
              ? address.address
              : formatLatLng(
                  address.location.latitude,
                  address.location.longitude
                )}
          </Description>
        </View>
      </View>
    </AddressCardContainer>
  );
};

export default AddressCard;

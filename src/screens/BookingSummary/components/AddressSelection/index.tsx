import { View } from "react-native";
import React, { useContext, useState } from "react";
import { ButtonProps } from "react-native-ui-lib";
import { BookingInfoCard, Description } from "../../styles";
import { LocationObj } from "~src/@types/types";
import { ThemeContext } from "styled-components/native";
import { Iconify } from "react-native-iconify";
import { IconBtn } from "~components";
import AdvancedActionSheet from "~components/AdvancedActionSheet";

type AddressSelectionProps = {
  addresses: LocationObj[];
  selectedAddress: LocationObj | null;
  setSelectedAddress: React.Dispatch<React.SetStateAction<LocationObj | null>>;
};

const AddressSelection = ({
  addresses,
  selectedAddress,
  setSelectedAddress,
}: AddressSelectionProps) => {
  const themeContext = useContext(ThemeContext);
  const addressesForActionSheet: ButtonProps[] = addresses.map((address) => {
    return {
      label: address.name,
      onPress: () => setSelectedAddress(address),
    };
  });

  const [isVisible, setIsVisible] = useState(false);

  return (
    <>
      <BookingInfoCard>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View>
              <Description>
                {!selectedAddress ? "Select address" : selectedAddress.name}
              </Description>
              {selectedAddress && (
                <Description
                  style={{
                    fontSize: 10,
                    color: themeContext?.colors.secondaryText2,
                  }}
                >
                  {selectedAddress.name}
                </Description>
              )}
            </View>
          </View>
          <IconBtn onPress={() => setIsVisible(true)}>
            {/* <Iconify
              icon="solar:chat-round-line-outline"
              size={16}
              strokeWidth={16}
              color={themeContext?.colors.primary}
            /> */}
            <Description
              style={{ color: themeContext?.colors.primary, fontSize: 12 }}
            >
              Change
            </Description>
          </IconBtn>
        </View>
      </BookingInfoCard>

      <AdvancedActionSheet
        visible={isVisible}
        message="Select sub address"
        options={addressesForActionSheet}
        title="Select sub address(s)"
        useNativeIOS
        onDismiss={() => setIsVisible(false)}
      />
    </>
  );
};

export default AddressSelection;

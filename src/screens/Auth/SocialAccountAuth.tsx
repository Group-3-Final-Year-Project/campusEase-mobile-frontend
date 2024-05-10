import React from "react";
import { HStack } from "@gluestack-ui/themed";
import BeautyButton from "../../components/BeautyButton";
import { theme } from "../../shared/theme";
import { Iconify } from "react-native-iconify";

const SocialAccountAuth = () => {
  return (
    <HStack space="sm">
      <BeautyButton
        variant="outline"
        color={theme.ACCENT}
        onPress={() => null}
        isRounded
        styles={{
          height: 65,
          width: 65,
        }}
        leftButtonIcon={<Iconify icon={"logos:google-icon"} size={24} />}
      />
      <BeautyButton
        variant="outline"
        color={theme.ACCENT}
        onPress={() => null}
        isRounded
        styles={{
          height: 65,
          width: 65,
        }}
        leftButtonIcon={<Iconify icon={"logos:apple"} size={24} />}
      />
    </HStack>
  );
};

export default SocialAccountAuth;

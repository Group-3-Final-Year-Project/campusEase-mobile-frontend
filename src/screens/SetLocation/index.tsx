import { Text, View } from "react-native";
import React from "react";
import { Button } from "~components";
import { getUserType, navigateAndResetStack } from "~services";
import { UserType } from "~src/@types/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { APP_PAGES } from "~src/shared/constants";

const SetLocation = ({ navigation, route }: NativeStackScreenProps<any>) => {
  const checkUserTypeAndNavigate = async () => {
    const userType = await getUserType();
    if (userType) {
      if (userType === UserType.SERVICE_PROVIDER) {
        navigateAndResetStack(navigation, APP_PAGES.REGISTER_SERVICE);
      } else {
        navigateAndResetStack(navigation, APP_PAGES.USER_TAB);
      }
    }
  };

  return (
    <View>
      <Text>SetLocation</Text>
      <Button onPress={checkUserTypeAndNavigate}>Finish up!</Button>
    </View>
  );
};

export default SetLocation;

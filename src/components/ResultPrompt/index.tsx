import { View } from "react-native";
import React, { useContext } from "react";
import { Dialog, DialogProps, PanningProvider } from "react-native-ui-lib";
import { Iconify } from "react-native-iconify";
import { ThemeContext } from "styled-components/native";
import { Description, Title } from "./styles";
import Button from "../Button";
import { NavigationProp } from "@react-navigation/native";
import { navigateAndResetStack } from "~services";
import { APP_PAGES } from "~src/shared/constants";
import { useAppDispatch } from "~store/hooks/useTypedRedux";
import { clearBookingData } from "~store/actions/bookingActions";

type ResultProps = DialogProps & {
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  navigation?: NavigationProp<any>;
  bookingId?: number;
};

const ResultPrompt = (props: ResultProps) => {
  const themeContext = useContext(ThemeContext);
  const dispatch = useAppDispatch();

  const handlePress = () => {
    props.setIsVisible(false);
    console.log(props.bookingId);
    if (props.navigation && props.bookingId) {
      console.log("Yh");
      navigateAndResetStack(props.navigation, [
        APP_PAGES.USER_TAB,
        APP_PAGES.BOOKING_DETAILS,
      ]);
      // props.navigation.navigate(APP_PAGES.BOOKING_DETAILS, {
      //   bookingId: props.bookingId,
      // });
    }
    dispatch(clearBookingData());
  };

  return (
    <Dialog
      useSafeArea
      onDismiss={() => props.setIsVisible(false)}
      panDirection={PanningProvider.Directions.DOWN}
      //   center
      bottom
      overlayBackgroundColor="rgba(0,0,0,0.5)"
      containerStyle={{
        backgroundColor: themeContext?.colors.background,
        borderRadius: 12,
      }}
      {...props}
    >
      <View
        style={{
          padding: 20,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            width: 120,
            height: 120,
            backgroundColor: `${themeContext?.colors.primary}20`,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 120 / 2,
            marginBottom: 20,
          }}
        >
          <View
            style={{
              width: 80,
              height: 80,
              backgroundColor: `${themeContext?.colors.primary}`,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 80 / 2,
            }}
          >
            <Iconify
              icon="solar:check-circle-outline"
              // size={125}
              color={"#ffffff"}
            />
          </View>
        </View>
        <Title>Booking confirmed successfully</Title>
        <Description style={{ fontSize: 12 }}>
          Congratulations{"\n"}Your request has been sent to service provider
        </Description>
        <Button style={{ width: "100%" }} onPress={handlePress}>
          Done
        </Button>
      </View>
    </Dialog>
  );
};

export default ResultPrompt;

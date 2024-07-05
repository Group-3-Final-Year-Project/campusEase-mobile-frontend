import React, { useContext } from "react";
import { Dialog, DialogProps, PanningProvider } from "react-native-ui-lib";
import { ThemeContext } from "styled-components/native";
import { NavigationProp } from "@react-navigation/native";
import { navigateAndResetStack } from "~services";
import { APP_PAGES } from "~src/shared/constants";
import { useAppDispatch } from "~store/hooks/useTypedRedux";
import { clearBookingData } from "~store/actions/bookingActions";
import SuccessState from "../SuccessState";

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
    if (props.navigation && props.bookingId) {
      navigateAndResetStack(props.navigation, APP_PAGES.BOOKING_DETAILS);
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
      <SuccessState
        title="Booking confirmed successfully"
        description={`Congratulations\nYour request has been sent to service provider`}
        onContinue={handlePress}
      />
    </Dialog>
  );
};

export default ResultPrompt;

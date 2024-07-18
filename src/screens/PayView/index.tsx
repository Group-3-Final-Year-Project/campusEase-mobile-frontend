import React, { useContext, useRef } from "react";
import { Paystack } from "react-native-paystack-webview";
import { useAppDispatch, useAppSelector } from "~store/hooks/useTypedRedux";
import { Booking, PaymentStatus } from "~src/@types/types";
import { Container } from "../Home/styles";
import { ThemeContext } from "styled-components/native";
import { createBooking, navigateAndResetStack, showAlert } from "~services";
import ACTION_TYPES from "~store/actionTypes";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { APP_PAGES } from "~src/shared/constants";
import { View } from "react-native";

const PayView = ({ navigation }: NativeStackScreenProps<any>) => {
  const ref = useRef(null);
  const themeContext = useContext(ThemeContext);
  const booking: Booking = useAppSelector((state) => state.booking);
  const dispatch = useAppDispatch();

  const handleOnSuccess = async () => {
    ref.current = null;
    const bookingData: Booking = {
      ...booking,
      paymentStatus: PaymentStatus.PAID,
    };
    await createBooking(bookingData)
      .then(() => {
        dispatch({
          type: ACTION_TYPES.CLEAR_BOOKING_DATA,
          payload: {},
        });
        navigateAndResetStack(navigation, APP_PAGES.BOOKING_CREATION_SUCCESS);
      })
      .catch(() => {
        showAlert("Ooops!", "Could not create your request. Try again");
      });
  };

  return (
    <Container>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
        }}
      >
        <Paystack
          paystackKey={process.env.EXPO_PUBLIC_PAYSTACK_KEY!}
          amount={booking.amount}
          billingEmail={booking.customerEmail}
          billingName={booking.customerName}
          currency={"GHS"}
          firstName={booking.customerName}
          phone={booking.customerPhone}
          refNumber={booking.id}
          activityIndicatorColor={themeContext?.colors.primary}
          onCancel={(e) => {}}
          onSuccess={(response) => handleOnSuccess()}
          autoStart={true}
          ref={ref}
          channels={["mobile_money", "card", "bank"]}
        />
      </View>
    </Container>
  );
};

export default PayView;

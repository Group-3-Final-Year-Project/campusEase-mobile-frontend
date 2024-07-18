import React, { useContext, useRef, useState } from "react";
import { Paystack } from "react-native-paystack-webview";
import { useAppDispatch, useAppSelector } from "~store/hooks/useTypedRedux";
import { Booking, PaymentStatus } from "~src/@types/types";
import { Container } from "../Home/styles";
import { Button } from "~components";
import { ThemeContext } from "styled-components/native";
import {
  createBooking,
  formatLatLng,
  navigateAndResetStack,
  showAlert,
} from "~services";
import ACTION_TYPES from "~store/actionTypes";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { APP_PAGES } from "~src/shared/constants";
import { BottomCard, Description } from "../Service/styles";
import { ScrollView, View } from "react-native";
import { useCustomBottomInset } from "~hooks";
import {
  BookingInfoContainer,
  BookingInfoHeaderLabel,
} from "../BookingDetail/styles";
import PaymentSummary from "../BookingSummary/components/PaymentSummary";

const Checkout = ({ navigation }: NativeStackScreenProps<any>) => {
  const [start, setStart] = useState(false);
  const [loading, setLoading] = useState(false);
  const themeContext = useContext(ThemeContext);
  const booking: Booking = useAppSelector((state) => state.booking);
  const dispatch = useAppDispatch();
  const bottomInset = useCustomBottomInset();

  const handleOnSuccess = async () => {
    setLoading(true);
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
      })
      .finally(() => setLoading(false));
  };

  const handlePayAndNavigate = async () => {
    if (booking.paymentMethodObject.id === "cash-1029272") {
      setLoading(true);
      await handleOnSuccess();
    } else {
      navigation.navigate(APP_PAGES.PAYSTACK_PAYMENT_VIEW);
    }
  };

  const style = {
    paddingVertical: 15,
    fontSize: 12,
    lineHeight: 26,
  };

  const headerStyle = {
    fontSize: 18,
    color: themeContext?.colors.primary,
  };

  return (
    <Container>
      <ScrollView
        style={{
          paddingBottom: bottomInset,
          paddingHorizontal: 15,
        }}
      >
        {booking.subService && (
          <BookingInfoContainer style={{ marginTop: 0 }}>
            <BookingInfoHeaderLabel style={headerStyle}>
              Sub service(s)
            </BookingInfoHeaderLabel>
            <Description>{booking.subService.name}</Description>
          </BookingInfoContainer>
        )}
        <BookingInfoContainer>
          <BookingInfoHeaderLabel style={headerStyle}>
            Customer Information
          </BookingInfoHeaderLabel>
          <Description style={style}>Name:{booking.customerName}</Description>
          <Description style={style}>
            Email: {booking.customerEmail}
          </Description>
          <Description style={style}>
            Phone number: {booking.customerPhone}
          </Description>
          <Description style={style}>
            Address:
            {booking.location?.address
              ? booking.location.address
              : formatLatLng(
                  booking.location.location.latitude,
                  booking.location.location.longitude
                )}
          </Description>
        </BookingInfoContainer>
        <BookingInfoContainer>
          <BookingInfoHeaderLabel style={headerStyle}>
            Payment Summary
          </BookingInfoHeaderLabel>
          <PaymentSummary amount={booking.amount} />
          <Description style={style}>
            Payment method: {booking.paymentMethodObject.name}
          </Description>
        </BookingInfoContainer>
        <BookingInfoContainer>
          <BookingInfoHeaderLabel style={headerStyle}>
            Other Information
          </BookingInfoHeaderLabel>
          <Description style={style}>
            Scheduled Date: {booking.scheduledDate}
          </Description>
          <Description style={style}>
            Scheduled Time: {booking.scheduledTime}
          </Description>
          <Description style={style}>
            Note to provider: {booking.notes}
          </Description>
          <Description style={style}>
            Attachments: {booking.attachments.length}
          </Description>
        </BookingInfoContainer>
      </ScrollView>
      <BottomCard>
        <Button
          style={{ width: "100%", height: 60, padding: 12 }}
          loading={loading}
          onPress={handlePayAndNavigate}
        >
          Confirm booking
        </Button>
      </BottomCard>
    </Container>
  );
};

export default Checkout;

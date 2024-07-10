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

const PayView = ({ navigation }: NativeStackScreenProps<any>) => {
  const ref = useRef(null);
  const [start, setStart] = useState(false);
  const [loading, setLoading] = useState(false);
  const themeContext = useContext(ThemeContext);
  const booking: Booking = useAppSelector((state) => state.booking);
  const dispatch = useAppDispatch();
  const bottomInset = useCustomBottomInset();

  const handleOnSuccess = async () => {
    setLoading(true);
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

  const handlePayAndNavigate = async () => {
    if (booking.paymentMethodObject.id === "cash-1029272") {
      setStart(false);
      setLoading(true);
      await handleOnSuccess();
    } else {
      setStart(true);
    }
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
            <BookingInfoHeaderLabel>Sub service(s)</BookingInfoHeaderLabel>
            <Description>{booking.subService.name}</Description>
          </BookingInfoContainer>
        )}
        <BookingInfoContainer>
          <BookingInfoHeaderLabel>Customer Information</BookingInfoHeaderLabel>
          <Description>Name:{booking.customerName}</Description>
          <Description>Email: {booking.customerEmail}</Description>
          <Description>Phone number: {booking.customerPhone}</Description>
          <Description>
            Address:
            {booking.location.address ??
              formatLatLng(
                booking.location.location.latitude,
                booking.location.location.longitude
              )}
          </Description>
        </BookingInfoContainer>
        <BookingInfoContainer>
          <BookingInfoHeaderLabel>Payment Summary</BookingInfoHeaderLabel>
          <PaymentSummary amount={booking.amount} />
          <Description>
            Payment method: {booking.paymentMethodObject.name}
          </Description>
        </BookingInfoContainer>
        <BookingInfoContainer>
          <BookingInfoHeaderLabel>Other Information</BookingInfoHeaderLabel>
          <Description>Scheduled Date: {booking.scheduledDate}</Description>
          <Description>Scheduled Time: {booking.scheduledTime}</Description>
          <Description>Note to provider: {booking.notes}</Description>
          <Description>Attachments: {booking.attachments.length}</Description>
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
          autoStart={start}
          ref={ref}
          channels={["mobile_money", "card", "bank"]}
        />
      </View>
    </Container>
  );
};

export default PayView;

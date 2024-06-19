import { View, ScrollView, StyleSheet } from "react-native";
import React, { useContext } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemeContext } from "styled-components/native";

import Avatar from "react-native-ui-lib/avatar";
import { Iconify } from "react-native-iconify";
import {
  BookingInfoContainer,
  BookingInfoHeaderLabel,
  Container,
} from "./styles";
import { Button, ServiceProviderCard, TertiaryServiceCard } from "~components";
import BookingStatus from "./components/BookingStatus";

export const useCustomBottomInset = () => {
  const insets = useSafeAreaInsets();
  return Math.max(20, insets.bottom + 5);
};

const BookingDetail = () => {
  const insets = useSafeAreaInsets();
  const bottomInset = useCustomBottomInset();
  const themeContext = useContext(ThemeContext);

  return (
    <Container>
      <ScrollView
        style={{ paddingTop: insets.top, paddingBottom: bottomInset }}
      >
        <TertiaryServiceCard service={{}} />
        <BookingInfoContainer style={{ flexDirection: "row" }}>
          <Button
            variant="outline"
            buttonTextWeight="regular"
            style={{ borderRadius: 7, flexGrow: 1, marginRight: 7 }}
          >
            Write a review
          </Button>
          <Button
            buttonTextWeight="regular"
            style={{ borderRadius: 7, flexGrow: 1 }}
          >
            Book again
          </Button>
        </BookingInfoContainer>
        <BookingInfoContainer>
          <BookingInfoHeaderLabel>
            About Service Provider
          </BookingInfoHeaderLabel>
          <ServiceProviderCard showContactInfo />
        </BookingInfoContainer>
        <BookingInfoContainer>
          <BookingInfoHeaderLabel>Booking Status</BookingInfoHeaderLabel>
          <BookingStatus />
        </BookingInfoContainer>
        <BookingInfoContainer>
          <BookingInfoHeaderLabel>Payment Summary</BookingInfoHeaderLabel>
        </BookingInfoContainer>
      </ScrollView>
    </Container>
  );
};

export default BookingDetail;

export const styles = StyleSheet.create({
  acceptStyle: {},
  declineStyle: {},
});

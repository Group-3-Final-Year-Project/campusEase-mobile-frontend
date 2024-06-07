import { StyleSheet, View, ScrollView } from "react-native";
import React, { useContext } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemeContext } from "styled-components/native";

import Avatar from "react-native-ui-lib/avatar";
import { Iconify } from "react-native-iconify";
import { Container, Description } from "./styles";
import { Button, ServiceProviderCard, TertiaryServiceCard } from "~components";
import { BottomCard, HighlightedDescription } from "../Service/styles";
import {
  BookingInfoContainer,
  BookingInfoHeaderLabel,
} from "../BookingDetail/styles";
import { formatCurrency } from "~services";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { APP_PAGES } from "~src/shared/constants";

export const useCustomBottomInset = () => {
  const insets = useSafeAreaInsets();
  return Math.max(20, insets.bottom + 5);
};

const BookingSummary = ({ navigation }: NativeStackScreenProps<any>) => {
  const insets = useSafeAreaInsets();
  const bottomInset = useCustomBottomInset();
  const themeContext = useContext(ThemeContext);

  return (
    <Container>
      <ScrollView
        style={{
          paddingTop: insets.top,
          paddingBottom: bottomInset,
          paddingHorizontal: 15,
        }}
      >
        <TertiaryServiceCard service={[]} />
        <BookingInfoContainer>
          <BookingInfoHeaderLabel>
            About Service Provider
          </BookingInfoHeaderLabel>
          <ServiceProviderCard showContactInfo />
        </BookingInfoContainer>
        <BookingInfoContainer>
          <BookingInfoHeaderLabel>Payment Summary</BookingInfoHeaderLabel>
        </BookingInfoContainer>
      </ScrollView>
      <BottomCard>
        <Button
          style={{ width: "100%", height: 60, padding: 12 }}
          onPress={() => navigation.navigate(APP_PAGES.OTHER_BOOKING_INFO)}
        >
          Continue
        </Button>
      </BottomCard>
    </Container>
  );
};

export default BookingSummary;

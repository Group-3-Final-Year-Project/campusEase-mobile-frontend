import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { BookingCardContainer, BookingStatusTag, BookingTitle } from "./styles";
import { NavigationProp } from "@react-navigation/native";
import { Description } from "../../styles";
import { Iconify } from "react-native-iconify";
import { formatCurrency } from "~services";
import { Button } from "~components";
import { ThemeContext } from "styled-components/native";
import { APP_PAGES } from "~src/shared/constants";

interface IBookingCard {
  booking: any;
  navigation: NavigationProp<any>;
}

const BookingCard = (props: IBookingCard) => {
  const themeContext = useContext(ThemeContext);

  return (
    <BookingCardContainer
      onPress={() => props.navigation.navigate(APP_PAGES.BOOKING_DETAILS)}
    >
      <BookingStatusTag>COMPLETED</BookingStatusTag>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingBottom: 15,
          borderBottomColor: themeContext?.colors.secondaryBackground,
          borderBottomWidth: 0.8,
        }}
      >
        <View>
          <BookingTitle>Jeron Plumbing</BookingTitle>
          <Description>Mon, Oct 02, 2023 at 10:00 AM</Description>
        </View>
        <Iconify
          icon="solar:alt-arrow-right-outline"
          size={24}
          strokeWidth={16}
          color={themeContext?.colors.text}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: 15,
        }}
      >
        <View style={{ flexDirection: "row", paddingVertical: 15 }}>
          <Iconify
            icon="solar:check-circle-outline"
            size={24}
            strokeWidth={16}
            color={themeContext?.colors.primary}
          />
          <Description style={{ marginLeft: 15, paddingVertical: 5 }}>
            Amount Paid {formatCurrency(190)}
          </Description>
        </View>
        <Button
          style={{
            // height: 50,
            paddingBottom: 12,
            paddingTop: 12,
          }}
          buttonTextSize="small"
          buttonTextWeight="regular"
        >
          Book again
        </Button>
      </View>
    </BookingCardContainer>
  );
};

export default BookingCard;

const styles = StyleSheet.create({});

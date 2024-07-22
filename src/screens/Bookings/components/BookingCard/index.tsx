import { Text, TouchableOpacityProps, View } from "react-native";
import React, { useContext } from "react";
import { BookingCardContainer, BookingStatusTag, BookingTitle } from "./styles";
import { NavigationProp } from "@react-navigation/native";
import { Description } from "../../styles";
import { Iconify } from "react-native-iconify";
import { formatCurrency } from "~services";
import { Button } from "~components";
import { ThemeContext } from "styled-components/native";
import { APP_PAGES } from "~src/shared/constants";
import { Booking, BookingStatus, VerifiedUser } from "~src/@types/types";
import { useAppSelector } from "~store/hooks/useTypedRedux";

interface IBookingCard extends TouchableOpacityProps {
  booking: Booking;
  navigation: NavigationProp<any>;
}

const BookingCard = ({ booking, navigation, ...props }: IBookingCard) => {
  const themeContext = useContext(ThemeContext);
  const user: VerifiedUser = useAppSelector((state) => state.user);

  const getColorForBookingStatus = (status: BookingStatus) => {
    switch (status) {
      case BookingStatus.COMPLETED:
        return themeContext?.colors.green;
      case BookingStatus.CANCELLED:
        return themeContext?.colors.secondary;
      case BookingStatus.IN_PROGRESS:
        return "#0000ff";
      default:
        return "#ffff00";
    }
  };

  return (
    <BookingCardContainer
      onPress={() =>
        navigation.navigate(APP_PAGES.BOOKING_DETAILS, {
          bookingId: booking.id,
        })
      }
      {...props}
    >
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          marginBottom: 15,
          // width: "fit-content",
        }}
      >
        <View
          style={{
            backgroundColor: `${getColorForBookingStatus(
              booking.bookingStatus
            )}20`,
            padding: 8,
            borderRadius: 5,
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          <BookingStatusTag
            style={{
              color: getColorForBookingStatus(booking.bookingStatus),
            }}
          >
            {booking.bookingStatus.toUpperCase()}
          </BookingStatusTag>
        </View>
      </View>
      <View>
        <BookingTitle>
          {booking?.serviceName ? booking.serviceName : booking.customerName} (
          {formatCurrency(booking.amount)})
        </BookingTitle>
        <Description>{booking.createdAt}</Description>
      </View>
    </BookingCardContainer>
  );
};

export default BookingCard;

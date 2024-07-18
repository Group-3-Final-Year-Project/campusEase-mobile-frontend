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
import { Booking, VerifiedUser } from "~src/@types/types";
import { useAppSelector } from "~store/hooks/useTypedRedux";

interface IBookingCard extends TouchableOpacityProps {
  booking: Booking;
  navigation: NavigationProp<any>;
}

const BookingCard = ({ booking, navigation }: IBookingCard) => {
  const themeContext = useContext(ThemeContext);
  const user: VerifiedUser = useAppSelector((state) => state.user);

  return (
    <BookingCardContainer
      onPress={() =>
        navigation.navigate(APP_PAGES.BOOKING_DETAILS, {
          bookingId: booking.id,
        })
      }
    >
      <BookingStatusTag>COMPLETED</BookingStatusTag>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingBottom: 7,
          // borderBottomColor: themeContext?.colors.border,
          // borderBottomWidth: 0.8,
        }}
      >
        <View>
          <BookingTitle>{booking.customerName}</BookingTitle>
          <Description>{booking.createdAt}</Description>
        </View>
        <Iconify
          icon="solar:alt-arrow-right-outline"
          size={24}
          strokeWidth={16}
          color={themeContext?.colors.text}
        />
      </View>
      <View style={{ flexDirection: "row", paddingVertical: 15 }}>
        <Description>{formatCurrency(190)}</Description>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: 15,
        }}
      >
        <Button
          buttonTextSize="small"
          buttonTextWeight="regular"
          style={{ flexGrow: 1, marginRight: 10 }}
          variant="outline"
        >
          Print e-receipt
        </Button>

        <Button
          buttonTextSize="small"
          buttonTextWeight="regular"
          style={{ flexGrow: 1 }}
        >
          Book again
        </Button>
      </View>
    </BookingCardContainer>
  );
};

export default BookingCard;

import { View } from "react-native";
import React, { useContext } from "react";
import { Booking, BookingStatus } from "~src/@types/types";
import { Button } from "~components";
import { ThemeContext } from "styled-components/native";
import { useAppDispatch } from "~store/hooks/useTypedRedux";

const BookingBtns = ({
  booking,
  isMyService,
}: {
  booking: Booking;
  isMyService: boolean;
}) => {
  const themeContext = useContext(ThemeContext);

  const renderButtonsForUser = (bookingStatus: string) => {
    if (bookingStatus === BookingStatus.PENDING) {
      return (
        <>
          <Button
            variant="outline"
            style={{
              flexGrow: 1,
              marginRight: 7,
              borderColor: themeContext?.colors.secondaryBackground,
            }}
            disabled
          >
            {bookingStatus}
          </Button>
          <Button
            style={{
              flexGrow: 1,
              backgroundColor: themeContext?.colors.secondary,
            }}
          >
            Cancel
          </Button>
        </>
      );
    } else if (
      bookingStatus === BookingStatus.CANCELLED ||
      bookingStatus === BookingStatus.COMPLETED
    ) {
      return (
        <>
          <Button
            variant="outline"
            style={{
              flexGrow: 1,
              marginRight: 7,
              borderColor: themeContext?.colors.secondaryBackground,
            }}
            disabled
          >
            {bookingStatus}
          </Button>
          <Button
            style={{
              flexGrow: 1,
              // backgroundColor: themeContext?.colors.secondary,
            }}
          >
            Book again
          </Button>
          {bookingStatus === BookingStatus.COMPLETED && (
            <View style={{ flexDirection: "row" }}>
              <Button
                variant="outline"
                style={{
                  flexGrow: 1,
                  marginRight: 7,
                  //   borderColor: themeContext?.colors.secondaryBackground,
                }}
                disabled
              >
                Write review
              </Button>
              <Button
                style={{
                  flexGrow: 1,
                  // backgroundColor: themeContext?.colors.secondary,
                }}
              >
                E-receipt
              </Button>
            </View>
          )}
        </>
      );
    } else if (bookingStatus === BookingStatus.IN_PROGRESS) {
      return (
        <>
          <Button
            variant="outline"
            style={{
              flexGrow: 1,
              marginRight: 7,
              borderColor: themeContext?.colors.secondaryBackground,
            }}
            disabled
          >
            {bookingStatus}
          </Button>
          <Button
            style={{
              flexGrow: 1,
              // backgroundColor: themeContext?.colors.secondary,
            }}
          >
            Confirm as completed
          </Button>
        </>
      );
    }
  };

  const renderButtonsForServiceProvider = (bookingStatus: string) => {
    if (bookingStatus === BookingStatus.PENDING) {
      return (
        <>
          <Button
            style={{
              flexGrow: 1,
              marginRight: 7,
              backgroundColor: themeContext?.colors.green,
            }}
            disabled
          >
            Accept
          </Button>
          <Button
            style={{
              flexGrow: 1,
              backgroundColor: themeContext?.colors.secondary,
            }}
          >
            Decline
          </Button>
        </>
      );
    } else if (
      bookingStatus === BookingStatus.CANCELLED ||
      bookingStatus === BookingStatus.IN_PROGRESS
    ) {
      return (
        <Button
          variant="outline"
          style={{
            flexGrow: 1,
            marginRight: 7,
            borderColor: themeContext?.colors.secondaryBackground,
          }}
          disabled
        >
          {bookingStatus}
        </Button>
      );
    } else if (bookingStatus === BookingStatus.COMPLETED) {
      return (
        <>
          <Button
            variant="outline"
            style={{
              flexGrow: 1,
              marginRight: 7,
              borderColor: themeContext?.colors.secondaryBackground,
            }}
            disabled
          >
            {bookingStatus}
          </Button>
          <Button
            style={{
              flexGrow: 1,
              // backgroundColor: themeContext?.colors.secondary,
            }}
          >
            E-receipt
          </Button>
        </>
      );
    } else if (bookingStatus === BookingStatus.IN_PROGRESS) {
      return (
        <>
          <Button
            variant="outline"
            style={{
              flexGrow: 1,
              marginRight: 7,
              borderColor: themeContext?.colors.secondaryBackground,
            }}
            disabled
          >
            {bookingStatus}
          </Button>
          <Button
            style={{
              flexGrow: 1,
              // backgroundColor: themeContext?.colors.secondary,
            }}
          >
            Confirm as completed
          </Button>
        </>
      );
    }
  };

  return (
    <>
      {isMyService
        ? renderButtonsForServiceProvider(booking.bookingStatus)
        : renderButtonsForUser(booking.bookingStatus)}
    </>
  );
};

export default BookingBtns;

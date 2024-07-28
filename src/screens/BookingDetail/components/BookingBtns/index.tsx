import { View } from "react-native";
import React, { useContext } from "react";
import { Booking, BookingStatus } from "~src/@types/types";
import { Button } from "~components";
import { ThemeContext } from "styled-components/native";
import { showAlert, updateBooking } from "~services";
import { arrayUnion } from "firebase/firestore";
import { bookingStates } from "~src/data/bookingStatesData";
import { NavigationProp } from "@react-navigation/native";
import { APP_PAGES } from "~src/shared/constants";

const BookingBtns = ({
  navigation,
  booking,
  isMyService,
}: {
  navigation: NavigationProp<any>;
  booking: Booking;
  isMyService: boolean;
}) => {
  const themeContext = useContext(ThemeContext);

  const handleCancelBooking = () => {
    showAlert("Ohhh...", "Are you sure you want to cancel this booking?", [
      {
        label: "Yes, cancel",
        onPress: async () => {
          await updateBooking(booking.id, {
            bookingStatus: BookingStatus.CANCELLED,
            bookingStates: arrayUnion(bookingStates.Cancelled),
          });
        },
      },
    ]);
  };
  const handleBookAgain = () =>
    navigation.navigate(APP_PAGES.SERVICE, { serviceId: booking.serviceId });
  const handleWriteReview = () =>
    navigation.navigate(APP_PAGES.WRITE_REVIEW, {
      bookingId: booking.id,
      serviceId: booking.serviceId,
      providerId: booking.providerId,
    });
  const handlePrintReceipt = () => {};
  const handleConfirmCompletedFromUser = async () => {
    showAlert(
      "Completed?",
      "Are you sure your booking request has been completed by service provider?",
      [
        {
          label: "Yes, I'm sure",
          onPress: async () => {
            if (booking.requestCompletedConfirmationFromProvider) {
              await updateBooking(booking.id, {
                requestCompletedConfirmationFromUser: true,
                bookingStatus: BookingStatus.COMPLETED,
                bookingStates: arrayUnion(bookingStates.Completed),
              });
            } else {
              await updateBooking(booking.id, {
                requestCompletedConfirmationFromUser: true,
              });
            }
          },
        },
      ]
    );
  };
  const handleConfirmCompletedFromServiceProvider = () => {
    showAlert(
      "Completed?",
      "Are you sure you have completed this booking request?",
      [
        {
          label: "Yes, I'm sure",
          onPress: async () => {
            if (booking.requestCompletedConfirmationFromUser) {
              await updateBooking(booking.id, {
                requestCompletedConfirmationFromProvider: true,
                bookingStatus: BookingStatus.COMPLETED,
                bookingStates: arrayUnion(bookingStates.Completed),
              });
            } else {
              await updateBooking(booking.id, {
                requestCompletedConfirmationFromProvider: true,
              });
            }
          },
        },
      ]
    );
  };
  const handleAcceptRequest = async () => {
    await updateBooking(booking.id, {
      bookingStatus: BookingStatus.IN_PROGRESS,
      bookingStates: arrayUnion(bookingStates?.["In Progress"]),
    });
  };
  const handleRejectRequest = async () => {
    showAlert("Ohhh...", "Are you sure you want to reject this request?", [
      {
        label: "Yes, reject",
        onPress: async () => {
          await updateBooking(booking.id, {
            bookingStatus: BookingStatus.CANCELLED,
            bookingStates: arrayUnion(bookingStates.Cancelled),
          });
        },
      },
    ]);
  };

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
              borderColor: themeContext?.colors.secondary,
            }}
            onPress={handleCancelBooking}
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
            onPress={handleBookAgain}
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
                onPress={handleWriteReview}
              >
                Write review
              </Button>
              <Button
                style={{
                  flexGrow: 1,
                  // backgroundColor: themeContext?.colors.secondary,
                }}
                onPress={handlePrintReceipt}
              >
                E-receipt
              </Button>
            </View>
          )}
        </>
      );
    } else if (bookingStatus === BookingStatus.IN_PROGRESS) {
      if (booking.requestCompletedConfirmationFromUser) {
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
            Booking completed confirmed. Waiting for the service provider to
            confirm
          </Button>
        );
      }
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
            onPress={handleConfirmCompletedFromUser}
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
              borderColor: themeContext?.colors.green,
            }}
            onPress={handleAcceptRequest}
          >
            Accept
          </Button>
          <Button
            style={{
              flexGrow: 1,
              backgroundColor: themeContext?.colors.secondary,
              borderColor: themeContext?.colors.secondary,
            }}
            onPress={handleRejectRequest}
          >
            Decline
          </Button>
        </>
      );
    } else if (bookingStatus === BookingStatus.CANCELLED) {
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
            onPress={handlePrintReceipt}
          >
            E-receipt
          </Button>
        </>
      );
    } else if (bookingStatus === BookingStatus.IN_PROGRESS) {
      if (booking.requestCompletedConfirmationFromProvider) {
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
            Booking completed confirmed. Waiting for the end consumer to confirm
          </Button>
        );
      }
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
            onPress={handleConfirmCompletedFromServiceProvider}
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

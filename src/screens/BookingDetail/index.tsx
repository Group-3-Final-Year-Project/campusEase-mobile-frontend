import { ScrollView } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useCustomBottomInset } from "~hooks";
import {
  BookingInfoContainer,
  BookingInfoHeaderLabel,
  Container,
} from "./styles";
import {
  CustomRefreshControl,
  EmptyState,
  LoadingView,
  ServiceProviderCard,
  TertiaryServiceCard,
} from "~components";
import BookingStatus from "./components/BookingStatus";
import {
  Service,
  VerifiedUserPreview,
  VerifiedUser,
  Booking,
} from "~src/@types/types";
import { useAppSelector } from "~store/hooks/useTypedRedux";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { STORAGE_KEYS } from "~src/shared/constants";
import { getService, getUserDataPreview, showAlert } from "~services";
import BookingBtns from "./components/BookingBtns";
import PaymentSummary from "../BookingSummary/components/PaymentSummary";
import { doc, onSnapshot, Unsubscribe } from "firebase/firestore";
import { firestoreDatabase } from "firebaseConfig";
import { NavigationProp } from "@react-navigation/native";

const BookingDetail = ({ navigation, route }: NativeStackScreenProps<any>) => {
  const insets = useSafeAreaInsets();
  const bottomInset = useCustomBottomInset();
  const user: VerifiedUser = useAppSelector((state) => state.user);
  const [serviceProvider, setServiceProvider] =
    useState<VerifiedUserPreview | null>(null);
  const [service, setService] = useState<Service | null>(null);
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [refetching, setRefetching] = useState<boolean>(false);

  const fetchBookingData = async (bookingId: string) => {
    try {
      const unsubscribe = onSnapshot(
        doc(firestoreDatabase, STORAGE_KEYS.BOOKINGS, bookingId),
        (querySnapshot) => {
          const bookingData = {
            id: querySnapshot.id,
            ...querySnapshot.data(),
          } as Booking;
          setBooking(bookingData);
        }
      );
      return unsubscribe;
    } catch (error) {
      showAlert("Ooops..", "Could not fetch booking details. Try again");
    }
  };

  useEffect(() => {
    let unsubscribe: Unsubscribe | undefined;
    setLoading(true);
    if (route.params?.bookingId) {
      (async () => {
        try {
          unsubscribe = await fetchBookingData(route.params?.bookingId);
        } catch (error) {
          console.error("Error fetching booking data:", error);
          // Handle error here (optional)
        } finally {
          setLoading(false);
        }
      })();
    }

    // Cleanup function for effect
    return () => unsubscribe?.();
  }, []);

  const getServiceProviderData = useCallback(
    async (providerId: string) => {
      setServiceProvider(await getUserDataPreview(providerId));
    },
    [route.params?.bookingId]
  );

  const getServiceData = useCallback(
    async (serviceId: string) => {
      setService(await getService(serviceId));
    },
    [route.params?.bookingId]
  );

  const isMyService = user.id === booking?.providerId;

  useEffect(() => {
    if (booking) {
      getServiceData(booking.serviceId);
      if (isMyService) {
        getServiceProviderData(booking.userId);
      } else {
        getServiceProviderData(booking.providerId);
      }
    }
  }, [booking]);

  if (loading) return <LoadingView />;
  else if (!booking || booking === undefined || !route.params?.bookingId)
    return <EmptyState />;

  return (
    <Container>
      <ScrollView
        refreshControl={
          <CustomRefreshControl
            refreshing={refetching}
            onRefresh={() => {
              setRefetching(true);
              fetchBookingData(route.params?.bookingId).finally(() =>
                setRefetching(false)
              );
            }}
          />
        }
        style={{ paddingBottom: bottomInset }}
      >
        {service && <TertiaryServiceCard service={service} />}
        <BookingInfoContainer style={{ flexDirection: "row" }}>
          <BookingBtns
            booking={booking}
            isMyService={isMyService}
            navigation={navigation as NavigationProp<any>}
          />
        </BookingInfoContainer>
        {serviceProvider && (
          <BookingInfoContainer>
            <BookingInfoHeaderLabel>
              {isMyService ? "About customer" : "About Service Provider"}
            </BookingInfoHeaderLabel>
            <ServiceProviderCard provider={serviceProvider} showContactInfo />
          </BookingInfoContainer>
        )}
        <BookingInfoContainer>
          <BookingInfoHeaderLabel>Booking Status</BookingInfoHeaderLabel>
          <BookingStatus bookingStates={booking.bookingStates} />
        </BookingInfoContainer>
        <BookingInfoContainer>
          <BookingInfoHeaderLabel>Payment Summary</BookingInfoHeaderLabel>
          <PaymentSummary amount={booking.amount} />
        </BookingInfoContainer>
      </ScrollView>
    </Container>
  );
};

export default BookingDetail;

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
  Button,
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
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS, STORAGE_KEYS } from "~src/shared/constants";
import {
  getBooking,
  getService,
  getUserDataPreview,
  showAlert,
} from "~services";
import BookingBtns from "./components/BookingBtns";
import PaymentSummary from "../BookingSummary/components/PaymentSummary";
import { doc, onSnapshot, query, Unsubscribe } from "firebase/firestore";
import { firestoreDatabase } from "firebaseConfig";

const BookingDetail = ({ navigation, route }: NativeStackScreenProps<any>) => {
  const insets = useSafeAreaInsets();
  const bottomInset = useCustomBottomInset();
  const user: VerifiedUser = useAppSelector((state) => state.user);
  const [serviceProvider, setServiceProvider] =
    useState<VerifiedUserPreview | null>(null);
  const [service, setService] = useState<Service | null>(null);

  const fetchData = (bookingId: string): Promise<Booking> => {
    return new Promise((resolve, reject) => {
      const unsubscribe = onSnapshot(
        doc(firestoreDatabase, STORAGE_KEYS.BOOKINGS, bookingId),
        (querySnapshot) => {
          const booking = {
            id: querySnapshot.id,
            ...querySnapshot.data(),
          } as Booking;
          resolve(booking);
        },
        (error) => reject(error)
      );

      return () => unsubscribe();
    });
  };

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

  const { data, isLoading, isError, isRefetching } = useQuery({
    queryKey: [QUERY_KEYS.SERVICE],
    queryFn: () => fetchData(route.params?.bookingId),
  });

  const isMyService = user.id === data?.providerId;

  useEffect(() => {
    if (data) {
      getServiceData(data.serviceId);
      if (isMyService) {
        getServiceProviderData(data.userId);
      } else {
        getServiceProviderData(data.providerId);
      }
    }
  }, [data]);

  if (isLoading) return <LoadingView />;
  else if (isError || !data || data === undefined || !route.params?.bookingId)
    return <EmptyState />;

  return (
    <Container>
      <ScrollView
        refreshControl={<CustomRefreshControl refreshing={isRefetching} />}
        style={{ paddingTop: insets.top, paddingBottom: bottomInset }}
      >
        {service && <TertiaryServiceCard service={service} />}
        <BookingInfoContainer style={{ flexDirection: "row" }}>
          <BookingBtns booking={data} isMyService={isMyService} />
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
          <BookingStatus />
        </BookingInfoContainer>
        <BookingInfoContainer>
          <BookingInfoHeaderLabel>Payment Summary</BookingInfoHeaderLabel>
          <PaymentSummary amount={data.amount} />
        </BookingInfoContainer>
      </ScrollView>
    </Container>
  );
};

export default BookingDetail;

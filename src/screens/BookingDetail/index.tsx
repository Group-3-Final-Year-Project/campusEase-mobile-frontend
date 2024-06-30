import { ScrollView, StyleSheet, RefreshControl } from "react-native";
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
  EmptyState,
  LoadingView,
  ServiceProviderCard,
  TertiaryServiceCard,
} from "~components";
import BookingStatus from "./components/BookingStatus";
import { Service, VerifiedUserPreview, VerifiedUser } from "~src/@types/types";
import { useAppSelector } from "~store/hooks/useTypedRedux";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "~src/shared/constants";
import { getBooking, getService, getUserDataPreview } from "~services";

const BookingDetail = ({ navigation, route }: NativeStackScreenProps<any>) => {
  const insets = useSafeAreaInsets();
  const bottomInset = useCustomBottomInset();
  const user: VerifiedUser = useAppSelector((state) => state.user);
  const [serviceProvider, setServiceProvider] =
    useState<VerifiedUserPreview | null>(null);
  const [service, setService] = useState<Service | null>(null);

  const fetchData = useCallback(
    async (bookingId: string) => {
      const booking = await getBooking(bookingId);
      return booking;
    },
    [route.params, navigation]
  );

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
        refreshControl={<RefreshControl refreshing={isRefetching} />}
        style={{ paddingTop: insets.top, paddingBottom: bottomInset }}
      >
        {service && <TertiaryServiceCard service={service} />}
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

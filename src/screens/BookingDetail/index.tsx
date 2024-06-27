import { View, ScrollView, StyleSheet } from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useCustomBottomInset } from "~hooks";
import { ThemeContext } from "styled-components/native";

import Avatar from "react-native-ui-lib/avatar";
import { Iconify } from "react-native-iconify";
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
import { Service, ServiceProvider, VerifiedUser } from "~src/@types/types";
import { useAppSelector } from "~store/hooks/useTypedRedux";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import bookingsData from "~src/data/bookingsData";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "~src/shared/constants";
import usersData from "~src/data/usersData";
import { RefreshControl } from "react-native";
import { getServiceData, getServiceProviderData } from "~services";

const BookingDetail = ({ navigation, route }: NativeStackScreenProps<any>) => {
  const insets = useSafeAreaInsets();
  const bottomInset = useCustomBottomInset();
  const themeContext = useContext(ThemeContext);
  const { authorized_account }: VerifiedUser = useAppSelector(
    (state) => state.user
  );
  const [serviceProvider, setServiceProvider] =
    useState<ServiceProvider | null>(null);
  const [service, setService] = useState<Service | null>(null);
  const fetchData = useCallback(
    (bookingId: number) => {
      return bookingsData.filter((booking) => booking.id === bookingId)[0];
    },
    [route.params, navigation]
  );

  const getServiceProvider = useCallback(
    (providerId: number) => {
      setServiceProvider(getServiceProviderData(providerId));
    },
    [route.params?.bookingId]
  );
  const getService = useCallback(
    (serviceId: number) => {
      setService(getServiceData(serviceId));
    },
    [route.params?.bookingId]
  );

  const { data, isLoading, isError, isRefetching } = useQuery({
    queryKey: [QUERY_KEYS.SERVICE],
    queryFn: () => fetchData(route.params?.bookingId),
  });

  const isMyService = authorized_account.id === data?.providerId;

  useEffect(() => {
    if (data) {
      getService(data.serviceId);
      if (isMyService) {
        getServiceProvider(data.userId);
      } else {
        getServiceProvider(data.providerId);
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

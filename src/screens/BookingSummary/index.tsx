import { ScrollView } from "react-native";
import React, { useContext, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useCustomBottomInset } from "~hooks";
import { ThemeContext } from "styled-components/native";

import Avatar from "react-native-ui-lib/avatar";
import { Iconify } from "react-native-iconify";
import { Container } from "./styles";
import {
  Button,
  EmptyState,
  ServiceProviderCard,
  TertiaryServiceCard,
} from "~components";
import { BottomCard } from "../Service/styles";
import {
  BookingInfoContainer,
  BookingInfoHeaderLabel,
} from "../BookingDetail/styles";
import { formatCurrency } from "~services";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { APP_PAGES } from "~src/shared/constants";
import {
  LocationObject,
  PaymentMethodObject,
  Service,
  ServiceProvider,
  SubService,
  VerifiedUser,
} from "~src/@types/types";
import PaymentSummary from "./components/PaymentSummary";
import SubServiceSelection from "./components/SubServiceSelection";
import AddressSelection from "./components/AddressSelection";
import { useAppSelector } from "~store/hooks/useTypedRedux";
import PaymentMethodSelection from "./components/PaymentMethodSelection";
import paymentMethodsData from "~src/data/paymentMethodsData";

const BookingSummary = ({ navigation, route }: NativeStackScreenProps<any>) => {
  const insets = useSafeAreaInsets();
  const bottomInset = useCustomBottomInset();
  const themeContext = useContext(ThemeContext);
  const { authorized_account }: VerifiedUser = useAppSelector(
    (state) => state.user
  );
  const [selectedSubService, setSelectedSubService] =
    useState<SubService | null>(null);
  const [selectedAddress, setSelectedAddress] = useState<LocationObject | null>(
    null
  );
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<PaymentMethodObject | null>(null);

  if (!route.params?.service && !route.params?.serviceProvider)
    return <EmptyState />;

  return (
    <Container>
      <ScrollView
        style={{
          paddingTop: insets.top,
          paddingBottom: bottomInset,
          paddingHorizontal: 15,
          // marginBottom: 200,
          flex: 1,
        }}
      >
        <TertiaryServiceCard service={route.params?.service as Service} />
        <BookingInfoContainer>
          <BookingInfoHeaderLabel>
            About Service Provider
          </BookingInfoHeaderLabel>
          <ServiceProviderCard
            showContactInfo
            provider={route.params?.serviceProvider as ServiceProvider}
          />
        </BookingInfoContainer>
        {route.params?.service.subServices && (
          <BookingInfoContainer>
            <BookingInfoHeaderLabel>Sub Service(s)</BookingInfoHeaderLabel>
            <SubServiceSelection
              subServices={route.params?.service.subServices as SubService[]}
              selectedSubService={selectedSubService}
              setSelectedSubService={setSelectedSubService}
            />
          </BookingInfoContainer>
        )}
        <BookingInfoContainer>
          <BookingInfoHeaderLabel>Address</BookingInfoHeaderLabel>
          <AddressSelection
            addresses={authorized_account.locations}
            selectedAddress={selectedAddress}
            setSelectedAddress={setSelectedAddress}
          />
        </BookingInfoContainer>
        <BookingInfoContainer>
          <BookingInfoHeaderLabel>Payment Summary</BookingInfoHeaderLabel>
          <PaymentSummary />
        </BookingInfoContainer>
        <BookingInfoContainer>
          <BookingInfoHeaderLabel>Payment Method</BookingInfoHeaderLabel>
          <PaymentMethodSelection
            paymentMethods={paymentMethodsData}
            selectedPaymentMethod={selectedPaymentMethod}
            setSelectedPaymentMethod={setSelectedPaymentMethod}
          />
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

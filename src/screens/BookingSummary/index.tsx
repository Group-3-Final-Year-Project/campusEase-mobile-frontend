import { ScrollView } from "react-native";
import React, { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useCustomBottomInset } from "~hooks";
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
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { APP_PAGES } from "~src/shared/constants";
import {
  LocationObj,
  PaymentMethodObject,
  Service,
  VerifiedUserPreview,
  SubService,
  VerifiedUser,
} from "~src/@types/types";
import PaymentSummary from "./components/PaymentSummary";
import SubServiceSelection from "./components/SubServiceSelection";
import AddressSelection from "./components/AddressSelection";
import { useAppDispatch, useAppSelector } from "~store/hooks/useTypedRedux";
import PaymentMethodSelection from "./components/PaymentMethodSelection";
import paymentMethodsData from "~src/data/paymentMethodsData";
import { updateBookingData } from "~store/actions/bookingActions";
import ACTION_TYPES from "~store/actionTypes";
import uuid from "react-native-uuid";
import { showAlert } from "~services";

const BookingSummary = ({ navigation, route }: NativeStackScreenProps<any>) => {
  const insets = useSafeAreaInsets();
  const bottomInset = useCustomBottomInset();
  const user: VerifiedUser = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [selectedSubService, setSelectedSubService] =
    useState<SubService | null>(null);
  const [selectedAddress, setSelectedAddress] = useState<LocationObj | null>(
    null
  );
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<PaymentMethodObject | null>(null);

  const onContinue = () => {
    if (selectedPaymentMethod && selectedAddress) {
      if (route.params?.service.subServices.length && selectedSubService?.id) {
        dispatch({
          type: ACTION_TYPES.UPDATE_BOOKING_DATA,
          payload: {
            id: uuid.v4() as string,
            userId: user.id,
            serviceId: route.params?.service.id,
            serviceName: route.params?.service.name,
            providerId: route.params?.service.providerId,
            location: selectedAddress,
            paymentMethodObject: selectedPaymentMethod,
            subService: selectedSubService,
            amount:
              selectedSubService.price || route.params?.service.startingPrice,
          },
        });
      } else {
        dispatch({
          type: ACTION_TYPES.UPDATE_BOOKING_DATA,
          payload: {
            id: uuid.v4() as string,
            userId: user.id,
            serviceId: route.params?.service.id,
            serviceName: route.params?.service.name,
            providerId: route.params?.service.providerId,
            location: selectedAddress,
            paymentMethodObject: selectedPaymentMethod,
            subService: selectedSubService,
            amount: route.params?.service.startingPrice,
          },
        });
      }
      navigation.navigate(APP_PAGES.OTHER_BOOKING_INFO);
    } else {
      showAlert("Waitttt!", "Select address and payment method to continue");
    }
  };

  if (!route.params?.service && !route.params?.serviceProvider)
    return <EmptyState />;

  return (
    <Container>
      <ScrollView
        style={{
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
            provider={route.params?.serviceProvider as VerifiedUserPreview}
          />
        </BookingInfoContainer>
        {!!route.params?.service.subServices.length && (
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
            addresses={user.locations}
            selectedAddress={selectedAddress}
            setSelectedAddress={setSelectedAddress}
          />
        </BookingInfoContainer>
        <BookingInfoContainer>
          <BookingInfoHeaderLabel>Payment Summary</BookingInfoHeaderLabel>
          <PaymentSummary amount={selectedSubService?.price ?? 0} />
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
          onPress={onContinue}
        >
          Continue
        </Button>
      </BottomCard>
    </Container>
  );
};

export default BookingSummary;

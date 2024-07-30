import { ScrollView, TouchableOpacity, View } from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
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
import { APP_PAGES, STORAGE_KEYS } from "~src/shared/constants";
import {
  downloadFile,
  downloadFileFromFirebaseStorage,
  formatCurrency,
  getService,
  getUserDataPreview,
  showAlert,
} from "~services";
import BookingBtns from "./components/BookingBtns";
import PaymentSummary from "../BookingSummary/components/PaymentSummary";
import { doc, onSnapshot, Unsubscribe } from "firebase/firestore";
import { firestoreDatabase } from "firebaseConfig";
import { NavigationProp } from "@react-navigation/native";
import { Description } from "../Service/styles";
import { ThemeContext } from "styled-components/native";
import { BookingInfoCard } from "../BookingSummary/styles";
import { pickAttachmentTypeIcon } from "../MoreBookingInfo/components/BookingAttachments";
import {
  AttachmentContainer,
  AttachmentName,
  AttachmentTypeContainer,
  InfoContainer,
} from "../MoreBookingInfo/components/BookingAttachments/styles";
import truncate from "lodash/truncate";
import { Iconify } from "react-native-iconify";

const BookingDetail = ({ navigation, route }: NativeStackScreenProps<any>) => {
  const insets = useSafeAreaInsets();
  const themeContext = useContext(ThemeContext);
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
        {booking.subService && (
          <BookingInfoContainer>
            <BookingInfoHeaderLabel>Sub service booked</BookingInfoHeaderLabel>
            <BookingInfoCard style={{ flexDirection: "row" }}>
              <View style={{ paddingVertical: 7 }} key={booking.subService.id}>
                <View
                  style={{
                    width: "100%",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <View>
                      <Description>{booking.subService?.name}</Description>
                      {booking.subService?.description && (
                        <Description
                          style={{
                            fontSize: 12,
                            color: themeContext?.colors.secondaryText,
                            paddingTop: 5,
                          }}
                        >
                          {booking.subService?.description}
                        </Description>
                      )}
                    </View>
                  </View>
                  <Description>
                    {formatCurrency(booking.subService?.price ?? 0)}
                  </Description>
                </View>
              </View>
            </BookingInfoCard>
          </BookingInfoContainer>
        )}
        {serviceProvider && (
          <BookingInfoContainer>
            <BookingInfoHeaderLabel>
              {isMyService ? "About customer" : "About Service Provider"}
            </BookingInfoHeaderLabel>
            <ServiceProviderCard provider={serviceProvider} showContactInfo />
            <BookingInfoCard style={{ marginTop: 5 }}>
              <View style={{ paddingVertical: 7 }}>
                <View
                  style={{
                    width: "100%",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Description>Name</Description>
                  <Description>{booking?.customerName}</Description>
                </View>
              </View>
              <View style={{ paddingVertical: 7 }}>
                <View
                  style={{
                    width: "100%",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Description>Email</Description>
                  <Description>{booking?.customerEmail}</Description>
                </View>
              </View>
              <View style={{ paddingVertical: 7 }}>
                <View
                  style={{
                    width: "100%",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Description>Phone number</Description>
                  <Description>{booking?.customerPhone}</Description>
                </View>
              </View>
            </BookingInfoCard>
          </BookingInfoContainer>
        )}
        {!!booking.notes && (
          <BookingInfoContainer>
            <BookingInfoHeaderLabel>
              {isMyService ? "Note from customer" : "Note to service provider"}
            </BookingInfoHeaderLabel>
            <BookingInfoCard>
              <Description>{booking.notes}</Description>
            </BookingInfoCard>
          </BookingInfoContainer>
        )}
        {(!!booking.scheduledDate || !!booking.scheduledTime) && (
          <BookingInfoContainer>
            <BookingInfoHeaderLabel>Schedule</BookingInfoHeaderLabel>
            <BookingInfoCard>
              <View style={{ paddingVertical: 7 }}>
                <View
                  style={{
                    width: "100%",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Description>Scheduled Date</Description>
                  <Description>{booking?.scheduledDate}</Description>
                </View>
              </View>
              <View style={{ paddingVertical: 7 }}>
                <View
                  style={{
                    width: "100%",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Description>Scheduled Time</Description>
                  <Description>{booking?.scheduledTime}</Description>
                </View>
              </View>
            </BookingInfoCard>
          </BookingInfoContainer>
        )}
        {!!booking.attachments.length && (
          <BookingInfoContainer>
            <BookingInfoHeaderLabel>
              Attachments for service provider
            </BookingInfoHeaderLabel>
            {booking.attachments.map((attachment) => (
              <AttachmentContainer
                key={attachment.key}
                // style={{ width: Dimensions.get("screen").width - 30 }}
              >
                <AttachmentTypeContainer>
                  {pickAttachmentTypeIcon(
                    attachment.fileType ?? "application/*"
                  )}
                </AttachmentTypeContainer>
                <InfoContainer>
                  <AttachmentName>
                    {truncate(attachment.fileName, { length: 20 })}
                  </AttachmentName>
                  <Description>{attachment.fileSize}B</Description>
                </InfoContainer>
                <TouchableOpacity
                  onPress={async () =>
                    downloadFileFromFirebaseStorage(attachment.fileName).then(
                      async (url) =>
                        await downloadFile(url, attachment.fileName,attachment.fileType)
                    )
                  }
                  style={{ borderRadius: 100 }}
                >
                  <Iconify
                    size={22}
                    color={themeContext?.colors.text}
                    icon="solar:download-outline"
                  />
                </TouchableOpacity>
              </AttachmentContainer>
            ))}
          </BookingInfoContainer>
        )}
        <BookingInfoContainer>
          <BookingInfoHeaderLabel>Payment Summary</BookingInfoHeaderLabel>
          <BookingInfoCard>
            <PaymentSummary amount={booking.amount} />
          </BookingInfoCard>
        </BookingInfoContainer>
        <BookingInfoContainer>
          <BookingInfoHeaderLabel>Booking Status</BookingInfoHeaderLabel>
          <BookingStatus bookingStates={booking.bookingStates} />
        </BookingInfoContainer>
        <BookingInfoContainer>
          <Button style={{ backgroundColor: "transparent" }} onPress={() => {
            navigation.navigate(APP_PAGES.REPORT, {
              bookingId: booking.id,
              serviceId: booking.serviceId,
              providerId: booking.providerId,
            });
          }}>Report service / service provider</Button>
        </BookingInfoContainer>
      </ScrollView>
    </Container>
  );
};

export default BookingDetail;

import {
  View,
  Animated,
  FlatList,
  StyleSheet,
  RefreshControl,
} from "react-native";
import React, {
  useContext,
  useRef,
  useEffect,
  useCallback,
  useState,
} from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useCustomBottomInset } from "~hooks";
import { ThemeContext } from "styled-components/native";
import {
  BottomCard,
  Container,
  Description,
  HighlightedDescription,
  ReviewCard,
  ServiceInfoContainer,
  ServiceInfoHeaderLabel,
  TagLabel,
  Title,
} from "./styles";
import {
  Button,
  EmptyState,
  IconBtn,
  LoadingView,
  ServiceCard,
  ServiceProviderCard,
} from "~components";
import { Iconify } from "react-native-iconify";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import ServiceBanner from "./components/ServiceBanner";
import { formatCurrency, openLink } from "../../services/uiService";
import Avatar from "react-native-ui-lib/avatar";
import GridView from "react-native-ui-lib/gridView";
import StackAggregator from "react-native-ui-lib/stackAggregator";
import { APP_PAGES, QUERY_KEYS } from "~src/shared/constants";
import { ServiceProvider } from "~src/@types/types";
import { useQuery } from "@tanstack/react-query";
import servicesData from "~src/data/servicesData";
import usersData from "~src/data/usersData";
import { BookingInfoCard } from "../BookingSummary/styles";

const Service = ({ navigation, route }: NativeStackScreenProps<any>) => {
  const insets = useSafeAreaInsets();
  const bottomInset = useCustomBottomInset();
  const themeContext = useContext(ThemeContext);
  const [serviceProvider, setServiceProvider] =
    useState<ServiceProvider | null>(null);

  const yOffset = useRef(new Animated.Value(0)).current;
  const headerOpacity = yOffset.interpolate({
    inputRange: [0, 200],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      // headerTransparent: true,
      headerStyle: {
        // @ts-ignore
        opacity: headerOpacity,
      },
      headerRight: () => (
        <View style={{ flexDirection: "row" }}>
          <IconBtn style={{ marginRight: 7 }}>
            <Iconify
              icon="solar:share-bold"
              size={18}
              strokeWidth={18}
              color={themeContext?.colors.text}
            />
          </IconBtn>
          <IconBtn>
            <Iconify
              icon="solar:bookmark-bold"
              size={18}
              strokeWidth={18}
              color={themeContext?.colors.text}
            />
          </IconBtn>
        </View>
      ),
      // @ts-ignore
      headerRightContainerStyle: {
        marginRight: 15,
      },
      headerBackground: () => (
        <Animated.View
          style={{
            backgroundColor: themeContext?.colors.background,
            ...StyleSheet.absoluteFillObject,
            opacity: headerOpacity,
          }}
        />
      ),
    });
  }, [headerOpacity, navigation]);

  const fetchData = useCallback(
    (serviceId: number) => {
      return servicesData.filter((service) => service.id === serviceId)[0];
    },
    [route.params, navigation]
  );

  const getServiceProvider = useCallback(
    (providerId: number) => {
      const { authorized_account } = usersData.filter(
        ({ authorized_account }) => authorized_account.id === providerId
      )[0];
      setServiceProvider({
        id: authorized_account.id,
        username: authorized_account.username,
        email: authorized_account.email,
        phoneNumber: authorized_account.phoneNumber,
        profilePicture: authorized_account.profilePicture,
        isEmailVerified: authorized_account.isEmailVerified,
        isPhoneVerified: authorized_account.isPhoneVerified,
      });
    },
    [route.params?.serviceId]
  );

  const serviceSocialItems = [
    {
      name: "Call",
      icon: (
        <Iconify
          icon="solar:phone-calling-outline"
          size={18}
          strokeWidth={18}
          color={themeContext?.colors.text}
        />
      ),
      action: () => openLink(`tel:${serviceProvider?.phoneNumber}`),
    },
    {
      name: "Chat",
      icon: (
        <Iconify
          icon="solar:chat-round-line-outline"
          size={18}
          strokeWidth={18}
          color={themeContext?.colors.text}
        />
      ),
      action: "",
    },
    {
      name: "Website",
      icon: (
        <Iconify
          icon="solar:global-outline"
          size={18}
          strokeWidth={18}
          color={themeContext?.colors.text}
        />
      ),
      action: "",
    },
    {
      name: "Map",
      icon: (
        <Iconify
          icon="solar:map-outline"
          size={18}
          strokeWidth={18}
          color={themeContext?.colors.text}
        />
      ),
      action: "",
    },
  ];

  const renderReviewCard = (review) => {
    return (
      <ReviewCard>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Avatar
              animate
              useAutoColors
              label="SO"
              size={45}
              backgroundColor="green"
              labelColor="white"
              source={{
                uri: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?cs=srgb&dl=pexels-olly-733872.jpg&fm=jpg",
              }}
            />
            <View style={{ marginLeft: 15 }}>
              <ServiceInfoHeaderLabel style={{ paddingBottom: 5 }}>
                Sam Smith
              </ServiceInfoHeaderLabel>
              <Description
                style={{
                  fontSize: 12,
                  color: themeContext?.colors.secondaryText,
                }}
              >
                Service provider
              </Description>
            </View>
          </View>
          <TagLabel>04 April 2024</TagLabel>
        </View>
        <Description style={{ lineHeight: 24 }}>
          It is a long established fact that a read will be distracted by the
          long readable content of a page when looking at its content or layout
        </Description>
      </ReviewCard>
    );
  };

  const { data, isLoading, isError, isRefetching } = useQuery({
    queryKey: [QUERY_KEYS.SERVICE],
    queryFn: () => fetchData(route.params?.serviceId),
  });

  useEffect(() => {
    data && getServiceProvider(data.providerId);
  }, [data]);

  if (isLoading) return <LoadingView />;
  else if (isError || !data || data === undefined) return <EmptyState />;

  return (
    <Container>
      <Animated.ScrollView
        overScrollMode="never"
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  y: yOffset,
                },
              },
            },
          ],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        refreshControl={<RefreshControl refreshing={isRefetching} />}
        style={{ paddingBottom: bottomInset }}
      >
        <ServiceBanner banner={data.coverImage} />
        <ServiceInfoContainer>
          <View
            style={{
              width: "80%",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <IconBtn style={{ marginRight: 5 }}>
              <TagLabel>{data?.category.name}</TagLabel>
            </IconBtn>
            <IconBtn
              style={{
                flexDirection: "row",
              }}
            >
              <Iconify
                icon="fluent-emoji-flat:star"
                size={10}
                strokeWidth={10}
              />
              <TagLabel>
                {data?.rating ?? 0.0} ({data?.numberOfReviews ?? 0} reviews)
              </TagLabel>
            </IconBtn>
          </View>
          <View style={{ marginTop: 10 }}>
            <Title style={{ marginBottom: 4 }}>{data.name}</Title>
            <Description style={{ color: themeContext?.colors.secondaryText }}>
              {data.location.name}
            </Description>
          </View>
        </ServiceInfoContainer>
        {data?.description && (
          <ServiceInfoContainer>
            <ServiceInfoHeaderLabel>About Service</ServiceInfoHeaderLabel>
            <Description style={{ lineHeight: 24 }}>
              {data.description}
            </Description>
          </ServiceInfoContainer>
        )}
        <ServiceInfoContainer
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {serviceSocialItems.map((item, index) => (
            <IconBtn
              key={index}
              onPress={item.action}
              style={{ height: 80, width: 80 }}
            >
              <>{item.icon}</>
              <Description style={{ marginTop: 10, fontSize: 12 }}>
                {item.name}
              </Description>
            </IconBtn>
          ))}
        </ServiceInfoContainer>
        {serviceProvider && (
          <ServiceInfoContainer>
            <ServiceInfoHeaderLabel>
              About Service Provider
            </ServiceInfoHeaderLabel>
            <ServiceProviderCard provider={serviceProvider} />
          </ServiceInfoContainer>
        )}
        {data?.subServices && (
          <ServiceInfoContainer>
            <ServiceInfoHeaderLabel>Sub services</ServiceInfoHeaderLabel>
            <BookingInfoCard>
              {data.subServices.map((subService) => (
                <View style={{ paddingVertical: 15 }} key={subService.id}>
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
                        <Description>{subService.name}</Description>
                        {subService?.description && (
                          <Description
                            style={{
                              fontSize: 12,
                              color: themeContext?.colors.secondaryText,
                              paddingTop: 5,
                            }}
                          >
                            {subService?.description}
                          </Description>
                        )}
                      </View>
                    </View>
                    <Description>
                      {formatCurrency(subService?.price ?? 0)}
                    </Description>
                  </View>
                </View>
              ))}
            </BookingInfoCard>
          </ServiceInfoContainer>
        )}
        {/* Galllery goes here... */}
        <ServiceInfoContainer>
          <ServiceInfoHeaderLabel>Gallery</ServiceInfoHeaderLabel>
          <GridView
            items={[
              {
                imageProps: {
                  source: {
                    uri: "https://www.apartments.com/rental-manager/sites/default/files/image/2023-02/home%20repair.jpg",
                  },
                },
              },
              {
                imageProps: {
                  source: {
                    uri: "https://www.apartments.com/rental-manager/sites/default/files/image/2023-02/home%20repair.jpg",
                  },
                },
              },
              {
                imageProps: {
                  source: {
                    uri: "https://www.apartments.com/rental-manager/sites/default/files/image/2023-02/home%20repair.jpg",
                  },
                },
              },
              {
                imageProps: {
                  source: {
                    uri: "https://www.apartments.com/rental-manager/sites/default/files/image/2023-02/home%20repair.jpg",
                  },
                },
              },
            ]}
            itemSpacing={2}
            numColumns={2}
          />
        </ServiceInfoContainer>
        {/* Reviews goes here... */}
        <GridView />
        <ServiceInfoContainer>
          <ServiceInfoHeaderLabel>Reviews</ServiceInfoHeaderLabel>
          <StackAggregator
            bg-transparent
            contentContainerStyle={{
              backgroundColor: "transparent",
            }}
            buttonProps={{
              "bg-transparent": true,
              bottom: true,
            }}
          >
            {[...new Array(8)].map((item) => renderReviewCard(item))}
          </StackAggregator>
        </ServiceInfoContainer>
        {/* More for you goes here... */}
        {/* <ServiceInfoContainer>
          <ServiceInfoHeaderLabel>More for you</ServiceInfoHeaderLabel>
          <FlatList
            data={[...new Array(5)]}
            renderItem={({ item, index }) => (
              <ServiceCard service={item} navigation={navigation} />
            )}
            horizontal
            ItemSeparatorComponent={() => (
              <View style={{ marginHorizontal: 7 }} />
            )}
            showsHorizontalScrollIndicator={false}
          />
        </ServiceInfoContainer> */}
      </Animated.ScrollView>
      <BottomCard>
        <View>
          <Description style={{ marginBottom: 10 }}>Starting Price</Description>
          <HighlightedDescription>
            {formatCurrency(data?.startingPrice ?? 0)}
          </HighlightedDescription>
        </View>
        <Button
          style={{ width: 240, height: 60, padding: 12 }}
          onPress={() =>
            navigation.navigate(APP_PAGES.BOOKING_SUMMARY, {
              service: data,
              serviceProvider,
            })
          }
        >
          Book now
        </Button>
      </BottomCard>
    </Container>
  );
};

export default Service;

import { View, Animated, StyleSheet } from "react-native";
import React, {
  useContext,
  useRef,
  useEffect,
  useCallback,
  useState,
} from "react";
import { useCustomBottomInset } from "~hooks";
import { ThemeContext } from "styled-components/native";
import {
  BottomCard,
  Container,
  Description,
  HighlightedDescription,
  ServiceInfoContainer,
  ServiceInfoHeaderLabel,
  TagLabel,
  Title,
} from "./styles";
import {
  Button,
  CustomRefreshControl,
  EmptyState,
  IconBtn,
  LoadingView,
  ReviewCard,
  SafeComponent,
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
import { Review, VerifiedUser, VerifiedUserPreview } from "~src/@types/types";
import { useQuery } from "@tanstack/react-query";
import { BookingInfoCard } from "../BookingSummary/styles";
import {
  extractUserDataForFirebase,
  getOverallRatingAboutService,
  getOverallReviewsDataAboutService,
  getService,
  getUserDataPreview,
  openChat,
  setBookmarks,
} from "~services";
import { NavigationProp } from "@react-navigation/native";
import { useAppDispatch, useAppSelector } from "~store/hooks/useTypedRedux";
import ACTION_TYPES from "~store/actionTypes";

const Service = ({ navigation, route }: NativeStackScreenProps<any>) => {
  const bottomInset = useCustomBottomInset();
  const themeContext = useContext(ThemeContext);
  const [serviceProvider, setServiceProvider] =
    useState<VerifiedUserPreview | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
    const [serviceRating, setServiceRating] = useState(0);
  const user: VerifiedUser = useAppSelector((state) => state.user);
  const currentUserForFirebase: VerifiedUserPreview =
    extractUserDataForFirebase(user);
  const dispatch = useAppDispatch();

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
      headerRight: () => {
        if (isError || !data || data === undefined) {
          return null;
        }
        return (
          <View style={{ flexDirection: "row" }}>
            {isMyService ? (
              <IconBtn onPress={handleEditService}>
                <Iconify
                  icon="solar:pen-new-square-outline"
                  size={18}
                  strokeWidth={18}
                  color={themeContext?.colors.text}
                />
              </IconBtn>
            ) : (
              <IconBtn onPress={() => setBookmarks(data ? [data] : [])}>
                <Iconify
                  icon="solar:bookmark-bold"
                  size={18}
                  strokeWidth={18}
                  color={themeContext?.colors.text}
                />
              </IconBtn>
            )}
          </View>
        );
      },
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
    async (serviceId: string) => {
      const service = await getService(serviceId);
      return service;
    },
    [route.params, navigation]
  );

  const handleEditService = () => {
    dispatch({
      type: ACTION_TYPES.UPDATE_SERVICE_IN_CREATION_DATA,
      payload: data,
    });
    navigation.navigate(APP_PAGES.SET_SERVICE_DETAILS);
  };

  const fetchServiceRating = async (serviceId: string) => {
    try {
      const rating = await getOverallRatingAboutService(serviceId);
      return rating || 0;
    } catch (error) {
      return null;
    }
  };

  const { data, isLoading, isError, isRefetching, error, refetch } = useQuery({
    queryKey: [QUERY_KEYS.SERVICE],
    queryFn: () => fetchData(route.params?.serviceId),
  });

  useEffect(() => {
    if (data) {
      getServiceProvider(data.providerId);
      getReviews(data.id);
      const fetchData = async () => {
        const rating = await fetchServiceRating(data.id);
        if (rating !== null) {
          setServiceRating(rating);
        }
      };
        fetchData();
    }
  }, [data]);


  const getServiceProvider = useCallback(
    async (providerId: string) => {
      setServiceProvider(await getUserDataPreview(providerId));
    },
    [route.params?.serviceId]
  );

  const getReviews = useCallback(
    async (serviceId: string) => {
      const revs = await getOverallReviewsDataAboutService(serviceId);
      setReviews(revs || []);
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
      action: () =>
        serviceProvider &&
        openChat(
          navigation as NavigationProp<any>,
          currentUserForFirebase,
          serviceProvider
        ),
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
      action: () => data?.website && openLink(data?.website),
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
      action: () => null,
    },
  ];

  const isMyService = user.id === data?.providerId;

  if (isLoading) return <LoadingView />;
  else if (isError || !data || data === undefined) return <EmptyState />;

  return (
    <SafeComponent
      request={{ data: data, error: error, loading: isLoading }}
      refetch={refetch}
    >
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
          refreshControl={
            <CustomRefreshControl
              refreshing={isRefetching}
              onRefresh={refetch}
            />
          }
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
                <TagLabel>{data?.category?.name}</TagLabel>
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
                  {serviceRating ?? 0.0} ({reviews.length ?? 0} reviews)
                </TagLabel>
              </IconBtn>
            </View>
            <View style={{ marginTop: 10 }}>
              <Title style={{ marginBottom: 4 }}>{data?.name}</Title>
              <Description
                style={{ color: themeContext?.colors.secondaryText }}
              >
                {data.location?.name}
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
                key={item?.name}
                onPress={item.action}
                style={{ height: 80, width: 80 }}
              >
                <>{item.icon}</>
                <Description style={{ marginTop: 10, fontSize: 12 }}>
                  {item?.name}
                </Description>
              </IconBtn>
            ))}
          </ServiceInfoContainer>
          {serviceProvider && (
            <ServiceInfoContainer>
              <ServiceInfoHeaderLabel>
                About Service Provider
              </ServiceInfoHeaderLabel>
              <ServiceProviderCard provider={serviceProvider} showContactInfo />
            </ServiceInfoContainer>
          )}
          {!!data?.subServices?.length && (
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
                          <Description>{subService?.name}</Description>
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
          {data?.gallery && (
            <ServiceInfoContainer>
              <ServiceInfoHeaderLabel>Gallery</ServiceInfoHeaderLabel>
              <GridView
                items={data.gallery?.map((item) => {
                  return {
                    imageProps: {
                      source: {
                        uri: item.downloadURL,
                      },
                    },
                  };
                })}
                itemSpacing={2}
                numColumns={2}
              />
            </ServiceInfoContainer>
          )}
          {/* Reviews goes here... */}
          <GridView />
          {!!reviews?.length && (
            <ServiceInfoContainer>
              <ServiceInfoHeaderLabel>Reviews</ServiceInfoHeaderLabel>
              <StackAggregator
                // bg-transparent
                // contentContainerStyle={{
                //   backgroundColor: "transparent",
                // }}
                // buttonProps={{
                //   "bg-transparent": true,
                //   bottom: true,
                // }}

              >
              
                {reviews.map((item) => (
                  <ReviewCard
                    key={item.id}
                    review={item}
                    navigation={navigation as NavigationProp<any>}
                  />
                ))}
              </StackAggregator>
            </ServiceInfoContainer>
          )}
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
        {!isMyService && (
          <BottomCard>
            <View>
              <Description style={{ marginBottom: 10 }}>
                Starting Price
              </Description>
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
        )}
      </Container>
    </SafeComponent>
  );
};

export default Service;

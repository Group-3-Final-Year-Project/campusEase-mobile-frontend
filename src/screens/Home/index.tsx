import { FlatList, View, RefreshControl } from "react-native";
import React, { useCallback, useContext } from "react";
import { Container, Description, ListLabel, Title } from "./styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useCustomBottomInset } from "~hooks";
import { ThemeContext } from "styled-components/native";

import { NavigationProp, useFocusEffect } from "@react-navigation/native";
import Avatar from "react-native-ui-lib/avatar";
import { Iconify } from "react-native-iconify";
import {
  Searchbar,
  IconBtn,
  ServiceCard,
  SecondaryServiceCard,
  LoadingView,
  EmptyState,
} from "~components";
import HomeBanner from "./components/HomeBanner";
import Categories from "./components/Categories";
import VirtualisedContainer from "~src/hocs/VirtualisedContainer";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import ProviderServices from "./components/ProviderServices";
import { QUERY_KEYS } from "~src/shared/constants";
import { ServiceListService, VerifiedUser } from "~src/@types/types";
import { useQuery } from "@tanstack/react-query";
import { categoriesData } from "~src/data/categories";
import ServicesData from "~src/data/servicesData";
import { useAppSelector } from "~store/hooks/useTypedRedux";
import { getIsServiceProvider } from "../../services/authService";
import SearchFilterBtn from "~components/SearchFilterBtn";

const Home = ({ navigation }: BottomTabScreenProps<any>) => {
  const insets = useSafeAreaInsets();
  const bottomInset = useCustomBottomInset();
  const themeContext = useContext(ThemeContext);
  const { authorized_account }: VerifiedUser = useAppSelector(
    (state) => state.user
  );

  const getServiceListServices = (
    providerId?: number,
    getMyServices?: boolean
  ): ServiceListService[] => {
    const data = ServicesData.filter((service) =>
      providerId
        ? getMyServices
          ? service.providerId === providerId
          : service.providerId !== providerId
        : service
    ).map((service) => {
      return {
        id: service.id,
        name: service.name,
        description: service?.description,
        coverImage: service.coverImage,
        rating: service?.rating,
        startingPrice: service?.startingPrice,
        isAvailable: service.isAvailable,
      };
    });
    return data;
  };

  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({
        headerTitle(props) {
          return (
            <View
              style={{
                flexDirection: "row",
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
                  uri: authorized_account?.profilePicture
                    ? authorized_account?.profilePicture
                    : "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?cs=srgb&dl=pexels-olly-733872.jpg&fm=jpg",
                }}
              />
              <View style={{ marginLeft: 10 }}>
                <Description>Location</Description>
                <Title>New York, USA</Title>
              </View>
            </View>
          );
        },
        headerRight: () => (
          <IconBtn>
            <Iconify
              icon="solar:bell-bold"
              size={18}
              strokeWidth={18}
              color={themeContext?.colors.text}
            />
          </IconBtn>
        ),
        headerRightContainerStyle: {
          marginRight: 15,
        },
      });
    }, [])
  );

  const fetchData = useCallback(async () => {
    setTimeout(() => null, 5000);
    return {
      serviceCategories: Object.values(categoriesData),
      popularServices: getServiceListServices(authorized_account.id),
      nearYouServices: getServiceListServices(authorized_account.id),
      providerServices: getServiceListServices(authorized_account.id, true),
      // serviceRequests:await getIsServiceProvider() ? :
    };
  }, []);

  const { data, isLoading, isError, isRefetching } = useQuery({
    queryKey: [QUERY_KEYS.HOME_SCREEN_DATA],
    queryFn: () => fetchData(),
  });

  if (isLoading) {
    return <LoadingView />;
  } else if (isError || !data || data === undefined) {
    return <EmptyState />;
  }

  const {
    nearYouServices,
    popularServices,
    providerServices,
    serviceCategories,
  } = data;

  return (
    <Container>
      <VirtualisedContainer
        style={{ paddingTop: insets.top - 20, paddingBottom: bottomInset }}
        renderItem={undefined}
        refreshControl={<RefreshControl refreshing={isRefetching} />}
      >
        <>
          <SearchFilterBtn />
          <HomeBanner />
          <ProviderServices
            services={providerServices}
            navigation={navigation as NavigationProp<any>}
          />

          {!popularServices?.length && !nearYouServices?.length ? (
            <EmptyState />
          ) : (
            <>
              {!!serviceCategories?.length && (
                <Categories
                  categories={serviceCategories}
                  navigation={navigation as NavigationProp<any>}
                />
              )}
              {/* Upcoming bookings should also be here... */}
              {/* Earnings summary should be displayed here for service providers... */}
              {!!popularServices?.length && (
                <View style={{ marginTop: 20 }}>
                  <ListLabel style={{ marginBottom: 10 }}>
                    Popular services
                  </ListLabel>
                  <FlatList
                    data={popularServices}
                    renderItem={({ item }) => (
                      <ServiceCard
                        key={item.id}
                        service={item}
                        navigation={navigation as NavigationProp<any>}
                      />
                    )}
                    horizontal
                    ItemSeparatorComponent={() => (
                      <View style={{ marginHorizontal: 7 }} />
                    )}
                    showsHorizontalScrollIndicator={false}
                  />
                </View>
              )}
              {!!nearYouServices?.length && (
                <View style={{ marginTop: 20 }}>
                  <ListLabel style={{ marginBottom: 10 }}>
                    Services near you
                  </ListLabel>
                  <FlatList
                    data={nearYouServices}
                    renderItem={({ item }) => (
                      <SecondaryServiceCard
                        key={item.id}
                        service={item}
                        navigation={navigation as NavigationProp<any>}
                        style={{
                          width: "100%",
                        }}
                      />
                    )}
                    ItemSeparatorComponent={() => (
                      <View style={{ marginVertical: 7 }} />
                    )}
                    showsHorizontalScrollIndicator={false}
                  />
                </View>
              )}
            </>
          )}
        </>
      </VirtualisedContainer>
    </Container>
  );
};
export default Home;

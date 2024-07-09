import { FlatList, View } from "react-native";
import React, { useCallback, useContext } from "react";
import { Container, ListLabel, LogoLabel } from "./styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useCustomBottomInset } from "~hooks";
import { ThemeContext } from "styled-components/native";

import { NavigationProp, useFocusEffect } from "@react-navigation/native";
import Avatar from "react-native-ui-lib/avatar";
import { Iconify } from "react-native-iconify";
import {
  IconBtn,
  ServiceCard,
  SecondaryServiceCard,
  LoadingView,
  EmptyState,
  CustomRefreshControl,
  Text,
} from "~components";
import HomeBanner from "./components/HomeBanner";
import Categories from "./components/Categories";
import VirtualisedContainer from "~src/hocs/VirtualisedContainer";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import ProviderServices from "./components/ProviderServices";
import { QUERY_KEYS } from "~src/shared/constants";
import { VerifiedUser } from "~src/@types/types";
import { useQuery } from "@tanstack/react-query";
import { useAppSelector } from "~store/hooks/useTypedRedux";
import SearchFilterBtn from "~components/SearchFilterBtn";
import {
  extractServiceForServiceList,
  getMyServices,
  getServiceCategories,
  getServices,
} from "~services";
import Logo from "~assets/images/logo.svg";

const Home = ({ navigation }: BottomTabScreenProps<any>) => {
  const insets = useSafeAreaInsets();
  const bottomInset = useCustomBottomInset();
  const themeContext = useContext(ThemeContext);
  const user: VerifiedUser = useAppSelector((state) => state.user);

  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({
        headerTitle(props) {
          return (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Logo width={28} height={28} style={{ marginRight: 5 }} />
              <LogoLabel>ampusEase</LogoLabel>
            </View>
          );
        },
        headerRight: () => (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <IconBtn>
              <Iconify
                icon="solar:bell-bold"
                size={18}
                strokeWidth={18}
                color={themeContext?.colors.text}
              />
            </IconBtn>
            <Avatar
              animate
              useAutoColors
              label="SO"
              size={35}
              backgroundColor="green"
              labelColor="white"
              containerStyle={{
                marginLeft: 10,
              }}
              source={{
                uri: user?.profilePicture ? user?.profilePicture : undefined,
              }}
            />
          </View>
        ),
        headerRightContainerStyle: {
          marginRight: 15,
        },
      });
    }, [])
  );

  const fetchData = useCallback(async () => {
    const serviceCategories = getServiceCategories();
    const providerServices = await getMyServices(user.id);
    const services = await getServices(user.id);
    return {
      serviceCategories,
      providerServices: extractServiceForServiceList(providerServices),
      popularServices: extractServiceForServiceList(services),
      nearYouServices: extractServiceForServiceList(services),
    };
  }, []);

  const { data, isLoading, isError, error, isRefetching, refetch } = useQuery({
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
        refreshControl={
          <CustomRefreshControl refreshing={isRefetching} onRefresh={refetch} />
        }
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

import { FlatList, View } from "react-native";
import React, { useCallback, useContext, useState } from "react";
import { Container, Description, ListLabel, Title } from "./styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
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
import BookingCard from "../Bookings/components/BookingCard";
import ProviderServices from "./components/ProviderServices";
import axios from "axios";
import { API_URLS } from "~src/shared/constants";
import { ServiceListService, ServiceCategory } from "~src/@types/types";

export const useCustomBottomInset = () => {
  const insets = useSafeAreaInsets();
  return Math.max(20, insets.bottom + 5);
};

const Home = ({ navigation }: BottomTabScreenProps<any>) => {
  const insets = useSafeAreaInsets();
  const bottomInset = useCustomBottomInset();
  const themeContext = useContext(ThemeContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [providerServices, setProviderServices] = useState<
    ServiceListService[]
  >([]);
  const [serviceCategories, setServiceCategories] = useState<ServiceCategory[]>(
    []
  );
  const [popularServices, setPopularServices] = useState<ServiceListService[]>(
    []
  );
  const [nearYouServices, setNearYouServices] = useState<ServiceListService[]>(
    []
  );

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
                  uri: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?cs=srgb&dl=pexels-olly-733872.jpg&fm=jpg",
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
    setLoading(true);
  }, []);

  if (loading) {
    return <LoadingView />;
  }

  return (
    <Container>
      <VirtualisedContainer
        style={{ paddingTop: insets.top - 20, paddingBottom: bottomInset }}
        renderItem={undefined}
      >
        <>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
            }}
          >
            <Searchbar
              placeholder="Search..."
              icon={
                <Iconify
                  icon="solar:minimalistic-magnifer-outline"
                  size={18}
                  strokeWidth={18}
                  color={themeContext?.colors.text}
                />
              }
            />
            <IconBtn
              style={{
                marginLeft: 7,
                backgroundColor: themeContext?.colors.primary,
                width: 50,
              }}
            >
              <Iconify
                icon="solar:tuning-2-outline"
                size={18}
                strokeWidth={18}
                color={themeContext?.colors.text}
              />
            </IconBtn>
          </View>
          <HomeBanner />
          <ProviderServices
            services={providerServices}
            navigation={navigation as NavigationProp<any>}
          />
          <Categories
            categories={serviceCategories}
            navigation={navigation as NavigationProp<any>}
          />
          {/* Upcoming bookings should also be here... */}
          {/* Earnings summary should be displayed here for service providers... */}
          {!popularServices.length && !nearYouServices.length ? (
            <EmptyState />
          ) : (
            <>
              {!!popularServices.length && (
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
              {!!nearYouServices.length && (
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

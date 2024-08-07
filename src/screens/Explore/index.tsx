import { FlatList, View } from "react-native";
import React, { useCallback, useContext, useRef, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useCustomBottomInset } from "~hooks";
import { ThemeContext } from "styled-components/native";

import { NavigationProp } from "@react-navigation/native";
import { TertiaryServiceCard } from "~components";
import { Container, ListLabel } from "./styles";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import type { Region } from "react-native-maps";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import SearchFilterBtn from "~components/SearchFilterBtn";
import { VerifiedUser } from "~src/@types/types";
import { useAppSelector } from "~store/hooks/useTypedRedux";
import { extractServiceForServiceList, getServices } from "~services";
import { useQuery } from "@tanstack/react-query";

const Explore = ({ navigation }: BottomTabScreenProps<any>) => {
  const insets = useSafeAreaInsets();
  const bottomInset = useCustomBottomInset();
  const themeContext = useContext(ThemeContext);
  const user: VerifiedUser = useAppSelector((state) => state.user);
  const userLocation = user.locations[0]?.location;
  const mapRef = useRef<MapView>(null);
  const [initialRegion] = useState<Region | null>(
    !user.locations
      ? null
      : {
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
          latitudeDelta: 0,
          longitudeDelta: 0,
        }
  );

  const fetchData = useCallback(async () => {
    const services = await getServices(user.id);
    return services;
  }, []);

  const { data, isLoading, isError, error, isRefetching, refetch } = useQuery({
    queryKey: ["EXPLORE_QUERY_KEY"],
    queryFn: () => fetchData(),
  });

  return (
    <Container
      style={{
        position: "relative",
      }}
    >
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        initialRegion={initialRegion ?? undefined}
        style={{ flex: 1 }}
        showsCompass
        showsMyLocationButton
        loadingEnabled={true}
        loadingBackgroundColor={themeContext?.colors.background}
        loadingIndicatorColor={themeContext?.colors.primary}
        // ref={mapRef}
      >
        {!!data?.length &&
          data.map((service) => (
            <Marker
              key={service.id}
              image={{
                uri: "https://cdn-icons-png.flaticon.com/128/1995/1995450.png",
              }}
              coordinate={{
                latitude: service.location.location.latitude,
                longitude: service.location.location.longitude,
              }}
              title={service.name}
              description={service.description ?? ""}
              pinColor={themeContext?.colors.secondary}
            />
          ))}
      </MapView>
      <View
        style={{
          paddingTop: insets.top + 20,
          paddingBottom: bottomInset,
          position: "absolute",
          flex: 1,
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          // zIndex: 10,
          paddingLeft: 15,
          paddingRight: 15,
        }}
      >
        <SearchFilterBtn navigation={navigation as NavigationProp<any>} />
        {!isLoading && !isError && data && data !== undefined && (
          <View
            style={{
              position: "absolute",
              bottom: 20,
              width: "100%",
              paddingLeft: 15,
              paddingRight: 0,
            }}
          >
            <ListLabel style={{ marginBottom: 10 }}>
              Suggested for you
            </ListLabel>
            <FlatList
              data={data}
              keyExtractor={(item) => item.id}
              renderItem={({ item, index }) => (
                <TertiaryServiceCard
                  navigation={navigation as NavigationProp<any>}
                  service={item}
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
      </View>
    </Container>
  );
};
export default Explore;

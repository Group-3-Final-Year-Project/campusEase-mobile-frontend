import { FlatList, View } from "react-native";
import React, { useContext, useRef, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useCustomBottomInset } from "~hooks";
import { ThemeContext } from "styled-components/native";

import { NavigationProp } from "@react-navigation/native";
import { ServiceCard } from "~components";
import { Container, ListLabel } from "./styles";
import MapView, { PROVIDER_GOOGLE, MapOverlay } from "react-native-maps";
import type { Region } from "react-native-maps";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import servicesData from "~src/data/servicesData";
import SearchFilterBtn from "~components/SearchFilterBtn";
import { VerifiedUser } from "~src/@types/types";
import { useAppSelector } from "~store/hooks/useTypedRedux";

const Explore = ({ navigation }: BottomTabScreenProps<any>) => {
  const insets = useSafeAreaInsets();
  const bottomInset = useCustomBottomInset();
  const themeContext = useContext(ThemeContext);
  const user: VerifiedUser = useAppSelector((state) => state.user);
  const userLocation = user.locations[0]?.location;
  const mapRef = useRef();
  const [initialRegion, setInitialRegion] = useState<Region>({
    latitude: userLocation.latitude,
    longitude: userLocation.longitude,
    latitudeDelta: 0,
    longitudeDelta: 0,
  });
  console.log(initialRegion);

  return (
    <Container
      style={{
        position: "relative",
      }}
    >
      <MapView
        provider={PROVIDER_GOOGLE}
        initialRegion={initialRegion}
        style={{ flex: 1 }}
      ></MapView>
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
        <SearchFilterBtn />
        <View
          style={{
            position: "absolute",
            bottom: 20,
            width: "100%",
            paddingLeft: 15,
            paddingRight: 0,
          }}
        >
          <ListLabel style={{ marginBottom: 10 }}>Suggested for you</ListLabel>
          <FlatList
            data={servicesData}
            renderItem={({ item, index }) => (
              <ServiceCard
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
      </View>
    </Container>
  );
};
export default Explore;

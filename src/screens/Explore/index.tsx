import { FlatList, ScrollView, View } from "react-native";
import React, { useCallback, useContext, useRef, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemeContext } from "styled-components/native";

import { useFocusEffect } from "@react-navigation/native";
import Avatar from "react-native-ui-lib/avatar";
import { Iconify } from "react-native-iconify";
import { Searchbar, IconBtn, ServiceCard } from "~components";
import { Container, Description } from "./styles";
import { Dimensions } from "react-native";
import MapView from "react-native-maps";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

export const useCustomBottomInset = () => {
  const insets = useSafeAreaInsets();
  return Math.max(20, insets.bottom + 5);
};

const Explore = ({ navigation }: BottomTabScreenProps<any>) => {
  const insets = useSafeAreaInsets();
  const bottomInset = useCustomBottomInset();
  const themeContext = useContext(ThemeContext);
  const mapRef = useRef();
  const [initialRegion, setInitialRegion] = useState({
    latitude: 10,
    longitude: 10,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  });

  return (
    <Container
      style={{
        paddingTop: insets.top + 20,
        paddingBottom: bottomInset,
        position: "relative",
      }}
    >
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
      <View
        style={{
          position: "absolute",
          bottom: 20,
          width: "100%",
          paddingLeft: 15,
        }}
      >
        <Description style={{ marginBottom: 10 }}>
          Suggested for you
        </Description>
        <FlatList
          data={[...new Array(5)]}
          renderItem={({ item, index }) => <ServiceCard service={item} />}
          horizontal
          ItemSeparatorComponent={() => (
            <View style={{ marginHorizontal: 7 }} />
          )}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </Container>
  );
};
export default Explore;

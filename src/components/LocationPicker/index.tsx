import { Text, TouchableOpacity, View } from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Container } from "./styles";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import type { MapViewProps, Region } from "react-native-maps";
import Button from "../Button";
import * as Location from "expo-location";
import { ThemeContext } from "styled-components/native";
import { LocationParams } from "~src/@types/types";
import { Iconify } from "react-native-iconify";

type LocationPickerProps = MapViewProps & {
  selectedLocation: LocationParams;
  setSelectedLocation: (coords: LocationParams) => void;
  onClose: () => void;
};

const LocationPicker = (props: LocationPickerProps) => {
  const mapRef = useRef(null);
  const themeContext = useContext(ThemeContext);
  const [selectedRegion, setSelectedRegion] = useState<Region | null>();

  const handleLocationConfirmation = () => {
    selectedRegion && props.setSelectedLocation(selectedRegion);
    props.onClose();
  };

  useEffect(() => {
    const fetchUserCurrentLocation = async () => {
      const { granted } = await Location.requestForegroundPermissionsAsync();
      if (!granted) {
        return;
      }
      let { coords } = await Location.getCurrentPositionAsync({
        timeInterval: 120000,
      });
      const loc = {
        latitude: coords.latitude,
        longitude: coords.longitude,
        latitudeDelta: 0,
        longitudeDelta: 0,
        accuracy: coords.accuracy,
        altitudeAccuracy: coords.altitudeAccuracy,
        altitude: coords.altitude,
        heading: coords.heading,
        speed: coords.speed,
      };
      props.setSelectedLocation(loc);
    };

    fetchUserCurrentLocation();
  }, []);

  return (
    <Container>
      <MapView
        provider={PROVIDER_GOOGLE}
        ref={mapRef}
        style={{
          width: "100%",
          height: "100%",
          flex: 1,
        }}
        initialRegion={props.selectedLocation ?? undefined}
        showsUserLocation={true}
        loadingEnabled={true}
        loadingIndicatorColor={themeContext?.colors.primary}
        onRegionChangeComplete={(region) => setSelectedRegion(region)}
      >
        <Marker
          coordinate={{
            latitude: props.selectedLocation.latitude,
            longitude: props.selectedLocation.longitude,
          }}
          title={"Selected Location"}
          draggable
        />
      </MapView>
      <View
        style={{
          position: "absolute",
          bottom: 20,
          left: 0,
          right: 0,
          paddingHorizontal: 20,
        }}
      >
        <Button onPress={handleLocationConfirmation}>Confirm</Button>
      </View>
      <TouchableOpacity
        onPress={() => props.onClose()}
        style={{ borderRadius: 100, position: "absolute", left: 20, top: 20 }}
      >
        <Iconify
          size={28}
          color={themeContext?.colors.secondary}
          icon="solar:close-circle-bold"
        />
      </TouchableOpacity>
    </Container>
  );
};

export default LocationPicker;

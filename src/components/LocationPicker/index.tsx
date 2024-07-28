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
  const mapRef = useRef<MapView>(null);
  const themeContext = useContext(ThemeContext);
  const [selectedRegion, setSelectedRegion] = useState<Region | null>();

  const handleLocationConfirmation = () => {
    selectedRegion && props.setSelectedLocation(selectedRegion);
    props.onClose();
  };

  useEffect(() => {
    const fetchUserCurrentLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Location permission denied");
        return;
      }

      try {
        const { coords } = await Location.getCurrentPositionAsync();
        const initialRegion = {
          latitude: coords.latitude,
          longitude: coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        };
        props.setSelectedLocation(initialRegion);
        setSelectedRegion(initialRegion);
      } catch (error) {
        console.error("Error fetching location:", error);
      }
    };

    fetchUserCurrentLocation();
  }, []);

  return (
    <Container>
      {/* <MapView
        provider={PROVIDER_GOOGLE}
        ref={mapRef}
        style={{
          width: "100%",
          height: "100%",
          flex: 1,
        }}
        showsCompass
        initialRegion={props.selectedLocation ?? undefined}
        showsMyLocationButton
        showsUserLocation={true}
        loadingEnabled={true}
        loadingBackgroundColor={themeContext?.colors.background}
        loadingIndicatorColor={themeContext?.colors.primary}
        onRegionChangeComplete={(region) => setSelectedRegion(region)}
      >
        {props.selectedLocation && (
          <Marker
            coordinate={{
              latitude: props.selectedLocation.latitude,
              longitude: props.selectedLocation.longitude,
            }}
            title={"Selected Location"}
            draggable
          />
        )}
      </MapView> */}
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

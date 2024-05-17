import { StyleSheet, StatusBar } from "react-native";
import React from "react";
import { Box, HStack } from "@gluestack-ui/themed";
import MainContainer from "../../hocs/MainContainer";
import Searchbar from "../../components/Searchbar";
import FilterBtn from "../../components/FilterBtn";
import { theme } from "../../shared/theme";
import MapView from "react-native-maps";

const Explore = () => {
  return (
    <MainContainer>
      <Box w="$full" h="$full">
        <HStack
          w="$full"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          space={"xs"}
          paddingTop={(StatusBar.currentHeight || 0) + 30}
          paddingHorizontal={10}
          zIndex={10}
        >
          <Searchbar />
          <FilterBtn iconColor={theme.PRIMARY_COLOR} color={theme.BACKGROUND} />
        </HStack>
        <MapView
          mapType="terrain"
          showsMyLocationButton
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
          }}
        />
      </Box>
    </MainContainer>
  );
};

export default Explore;

const styles = StyleSheet.create({});

import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Box, HStack } from "@gluestack-ui/themed";
import { ImageBackground } from "@gluestack-ui/themed";
import { StatusBar } from "react-native";
import BackButton from "../../components/BackButton";
import { theme } from "../../shared/theme";
import BeautyButton from "../../components/BeautyButton";
import { Iconify } from "react-native-iconify";

const ServiceBanner = () => {
  return (
    <Box w="$full" h={300}>
      <ImageBackground
        w="$full"
        h="$full"
        paddingTop={(StatusBar.currentHeight || 0) + 20}
        source={{
          uri: "https://img.freepik.com/premium-photo/happy-young-black-lady-rubber-gloves-washes-floor-with-cleaning-supplies-enjoys-cleaning-living-room_116547-35431.jpg",
        }}
        resizeMode="cover"
        resizeMethod="resize"
      >
        <Box
          paddingHorizontal={10}
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <BackButton variant={"solid"} color={theme.BACKGROUND} />
          <HStack space="sm">
            <BeautyButton
              variant={"solid"}
              color={theme.BACKGROUND}
              onPress={() => null}
              leftButtonIcon={<Iconify icon={"solar:share-bold"} size={18} />}
              isRounded
              styles={{
                width: 30,
                height: 30,
              }}
            />
            <BeautyButton
              variant={"solid"}
              color={theme.BACKGROUND}
              onPress={() => null}
              isRounded
              styles={{
                width: 30,
                height: 30,
              }}
              leftButtonIcon={
                <Iconify icon={"solar:heart-outline"} size={18} />
              }
            />
          </HStack>
        </Box>
      </ImageBackground>
    </Box>
  );
};

export default ServiceBanner;

const styles = StyleSheet.create({});

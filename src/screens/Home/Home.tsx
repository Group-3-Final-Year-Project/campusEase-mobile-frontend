import { StyleSheet } from "react-native";
import React from "react";
import MainContainer from "../../hocs/MainContainer";
import { CustomNavigationProp } from "../../shared/types";
import { useFocusEffect } from "@react-navigation/native";
import {
  VStack,
  HStack,
  Button,
  ButtonIcon,
  Text,
  Pressable,
  Heading,
  ScrollView,
} from "@gluestack-ui/themed";
import { Iconify } from "react-native-iconify";
import { theme } from "../../shared/theme";
import { COMMON_STYLES } from "../../shared/constants";

const Home = ({ navigation }: CustomNavigationProp) => {
  useFocusEffect(
    React.useCallback(() => {
      navigation.setOptions({
        headerTitleAlign: "left",
        headerRight: () => (
          <Button
            borderRadius={10}
            bgColor={theme.ACCENT}
            w="$8"
            justifyContent="center"
            alignItems="center"
          >
            <ButtonIcon>
              <Iconify
                icon={"solar:bell-bold"}
                size={18}
                color={theme.BACKGROUND}
              />
            </ButtonIcon>
          </Button>
        ),
        headerRightContainerStyle: {
          marginRight: 10,
        },
        headerTitle: () => (
          <VStack space="xs">
            <Text style={styles.headerLabelText}>Location</Text>
            <Pressable>
              <HStack space="xs" alignItems="center">
                <Iconify
                  icon="solar:map-point-wave-bold"
                  color={theme.PRIMARY_COLOR}
                  size={20}
                />
                <Heading style={styles.locationText}>New York, USA</Heading>
                <Iconify
                  icon="solar:alt-arrow-down-outline"
                  color={theme.PRIMARY_COLOR}
                  size={18}
                />
              </HStack>
            </Pressable>
          </VStack>
        ),
      });
    }, [])
  );

  return (
    <MainContainer>
      <ScrollView></ScrollView>
    </MainContainer>
  );
};
export default Home;
const styles = StyleSheet.create({
  headerLabelText: {
    ...COMMON_STYLES.text,
    color: theme.FOREGROUND3,
    marginLeft: 4,
  },
  locationText: {
    ...COMMON_STYLES.heading,
    color: theme.FOREGROUND,
    fontSize: 16,
  },
});

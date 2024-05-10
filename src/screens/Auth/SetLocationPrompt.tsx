import { StyleSheet } from "react-native";
import React from "react";
import MainContainer from "../../hocs/MainContainer";
import { Box, Heading, Text } from "@gluestack-ui/themed";
import BeautyButton from "../../components/BeautyButton";
import { theme } from "../../shared/theme";
import { Iconify } from "react-native-iconify";
import { CustomNavigationProp } from "../../shared/types";
import { APP_PAGES } from "../../shared/constants";
const SetLocationPrompt = ({ navigation }: CustomNavigationProp) => {
  return (
    <MainContainer>
      <Box height="$full">
        <Box
          flex={1}
          alignSelf="center"
          justifyContent="center"
          alignItems="center"
          w="$full"
          h="$full"
          bg="transparent"
        >
          <Box>
            <Box
              alignSelf="center"
              justifyContent="center"
              alignItems="center"
              backgroundColor={theme.SECONDARY}
              width={150}
              height={150}
              borderRadius={150}
              marginBottom={20}
            >
              <Iconify
                icon="solar:map-point-wave-bold"
                color={theme.PRIMARY_COLOR}
                size={80}
              />
            </Box>
          </Box>
          <Box marginBottom={40}>
            <Heading style={styles.headerText}>What is your location?</Heading>
            <Text style={styles.subText}>To find nearby service providers</Text>
          </Box>
          <Box>
            <BeautyButton
              title="Allow location access"
              variant="solid"
              onPress={() => navigation.replace(APP_PAGES.USER_TAB)}
              isRounded
              styles={{
                marginBottom: 20,
                paddingHorizontal: 80,
              }}
            />
            <BeautyButton
              title="Enter location manually"
              variant="link"
              onPress={() => null}
              styles={{
                borderRadius: 100,
              }}
              color={theme.PRIMARY_COLOR}
              textStyles={{
                fontSize: 18,
                fontWeight: "bold",
              }}
            />
          </Box>
        </Box>
      </Box>
    </MainContainer>
  );
};
export default SetLocationPrompt;
const styles = StyleSheet.create({
  headerText: {
    marginBottom: 10,
    fontWeight: "900",
    fontSize: 28,
    verticalAlign: "top",
    textAlign: "center",
  },
  subText: {
    fontWeight: "100",
    fontSize: 14,
    verticalAlign: "top",
    textAlign: "center",
    color: theme.ACCENT,
    textTransform: "capitalize",
  },
});

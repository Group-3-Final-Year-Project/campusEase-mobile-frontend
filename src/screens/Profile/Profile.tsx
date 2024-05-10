import { StyleSheet, StatusBar } from "react-native";
import React from "react";
import MainContainer from "../../hocs/MainContainer";
import {
  ScrollView,
  Box,
  Image,
  Heading,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import { theme } from "../../shared/theme";
import { useFocusEffect } from "@react-navigation/native";
import { CustomNavigationProp } from "../../shared/types";

const Profile = ({ navigation }: CustomNavigationProp) => {
  return (
    <MainContainer>
      <ScrollView paddingHorizontal={20}>
        <Box paddingTop={97 - (StatusBar?.currentHeight || 0)}>
          <Image
            width={80}
            height={80}
            borderRadius={80}
            marginBottom={10}
            source={{
              uri: "https://img.freepik.com/premium-photo/happy-young-black-lady-rubber-gloves-washes-floor-with-cleaning-supplies-enjoys-cleaning-living-room_116547-35431.jpg",
            }}
            alt="profile_picture"
            resizeMode="cover"
            resizeMethod="resize"
          />
          <VStack paddingHorizontal={19}>
            <Heading style={styles.headerText}>Ethan Howard</Heading>
            <Text style={styles.subHeaderText}>ethanhoward778@gmail.com</Text>
          </VStack>
        </Box>
      </ScrollView>
    </MainContainer>
  );
};

export default Profile;

const styles = StyleSheet.create({
  headerText: {
    marginBottom: 5,
    fontSize: 24,
    fontWeight: "900",
    textAlign: "center",
    verticalAlign: "middle",
  },
  subHeaderText: {
    fontSize: 14,
    fontWeight: "100",
    lineHeight: 22,
    textAlign: "center",
    verticalAlign: "middle",
    color: theme.ACCENT,
  },
});

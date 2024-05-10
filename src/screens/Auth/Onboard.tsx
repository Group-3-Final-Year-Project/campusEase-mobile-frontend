import { StyleSheet } from "react-native";
import React from "react";
import MainContainer from "../../hocs/MainContainer";
import { theme } from "../../shared/theme";
import { Box, Image, VStack, Heading, Text, View } from "@gluestack-ui/themed";
import BeautyButton from "../../components/BeautyButton";
import { APP_PAGES } from "../../shared/constants";
import { CustomNavigationProp } from "../../shared/types";

const Onboard = ({ navigation }: CustomNavigationProp) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const handleNext = () => {
    if (currentIndex < infos.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleRoleSelection = () => navigation.navigate(APP_PAGES.SIGNUP);

  const infos = [
    {
      title: "Find best quality services in budget",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto blanditiis voluptates dicta ullam nam esse.",
      buttons: (
        <BeautyButton
          title="Get Started"
          variant="solid"
          onPress={handleNext}
          styles={{
            marginTop: 20,
          }}
        />
      ),
    },
    {
      title: "Choose your preferred role on CampusEase",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto blanditiis voluptates dicta ullam nam esse.",
      buttons: (
        <Box
          marginTop={20}
          flexDirection="row"
          w="$full"
          justifyContent="center"
          alignItems="center"
        >
          <BeautyButton
            title="Student"
            variant="outline"
            onPress={handleRoleSelection}
          />
          <View marginHorizontal={5} />
          <BeautyButton
            title="Service provider"
            variant="solid"
            onPress={handleRoleSelection}
          />
        </Box>
      ),
    },
  ];

  return (
    <MainContainer>
      <Box
        height="$full"
        w="$full"
        paddingHorizontal={14}
        paddingVertical={30}
        flexDirection="column-reverse"
      >
        <BeautyButton
          title="Get Started"
          variant="solid"
          onPress={handleRoleSelection}
        />
      </Box>
    </MainContainer>
  );
};

export default Onboard;

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
  },
});

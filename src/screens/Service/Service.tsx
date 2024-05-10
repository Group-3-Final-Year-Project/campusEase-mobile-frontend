import { ScrollView, StyleSheet } from "react-native";
import React from "react";
import MainContainer from "../../hocs/MainContainer";
import ServiceBanner from "./ServiceBanner";
import { Badge, Box, BadgeText, HStack, Text } from "@gluestack-ui/themed";
import { Iconify } from "react-native-iconify";
import { theme } from "../../shared/theme";

const Service = () => {
  return (
    <MainContainer>
      <ScrollView>
        <ServiceBanner />
        <Box paddingHorizontal={10}>
          <Box
            w="$full"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Badge variant="solid" size="sm">
              <BadgeText color={theme.PRIMARY_COLOR}>Cleaning</BadgeText>
            </Badge>
            <HStack space="xs">
              <Iconify icon={"fluent-emoji-flat:star"} size={15} />
              <Text>4.5 (365 reviews)</Text>
            </HStack>
          </Box>
        </Box>
      </ScrollView>
    </MainContainer>
  );
};

export default Service;

const styles = StyleSheet.create({});

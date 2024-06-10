import { View, ScrollView } from "react-native";
import React, { useContext, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemeContext } from "styled-components/native";

import Avatar from "react-native-ui-lib/avatar";
import { Iconify } from "react-native-iconify";
import { AddAttachmentBtn, Container, Description } from "./styles";
import {
  Button,
  Input,
  ServiceProviderCard,
  TertiaryServiceCard,
} from "~components";
import { BottomCard, HighlightedDescription } from "../Service/styles";
import {
  BookingInfoContainer,
  BookingInfoHeaderLabel,
} from "../BookingDetail/styles";
import { formatCurrency } from "~services";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { APP_PAGES } from "~src/shared/constants";
import { CountryCodeText, FormControl } from "../SignInOrUp/styles";
import ResultPrompt from "~components/ResultPrompt";

export const useCustomBottomInset = () => {
  const insets = useSafeAreaInsets();
  return Math.max(20, insets.bottom + 5);
};

const MoreBookingInfo = ({ navigation }: NativeStackScreenProps<any>) => {
  const insets = useSafeAreaInsets();
  const bottomInset = useCustomBottomInset();
  const themeContext = useContext(ThemeContext);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  return (
    <Container>
      <ScrollView
        style={{
          // paddingTop: insets.top,
          paddingBottom: bottomInset,
          paddingHorizontal: 15,
        }}
      >
        <BookingInfoContainer>
          <BookingInfoHeaderLabel>Customer Information</BookingInfoHeaderLabel>
          <FormControl>
            <Input
              textContentType="name"
              placeholder="Username"
              icon={
                <Iconify
                  color={themeContext?.colors.secondaryText2}
                  icon="solar:user-rounded-outline"
                />
              }
            />
          </FormControl>
          <FormControl>
            <Input
              textContentType="emailAddress"
              placeholder="Email"
              icon={
                <Iconify
                  color={themeContext?.colors.secondaryText2}
                  icon="solar:letter-outline"
                />
              }
            />
          </FormControl>
          <FormControl>
            <Input
              textContentType="telephoneNumber"
              keyboardType="phone-pad"
              placeholder="Phone number"
              icon={<CountryCodeText>🇬🇭 +233</CountryCodeText>}
            />
          </FormControl>
        </BookingInfoContainer>
        <BookingInfoContainer>
          <BookingInfoHeaderLabel>Other Information</BookingInfoHeaderLabel>
          <FormControl>
            <Input
              textContentType="name"
              placeholder="Preferred date of service"
              icon={
                <Iconify
                  color={themeContext?.colors.secondaryText2}
                  icon="solar:calendar-outline"
                />
              }
            />
          </FormControl>
          <FormControl>
            <Input
              textContentType="name"
              placeholder="Preferred time of service"
              icon={
                <Iconify
                  color={themeContext?.colors.secondaryText2}
                  icon="solar:clock-circle-outline"
                />
              }
            />
          </FormControl>
          <FormControl>
            <Input
              textContentType="name"
              placeholder="Note to service provider"
              multiline
              numberOfLines={7}
              textAlignVertical="top"
              icon={
                <Iconify
                  color={themeContext?.colors.secondaryText2}
                  icon="solar:notebook-outline"
                  style={{ marginBottom: 6 * 16 }}
                />
              }
            />
          </FormControl>
        </BookingInfoContainer>
        <BookingInfoContainer>
          <BookingInfoHeaderLabel>
            Attachments for service provider
          </BookingInfoHeaderLabel>
          <FormControl>
            <AddAttachmentBtn>
              <Iconify
                color={themeContext?.colors.secondaryText2}
                icon="solar:add-square-outline"
                style={{ marginRight: 7 }}
              />
              <Description
                style={{ color: themeContext?.colors.secondaryText2 }}
              >
                Add attachments
              </Description>
            </AddAttachmentBtn>
          </FormControl>
        </BookingInfoContainer>
      </ScrollView>
      <BottomCard>
        <Button
          style={{ width: "100%", height: 60, padding: 12 }}
          onPress={() => setIsVisible(true)}
        >
          Confirm booking
        </Button>
      </BottomCard>
      <ResultPrompt visible={isVisible} setIsVisible={setIsVisible} />
    </Container>
  );
};

export default MoreBookingInfo;

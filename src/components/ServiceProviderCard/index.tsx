import { View } from "react-native";
import React, { useContext, useState } from "react";
import {
  ContactInfoContainer,
  Description,
  ServiceProviderCardContainer,
  ServiceProviderLabel,
} from "./styles";
import Avatar from "react-native-ui-lib/avatar";
import { ThemeContext } from "styled-components/native";
import IconBtn from "~components/IconBtn";
import { Iconify } from "react-native-iconify";
import { ServiceProvider } from "~src/@types/types";
import { openLink } from "~services";
import usersData from "~src/data/usersData";

interface IServiceProviderCard {
  provider: ServiceProvider;
  showContactInfo?: boolean;
}

const ServiceProviderCard = (props: IServiceProviderCard) => {
  const themeContext = useContext(ThemeContext);
  const { provider, showContactInfo } = props;

  return (
    <ServiceProviderCardContainer>
      <View style={{ flexDirection: "row" }}>
        <Avatar
          animate
          useAutoColors
          label="SO"
          size={45}
          backgroundColor="green"
          labelColor="white"
          source={{
            uri:
              provider?.profilePicture ??
              "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?cs=srgb&dl=pexels-olly-733872.jpg&fm=jpg",
          }}
        />
        <View style={{ marginLeft: 15 }}>
          <ServiceProviderLabel style={{}}>
            {provider?.username}
          </ServiceProviderLabel>
          <Description
            style={{
              fontSize: 12,
              color: themeContext?.colors.secondaryText,
            }}
          >
            Service provider
          </Description>
        </View>
      </View>
      {showContactInfo && (
        <ContactInfoContainer>
          <IconBtn
            style={{
              backgroundColor: themeContext?.colors.primary,
              marginRight: 7,
            }}
            onPress={() => openLink(`tel:${provider?.phoneNumber}`)}
          >
            <Iconify
              icon="solar:phone-calling-outline"
              size={16}
              strokeWidth={16}
              color={themeContext?.colors.text}
            />
          </IconBtn>
          <IconBtn>
            <Iconify
              icon="solar:chat-round-line-outline"
              size={16}
              strokeWidth={16}
              color={themeContext?.colors.primary}
            />
          </IconBtn>
        </ContactInfoContainer>
      )}
    </ServiceProviderCardContainer>
  );
};

export default ServiceProviderCard;

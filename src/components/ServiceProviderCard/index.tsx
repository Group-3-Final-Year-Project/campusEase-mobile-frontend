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
import { VerifiedUserPreview } from "~src/@types/types";
import { extractUserDataForFirebase, openChat, openLink } from "~services";
import usersData from "~src/data/usersData";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useAppSelector } from "~store/hooks/useTypedRedux";
import { RootState } from "~store/store";

interface IServiceProviderCard {
  provider: VerifiedUserPreview;
  showContactInfo?: boolean;
}

const ServiceProviderCard = (props: IServiceProviderCard) => {
  const themeContext = useContext(ThemeContext);
  const { provider, showContactInfo } = props;
  const navigation = useNavigation();
  const user: VerifiedUser = useAppSelector((state) => state.user);
  const currentUserForFirebase: VerifiedUserPreview =
    extractUserDataForFirebase(user);

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
            {provider?.userType}
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
          <IconBtn
            onPress={() =>
              openChat(
                navigation as NavigationProp<any>,
                currentUserForFirebase,
                provider
              )
            }
          >
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

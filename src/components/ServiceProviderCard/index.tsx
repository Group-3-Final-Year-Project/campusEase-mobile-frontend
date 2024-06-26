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
import {
  ServiceProvider,
  UserForFirebase,
  VerifiedUser,
} from "~src/@types/types";
import { openChat, openLink } from "~services";
import usersData from "~src/data/usersData";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useAppSelector } from "~store/hooks/useTypedRedux";
import { RootState } from "~store/store";

interface IServiceProviderCard {
  provider: ServiceProvider;
  showContactInfo?: boolean;
}

const ServiceProviderCard = (props: IServiceProviderCard) => {
  const themeContext = useContext(ThemeContext);
  const { provider, showContactInfo } = props;
  const navigation = useNavigation();
  const { authorized_account }: VerifiedUser = useAppSelector(
    (state) => state.user
  );
  const currentUserForFirebase: UserForFirebase = {
    id: authorized_account.id,
    email: authorized_account.email,
    username: authorized_account.username,
    phoneNumber: authorized_account.phoneNumber,
    isEmailVerified: authorized_account.isEmailVerified,
    isPhoneVerified: authorized_account.isPhoneVerified,
    profilePicture: authorized_account.profilePicture,
    userType: authorized_account.userType,
  };

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

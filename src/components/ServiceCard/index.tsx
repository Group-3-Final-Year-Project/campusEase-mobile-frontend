import { Dimensions, ImageBackground, View } from "react-native";
import React, { useContext } from "react";
import { CardContainer, CardImage, CardInfoContainer, Title } from "./styles";
import { Card, CardProps } from "react-native-ui-lib";
import { ThemeContext } from "styled-components/native";
import IconBtn from "~components/IconBtn";
import { Iconify } from "react-native-iconify";
import Text from "~components/Text";
import { APP_PAGES } from "~src/shared/constants";
import { NavigationProp } from "@react-navigation/native";
import { ServiceListService } from "~src/@types/types";
import { formatCurrency, setBookmarks } from "~services";
import {
  Description,
  ServiceTitle,
} from "~components/SecondaryServiceCard/styles";
import StarRating from "~components/StarRating";

interface ServiceCardProps extends CardProps {
  service: ServiceListService;
  navigation: NavigationProp<any>;
}

const ServiceCard = (props: ServiceCardProps) => {
  const theme = useContext(ThemeContext);
  const { service, navigation } = props;

  return (
    <CardContainer
      style={{
        width: Dimensions.get("screen").width / 1.5,
      }}
      onPress={() =>
        navigation &&
        navigation.navigate(APP_PAGES.SERVICE, { serviceId: service.id })
      }
      {...props}
    >
      <CardImage
        // style={{
        //   width: "100%",
        //   height: "75%",
        //   borderRadius: 15,
        // }}
        imageStyle={{
          borderRadius: 10,
          width: "100%",
          height: "100%",
          flex: 1,
          objectFit: "cover",
        }}
        source={{
          uri: service?.coverImage
            ? service.coverImage
            : "https://cdn.textstudio.com/output/sample/normal/6/9/6/5/service-logo-103-5696.png",
        }}
      />
      <View
        style={{
          position: "absolute",
          top: 20,
          left: 20,
          width: "90%",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <IconBtn style={{ flexDirection: "row" }}>
          <Iconify
            icon="fluent-emoji-flat:star"
            size={12}
            strokeWidth={12}
            color={theme?.colors.text}
          />
          <Text style={{ marginLeft: 5, fontSize: 12, lineHeight: 14 }}>
            {service?.rating ?? 0.0}
          </Text>
        </IconBtn>
        <IconBtn onPress={() => setBookmarks([service])}>
          <Iconify
            icon="solar:bookmark-bold"
            size={12}
            strokeWidth={12}
            color={theme?.colors.primary}
          />
        </IconBtn>
      </View>
      <CardInfoContainer>
        <ServiceTitle style={{ marginBottom: 5 }}>{service.name}</ServiceTitle>
        <Description>{formatCurrency(service.startingPrice ?? 0)}</Description>
      </CardInfoContainer>
    </CardContainer>
  );
};

export default ServiceCard;

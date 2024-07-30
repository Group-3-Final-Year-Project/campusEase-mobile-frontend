import { View, TouchableOpacityProps } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import {
  CardContainer,
  CardImage,
  InfoContainer,
  ServiceTitle,
  Description,
} from "./styles";
import { ThemeContext } from "styled-components/native";
import { APP_PAGES } from "~src/shared/constants";
import { NavigationProp } from "@react-navigation/native";
import StarRating from "../StarRating";
import Text from "../Text";
import { formatCurrency, getOverallRatingAboutService } from "~services";
import { ServiceListService } from "~src/@types/types";

interface ServiceCardProps extends TouchableOpacityProps {
  service: ServiceListService;
  navigation: NavigationProp<any>;
}

const SecondaryServiceCard = (props: ServiceCardProps) => {
  const themeContext = useContext(ThemeContext);
  const { service, navigation } = props;

   const [serviceRating, setServiceRating] = useState(0);

   const fetchServiceRating = async (serviceId: string) => {
     try {
       const rating = await getOverallRatingAboutService(serviceId);
       return rating || 0;
     } catch (error) {
       return null;
     }
   };

   useEffect(() => {
     const fetchData = async () => {
       const rating = await fetchServiceRating(service.id);
       if (rating !== null) {
         setServiceRating(rating);
       }
     };

     fetchData();
   }, [service]);

  return (
    <CardContainer
      onPress={() =>
        navigation.navigate(APP_PAGES.SERVICE, { serviceId: service.id })
      }
    >
      <CardImage
        source={{
          uri: service?.coverImage
            ? service.coverImage
            : "https://cdn.textstudio.com/output/sample/normal/6/9/6/5/service-logo-103-5696.png",
        }}
      />
      <InfoContainer>
        <ServiceTitle>{service.name}</ServiceTitle>
        <View style={{ flexDirection: "row" }}>
          <StarRating value={serviceRating} size={12} />
          <Text>({serviceRating ?? 0.0})</Text>
        </View>
        <Description>{formatCurrency(service.startingPrice ?? 0)}</Description>
      </InfoContainer>
    </CardContainer>
  );
};

export default SecondaryServiceCard;

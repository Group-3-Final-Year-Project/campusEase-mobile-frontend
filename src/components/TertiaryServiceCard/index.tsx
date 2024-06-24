import { View, TouchableOpacityProps } from "react-native";
import React, { useContext } from "react";
import {
  CardContainer,
  CardImage,
  InfoContainer,
  Description,
  ServiceTitle,
} from "./styles";
import { ThemeContext } from "styled-components/native";
import { NavigationProp } from "@react-navigation/native";
import StarRating from "../StarRating";
import Text from "../Text";
import { formatCurrency } from "~services";
import { ServiceListService } from "~src/@types/types";

interface ServiceCardProps extends TouchableOpacityProps {
  service: ServiceListService;
  navigation?: NavigationProp<any>;
}

const TertiaryServiceCard = (props: ServiceCardProps) => {
  const theme = useContext(ThemeContext);
  const { service } = props;

  return (
    <CardContainer>
      <CardImage
        source={{
          uri: service?.coverImage
            ? service.coverImage
            : "https://www.apartments.com/rental-manager/sites/default/files/image/2023-02/home%20repair.jpg",
        }}
      />
      <InfoContainer>
        <ServiceTitle>{service.name}</ServiceTitle>
        <View style={{ flexDirection: "row" }}>
          <StarRating value={Math.floor(service.rating ?? 0)} size={12} />
          <Text>({service.rating ?? 0.0})</Text>
        </View>
        <Description>{formatCurrency(service.startingPrice ?? 0)}</Description>
      </InfoContainer>
    </CardContainer>
  );
};

export default TertiaryServiceCard;

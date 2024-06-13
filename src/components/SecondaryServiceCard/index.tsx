import { View, TouchableOpacityProps } from "react-native";
import React, { useContext } from "react";
import { CardContainer, CardImage, InfoContainer, Description } from "./styles";
import { ThemeContext } from "styled-components/native";
import { APP_PAGES } from "~src/shared/constants";
import { NavigationProp } from "@react-navigation/native";
import StarRating from "../StarRating";
import Text from "../Text";
import { formatCurrency } from "~services";
import { Service } from "~src/@types/types";

interface ServiceCardProps extends TouchableOpacityProps {
  service: Service;
  navigation: NavigationProp<any>;
}

const SecondaryServiceCard = (props: ServiceCardProps) => {
  const themeContext = useContext(ThemeContext);
  const { service, navigation } = props;

  return (
    <CardContainer onPress={() => navigation.navigate(APP_PAGES.SERVICE)}>
      <CardImage
        source={{
          uri: service?.coverImage
            ? service.coverImage
            : "https://www.apartments.com/rental-manager/sites/default/files/image/2023-02/home%20repair.jpg",
        }}
      />
      <InfoContainer>
        <Description>{service.name}</Description>
        <View style={{ flexDirection: "row" }}>
          <StarRating value={Math.floor(service.rating ?? 0)} size={12} />
          <Text>({service.rating ?? 0.0})</Text>
        </View>
        <Description>{formatCurrency(service.startingPrice ?? 0)}</Description>
      </InfoContainer>
    </CardContainer>
  );
};

export default SecondaryServiceCard;

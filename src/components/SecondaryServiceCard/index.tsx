import { StyleSheet, View, TouchableOpacityProps } from "react-native";
import React, { useContext } from "react";
import { CardContainer, CardImage, InfoContainer, Description } from "./styles";
import { ThemeContext } from "styled-components/native";
import { APP_PAGES } from "~src/shared/constants";
import { NavigationProp } from "@react-navigation/native";
import { StarRating, Text } from "~components";
import { formatCurrency } from "~services";

interface ServiceCardProps extends TouchableOpacityProps {
  service: any;
  navigation?: NavigationProp<any>;
}

const SecondaryServiceCard: React.FC<ServiceCardProps> = (props) => {
  const theme = useContext(ThemeContext);

  return (
    <CardContainer>
      <CardImage
        source={{
          uri: "https://www.apartments.com/rental-manager/sites/default/files/image/2023-02/home%20repair.jpg",
        }}
      />
      <InfoContainer>
        <Description>Jeron Plumbing Works</Description>
        <View style={{ flexDirection: "row" }}>
          <StarRating value={5} size={12} />
          <Text>(5.0)</Text>
        </View>
        <Description>{formatCurrency(190)}</Description>
      </InfoContainer>
    </CardContainer>
  );
};

export default SecondaryServiceCard;

const styles = StyleSheet.create({});

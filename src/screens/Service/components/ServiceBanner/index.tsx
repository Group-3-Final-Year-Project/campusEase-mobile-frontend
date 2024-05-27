import React from "react";
import { View } from "react-native";
import { BannerCard } from "./styles";

const ServiceBanner = () => {
  return (
    <BannerCard
      source={{
        uri: "https://www.apartments.com/rental-manager/sites/default/files/image/2023-02/home%20repair.jpg",
      }}
    ></BannerCard>
  );
};

export default ServiceBanner;

import React from "react";
import { BannerCard } from "./styles";

const ServiceBanner = ({ banner }: { banner: string }) => {
  return (
    <BannerCard
      source={{
        uri:
          banner ||
          "https://www.apartments.com/rental-manager/sites/default/files/image/2023-02/home%20repair.jpg",
      }}
    ></BannerCard>
  );
};

export default ServiceBanner;

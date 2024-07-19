import { Text, View } from "react-native";
import React, { useContext } from "react";
import Carousel from "react-native-ui-lib/carousel";
import Card from "react-native-ui-lib/card";
import { Spacings } from "react-native-ui-lib";
import { ThemeContext } from "styled-components/native";
import { APP_PAGES } from "~src/shared/constants";
import { NavigationProp } from "@react-navigation/native";

const HomeBanner = ({ navigation }: { navigation: NavigationProp<any> }) => {
  const themeContext = useContext(ThemeContext);

  const banners = [
    {
      name: "Laundry",
      url: "https://d2o7dtsnwzl7g9.cloudfront.net/dad-online/media/image/2d/1e/11/January_2021_DAD-Banner_842x482px2jDvGqmdAjfel5_800x800.png",
    },
    {
      name: "Student Tutoring",
      url: "https://www.utsa.edu/studentsuccess/academic-support/images/student-academic-support.png",
    },
    {
      name: "Home Cleaning",
      url: "https://nextdaycleaning.com/wp-content/uploads/2023/02/HEADER.jpg",
    },
    {
      name: "Hair Salon",
      url: "https://dynamic.brandcrowd.com/template/preview/design/bcebca37-707e-4499-824c-ca2f2fe8affe?v=4&designTemplateVersion=1&size=design-preview-standalone-1x",
    },
    {
      name: "Others",
      url: "https://d3vlhkqyz4y38a.cloudfront.net/media/offerImage/phpMDPgK1_1662723890.png",
    },
  ];

  const renderItem = (item: any, index: number) => (
    <Card
      key={index}
      flex
      center
      onPress={() => navigation.navigate(APP_PAGES.PROMOS)}
    >
      <Card.Image
        style={{
          width: "100%",
          height: 200,
        }}
        source={{
          uri: item.url,
        }}
      />
    </Card>
  );

  return (
    <Carousel
      animated
      autoplay
      loop
      itemSpacings={Spacings.s2}
      showCounter
      containerStyle={{
        marginTop: 20,
        borderRadius: 10,
        backgroundColor: themeContext?.colors.secondaryBackground,
      }}
    >
      {banners.map((item, index) => renderItem(item, index))}
    </Carousel>
  );
};

export default HomeBanner;

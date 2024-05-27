import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import Carousel from "react-native-ui-lib/carousel";
import Card from "react-native-ui-lib/card";
import { Spacings } from "react-native-ui-lib";
import { ThemeContext } from "styled-components/native";

const HomeBanner = () => {
  const themeContext = useContext(ThemeContext);

  const renderItem = (item: any, index: number) => (
    <Card key={index} flex center onPress={() => console.log("pressed")}>
      <Card.Image
        style={{
          width: "100%",
          height: 200,
        }}
        source={{
          uri: "https://d3vlhkqyz4y38a.cloudfront.net/media/offerImage/phpMDPgK1_1662723890.png",
        }}
      />
      {/* <Card.Section
        content={[{ text: "Card content here", text70: true, grey10: true }]}
        contentStyle={{ alignItems: "center" }}
      /> */}
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
        backgroundColor: themeContext?.colors.secondaryBackground,
      }}
    >
      {[...new Array(5)].map((item, index) => renderItem(item, index))}
    </Carousel>
  );
};

export default HomeBanner;

const styles = StyleSheet.create({});

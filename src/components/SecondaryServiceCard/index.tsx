import { Dimensions, StyleSheet, View } from "react-native";
import React, { useContext } from "react";
import { Title } from "./styles";
import { Card, CardProps } from "react-native-ui-lib";
import { ThemeContext } from "styled-components/native";
import IconBtn from "~components/IconBtn";
import { Iconify } from "react-native-iconify";
import Text from "~components/Text";

interface ServiceCardProps extends CardProps {
  service: any;
}

const SecondaryServiceCard: React.FC<ServiceCardProps> = (props) => {
  const theme = useContext(ThemeContext);

  return (
    <Card
      //   center
      animated
      enableShadow={false}
      containerStyle={{
        backgroundColor: theme?.colors.secondaryBackground,
        borderRadius: 15,
        width: Dimensions.get("screen").width / 1.5,
        height: 240,
        padding: 10,
        position: "relative",
      }}
      {...props}
    >
      <Card.Image
        style={{
          width: "100%",
          height: "75%",
          borderRadius: 15,
        }}
        source={{
          uri: "https://www.apartments.com/rental-manager/sites/default/files/image/2023-02/home%20repair.jpg",
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
            size={18}
            strokeWidth={18}
            color={theme?.colors.text}
          />
          <Text style={{ marginLeft: 5, fontSize: 14 }}>4.8</Text>
        </IconBtn>
        <IconBtn>
          <Iconify
            icon="solar:bookmark-bold"
            size={18}
            strokeWidth={18}
            color={theme?.colors.primary}
          />
        </IconBtn>
      </View>
      <Card.Section
        content={[{ text: "Hello", children: <Title>Jeron's Plumbing</Title> }]}
      />
    </Card>
  );
};

export default SecondaryServiceCard;

const styles = StyleSheet.create({});

import { StyleSheet, View, Dimensions, Text } from "react-native";
import React, { useContext } from "react";
import { GridView, AnimatedImage, Card } from "react-native-ui-lib";
import { ListLabel } from "../../styles";
import { ThemeContext } from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import { APP_PAGES } from "~src/shared/constants";

const Categories = () => {
  const theme = useContext(ThemeContext);
  const navigation = useNavigation();

  return (
    <View style={{ marginTop: 20 }}>
      <ListLabel style={{ marginBottom: 10 }}>Categories</ListLabel>
      <GridView
        items={[
          {
            title: "item 1",
            onPress: () => navigation.navigate(APP_PAGES.SERVICE_CATEGORIES),
          },
          {
            title: "item 2",
            onPress: () => navigation.navigate(APP_PAGES.SERVICE_CATEGORIES),
          },
          {
            title: "item 3",
            onPress: () => navigation.navigate(APP_PAGES.SERVICE_CATEGORIES),
          },
          {
            title: "item 4",
            onPress: () => navigation.navigate(APP_PAGES.SERVICE_CATEGORIES),
          },
          {
            title: "item 5",
            onPress: () => navigation.navigate(APP_PAGES.SERVICE_CATEGORIES),
          },
          {
            title: "item 6",
            onPress: () => navigation.navigate(APP_PAGES.SERVICE_CATEGORIES),
          },
          {
            title: "item 7",
            onPress: () => navigation.navigate(APP_PAGES.SERVICE_CATEGORIES),
          },
          {
            title: "item 8",
            onPress: () => navigation.navigate(APP_PAGES.SERVICE_CATEGORIES),
          },
          {
            title: "item 9",
            onPress: () => navigation.navigate(APP_PAGES.SERVICE_CATEGORIES),
          },
        ]}
        numColumns={3}
        itemSpacing={10}
        viewWidth={Dimensions.get("screen").width - 30}
        // listPadding={Spacings.s5}
        renderCustomItem={(item) => (
          <Card
            center
            animated
            enableShadow={false}
            onPress={item.onPress}
            containerStyle={{
              backgroundColor: theme?.colors.secondaryBackground,
              borderRadius: 15,
              width: (Dimensions.get("screen").width - 60) / 3,
              height: 120,
              marginBottom: 10,
              marginRight: 10,
            }}
          >
            <AnimatedImage
              source={require("src/assets/images/HeartEyesEmoji.png")}
              width={30}
              height={30}
            />
          </Card>
        )}
      />
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({});

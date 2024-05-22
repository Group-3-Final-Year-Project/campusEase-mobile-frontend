import { StyleSheet, View, Dimensions, Text } from "react-native";
import React, { useContext } from "react";
import { GridView, AnimatedImage, Card } from "react-native-ui-lib";
import { ListLabel } from "../../styles";
import { ThemeContext } from "styled-components/native";

const Categories = () => {
  const theme = useContext(ThemeContext);

  return (
    <View style={{ marginTop: 20 }}>
      <ListLabel style={{ marginBottom: 10 }}>Categories</ListLabel>
      <GridView
        items={[
          { title: "item 1", onPress: () => console.log("item 1 pressed") },
          { title: "item 2", onPress: () => console.log("item 2 pressed") },
          { title: "item 3", onPress: () => console.log("item 2 pressed") },
          { title: "item 4", onPress: () => console.log("item 2 pressed") },
          { title: "item 5", onPress: () => console.log("item 2 pressed") },
          { title: "item 6", onPress: () => console.log("item 2 pressed") },
          { title: "item 7", onPress: () => console.log("item 2 pressed") },
          { title: "item 8", onPress: () => console.log("item 2 pressed") },
          { title: "item 9", onPress: () => console.log("item 2 pressed") },
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

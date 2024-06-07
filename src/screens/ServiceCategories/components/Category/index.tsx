import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import { Container } from "./styles";
import { SecondaryServiceCard } from "~components";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface ICategory {
  category: any;
}
export const useCustomBottomInset = () => {
  const insets = useSafeAreaInsets();
  return Math.max(20, insets.bottom + 5);
};

const Category = (props: ICategory) => {
  const navigation = useNavigation();
  const bottomInset = useCustomBottomInset();

  return (
    <Container>
      <FlatList
        data={[...new Array(15)]}
        renderItem={({ item, index }) => (
          <SecondaryServiceCard
            service={item}
            navigation={navigation as NavigationProp<any>}
            style={{
              width: "100%",
            }}
          />
        )}
        ItemSeparatorComponent={() => <View style={{ marginVertical: 7 }} />}
        showsHorizontalScrollIndicator={false}
        style={{ paddingBottom: bottomInset }}
        ListHeaderComponent={() => <View style={{ marginTop: 7 }} />}
      />
    </Container>
  );
};

export default Category;

const styles = StyleSheet.create({});

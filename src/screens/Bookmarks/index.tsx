import { FlatList, StyleSheet, View } from "react-native";
import React, { useContext } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemeContext } from "styled-components/native";
import { SecondaryServiceCard } from "~components";
import { Iconify } from "react-native-iconify";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { Container } from "./styles";
import { NavigationProp } from "@react-navigation/native";

export const useCustomBottomInset = () => {
  const insets = useSafeAreaInsets();
  return Math.max(20, insets.bottom + 5);
};

const Bookmarks = ({ navigation }: BottomTabScreenProps<any>) => {
  const insets = useSafeAreaInsets();
  const bottomInset = useCustomBottomInset();
  const themeContext = useContext(ThemeContext);

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
      />
    </Container>
  );
};

export default Bookmarks;

const styles = StyleSheet.create({});

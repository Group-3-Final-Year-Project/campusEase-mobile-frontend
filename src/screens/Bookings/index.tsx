import { FlatList, StyleSheet, View } from "react-native";
import React, { useContext } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemeContext } from "styled-components/native";
import { Iconify } from "react-native-iconify";
import { Container, HeaderCard, HeaderItemLabel } from "./styles";
import BookingCard from "./components/BookingCard";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { IconBtn } from "~components";

export const useCustomBottomInset = () => {
  const insets = useSafeAreaInsets();
  return Math.max(20, insets.bottom + 5);
};

const Bookings = ({ navigation }: NativeStackScreenProps<any>) => {
  const insets = useSafeAreaInsets();
  const bottomInset = useCustomBottomInset();
  const themeContext = useContext(ThemeContext);

  return (
    <Container>
      <HeaderCard>
        <IconBtn style={{ marginRight: 7 }}>
          <HeaderItemLabel>In Progress</HeaderItemLabel>
        </IconBtn>
        <IconBtn style={{ marginRight: 7 }}>
          <HeaderItemLabel>Completed</HeaderItemLabel>
        </IconBtn>
        <IconBtn>
          <HeaderItemLabel>Canceled</HeaderItemLabel>
        </IconBtn>
      </HeaderCard>
      <FlatList
        data={[...new Array(10)]}
        renderItem={({ item }) => (
          <BookingCard booking={item} navigation={navigation} />
        )}
        ItemSeparatorComponent={() => <View style={{ marginVertical: 7 }} />}
        ListHeaderComponent={() => <View style={{ marginTop: 7 }} />}
      />
    </Container>
  );
};

export default Bookings;

const styles = StyleSheet.create({});

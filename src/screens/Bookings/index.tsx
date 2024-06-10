import { FlatList, View } from "react-native";
import React, { useContext, useState } from "react";
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
  const [activeStatusBtn, setActiveStatusBtn] = useState("All");

  const statuses = [
    { name: "All" },
    { name: "In Progress" },
    { name: "Completed" },
    { name: "Canceled" },
  ];

  const renderStatusBtn = ({ item }: { item: { name: string } }) => {
    const isActive = item.name === activeStatusBtn;
    return (
      <IconBtn
        onPress={() => setActiveStatusBtn(item.name)}
        style={{
          backgroundColor: isActive
            ? themeContext?.colors.primary
            : themeContext?.colors.background,
        }}
      >
        <HeaderItemLabel>{item.name}</HeaderItemLabel>
      </IconBtn>
    );
  };

  return (
    <Container>
      <HeaderCard>
        <FlatList
          horizontal
          data={statuses}
          renderItem={renderStatusBtn}
          ItemSeparatorComponent={() => (
            <View style={{ marginHorizontal: 3.5 }} />
          )}
        />
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

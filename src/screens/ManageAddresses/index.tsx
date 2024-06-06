import { StyleSheet, View, FlatList } from "react-native";
import React, { useContext } from "react";
import { ThemeContext } from "styled-components/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Container, Description, AddressCard, AddressLabel } from "./styles";
import { Avatar } from "react-native-ui-lib";
import { Iconify } from "react-native-iconify";
import { IconBtn } from "~components";

export const useCustomBottomInset = () => {
  const insets = useSafeAreaInsets();
  return Math.max(20, insets.bottom + 5);
};

const ManageAddresses = () => {
  const insets = useSafeAreaInsets();
  const bottomInset = useCustomBottomInset();
  const themeContext = useContext(ThemeContext);

  const renderItem = ({ item }) => {
    return (
      <AddressCard>
        <View style={{ flexDirection: "row" }}>
          <IconBtn
            style={{
              backgroundColor: themeContext?.colors.secondaryBackground,
            }}
          >
            <Iconify
              icon="solar:map-point-wave-outline"
              size={16}
              color={themeContext?.colors.primary}
            />
          </IconBtn>
          <View style={{ marginLeft: 15 }}>
            <AddressLabel style={{}}>Home</AddressLabel>
            <Description
              style={{
                fontSize: 12,
                color: themeContext?.colors.secondaryText,
              }}
            >
              1901 Thornbridge Cir. Shiloh, Havel 91064
            </Description>
          </View>
        </View>
      </AddressCard>
    );
  };

  return (
    <Container>
      <FlatList
        data={[...new Array(10)]}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={{ marginVertical: 7 }} />}
        ListHeaderComponent={() => <View style={{ marginTop: 7 }} />}
      />
    </Container>
  );
};

export default ManageAddresses;

const styles = StyleSheet.create({});

import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useContext } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemeContext } from "styled-components/native";
import { StatusBar } from "expo-status-bar";
import VirtualisedContainer from "~src/hocs/VirtualisedContainer";
import { Container } from "./styles";
import { IconBtn } from "~components";
import { Iconify } from "react-native-iconify";
import { useFocusEffect } from "@react-navigation/native";

export const useCustomBottomInset = () => {
  const insets = useSafeAreaInsets();
  return Math.max(20, insets.bottom + 5);
};

const Chats = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const bottomInset = useCustomBottomInset();
  const themeContext = useContext(ThemeContext);

  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({
        headerRight: () => (
          <IconBtn>
            <Iconify
              icon="solar:minimalistic-magnifer-outline"
              size={18}
              strokeWidth={18}
              color={themeContext?.colors.text}
            />
          </IconBtn>
        ),
        headerRightContainerStyle: {
          marginRight: 15,
        },
      });
    }, [])
  );

  return (
    <Container
      style={{ paddingTop: insets.top - 20, paddingBottom: bottomInset }}
    >
      <StatusBar style={themeContext?.dark ? "light" : "dark"} />
      <VirtualisedContainer renderItem={() => <></>}>
        <FlatList
          data={[...new Array(5)]}
          renderItem={({ item, index }) => (
            <View
              style={{
                height: 80,
                backgroundColor: themeContext?.colors.secondaryBackground,
              }}
            ></View>
          )}
          ItemSeparatorComponent={() => (
            <View
              style={{
                height: 1,
                backgroundColor: themeContext?.colors.secondaryText2,
              }}
            />
          )}
          showsHorizontalScrollIndicator={false}
        />
      </VirtualisedContainer>
    </Container>
  );
};

export default Chats;

const styles = StyleSheet.create({});

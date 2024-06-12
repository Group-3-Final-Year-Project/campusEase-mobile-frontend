import { FlatList, View } from "react-native";
import React, { useCallback, useContext } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemeContext } from "styled-components/native";
import { StatusBar } from "expo-status-bar";
import { Container } from "./styles";
import { IconBtn } from "~components";
import { Iconify } from "react-native-iconify";
import { useFocusEffect } from "@react-navigation/native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { TouchableOpacity } from "react-native";
import { APP_PAGES } from "~src/shared/constants";

export const useCustomBottomInset = () => {
  const insets = useSafeAreaInsets();
  return Math.max(20, insets.bottom + 5);
};

const Chats = ({ navigation }: BottomTabScreenProps<any>) => {
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
      <FlatList
        data={[...new Array(5)]}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={{
              height: 80,
              backgroundColor: themeContext?.colors.secondaryBackground,
            }}
            onPress={() => navigation.navigate(APP_PAGES.CHAT)}
          ></TouchableOpacity>
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
    </Container>
  );
};

export default Chats;

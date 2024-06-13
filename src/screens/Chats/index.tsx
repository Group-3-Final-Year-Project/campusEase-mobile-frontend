import { FlatList, View, TouchableOpacity } from "react-native";
import React, { useCallback, useContext } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemeContext } from "styled-components/native";
import { StatusBar } from "expo-status-bar";
import {
  Container,
  ChatCardContainer,
  ChatCardLabel,
  Description,
} from "./styles";
import { IconBtn } from "~components";
import { Iconify } from "react-native-iconify";
import { useFocusEffect } from "@react-navigation/native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { APP_PAGES } from "~src/shared/constants";
import Avatar from "react-native-ui-lib/avatar";

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

  const renderChatCard = () => (
    <ChatCardContainer onPress={() => navigation.navigate(APP_PAGES.CHAT)}>
      <Avatar
        animate
        useAutoColors
        label="SO"
        size={45}
        backgroundColor="green"
        labelColor="white"
        source={{
          uri: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?cs=srgb&dl=pexels-olly-733872.jpg&fm=jpg",
        }}
      />
      <View style={{ flexGrow: 1, paddingHorizontal: 10 }}>
        <ChatCardLabel>Jeron Esmond</ChatCardLabel>
        <Description>Hey there! I am the service ...</Description>
      </View>
      <View>
        <Description style={{ color: themeContext?.colors.secondaryText2 }}>
          12:37 am
        </Description>
      </View>
    </ChatCardContainer>
  );

  return (
    <Container
      style={{ paddingTop: insets.top - 20, paddingBottom: bottomInset }}
    >
      <StatusBar style={themeContext?.dark ? "light" : "dark"} />
      <FlatList
        data={[...new Array(5)]}
        renderItem={renderChatCard}
        ItemSeparatorComponent={() => (
          <View
            style={{
              height: 0.8,
              backgroundColor: themeContext?.colors.secondaryBackground,
            }}
          />
        )}
        showsHorizontalScrollIndicator={false}
      />
    </Container>
  );
};

export default Chats;

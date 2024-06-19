import { FlatList, View } from "react-native";
import React, { useCallback, useContext, useState, useEffect } from "react";
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
import { APP_PAGES, STORAGE_KEYS } from "~src/shared/constants";
import Avatar from "react-native-ui-lib/avatar";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestoreDatabase } from "firebaseConfig";

export const useCustomBottomInset = () => {
  const insets = useSafeAreaInsets();
  return Math.max(20, insets.bottom + 5);
};

const Chats = ({ navigation }: BottomTabScreenProps<any>) => {
  const insets = useSafeAreaInsets();
  const bottomInset = useCustomBottomInset();
  const themeContext = useContext(ThemeContext);
  const [chatList, setChatList] = useState([]);

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

  console.log("CL ", chatList);

  const renderChatCard = ({ item }) => (
    <ChatCardContainer onPress={() => handleChatPress(item.id)}>
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

  const getChatHistory = async () => {
    const currentUserId = ""; /* Get the currently logged-in user's ID */ // Replace with your user ID retrieval logic

    const chatsRef = collection(firestoreDatabase, STORAGE_KEYS.CHATROOMS);
    const q = query(
      chatsRef,
      where(STORAGE_KEYS.USERS, "array-contains", currentUserId)
    );
    try {
      const querySnapshot = await getDocs(q);
      const chats = querySnapshot.docs.map(async (doc) => {
        const usersRef = collection(
          firestoreDatabase,
          STORAGE_KEYS.CHATROOMS,
          doc.id,
          STORAGE_KEYS.USERS
        );
        const usersSnapShot = await getDocs(usersRef);
        return {
          id: doc.id,
          users: usersSnapShot.docs,
          ...doc.data(),
        };
      });
      console.log(chats);
      setChatList(chats);
    } catch (error) {
      console.error("Error fetching chat history:", error);
    }
  };

  const handleChatPress = (chatId: string) => {
    navigation.navigate(APP_PAGES.CHAT, { chatId });
  };

  useEffect(() => {
    getChatHistory();
  }, []);

  return (
    <Container
      style={{ paddingTop: insets.top - 20, paddingBottom: bottomInset }}
    >
      <StatusBar style={themeContext?.dark ? "light" : "dark"} />
      <FlatList
        data={chatList}
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

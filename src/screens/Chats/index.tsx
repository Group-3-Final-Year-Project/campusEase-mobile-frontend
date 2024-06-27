import { FlatList, View } from "react-native";
import React, { useCallback, useContext, useState, useEffect } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useCustomBottomInset } from "~hooks";
import { ThemeContext } from "styled-components/native";
import { StatusBar } from "expo-status-bar";
import {
  Container,
  ChatCardContainer,
  ChatCardLabel,
  Description,
} from "./styles";
import { EmptyState, IconBtn, LoadingView, SafeComponent } from "~components";
import { Iconify } from "react-native-iconify";
import { useFocusEffect } from "@react-navigation/native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { APP_PAGES, STORAGE_KEYS } from "~src/shared/constants";
import Avatar from "react-native-ui-lib/avatar";
import {
  DocumentData,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { firestoreDatabase } from "firebaseConfig";
import { useAppSelector } from "~store/hooks/useTypedRedux";
import { UserForFirebase, VerifiedUser } from "~src/@types/types";
import { useQuery } from "@tanstack/react-query";
import { RefreshControl } from "react-native";

const Chats = ({ navigation }: BottomTabScreenProps<any>) => {
  const insets = useSafeAreaInsets();
  const bottomInset = useCustomBottomInset();
  const themeContext = useContext(ThemeContext);
  const [chatList, setChatList] = useState<
    {
      id: string;
      users: DocumentData[];
      messages?: DocumentData[];
    }[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { authorized_account }: VerifiedUser = useAppSelector(
    (state) => state.user
  );

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

  const renderChatCard = ({
    item,
  }: {
    item: {
      id: string;
      users: DocumentData[];
      messages?: DocumentData[] | undefined;
    };
  }) => {
    const user = item.users.filter(
      (user) => user.id !== authorized_account.id
    )[0];
    return (
      <ChatCardContainer onPress={() => handleChatPress(item.id)}>
        <Avatar
          animate
          useAutoColors
          label="SO"
          size={45}
          backgroundColor="green"
          labelColor="white"
          source={{
            uri: user
              ? user?.profilePicture
              : "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?cs=srgb&dl=pexels-olly-733872.jpg&fm=jpg",
          }}
        />
        <View style={{ flexGrow: 1, paddingHorizontal: 10 }}>
          <ChatCardLabel>{user?.username}</ChatCardLabel>
          <Description>Hey there! I am the service ...</Description>
        </View>
        <View>
          <Description style={{ color: themeContext?.colors.secondaryText2 }}>
            12:37 am
          </Description>
        </View>
      </ChatCardContainer>
    );
  };

  const getChatHistory = async () => {
    const chatsRef = collection(firestoreDatabase, STORAGE_KEYS.CHATROOMS);
    const querySnapshot = await getDocs(chatsRef);

    try {
      const chatData = await Promise.all(
        querySnapshot.docs.map(async (doc) => {
          const chatId = doc.id;
          const chatDocData = doc.data(); // Store chat document data

          // Fetch users within the chat (if users collection exists)
          const usersRef = collection(
            firestoreDatabase,
            STORAGE_KEYS.CHATROOMS,
            chatId,
            STORAGE_KEYS.USERS
          );
          const usersSnapshot = await getDocs(usersRef);
          const users = usersSnapshot.docs.map((userDoc) => userDoc.data()); // Extract user data

          return {
            id: chatId,
            users, // Array of user data objects
            ...chatDocData, // Spread chat document data
          };
        })
      );
      return chatData;
    } catch (error) {
      console.error("Error fetching chat history:", error);
    }
  };

  const handleChatPress = (chatId: string) => {
    navigation.navigate(APP_PAGES.CHAT, { chatId });
  };

  const { data, isLoading, error, isError, refetch, isRefetching } = useQuery({
    queryKey: [STORAGE_KEYS.CHATROOMS],
    queryFn: () => getChatHistory(),
  });

  if (isLoading) return <LoadingView />;
  else if (isError || !data || data === undefined) return <EmptyState />;

  return (
    <SafeComponent
      refetch={refetch}
      request={{ data, loading: isLoading, error }}
    >
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
          ListEmptyComponent={() => <EmptyState />}
          refreshControl={
            <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
          }
        />
      </Container>
    </SafeComponent>
  );
};

export default Chats;

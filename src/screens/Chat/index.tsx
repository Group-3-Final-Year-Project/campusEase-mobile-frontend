import { MaterialIcons } from "@expo/vector-icons";
import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  Alert,
  Linking,
  Platform,
  Text,
  KeyboardAvoidingView,
} from "react-native";
import {
  GiftedChat,
  IMessage,
  Send,
  SendProps,
  SystemMessage,
  SystemMessageProps,
  User as GiftedChatUser,
} from "react-native-gifted-chat";
import CustomActions from "./CustomActions";
import CustomView from "./CustomView";
import { Container } from "./styles";
import { ThemeContext } from "styled-components/native";
import { InferProps, Requireable } from "prop-types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { firestoreDatabase } from "firebaseConfig";
import {
  Unsubscribe,
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { STORAGE_KEYS } from "~src/shared/constants";
import { useAppDispatch, useAppSelector } from "~store/hooks/useTypedRedux";
import ACTION_TYPES from "~store/actionTypes";
import { VerifiedUser } from "~src/@types/types";
import moment from "moment";
import { Description } from "../Home/styles";
import { useFocusEffect } from "@react-navigation/native";
import { showAlert } from "~services";
import { EmptyState, LoadingView } from "~components";
import { Iconify } from "react-native-iconify";

const Chat = ({ navigation, route }: NativeStackScreenProps<any>) => {
  const themeContext = useContext(ThemeContext);
  const dispatch = useAppDispatch();
  const chat = useAppSelector((state) => state.chat);
  const user: VerifiedUser = useAppSelector((state) => state.user);
  const giftedChatUser: GiftedChatUser = {
    _id: user.id,
    name: user.username,
    avatar: user?.profilePicture
      ? user.profilePicture
      : "https://cdn-icons-png.flaticon.com/512/149/149071.png",
  };
  const [loading, setLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({
        headerTitle: route.params?.chatPerson || "Chat",
      });
    }, [])
  );
  console.log(chat);

  useEffect(() => {
    const fetchMessages = async (chatId: string) => {
      setLoading(true);
      try {
        const messagesRef = collection(
          firestoreDatabase,
          STORAGE_KEYS.CHATROOMS,
          chatId,
          STORAGE_KEYS.MESSAGES
        );
        const q = query(messagesRef, orderBy("createdAt", "desc"));

        // Fetch messages with real-time updates
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const messages = querySnapshot.docs.map((doc) => {
            const messageData = doc.data();
            return {
              _id: messageData._id,
              createdAt: messageData?.createdAt
                ? moment(messageData.createdAt).toLocaleString()
                : moment().toLocaleString(),
              text: messageData.text,
              user: messageData.user,
            };
          });
          dispatch({
            type: ACTION_TYPES.LOAD_EARLIER_MESSAGES,
            payload: messages,
          });
        });

        // Cleanup function for real-time listener
        return unsubscribe;
      } catch (error) {
        showAlert("Ooops...", "Error fetching chat messages");
      } finally {
        setLoading(false);
      }
    };

    let unsubscribe: Unsubscribe | undefined;

    if (route.params?.chatId) {
      (async () => {
        try {
          unsubscribe = await fetchMessages(route.params?.chatId);
        } catch (error) {
          console.error("Error fetching booking data:", error);
        }
      })();
    }

    return () => unsubscribe?.();
  }, []);

  const onSend = useCallback(
    (messages: any[]) => {
      const updatedMessages = messages.map((message) => {
        return {
          ...message,
          createdAt: moment(createdAt).toLocaleString(),
        };
      });
      const sentMessages = [
        { ...updatedMessages[0], sent: true, received: true },
      ];
      const newMessages = GiftedChat.append(
        chat.messages,
        sentMessages,
        Platform.OS !== "web"
      );

      dispatch({ type: ACTION_TYPES.SEND_MESSAGE, payload: newMessages });
      const { _id, createdAt, text, user } = messages[0];
      addDoc(
        collection(
          firestoreDatabase,
          STORAGE_KEYS.CHATROOMS,
          route.params?.chatId,
          STORAGE_KEYS.MESSAGES
        ),
        {
          _id,
          createdAt: moment(createdAt).toLocaleString(),
          text,
          user,
        }
      );
    },
    [dispatch, chat.messages]
  );

  // const onLoadEarlier = useCallback(() => {
  //   console.log("loading");
  //   dispatch({ type: ACTION_TYPES.LOAD_EARLIER_START });
  //   setTimeout(() => {
  //     const newMessages = GiftedChat.prepend(
  //       chat.messages,
  //       earlierMessages() as IMessage[],
  //       Platform.OS !== "web"
  //     );

  //     dispatch({
  //       type: ACTION_TYPES.LOAD_EARLIER_MESSAGES,
  //       payload: newMessages,
  //     });
  //   }, 1500); // simulating network
  // }, [dispatch, chat.messages]);

  const parsePatterns = useCallback((_linkStyle: any) => {
    return [
      {
        pattern: /#(\w+)/,
        style: { textDecorationLine: "underline", color: "darkorange" },
        onPress: () => Linking.openURL("http://gifted.chat"),
      },
    ];
  }, []);

  const onLongPressAvatar = useCallback((pressedUser: any) => {
    Alert.alert(JSON.stringify(pressedUser));
  }, []);

  const onPressAvatar = useCallback(() => {
    Alert.alert("On avatar press");
  }, []);

  const onQuickReply = useCallback((replies: any[]) => {
    const createdAt = new Date();
    if (replies.length === 1) {
      onSend([
        {
          createdAt,
          _id: Math.round(Math.random() * 1000000),
          text: replies[0].title,
          giftedChatUser,
        },
      ]);
    } else if (replies.length > 1) {
      onSend([
        {
          createdAt,
          _id: Math.round(Math.random() * 1000000),
          text: replies.map((reply) => reply.title).join(", "),
          giftedChatUser,
        },
      ]);
    } else {
      console.warn("replies param is not set correctly");
    }
  }, []);

  const renderQuickReplySend = useCallback(() => {
    return <Text>{" custom send =>"}</Text>;
  }, []);

  const setIsTyping = useCallback(
    (isTyping: boolean) => {
      dispatch({ type: ACTION_TYPES.SET_IS_TYPING, payload: isTyping });
    },
    [dispatch]
  );

  const onSendFromUser = useCallback(
    (messages: IMessage[] = []) => {
      const createdAt = new Date();
      const messagesToUpload = messages.map((message) => ({
        ...message,
        giftedChatUser,
        createdAt,
        _id: Math.round(Math.random() * 1000000),
      }));

      onSend(messagesToUpload);
    },
    [onSend]
  );

  // const renderAccessory = useCallback(() => {
  //   return (
  //     <AccessoryBar
  //       onSend={onSendFromUser}
  //       isTyping={() => setIsTyping(true)}
  //     />
  //   );
  // }, [onSendFromUser, setIsTyping]);

  const renderCustomActions = useCallback(
    (props: any) =>
      Platform.OS === "web" ? null : (
        <CustomActions {...props} onSend={onSendFromUser} />
      ),
    [onSendFromUser]
  );

  const renderSystemMessage = useCallback(
    (
      props: React.JSX.IntrinsicAttributes &
        Pick<SystemMessageProps<IMessage>, keyof SystemMessageProps<IMessage>> &
        Pick<
          InferProps<{
            currentMessage: Requireable<object>;
            containerStyle: Requireable<number | boolean | object>;
            wrapperStyle: Requireable<number | boolean | object>;
            textStyle: Requireable<number | boolean | object>;
          }>,
          never
        > &
        Pick<SystemMessageProps<IMessage>, never>
    ) => {
      return (
        <SystemMessage
          {...props}
          containerStyle={{
            marginBottom: 15,
          }}
          textStyle={{
            fontSize: 14,
            fontFamily: themeContext?.typography.fontFamily.regular,
          }}
        />
      );
    },
    []
  );

  const renderCustomView = useCallback(
    (
      props: React.JSX.IntrinsicAttributes &
        React.JSX.IntrinsicClassAttributes<CustomView> &
        Pick<
          Pick<
            Readonly<{
              currentMessage: any;
              containerStyle: any;
              mapViewStyle: any;
            }>,
            never
          > &
            Pick<
              InferProps<{ currentMessage: Requireable<object> }>,
              "currentMessage"
            > &
            Pick<
              Readonly<{
                currentMessage: any;
                containerStyle: any;
                mapViewStyle: any;
              }>,
              "containerStyle" | "mapViewStyle"
            >,
          never
        > & {
          readonly containerStyle?: any;
          currentMessage?: object | null | undefined;
          readonly mapViewStyle?: any;
        } & {}
    ) => {
      return <CustomView {...props} />;
    },
    []
  );

  const renderSend = useCallback((props: SendProps<IMessage>) => {
    return (
      <Send {...props} containerStyle={{ justifyContent: "center" }}>
        <Iconify
          icon={"solar:plain-bold"}
          size={30}
          color={themeContext?.colors.primary}
        />
      </Send>
    );
  }, []);

  if (loading) return <LoadingView />;
  else if (!route.params?.chatId) return <EmptyState />;

  return (
    <Container>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flexGrow: 1 }}
      >
        <GiftedChat
          messages={chat.messages ?? []}
          onSend={onSend}
          loadEarlier={chat.loadEarlier}
          // onLoadEarlier={onLoadEarlier}
          isLoadingEarlier={chat.isLoadingEarlier}
          parsePatterns={parsePatterns}
          user={giftedChatUser}
          scrollToBottom
          onLongPressAvatar={onLongPressAvatar}
          onPressAvatar={onPressAvatar}
          onQuickReply={onQuickReply}
          quickReplyStyle={{ borderRadius: 2 }}
          quickReplyTextStyle={{
            fontWeight: "200",
          }}
          renderQuickReplySend={renderQuickReplySend}
          // renderAccessory={renderAccessory}
          renderActions={renderCustomActions}
          renderSystemMessage={renderSystemMessage}
          renderCustomView={renderCustomView}
          renderSend={renderSend}
          keyboardShouldPersistTaps="never"
          isTyping={chat.isTyping}
          // inverted={Platform.OS !== "web"}
          infiniteScroll
          placeholder="Type a message"
          renderLoading={() => <LoadingView />}
        />
      </KeyboardAvoidingView>
    </Container>
  );
};

export default Chat;

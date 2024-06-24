import { MaterialIcons } from "@expo/vector-icons";
import React, { useCallback, useContext, useEffect } from "react";
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
import AccessoryBar from "./AccessoryBar";
import CustomActions from "./CustomActions";
import CustomView from "./CustomView";
import { Container } from "./styles";
import { ThemeContext } from "styled-components/native";
import { InferProps, Requireable } from "prop-types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { firestoreDatabase } from "firebaseConfig";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { STORAGE_KEYS } from "~src/shared/constants";
import { useAppDispatch, useAppSelector } from "~store/hooks/useTypedRedux";
import ACTION_TYPES from "~store/actionTypes";

const Chat = ({ navigation, route }: NativeStackScreenProps<any>) => {
  const themeContext = useContext(ThemeContext);
  const { chatId } = route.params;
  const dispatch = useAppDispatch();
  const chat = useAppSelector((state) => state.chat);
  const currentUser = useAppSelector((state) => state.user);
  const giftedChatUser: GiftedChatUser = {
    _id: currentUser.id,
    name: currentUser.username,
  };

  useEffect(() => {
    const messagesRef = collection(
      firestoreDatabase,
      STORAGE_KEYS.CHATROOMS,
      chatId,
      STORAGE_KEYS.MESSAGES
    );
    const q = query(messagesRef, orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messages = querySnapshot.docs.map((doc) => ({
        _id: doc.data()._id,
        createdAt: doc.data().createdAt.toDate(),
        text: doc.data().text,
        user: doc.data().user,
      }));
      dispatch({ type: ACTION_TYPES.LOAD_EARLIER_MESSAGES, payload: messages });
    });

    return () => unsubscribe();
  }, [chatId]);

  const onSend = useCallback(
    (messages: any[]) => {
      const sentMessages = [{ ...messages[0], sent: true, received: true }];
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
          chatId,
          STORAGE_KEYS.MESSAGES
        ),
        {
          _id,
          createdAt,
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
    (props) =>
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
        <MaterialIcons size={30} color={"tomato"} name={"send"} />
      </Send>
    );
  }, []);

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
          timeTextStyle={{
            left: { color: "red" },
            right: { color: "yellow" },
          }}
          isTyping={chat.isTyping}
          inverted={Platform.OS !== "web"}
          infiniteScroll
        />
      </KeyboardAvoidingView>
    </Container>
  );
};

export default Chat;

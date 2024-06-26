import { UserForFirebase } from "~src/@types/types";
import { firestoreDatabase } from "firebaseConfig";
import { APP_PAGES, STORAGE_KEYS } from "~src/shared/constants";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { NavigationProp } from "@react-navigation/native";

export const generateChatId = (id1: number, id2: number) => {
  const sortedIds = [id1, id2].sort((a, b) => a - b);
  const uniqueId = sortedIds.join("");
  return uniqueId;
};

export const openChat = async (
  navigation: NavigationProp<any>,
  currentUser: UserForFirebase,
  userToChatWith: UserForFirebase
) => {
  const chatId = generateChatId(currentUser.id, userToChatWith.id);
  const chatRef = doc(firestoreDatabase, STORAGE_KEYS.CHATROOMS, chatId);
  const usersRef = collection(chatRef, STORAGE_KEYS.USERS);
  const messagesRef = collection(chatRef, STORAGE_KEYS.MESSAGES);

  // Check if the chat document already exists
  const chatDocSnap = await getDoc(chatRef);
  if (!chatDocSnap.exists()) {
    console.log("Heeee");
    // Create the chat document with subcollections
    await setDoc(chatRef, {
      // Add any chat-level properties here (optional)
    });

    // Add initial users to the chat (users collection)
    await setDoc(
      doc(
        firestoreDatabase,
        STORAGE_KEYS.CHATROOMS,
        chatId,
        STORAGE_KEYS.USERS,
        currentUser.id.toString()
      ),
      currentUser
    );
    await setDoc(
      doc(
        firestoreDatabase,
        STORAGE_KEYS.CHATROOMS,
        chatId,
        STORAGE_KEYS.USERS,
        userToChatWith.id.toString()
      ),
      userToChatWith
    );

    // Add an empty message to signal chat creation (optional)
    await setDoc(doc(messagesRef), {
      /* Empty message object */
    });
  } else {
    // Handle the case where the chat already exists (optional)
    console.log("Chat already exists.");
  }
  navigation.navigate(APP_PAGES.CHAT, { chatId });
};

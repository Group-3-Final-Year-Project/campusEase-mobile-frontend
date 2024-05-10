import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { APP_PAGES } from "../shared/constants";
import Home from "../screens/Home/Home";
import { Iconify } from "react-native-iconify";
import { theme } from "../shared/theme";
import Explore from "../screens/Explore/Explore";
import Bookmarks from "../screens/Bookmarks/Bookmarks";
import Chats from "../screens/Chats/Chats";
import Profile from "../screens/Profile/Profile";
import Tabbar from "../components/Tabbar";
import { Keyboard } from "react-native";

const UserTabNavigator = () => {
  const [keyboardVisible, setKeyboardVisible] = React.useState(false);

  React.useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () =>
      setKeyboardVisible(true)
    );
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () =>
      setKeyboardVisible(false)
    );

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const Tab = createBottomTabNavigator();

  const tabs = [
    {
      name: APP_PAGES.HOME,
      label: APP_PAGES.HOME,
      component: Home,
      activeIconName: (
        <Iconify
          icon="solar:home-smile-angle-outline"
          size={24}
          color={theme.BACKGROUND}
          strokeWidth={24}
        />
      ),
      inactiveIconName: (
        <Iconify
          icon="solar:home-smile-angle-outline"
          size={24}
          color={theme.ACCENT}
          strokeWidth={24}
        />
      ),
    },
    {
      name: APP_PAGES.EXPLORE,
      label: APP_PAGES.EXPLORE,
      component: Explore,
      activeIconName: (
        <Iconify
          icon="solar:map-point-outline"
          size={24}
          color={theme.BACKGROUND}
          strokeWidth={24}
        />
      ),
      inactiveIconName: (
        <Iconify
          icon="solar:map-point-outline"
          size={24}
          color={theme.ACCENT}
          strokeWidth={24}
        />
      ),
    },
    {
      name: APP_PAGES.BOOKMARKS,
      label: APP_PAGES.BOOKMARKS,
      component: Bookmarks,
      activeIconName: (
        <Iconify
          icon="solar:documents-minimalistic-outline"
          size={24}
          color={theme.BACKGROUND}
          strokeWidth={24}
        />
      ),
      inactiveIconName: (
        <Iconify
          icon="solar:documents-minimalistic-outline"
          size={24}
          color={theme.ACCENT}
          strokeWidth={24}
        />
      ),
    },
    {
      name: APP_PAGES.CHATS,
      label: APP_PAGES.CHATS,
      component: Chats,
      activeIconName: (
        <Iconify
          icon="solar:chat-round-line-outline"
          size={24}
          color={theme.BACKGROUND}
          strokeWidth={24}
        />
      ),
      inactiveIconName: (
        <Iconify
          icon="solar:chat-round-line-outline"
          size={24}
          color={theme.ACCENT}
          strokeWidth={24}
        />
      ),
    },

    {
      name: APP_PAGES.PROFILE,
      label: APP_PAGES.PROFILE,
      component: Profile,
      activeIconName: (
        <Iconify
          icon="solar:user-rounded-outline"
          size={24}
          color={theme.BACKGROUND}
          strokeWidth={24}
        />
      ),
      inactiveIconName: (
        <Iconify
          icon="solar:user-rounded-outline"
          size={24}
          color={theme.ACCENT}
          strokeWidth={24}
        />
      ),
    },
  ];

  return (
    <Tab.Navigator
      tabBar={(props) => {
        return keyboardVisible ? null : <Tabbar {...props} />;
      }}
      initialRouteName={APP_PAGES.HOME}
      sceneContainerStyle={{
        backgroundColor: `${theme.BACKGROUND}`,
      }}
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShadowVisible: true,
        tabBarAllowFontScaling: true,
        headerTitleAlign: "center",
        headerShown: true,
        headerTitleStyle: {
          fontFamily: "Urbanist_700Bold",
        },
        headerStyle: {
          backgroundColor: `${theme.BACKGROUND}`,
          shadowColor: `${theme.ACCENT}`,
          borderBottomLeftRadius: 14,
          borderBottomRightRadius: 14,
        },
      }}
    >
      {tabs.map((_, index) => {
        return (
          <Tab.Screen
            key={index + _.name}
            name={_.name}
            component={_.component}
            options={{
              tabBarLabel: _.label,
              tabBarActiveIcon: _.activeIconName,
              tabBarInactiveIcon: _.inactiveIconName,
              headerTitle: _.label,
              headerShown: _.name != APP_PAGES.EXPLORE,
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
};
export default UserTabNavigator;

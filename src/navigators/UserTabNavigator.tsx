import React, { useContext } from "react";
import {
  createBottomTabNavigator,
  BottomTabBarProps,
} from "@react-navigation/bottom-tabs";
import { Keyboard } from "react-native";
import { ThemeContext } from "styled-components/native";
import { APP_PAGES } from "~src/shared/constants";
import Home from "~src/screens/Home";
import { Iconify } from "react-native-iconify";
import Explore from "~src/screens/Explore";
import Bookmarks from "~src/screens/Bookmarks";
import Chats from "~src/screens/Chats";
import Profile from "~src/screens/Profile";
import { TabBar } from "~components";
import Analytics from "~src/screens/Analytics";
import { useNavigationBar } from "~hooks";

const UserTabNavigator = () => {
  const [keyboardVisible, setKeyboardVisible] = React.useState(false);
  const [isServiceProvider, setIsServiceProvider] = React.useState(true);

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

  const theme = useContext(ThemeContext);
  useNavigationBar(false, theme?.colors.secondaryBackground);

  const ServiceProviderTabItems = [
    {
      name: APP_PAGES.ANALYTICS,
      label: APP_PAGES.ANALYTICS,
      component: Analytics,
      activeIconName: (
        <Iconify
          icon="solar:graph-up-bold"
          size={24}
          color={theme?.colors.primary}
          strokeWidth={10}
        />
      ),
      inactiveIconName: (
        <Iconify
          icon="solar:graph-up-outline"
          size={24}
          color={theme?.colors.secondaryText}
          strokeWidth={10}
        />
      ),
    },
    {
      name: APP_PAGES.BOOKINGS,
      label: APP_PAGES.BOOKINGS,
      component: Explore,
      activeIconName: (
        <Iconify
          icon="solar:cart-large-bold"
          size={24}
          color={theme?.colors.primary}
          strokeWidth={10}
        />
      ),
      inactiveIconName: (
        <Iconify
          icon="solar:cart-large-outline"
          size={24}
          color={theme?.colors.secondaryText}
          strokeWidth={10}
        />
      ),
    },
  ];

  const UserTabItems = [
    {
      name: APP_PAGES.EXPLORE,
      label: APP_PAGES.EXPLORE,
      component: Explore,
      activeIconName: (
        <Iconify
          icon="solar:map-point-bold"
          size={24}
          color={theme?.colors.primary}
          strokeWidth={10}
        />
      ),
      inactiveIconName: (
        <Iconify
          icon="solar:map-point-outline"
          size={24}
          color={theme?.colors.secondaryText}
          strokeWidth={10}
        />
      ),
    },
    {
      name: APP_PAGES.BOOKMARKS,
      label: APP_PAGES.BOOKMARKS,
      component: Bookmarks,
      activeIconName: (
        <Iconify
          icon="solar:documents-minimalistic-bold"
          size={24}
          color={theme?.colors.primary}
          strokeWidth={10}
        />
      ),
      inactiveIconName: (
        <Iconify
          icon="solar:documents-minimalistic-outline"
          size={24}
          color={theme?.colors.secondaryText}
          strokeWidth={10}
        />
      ),
    },
  ];

  const dynamicTabs = isServiceProvider
    ? ServiceProviderTabItems
    : UserTabItems;

  const tabs = [
    {
      name: APP_PAGES.HOME,
      label: APP_PAGES.HOME,
      component: Home,
      activeIconName: (
        <Iconify
          icon="solar:home-smile-angle-bold"
          size={24}
          color={theme?.colors.primary}
          strokeWidth={10}
        />
      ),
      inactiveIconName: (
        <Iconify
          icon="solar:home-smile-angle-outline"
          size={24}
          color={theme?.colors.secondaryText}
          strokeWidth={10}
        />
      ),
    },
    ...dynamicTabs,

    {
      name: APP_PAGES.CHATS,
      label: APP_PAGES.CHATS,
      component: Chats,
      activeIconName: (
        <Iconify
          icon="solar:chat-round-line-bold"
          size={24}
          color={theme?.colors.primary}
          strokeWidth={10}
        />
      ),
      inactiveIconName: (
        <Iconify
          icon="solar:chat-round-line-outline"
          size={24}
          color={theme?.colors.secondaryText}
          strokeWidth={10}
        />
      ),
    },
    {
      name: APP_PAGES.PROFILE,
      label: APP_PAGES.PROFILE,
      component: Profile,
      activeIconName: (
        <Iconify
          icon="solar:user-rounded-bold"
          size={24}
          color={theme?.colors.primary}
          strokeWidth={10}
        />
      ),
      inactiveIconName: (
        <Iconify
          icon="solar:user-rounded-outline"
          size={24}
          color={theme?.colors.secondaryText}
          strokeWidth={10}
        />
      ),
    },
  ];

  return (
    <Tab.Navigator
      tabBar={(props: BottomTabBarProps) => {
        return keyboardVisible ? null : <TabBar {...props} />;
      }}
      initialRouteName={APP_PAGES.HOME}
      sceneContainerStyle={{
        backgroundColor: `${theme?.colors.background}`,
      }}
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarAllowFontScaling: true,
        headerShown: true,
        headerShadowVisible: false,
        headerTitleStyle: {
          fontFamily: `${theme?.typography.fontFamily.extraBold}`,
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
              // @ts-ignore
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
import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Keyboard } from "react-native";
import { ThemeContext } from "styled-components/native";

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

  const theme = useContext(ThemeContext);
  const tabs = [
    {
      name: APP_PAGES.HOME,
      label: APP_PAGES.HOME,
      component: Home,
      activeIconName: (
        <Iconify
          icon="solar:home-smile-angle-outline"
          size={24}
          color={theme.PRIMARY_COLOR}
          strokeWidth={24}
        />
      ),
      inactiveIconName: (
        <Iconify
          icon="solar:home-smile-angle-outline"
          size={24}
          color={theme.FOREGROUND3}
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
          color={theme.PRIMARY_COLOR}
          strokeWidth={24}
        />
      ),
      inactiveIconName: (
        <Iconify
          icon="solar:map-point-outline"
          size={24}
          color={theme.FOREGROUND3}
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
          color={theme.PRIMARY_COLOR}
          strokeWidth={24}
        />
      ),
      inactiveIconName: (
        <Iconify
          icon="solar:documents-minimalistic-outline"
          size={24}
          color={theme.FOREGROUND3}
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
          color={theme.PRIMARY_COLOR}
          strokeWidth={24}
        />
      ),
      inactiveIconName: (
        <Iconify
          icon="solar:chat-round-line-outline"
          size={24}
          color={theme.FOREGROUND3}
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
          color={theme.PRIMARY_COLOR}
          strokeWidth={24}
        />
      ),
      inactiveIconName: (
        <Iconify
          icon="solar:user-rounded-outline"
          size={24}
          color={theme.FOREGROUND3}
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
        backgroundColor: `${theme?.colors.background}`,
      }}
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarAllowFontScaling: true,
        headerShown: true,
        headerTitleStyle: {
          fontFamily: "Urbanist_700Bold",
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

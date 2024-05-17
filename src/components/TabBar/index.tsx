import React, { useContext } from "react";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { ThemeContext } from "styled-components/native";

const TabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  const theme = useContext(ThemeContext);
  return (
    <Box
      w="$full"
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      // height="32"
      backgroundColor={theme?.colors.background}
      softShadow={"2"}
      borderTopLeftRadius={10}
      borderTopRightRadius={10}
      style={{ height: 70 }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel || route.name;
        const activeIconName = options.tabBarActiveIcon;
        const inactiveIconName = options.tabBarInactiveIcon;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <Pressable
            key={`${index}--${route.key}`}
            android_ripple={{ color: "", borderless: false, foreground: true }}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            flex={1}
            alignItems={"center"}
            justifyContent={"center"}
            h="$full"
            w="$full"
          >
            <Box
              paddingHorizontal={14}
              paddingVertical={14}
              w="$full"
              h="$full"
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <VStack
                w="$full"
                h="$full"
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
              >
                {/* <Icon
                as={Ionicons}
                name={isFocused ? activeIconName : inactiveIconName}
                size={"md"}
                color={isFocused ? "white" : "coolGray.400"}
              /> */}
                {isFocused ? activeIconName : inactiveIconName}
                <Heading
                  fontSize={10}
                  color={
                    isFocused
                      ? `${theme?.colors.primary}`
                      : `${theme?.colors.text}`
                  }
                  fontFamily={"Urbanist_400Regular"}
                >
                  {label}
                </Heading>
              </VStack>
            </Box>
          </Pressable>
        );
      })}
    </Box>
  );
};

export default TabBar;

import React from "react";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Container, TabItem, TabItemContainer, TabItemLabel } from "./styles";

const TabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  return (
    <Container>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel || route.name;
        // @ts-ignore
        const activeIconName = options.tabBarActiveIcon;
        // @ts-ignore
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
          <TabItem
            key={`${index}--${route.key}`}
            android_ripple={{ color: "", borderless: false, foreground: true }}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
          >
            <TabItemContainer>
              {isFocused ? activeIconName : inactiveIconName}
              <TabItemLabel isFocused={isFocused}>{label}</TabItemLabel>
            </TabItemContainer>
          </TabItem>
        );
      })}
    </Container>
  );
};

export default TabBar;

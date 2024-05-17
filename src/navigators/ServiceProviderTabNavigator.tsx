import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "~src/screens/Home";
import { APP_PAGES } from "~src/shared/constants";

const ServiceProviderTabNavigator = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator>
      <Tab.Screen name={APP_PAGES.HOME} component={Home} />
    </Tab.Navigator>
  );
};
export default ServiceProviderTabNavigator;

import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { APP_PAGES } from "../shared/constants";
import Home from "../screens/Home/Home";
const ServiceProviderTabNavigator = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator>
      <Tab.Screen name={APP_PAGES.HOME} component={Home} />
    </Tab.Navigator>
  );
};
export default ServiceProviderTabNavigator;

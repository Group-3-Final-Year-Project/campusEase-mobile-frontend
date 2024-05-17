import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const ServiceProviderTabNavigator = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator>
      <Tab.Screen name={APP_PAGES.HOME} component={Home} />
    </Tab.Navigator>
  );
};
export default ServiceProviderTabNavigator;

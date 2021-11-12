import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen } from "../screens/home";
import { Tracker } from "../screens/tracker";
import * as React from "react";
import { Icon } from "react-native-elements/dist/icons/Icon";

const Tab = createBottomTabNavigator();

const tabBarIcon = (
  iconName: string,
  iconProps: {
    focused: boolean;
    color: string;
    size: number;
  }
) => {
  switch (iconName) {
    case "home":
      return (
        <Icon
          size={iconProps.size}
          name="home"
          type="font-awesome"
          color={iconProps.color}
        />
      );
    case "tracker":
      return (
        <Icon
          size={iconProps.size}
          name="sticky-note"
          type="font-awesome"
          color={iconProps.color}
        />
      );
    default:
      return (
        <Icon
          size={iconProps.size}
          name="arrow-left"
          type="font-awesome"
          color="black"
        />
      );
  }
};

export const TabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: [{ display: "flex", backgroundColor: "#fd4f57" }, null],
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "lightgrey",
      }}
    >
      <Tab.Screen
        options={{
          tabBarIcon: (props) => tabBarIcon("home", { ...props, size: 24 }),
        }}
        name="Home"
        component={HomeScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: (props) => tabBarIcon("tracker", { ...props, size: 24 }),
        }}
        name="Tracker"
        component={Tracker}
      />
    </Tab.Navigator>
  );
};

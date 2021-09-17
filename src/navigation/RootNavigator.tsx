import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { HomeScreen } from "../screens/home";
import { ROTD } from "../screens/rotd";

const RootStack = createStackNavigator();

export const RootNavigator: React.FC = () => {
  return (
    <RootStack.Navigator
      screenOptions={{ headerShown: true }}
      initialRouteName={"Home"}
    >
      <RootStack.Screen
        name={"Home"}
        component={HomeScreen}
        options={{
          title: "",
          headerStyle: {
            backgroundColor: "#fd4f57",
          },
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 20,
          },
          headerShown: false,
        }}
      />
      <RootStack.Screen
        name={"ROTD"}
        component={ROTD}
        options={{
          title: "",
          headerStyle: {
            backgroundColor: "#fd4f57",
          },
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 20,
          },
        }}
      />
    </RootStack.Navigator>
  );
};

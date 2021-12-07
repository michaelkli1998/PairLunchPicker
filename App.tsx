import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { RootNavigator } from "./src/navigation/RootNavigator";
import { storeData } from "./src/core/api/helpers";
import { getCurrentDate } from "./src/core/api/yelp";
import { TabNavigator } from "./src/navigation/BottomTabNavigator";
import SystemNavigationBar from "react-native-system-navigation-bar";

SystemNavigationBar.navigationHide();

export default function App() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

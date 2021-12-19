import React, { FC, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  LogBox,
  SafeAreaView,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import CountDown from "react-native-countdown-component";
import { useToggle } from "../home/helpers";

LogBox.ignoreLogs(["EventEmitter.removeListener('appStateDidChange', ...):"]); // Ignore log notification by message

//@ts-ignore
export const AtomicPeopleView: FC = ({ route }) => {
  const [ableToSchedule, toggleAbleToSchedule] = useToggle(false);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={{ alignItems: "center" }}
      >
        <View style={styles.imageContainer}>
          <Image
            style={styles.imageStyle}
            source={require("../../images/atom_portraits/Li-Michael.jpg")}
          ></Image>
          <Text style={styles.headerText}>Michael Li</Text>
          {ableToSchedule ? (
            <TouchableOpacity>
              <Text style={styles.subText}>Schedule a Pair Lunch</Text>
            </TouchableOpacity>
          ) : (
            <Text style={styles.subText}>Schedule a pair lunch in:</Text>
          )}
          <CountDown
            until={10000}
            onFinish={() => toggleAbleToSchedule}
            size={20}
            digitStyle={{ backgroundColor: "#fd4f57" }}
          />
        </View>
        <View style={styles.pastLunchesContainer}>
          <Text style={styles.pastLunchText}>Past Lunches</Text>
          <Text>
            You have no lunches with this atom. Please schedule one :)
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  imageStyle: {
    width: 250,
    height: 250,
    borderRadius: 250 / 2,
    borderWidth: 5,
    borderColor: "white",
  },
  scrollContainer: {
    width: "100%",
    paddingTop: 15,
    paddingBottom: 15,
    borderBottomWidth: 2,
    borderBottomColor: "white",
    backgroundColor: "white",
    paddingHorizontal: 10,
  },
  imageContainer: {
    alignItems: "center",
    backgroundColor: "#E5E5E5",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    width: "100%",
  },
  pastLunchesContainer: {
    alignItems: "center",
    backgroundColor: "#E5E5E5",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    width: "100%",
    marginTop: 15,
  },
  headerText: {
    fontSize: 32,
    fontWeight: "bold",
    marginTop: 5,
  },
  pastLunchText: {
    fontSize: 18,
    fontWeight: "400",
    marginBottom: 10,
  },
  subText: {
    fontSize: 18,
    color: "#fd4f57",
    marginTop: 3,
    marginBottom: 10,
  },
});

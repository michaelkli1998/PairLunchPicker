import React, { FC, useCallback, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  LogBox,
  SafeAreaView,
  FlatList,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import CountDown from "react-native-countdown-component";
import { useToggle } from "../home/helpers";
import { atomic_people_urls } from "../tracker/people_list";
import {
  getDBConnection,
  getPairLunch,
  getPairLunches,
} from "../../core/storage/db-service";

LogBox.ignoreLogs(["EventEmitter.removeListener('appStateDidChange', ...):"]); // Ignore log notification by message

//@ts-ignore
export const AtomicPeopleView: FC = ({ route }) => {
  const [ableToSchedule, toggleAbleToSchedule] = useToggle(false);
  const [pairLunch, setPairLunch] = useState(null);

  if (route.params === undefined) {
    return null;
  }

  const atom_name = route.params.name;

  const loadDataCallback = useCallback(async () => {
    try {
      const db = await getDBConnection();
      const storedPairLunches = await getPairLunch(db, atom_name);
      setPairLunch(storedPairLunches);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    loadDataCallback();
  }, []);

  const renderCard = ({ item }) => {
    return (
      <View style={{ marginVertical: 5 }}>
        <Text style={{ fontWeight: "bold", fontSize: 16 }}>
          {item.restaurant}
        </Text>
        <Text>{item.date}</Text>
      </View>
    );
  };

  if (pairLunch === null) {
    return null;
  }
  console.log(pairLunch);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollContainer}
        // contentContainerStyle={{ alignItems: "center" }}
      >
        <View style={styles.imageContainer}>
          <Image
            style={styles.imageStyle}
            source={atomic_people_urls[0][atom_name]}
          ></Image>
          <Text style={styles.headerText}>{atom_name}</Text>
          {ableToSchedule ? (
            <TouchableOpacity>
              <Text style={styles.subText}>Schedule a Pair Lunch</Text>
            </TouchableOpacity>
          ) : (
            <>
              <Text style={styles.subText}>Schedule a pair lunch in:</Text>
              <CountDown
                until={10}
                onFinish={() => {
                  toggleAbleToSchedule();
                }}
                size={20}
                digitStyle={{ backgroundColor: "#fd4f57" }}
              />
            </>
          )}
        </View>
        <View style={styles.pastLunchesContainer}>
          <Text style={styles.pastLunchText}>Past Lunches</Text>
          <View
            style={{
              alignContent: "flex-start",
              width: "100%",
              paddingHorizontal: 5,
            }}
          >
            {pairLunch.map((lunch, index) => (
              <View style={{ marginVertical: 5 }}>
                <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                  {lunch.restaurant}
                </Text>
                <Text>{lunch.date}</Text>
              </View>
            ))}
            {pairLunch.length === 0 && (
              <Text>
                You have no lunches with this atom. Please schedule one :)
              </Text>
            )}
          </View>
        </View>
        <View style={{ height: 50 }} />
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

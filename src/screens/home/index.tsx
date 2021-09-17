import { useNavigation } from "@react-navigation/core";
import React, { FC, useState } from "react";
import {
  Dimensions,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Colors } from "react-native/Libraries/NewAppScreen";
import Carousel from "react-native-snap-carousel";
import { Yelp } from "../../core/api/yelp";
import { YelpCarousel } from "../../core/api/yelp-carousel";
import { Searchbar } from "react-native-paper";
import { YelpSearchFilter } from "../../core/api/yelp-search-filter";

export const HomeScreen: FC = () => {
  const navigation = useNavigation();
  const backgroundStyle = {
    backgroundColor: "#fd4f57",
  };
  const SLIDER_WIDTH = Dimensions.get("window").width;
  const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.8);
  const ITEM_HEIGHT = Math.round((ITEM_WIDTH * 3) / 4);
  const [location, setLocation] = useState("Ann Arbor");

  return (
    <SafeAreaView style={backgroundStyle}>
      <View style={styles.contentView}>
        <View style={styles.locationContainer}>
          <Text style={styles.locationTitle}>Location: {location}</Text>
        </View>
        <ScrollView style={styles.scrollContainer}>
          <YelpSearchFilter />
          <Text style={styles.title}>Restaurant of The Day</Text>
          <View style={styles.scrollContentContainer}>
            <View style={styles.sectionContainer}>
              <Yelp />
            </View>
          </View>
          <Text style={styles.title}>Random Restaurant</Text>
          <YelpCarousel />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const SLIDER_WIDTH = Dimensions.get("window").width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.9);
const ITEM_HEIGHT = Math.round((ITEM_WIDTH * 3) / 4);
const styles = StyleSheet.create({
  scrollContainer: {
    height: "100%",
    backgroundColor: "#E0E0E0",
  },
  scrollContentContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  sectionContainer: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#F5F5F5",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
  },
  locationContainer: {
    backgroundColor: "#fd4f57",
    borderBottomWidth: 0.2,
    borderBottomColor: "grey",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
  },
  itemContainer: {
    height: ITEM_HEIGHT,
    marginLeft: -(SLIDER_WIDTH - ITEM_WIDTH - (SLIDER_WIDTH - ITEM_WIDTH) / 2),
    marginRight: SLIDER_WIDTH - ITEM_WIDTH - (SLIDER_WIDTH - ITEM_WIDTH) / 2,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#F5F5F5",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
    backgroundColor: "#fd4f57",
    padding: 10,
    textAlign: "center",
  },
  sectionDescription: {
    fontSize: 25,
    fontWeight: "500",
    textAlign: "center",
    color: "white",
  },
  title: {
    fontSize: 18,
    fontWeight: "500",
    textAlign: "left",
    marginLeft: SLIDER_WIDTH - ITEM_WIDTH - (SLIDER_WIDTH - ITEM_WIDTH) / 2,
    color: "black",
    marginTop: 15,
    marginBottom: 5,
  },
  titleBot: {
    fontSize: 10,
    fontWeight: "500",
    textAlign: "center",
    color: "black",
    marginTop: 20,
  },
  locationTitle: {
    fontSize: 18,
    fontWeight: "500",
    textAlign: "center",
    color: "black",
    paddingVertical: 10,
  },
  contentView: {
    borderTopColor: "#4c4845",
    justifyContent: "center",
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  rotdContainer: {
    backgroundColor: "black",
    justifyContent: "center",
    borderBottomColor: "#C0C0C0",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    flex: 1,
    marginVertical: 0,
  },
  searchContainer: {
    backgroundColor: "black",
    justifyContent: "center",
    borderBottomColor: "#C0C0C0",
    borderTopColor: "#C0C0C0",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    marginBottom: 0,
    flex: 1,
  },
  randomContainer: {
    backgroundColor: "black",
    justifyContent: "center",
    borderTopColor: "#C0C0C0",
    marginBottom: 0,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    flex: 1,
  },
  highlight: {
    fontWeight: "700",
  },
});

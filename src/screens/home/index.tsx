import { useNavigation } from "@react-navigation/core";
import React, { FC, useState } from "react";
import {
  Dimensions,
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Icon } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import Modal from "react-native-modal";
import SegmentedControlTab from "react-native-segmented-control-tab";
import { Yelp } from "../../core/api/yelp";
import { YelpCarousel } from "../../core/api/yelp-carousel";
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

  const [isModalVisible, setModalVisible] = useState(false);

  const [selectedIndex, setSelectedIndex] = useState(0);

  const cities = ["Ann Arbor", "Grand Rapids", "Chicago"];

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
    Keyboard.dismiss();
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <View style={styles.contentView}>
        <View style={styles.locationContainer}>
          <TouchableOpacity onPress={toggleModal}>
            <View style={styles.changeLocationContainer}>
              <Text style={styles.locationTitle}>Location: {location}</Text>
              <Icon
                size={20}
                name="caret-down"
                type="font-awesome"
                color="black"
              />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.searchContainer}>
          <YelpSearchFilter location={location} />
        </View>
        <ScrollView style={styles.bottomModal}>
          <View style={styles.pickOuter}>
            <View style={styles.pickContainer}>
              <Text style={styles.title}>Our Pick</Text>
              <View style={styles.scrollContentContainer}>
                <View style={styles.sectionContainer}>
                  <Yelp location={location} />
                </View>
              </View>
            </View>
          </View>
          <View style={styles.randomOuter}>
            <View style={styles.randomContainer}>
              <Text style={styles.title}>Random Restaurant</Text>
              <YelpCarousel location={location} />
              <View style={{ height: 100 }} />
            </View>
          </View>
        </ScrollView>
      </View>
      <Modal
        testID={"modal"}
        isVisible={isModalVisible}
        onBackdropPress={toggleModal}
        onBackButtonPress={toggleModal}
        style={styles.view}
        backdropOpacity={0.3}
      >
        <View style={styles.content}>
          <Icon
            size={30}
            name="map"
            type="font-awesome"
            color="#fd4f57"
            style={{ marginBottom: 10 }}
          />
          <Text style={styles.contentTitle}>Choose a location</Text>
          <SegmentedControlTab
            values={cities}
            selectedIndex={selectedIndex}
            onTabPress={setSelectedIndex}
            tabStyle={{ borderColor: "#fd4f57", borderWidth: 2 }}
            tabsContainerStyle={{ height: 40 }}
            activeTabStyle={{ backgroundColor: "#fd4f57" }}
            tabTextStyle={{ color: "#fd4f57", fontWeight: "bold" }}
          />
          <TouchableOpacity
            onPress={() => {
              toggleModal();
              setLocation(cities[selectedIndex]);
            }}
          >
            <Text style={styles.applyButton}>Apply</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const SLIDER_WIDTH = Dimensions.get("window").width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.9);
const ITEM_HEIGHT = Math.round((ITEM_WIDTH * 3) / 4);
const styles = StyleSheet.create({
  content: {
    backgroundColor: "white",
    padding: 22,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
  contentTitle: {
    fontSize: 20,
    marginBottom: 12,
  },
  contentText: {
    fontSize: 16,
    marginBottom: 12,
  },
  applyButton: {
    color: "#fd4f57",
    fontWeight: "bold",
    fontSize: 18,
    marginVertical: 10,
  },
  view: {
    justifyContent: "flex-end",
    margin: 0,
  },
  randomContainer: {
    backgroundColor: "white",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  randomOuter: {
    backgroundColor: "#E7E7E7",
  },
  pickContainer: {
    backgroundColor: "#E7E7E7",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  pickOuter: {
    backgroundColor: "#fd4f57",
  },
  bottomModal: {
    marginBottom: 50,
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
    marginTop: 10,
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
    paddingHorizontal: 10,
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
    backgroundColor: "#fd4f57",
  },
  highlight: {
    fontWeight: "700",
  },
  changeLocationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

import { useNavigation } from "@react-navigation/core";
import React, { FC, useState } from "react";
import {
  Dimensions,
  Keyboard,
  SafeAreaView,
  StatusBar,
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
import { YelpCarouselCheapEats } from "../../core/api/yelp-carousel-cheap-eats";
import { YelpCarouselDiscover } from "../../core/api/yelp-carousel-discover";
import { YelpCarouselHot } from "../../core/api/yelp-carousel-hot";
import { YelpCarouselNearMe } from "../../core/api/yelp-carousel-near-me";
import { YelpSearchFilter } from "../../core/api/yelp-search-filter";
import SystemNavigationBar from "react-native-system-navigation-bar";
import realm from "../../core/storage/realm";

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

  const [isOpenClosed, setIsOpenClosed] = useState(0);

  const [selectedIndex, setSelectedIndex] = useState(0);

  const [value, setValue] = useState(true);

  const cities = ["Ann Arbor", "Grand Rapids", "Chicago"];

  const openClosedOptions = ["All", "Open Only"];

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
    Keyboard.dismiss();
  };

  SystemNavigationBar.setNavigationColor("#fd4f57");

  // const toggleOpenClosed = () => {
  //   setIsOpenClosed(!isOpenClosed);
  // };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar animated={true} backgroundColor="#fd4f57" />
      <View style={styles.contentView}>
        <View style={styles.locationContainer}>
          <View style={styles.changeLocationContainer}>
            <TouchableOpacity
              onPress={toggleModal}
              style={styles.changeLocationText}
            >
              <Icon
                size={22}
                name="map-marker"
                type="font-awesome"
                color="black"
                style={{ marginRight: 10 }}
              />
              <Text style={styles.locationTitle}>Location: {location}</Text>
              <Icon
                size={20}
                name="caret-down"
                type="font-awesome"
                color="black"
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.searchContainer}>
          <YelpSearchFilter location={location} />
        </View>
        <ScrollView style={styles.bottomModal}>
          <Text style={styles.title}>Our Pick</Text>
          <View style={styles.scrollContentContainer}>
            <Yelp location={location} />
          </View>
          <View
            style={{
              height: 6,
              marginTop: 10,
              backgroundColor: "#F0F0F0",
            }}
          />
          <Text style={styles.title}>Discover Restaurants</Text>
          <YelpCarouselDiscover location={location} />
          <View
            style={{
              height: 6,
              marginTop: 15,
              backgroundColor: "#F0F0F0",
            }}
          />
          <Text style={styles.title}>Restaurants Near Me</Text>
          <YelpCarouselNearMe location={location} />
          <View
            style={{
              height: 6,
              marginTop: 15,
              backgroundColor: "#F0F0F0",
            }}
          />
          <Text style={styles.title}>Cheap Eats</Text>
          <YelpCarouselCheapEats location={location} />
          <View
            style={{
              height: 6,
              marginTop: 15,
              backgroundColor: "#F0F0F0",
            }}
          />
          <Text style={styles.title}>Highly Rated</Text>
          <YelpCarouselHot location={location} />
          <View style={{ height: 100 }} />
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
            style={styles.checkButton}
          >
            <Icon size={32} name="check" type="font-awesome" color="white" />
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
    backgroundColor: "white",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  pickOuter: {
    backgroundColor: "#fd4f57",
  },
  bottomModal: {
    marginBottom: 50,
    backgroundColor: "white",
  },
  scrollContentContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    marginHorizontal: 15,
  },
  sectionContainer: {
    width: "100%",
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
    marginLeft: 15,
    color: "black",
    marginTop: 10,
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
    paddingVertical: 5,
    paddingRight: 10,
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
  changeLocationText: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  checkButton: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    backgroundColor: "#fd4f57",
    width: 100,
    height: 50,
    borderRadius: 50 / 2,
    justifyContent: "center",
    margin: 15,
  },
  addButton: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    backgroundColor: "#fd4f57",
    width: 50,
    height: 50,
    margin: 10,
    borderRadius: 50 / 2,
    justifyContent: "center",
    position: "absolute",
    bottom: 50,
    right: 0,
  },
});

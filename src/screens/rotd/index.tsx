import { useNavigation } from "@react-navigation/core";
import axios from "axios";
import React, { FC, useEffect, useState } from "react";
import {
  Dimensions,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { Button } from "react-native-paper";
import { yelpBusinessResponse } from "../../types";
import { Icon } from "react-native-elements";

const config = {
  headers: {
    Authorization:
      "Bearer eu70nmGiCTtxJgzg5h3uL1M3rXa3YTsCpz92As8TQw4B5CJ7A0T37rnZ1n84OEvPgGZNNJi9BuYcjH1wj0Vql0P08jsYBEUjkjK0KPVDXUM4veb3jrZzSVwkQ9r4YHYx",
  },
  params: {
    term: "Restaurants",
    location: "206 S 5th Ave #300, Ann Arbor, MI 48104",
  },
};

var now = new Date();

const dayPlusOne = (day: number) => {
  if (day === 0) {
    return 6;
  }
  return day - 1;
};

const getTodayOrTomorrow = () => {
  if (now.getHours() > 12) {
    return "tomorrow";
  }
  return "today";
};

const addColonToTime = (time: string) => {
  if (parseInt(time.substring(0, 2)) > 12) {
    return (
      (parseInt(time.substring(0, 2)) - 12).toString() +
      ":" +
      time.substring(2) +
      "pm"
    );
  } else if (parseInt(time.substring(0, 2)) === 12) {
    return (
      parseInt(time.substring(0, 2)).toString() + ":" + time.substring(2) + "pm"
    );
  }
  if (time.substring(0,2) === "00") {
    return "12:00am";
  }
  if (time.substring(0, 1) === "0") {
    return time.substring(1, 2) + ":" + time.substring(2) + "am";
  }
  return time.substring(0, 2) + ":" + time.substring(2) + "am";
};

//@ts-ignore
export const ROTD: FC = ({ route }) => {
  const [restaurant, setRestaurants] = useState([]);
  useEffect(() => {
    axios
      .get("https://api.yelp.com/v3/businesses/" + route.params.id, config)
      .then((response) => {
        setRestaurants(response.data);
      });
  }, []);

  const business: yelpBusinessResponse =
    restaurant as unknown as yelpBusinessResponse;

  console.log(business.is_closed);

  return (
    <SafeAreaView>
      <View style={styles.contentView}>
        <View style={styles.bottomModal}>
          <ImageBackground
            imageStyle={styles.imageStyle}
            style={styles.itemContainer}
            source={{ uri: business.image_url }}
          ></ImageBackground>
          <View style={styles.modalUp}>
            <Text style={styles.titleName}>{business.name}</Text>
            <View style={styles.flexRowContainer}>
              <Text style={styles.titleLeftSmall}>★ {business.rating}/5</Text>
              <Text style={styles.titleLeftSmall}>
                ({business.review_count} reviews)
              </Text>
              {business.price && (
                <>
                  <Text style={styles.titleLeftSmall}>•</Text>
                  <Text style={styles.titleLeftSmall}>{business.price}</Text>
                </>
              )}
              {business.categories && (
                <>
                  <Text style={styles.titleLeftSmall}>•</Text>
                  <Text style={styles.titleLeftSmall}>
                    {business.categories[0].title}
                  </Text>
                </>
              )}
            </View>
            {business.hours && business.hours[0].is_open_now ? (
              <View style={styles.flexRowContainer}>
                {business.hours &&
                  business.hours[0].is_open_now &&
                  business.hours[0].open[dayPlusOne(now.getDay())] && (
                    <Text style={styles.openSmall}>
                      Opens until{" "}
                      {addColonToTime(
                        business.hours[0].open[dayPlusOne(now.getDay())].end
                      )}
                    </Text>
                  )}
              </View>
            ) : (
              <View style={styles.flexRowContainer}>
                {business.hours &&
                  !business.hours[0].is_open_now &&
                  business.hours[0].open[dayPlusOne(now.getDay())] && (
                    <Text style={styles.closedSmall}>
                      Opens at{" "}
                      {addColonToTime(
                        business.hours[0].open[dayPlusOne(now.getDay())].start
                      )}{" "}
                      {getTodayOrTomorrow()}
                    </Text>
                  )}
              </View>
            )}
            <View style={styles.flexRowContainer}>
              <Icon
                size={24}
                name="map-marker"
                type="font-awesome"
                color="#fd4f57"
                style={{ marginTop: 10, marginRight: 8 }}
              />
              <Text style={styles.title}>
                {route.params.restaurant.location.address1}.
              </Text>
            </View>
            <View style={styles.flexRowContainer}>
              <Text style={styles.titleLeftSmall}>
                {(route.params.restaurant.distance / 1609.344).toFixed(2)} miles
                away
              </Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const SLIDER_WIDTH = Dimensions.get("window").width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.9);
const ITEM_HEIGHT = Math.round((ITEM_WIDTH * 3) / 4);
const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "500",
    textAlign: "center",
    color: "black",
    marginTop: 10,
  },
  titleSmall: {
    fontSize: 15,
    fontWeight: "500",
    textAlign: "center",
    color: "black",
    marginTop: 10,
  },
  titleLeft: {
    fontSize: 20,
    fontWeight: "500",
    textAlign: "center",
    color: "black",
    marginTop: 10,
    marginRight: 20,
  },
  titleLeftSmall: {
    fontSize: 15,
    fontWeight: "500",
    textAlign: "center",
    color: "black",
    marginTop: 10,
    marginRight: 5,
  },
  titleName: {
    fontSize: 30,
    fontWeight: "600",
    textAlign: "left",
    marginLeft: 15,
    color: "black",
    marginTop: 10,
  },
  contentView: {
    borderTopColor: "black",
    borderTopWidth: 1,
  },
  imageStyle: {
    width: "100%",
    height: "100%",
  },
  text: {
    color: "white",
  },
  imageView: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    paddingLeft: 5,
    paddingBottom: 5,
    paddingTop: 5,
  },
  itemContainer: {
    height: ITEM_HEIGHT,
    justifyContent: "flex-end",
    alignItems: "flex-start",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#F5F5F5",
    width: "100%",
  },
  bottomModal: {
    height: "100%",
  },
  modalUp: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "#F1F1F1",
    borderRadius: 10,
    top: ITEM_HEIGHT - 40,
  },
  openSmall: {
    color: "green",
    fontSize: 15,
    fontWeight: "500",
    textAlign: "center",
    marginTop: 10,
    marginRight: 5,
  },
  closedSmall: {
    color: "#fd4f57",
    fontSize: 15,
    fontWeight: "500",
    textAlign: "center",
    marginTop: 10,
    marginRight: 5,
  },
  flexRowContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingHorizontal: 15,
  },
});

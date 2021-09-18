import React, { Component, useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { useEffect } from "react";
import LinearGradient from "react-native-linear-gradient";
import { useNavigation } from "@react-navigation/native";

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

export const Yelp: React.FC = () => {
  const [isLoading, setLoading] = useState(true);
  const [restaurants, setRestaurants] = useState([]);
  const navigation = useNavigation();
  useEffect(() => {
    axios
      .get("https://api.yelp.com/v3/businesses/search", config)
      .then((response) => {
        setRestaurants(response.data.businesses);
        setLoading(false);
      });
  }, []);
  if (isLoading) {
    return <Text>Loading...</Text>;
  }
  var RandomNumber = Math.floor(Math.random() * restaurants.length - 1) + 1;
  return (
    <TouchableOpacity
      style={styles.touchableContainer}
      onPress={() =>
        navigation.navigate("ROTD", {
          id: restaurants[RandomNumber].id,
          restaurant: restaurants[RandomNumber],
        })
      }
    >
      <ImageBackground
        imageStyle={styles.imageStyle}
        style={styles.itemContainer}
        source={{ uri: restaurants[RandomNumber].image_url }}
      >
        <LinearGradient
          style={styles.imageView}
          colors={["transparent", "black"]}
        >
          <Text style={styles.text}>{restaurants[RandomNumber].name}</Text>
          <Text style={styles.text}>
            {(restaurants[RandomNumber].distance / 1609.344).toFixed(2)} miles
          </Text>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const SLIDER_WIDTH = Dimensions.get("window").width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.9);
const ITEM_HEIGHT = Math.round((ITEM_WIDTH * 3) / 4);
const styles = StyleSheet.create({
  itemContainer: {
    height: ITEM_HEIGHT,
    justifyContent: "flex-end",
    alignItems: "flex-start",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#F5F5F5",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    width: "100%",
  },
  touchableContainer: {
    width: "100%",
    height: "100%",
  },
  imageStyle: {
    width: "100%",
    height: "100%",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
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
});

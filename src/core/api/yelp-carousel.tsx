import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Carousel from "react-native-snap-carousel";

export const YelpCarousel: React.FC = () => {
  const [isLoading, setLoading] = useState(true);
  var RandomNumber = Math.floor(Math.random() * 50 - 1) + 1;
  const [config, setConfig] = useState({
    headers: {
      Authorization:
        "Bearer eu70nmGiCTtxJgzg5h3uL1M3rXa3YTsCpz92As8TQw4B5CJ7A0T37rnZ1n84OEvPgGZNNJi9BuYcjH1wj0Vql0P08jsYBEUjkjK0KPVDXUM4veb3jrZzSVwkQ9r4YHYx",
    },
    params: {
      term: "restaurant",
      location: "206 S 5th Ave #300, Ann Arbor, MI 48104",
      radius: 1609,
      sort_by: "best_match",
    },
  });
  const [restaurants, setRestaurants] = useState([]);
  const [text, onChangeText] = React.useState("");
  const SLIDER_WIDTH = Dimensions.get("window").width;
  const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.8);
  const ITEM_HEIGHT = Math.round((ITEM_WIDTH * 3) / 4);
  const navigation = useNavigation();
  useEffect(() => {
    axios
      .get("https://api.yelp.com/v3/businesses/search", config)
      .then((response) => {
        setRestaurants(response.data.businesses);
        setLoading(false);
      });
  }, [config]);

  const onSubmit = () => {
    var tempConfig = {
      headers: {
        Authorization:
          "Bearer eu70nmGiCTtxJgzg5h3uL1M3rXa3YTsCpz92As8TQw4B5CJ7A0T37rnZ1n84OEvPgGZNNJi9BuYcjH1wj0Vql0P08jsYBEUjkjK0KPVDXUM4veb3jrZzSVwkQ9r4YHYx",
      },
      params: {
        term: "restaurant",
        location: "206 S 5th Ave #300, Ann Arbor, MI 48104",
        radius: 1609,
        sort_by: "best_match",
      },
    };
    tempConfig.params.term = text;
    setConfig(tempConfig);
  };

  const _renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          //@ts-ignore
          navigation.navigate("ROTD", {
            id: item.id,
            restaurant: item,
          })
        }
      >
        <ImageBackground
          imageStyle={styles.imageStyle}
          style={styles.itemContainer}
          source={{ uri: item.image_url }}
        >
          <LinearGradient
            style={styles.imageView}
            colors={["transparent", "black"]}
          >
            <Text style={styles.text}>{item.name}</Text>
            <Text style={styles.text}>
              {(item.distance / 1609.344).toFixed(2)} miles
            </Text>
          </LinearGradient>
        </ImageBackground>
      </TouchableOpacity>
    );
  };
  if (isLoading) {
    return <Text>Loading...</Text>;
  }
  return (
    <View>
      <Carousel
        layout={"default"}
        data={restaurants}
        renderItem={_renderItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
      />
    </View>
  );
};

const SLIDER_WIDTH = Dimensions.get("window").width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.9);
const ITEM_HEIGHT = Math.round((ITEM_WIDTH * 3) / 4);
const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    flex: 2,
    color: "black",
  },
  tempView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingRight: 10,
  },
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
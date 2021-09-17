import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { Searchbar, Button } from "react-native-paper";
import { onChange } from "react-native-reanimated";
import Carousel from "react-native-snap-carousel";

export const YelpSearchFilter: React.FC = () => {
  const [isLoading, setLoading] = useState(true);
  var RandomNumber = Math.floor(Math.random() * 50 - 1) + 1;
  const [restaurants, setRestaurants] = useState([]);
  const SLIDER_WIDTH = Dimensions.get("window").width;
  const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.8);
  const ITEM_HEIGHT = Math.round((ITEM_WIDTH * 3) / 4);
  const [searchQuery, setSearchQuery] = useState("");
  const [initialLoad, setInitialLoad] = useState(false);
  const navigation = useNavigation();
  const [config, setConfig] = useState({
    headers: {
      Authorization:
        "Bearer eu70nmGiCTtxJgzg5h3uL1M3rXa3YTsCpz92As8TQw4B5CJ7A0T37rnZ1n84OEvPgGZNNJi9BuYcjH1wj0Vql0P08jsYBEUjkjK0KPVDXUM4veb3jrZzSVwkQ9r4YHYx",
    },
    params: {
      term: "",
      location: "206 S 5th Ave #300, Ann Arbor, MI 48104",
      radius: 1609,
      sort_by: "best_match",
      limit: 0,
    },
  });

  const onChangeSearch = (query) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    axios
      .get("https://api.yelp.com/v3/businesses/search", config)
      .then((response) => {
        setRestaurants(response.data.businesses);
        console.log(response.data.businesses);
        setLoading(false);
      });
    setInitialLoad(true);
  }, [config]);

  useEffect(() => {
    if (searchQuery === "") {
      setInitialLoad(false);
    }
  }, [searchQuery]);

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
        limit: 20,
      },
    };
    if (searchQuery === "") {
      tempConfig.params.term = "--------";
      setInitialLoad(false);
    } else {
      tempConfig.params.term = searchQuery;
    }
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
      <View style={styles.searchContainer}>
        <Searchbar
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
          onIconPress={onSubmit}
        />
      </View>
      {initialLoad && (
        <View style={styles.searchCarousel}>
          <Carousel
            layout={"default"}
            data={restaurants}
            renderItem={_renderItem}
            sliderWidth={SLIDER_WIDTH}
            itemWidth={ITEM_WIDTH}
          />
        </View>
      )}
    </View>
  );
};

const SLIDER_WIDTH = Dimensions.get("window").width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.9);
const ITEM_HEIGHT = Math.round((ITEM_WIDTH * 3) / 4);
const styles = StyleSheet.create({
  searchContainer: {
    width: "100%",
    alignSelf: "center",
    marginTop: 20,
    paddingHorizontal: 20,
  },
  imageStyle: {
    width: "100%",
    height: "100%",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
  },
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
  text: {
    color: "white",
  },
  buttonStyle: {
    marginTop: 10,
    backgroundColor: "#fd4f57",
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
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
  },
  searchCarousel: {
    marginTop: 12,
  },
});

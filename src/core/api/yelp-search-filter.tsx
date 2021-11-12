import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { FC, useEffect, useRef, useState } from "react";
import {
  Animated,
  Button,
  Dimensions,
  FlatList,
  ImageBackground,
  Keyboard,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { Icon } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import LinearGradient from "react-native-linear-gradient";
import Modal from "react-native-modal";
import SearchBar from "react-native-search-bar";
import Spinner from "react-native-spinkit";
import { getAddress } from "../../screens/home/helpers";
import {
  filterCategories,
  FilterModal,
} from "../../shared_components/filter_modal";

type Props = { location?: string };

export const YelpSearchFilter: FC<Props> = (props) => {
  const [isLoading, setLoading] = useState(true);
  var RandomNumber = Math.floor(Math.random() * 50 - 1) + 1;
  const [restaurants, setRestaurants] = useState([]);
  const SLIDER_WIDTH = Dimensions.get("window").width;
  const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.8);
  const ITEM_HEIGHT = Math.round((ITEM_WIDTH * 3) / 4);
  const [searchQuery, setSearchQuery] = useState("");
  const [initialLoad, setInitialLoad] = useState(false);
  const [editable, setEditable] = useState(false);
  const { height } = useWindowDimensions();

  const [isModalVisible, setModalVisible] = useState(false);

  const fadeAnimation = useRef(new Animated.Value(0)).current;
  const slideAnimation = useRef(new Animated.Value(0)).current;

  const [displayFilter, setDisplayFilter] = useState(false);

  const [filterCategory, setFilterCategory] = useState(filterCategories.price);

  const searchRef = useRef<SearchBar>();

  const fadeIn = () => {
    Animated.timing(fadeAnimation, {
      toValue: 1,
      duration: 400,
      useNativeDriver: false,
    }).start();
  };
  const slideDown = () => {
    Animated.timing(slideAnimation, {
      toValue: 1,
      duration: 400,
      useNativeDriver: false,
    }).start();
  };
  const slideUp = () => {
    Animated.timing(slideAnimation, {
      toValue: 0,
      duration: 400,
      useNativeDriver: false,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnimation, {
      toValue: 0,
      duration: 400,
      useNativeDriver: false,
    }).start();
  };

  const shrinkWidth = fadeAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [Platform.OS === "ios" ? "100%" : "95%", "88%"],
  });

  const translateRight = fadeAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 23],
  });

  const translateUp = fadeAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [-50, 0],
  });

  const translateDown = slideAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, height],
  });

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
    Keyboard.dismiss();
  };
  const navigation = useNavigation();

  const [config, setConfig] = useState({
    headers: {
      Authorization:
        "Bearer eu70nmGiCTtxJgzg5h3uL1M3rXa3YTsCpz92As8TQw4B5CJ7A0T37rnZ1n84OEvPgGZNNJi9BuYcjH1wj0Vql0P08jsYBEUjkjK0KPVDXUM4veb3jrZzSVwkQ9r4YHYx",
    },
    params: {
      term: "",
      location: getAddress(props.location),
      radius: 1609,
      sort_by: "best_match",
      limit: 0,
      open_now: true,
    },
  });

  const onChangeSearch = (query) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    console.log("called first");
    axios
      .get("https://api.yelp.com/v3/businesses/search", config)
      .then((response) => {
        setRestaurants(response.data.businesses);
        setLoading(false);
        setInitialLoad(true);
      });
  }, [config]);

  useEffect(() => {
    console.log("called second");
    axios
      .get("https://api.yelp.com/v3/businesses/search", config)
      .then((response) => {
        setRestaurants(response.data.businesses);
        onSubmit();
        setLoading(false);
      });
  }, [props.location]);

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
        location: getAddress(props.location),
        radius: 1609,
        sort_by: "best_match",
        limit: 20,
        open_now: true,
      },
    };
    if (searchQuery === "") {
      tempConfig.params.term = "--------";
      setInitialLoad(false);
    } else {
      tempConfig.params.term = searchQuery;
    }
    setLoading(true);
    setConfig(tempConfig);
  };

  const _renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          toggleModal();
          fadeIn();
          //@ts-ignore
          navigation.navigate("Detailed Restaurant View", {
            id: item.id,
            restaurant: item,
          });
        }}
        style={{ marginBottom: 5 }}
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
  return (
    <View>
      <Animated.View
        style={[
          styles.searchContainer,
          {
            width: shrinkWidth,
            transform: [{ translateX: translateRight }],
          },
        ]}
      >
        <TouchableOpacity
          onPress={() => {
            const a = new Promise((resolve, reject) => {
              setTimeout(() => resolve("timeout"), 0);
            });
            a.then(() => {
              // fadeInModal();
              searchRef.current?.focus();
            });
            a.catch(console.log);
            fadeIn();
            slideDown();
            setDisplayFilter(true);
            setEditable(true);
          }}
        >
          <SearchBar
            placeholder="Search"
            ref={searchRef}
            editable={editable}
            hideBackground={true}
            textFieldBackgroundColor={"white"}
            searchBarStyle={"default"}
            showsCancelButtonWhileEditing={false}
            text={searchQuery}
            onChangeText={setSearchQuery}
            onSearchButtonPress={onSubmit}
          />
        </TouchableOpacity>
      </Animated.View>
      <Animated.View
        style={{
          marginHorizontal: 10,
          opacity: fadeAnimation,
          display: displayFilter ? "flex" : "none",
        }}
      >
        <ScrollView horizontal={true}>
          <TouchableOpacity
            onPress={() => {
              setFilterCategory(filterCategories.price);
              toggleModal();
            }}
          >
            <View style={styles.filterContainer}>
              <Icon
                size={16}
                name="caret-down"
                type="font-awesome"
                color="black"
              />
              <Text style={styles.filterTextCarrot}>Price</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setFilterCategory(filterCategories.distance);
              toggleModal();
            }}
          >
            <View style={styles.filterContainer}>
              <Icon
                size={16}
                name="caret-down"
                type="font-awesome"
                color="black"
              />
              <Text style={styles.filterTextCarrot}>Distance</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setFilterCategory(filterCategories.rating);
              toggleModal();
            }}
          >
            <View style={styles.filterContainer}>
              <Icon
                size={16}
                name="caret-down"
                type="font-awesome"
                color="black"
              />
              <Text style={styles.filterTextCarrot}>Rating</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.filterContainer}>
              <Text style={styles.filterText}>Open</Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </Animated.View>
      <Animated.View
        style={[
          styles.listContainer,
          {
            height: height,
            opacity: fadeAnimation,
            display: displayFilter ? "flex" : "none",
          },
        ]}
      >
        {isLoading && (
          <Spinner
            isVisible={true}
            size={40}
            type={"ThreeBounce"}
            color={"black"}
            style={{ alignSelf: "center" }}
          />
        )}
        {initialLoad && (
          <View style={styles.searchCarousel}>
            <FlatList
              data={restaurants}
              keyExtractor={({ id }) => id.toString()}
              renderItem={_renderItem}
              ListFooterComponent={<View style={{ height: 300 }} />}
            />
          </View>
        )}
      </Animated.View>
      <Animated.View
        style={{
          position: "absolute",
          justifyContent: "center",
          paddingTop: 15,
          opacity: fadeAnimation,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            fadeOut();
            slideUp();
            setEditable(false);
            setSearchQuery("");
            setDisplayFilter(false);
            searchRef.current.blur();
          }}
        >
          <Icon
            size={25}
            name="arrow-left"
            type="font-awesome"
            color="black"
            style={{ marginRight: 10, marginLeft: 15 }}
          />
        </TouchableOpacity>
      </Animated.View>
      <FilterModal
        isVisible={isModalVisible}
        toggleVisibility={toggleModal}
        category={filterCategory}
      />
    </View>
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
  view: {
    justifyContent: "flex-end",
    margin: 0,
  },
  searchContainer: {
    width: "100%",
    alignSelf: "center",
    marginVertical: Platform.OS === "ios" ? 0 : 10,
  },
  listContainer: {
    width: "100%",
    alignSelf: "center",
  },
  searchContainerModal: {
    width: "100%",
    marginTop: Platform.OS === "ios" ? 50 : 25,
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
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
    marginBottom: 10,
  },
  searchCarousel: {
    paddingHorizontal: 15,
    marginTop: 15,
    flex: 1,
  },
  filterContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginHorizontal: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  filterTextCarrot: {
    marginLeft: 5,
  },
  filterText: {
    margin: 0,
  },
});

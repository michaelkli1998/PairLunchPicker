import React, { FC, useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  Modal as RNModal,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Icon } from "react-native-elements";
import Select2 from "react-native-select-two";
import { atomicPeople } from "./people_list";
import { LogBox } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { TouchableOpacity as AltTouchableOpacity } from "react-native-gesture-handler";
import AwesomeButton from "react-native-really-awesome-button";
import { Touchable } from "../../shared_components/touchable";
import BrickList from "react-native-masonry-brick-list";
import LinearGradient from "react-native-linear-gradient";
import ColorPicker from "react-native-wheel-color-picker";
import useToggle from "../home/helpers";
import Modal from "react-native-modal";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { DnDBoard } from "./draggable_grid";

LogBox.ignoreLogs(["Animated: `useNativeDriver` was not specified."]); // Ignore log notification by message
LogBox.ignoreLogs(["Module RNBubbleSelectNodeViewManager"]); // Ignore log notification by message

export const Tracker: FC = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const [dateText, setDateText] = useState("");
  const [restaurant, setRestaurant] = useState("");
  const [selectedItem, setSelectedItems] = useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const [colorWheelOpen, setColorWheelOpen] = useToggle(false);

  const [color, setColor] = useState("#ffffff");

  const [data, setData] = useState([]);

  const [hasResults, setHasResults] = useState(false);

  const pickerRef = useRef<ColorPicker>();

  const renderView = (prop) => {
    return (
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{
          margin: 5,
          borderRadius: 5,
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
        locations={[0, 0, 0]}
        colors={["black", "black", prop.color]}
      >
        <View
          key={prop.id}
          style={{
            backgroundColor:
              prop.color === "transparent"
                ? "rgba(255, 255, 255, 0)"
                : "rgba(255, 255, 255, 0.5)",
            borderRadius: 5,
            padding: 6,
          }}
        >
          <Text
            style={{ color: "black", marginVertical: 2, fontWeight: "bold" }}
          >
            {prop.name}
          </Text>
          <Text
            style={{ color: "black", marginVertical: 2, fontWeight: "bold" }}
          >
            {prop.date}
          </Text>
          <Text
            style={{ color: "black", marginVertical: 2, fontWeight: "bold" }}
          >
            {prop.restaurant}
          </Text>
        </View>
      </LinearGradient>
    );
  };

  const selectRef = useRef<Select2>();

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setDateText(date.toISOString().split("T")[0]);
    hideDatePicker();
  };

  const atomic_people = atomicPeople;
  atomic_people.sort((a, b) => (a.name > b.name ? 1 : -1));

  const submitPairLunch = () => {
    const atom = atomic_people
      .filter((item) => {
        return item.id.toString() === selectedItem[0].toString();
      })
      .map(({ name }) => {
        return name;
      });

    const tempPairLunch = {
      id: (data.length + 1).toString(),
      name: atom[0],
      date: dateText,
      restaurant: restaurant,
      color: color,
    };

    const tempList = data;
    tempList.push(tempPairLunch);

    setHasResults(true);
    setData(tempList);
    setDateText("");
    setRestaurant("");
  };

  const checkFieldsFilled = () => {
    return dateText !== "" && restaurant !== "" && selectedItem !== ""
      ? false
      : true;
  };

  // TODO:
  // 1. Implement draggable grid https://github.com/SHISME/react-native-draggable-grid
  // 2. Implement long press and hold to reveal edit and delete. Different atom list view that I can edit the name?
  // 3. Change date to days remaining until next pair lunch.
  // 4. Search the grid functionality by editing the array?

  return (
    <SafeAreaView style={styles.container}>
      {/* {!hasResults && (
        <View
          style={{
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            style={styles.logo}
            source={require("../../images/tracker.png")}
          />
          <Text style={styles.trackText}>
            You currently are not tracking any pair lunches.
          </Text>
        </View>
      )}
      <ScrollView
        style={{ width: "100%", height: "100%" }}
        contentContainerStyle={{ justifyContent: "center" }}
        scrollEnabled={!dragging}
      >
        <AtomicDraggableGrid
          atomic_people={data}
          update_atomic_people={setData}
          draggable={setDragging}
        />
      </ScrollView> */}
      <DnDBoard atomic_people={data} />

      {/* <BrickList
        data={data}
        renderItem={(prop) => renderView(prop)}
        columns={2}
      /> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 20,
    marginBottom: 20,
    paddingRight: 20,
    paddingLeft: 20,
    marginLeft: 40,
  },
  input: {
    borderWidth: 1,
    padding: 14,
    minWidth: "100%",
    backgroundColor: "white",
    borderColor: "lightgrey",
    borderRadius: 5,
    height: 45,
    color: "black",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  selectContainer: {
    paddingHorizontal: 20,
    marginVertical: 5,
  },
  flexRow: {
    flexDirection: "row",
  },
  logo: {
    width: 170,
    height: 170,
  },
  pairLunchLogo: {
    width: 315,
    height: 300,
  },
  trackText: {
    fontWeight: "bold",
    marginHorizontal: 10,
    fontSize: 22,
  },
  addButton: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    backgroundColor: "#fd4f57",
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    justifyContent: "center",
    position: "absolute",
    right: 0,
    bottom: 0,
    margin: 20,
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
  },
  content: {
    backgroundColor: "#fd4f57",
    padding: 22,
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)",
    height: "100%",
  },
  contentTitle: {
    fontSize: 24,
    marginVertical: 16,
    fontWeight: "bold",
  },
  contentText: {
    fontSize: 16,
    marginBottom: 12,
    marginHorizontal: 12,
    flex: 1,
  },
  headerText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  view: {
    justifyContent: "center",
  },
  colorWheelView: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalText: {
    fontWeight: "bold",
    color: "black",
  },
});

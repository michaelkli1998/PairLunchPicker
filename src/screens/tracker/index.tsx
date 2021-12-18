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
  StatusBar,
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
  const backgroundStyle = {
    backgroundColor: "#fd4f57",
  };
  const [data, setData] = useState([]);

  // TODO:
  // 1. Implement draggable grid https://github.com/SHISME/react-native-draggable-grid
  // 2. Implement long press and hold to reveal edit and delete. Different atom list view that I can edit the name?
  // 3. Change date to days remaining until next pair lunch.
  // 4. Search the grid functionality by editing the array?

  return (
    <SafeAreaView style={[styles.container, backgroundStyle]}>
      <StatusBar animated={true} backgroundColor="#fd4f57" />
      <DnDBoard atomic_people={data} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

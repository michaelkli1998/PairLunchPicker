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
  Dimensions,
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

import Board, { Repository } from "react-native-dnd-board";

type Props = { atomic_people: any };

const COLUMN_WIDTH = Dimensions.get("window").width * 0.6;

const DnDBoard: FC<Props> = (props) => {
  const mockData = [
    {
      id: "1",
      name: "Upcoming Lunches",
      rows: [],
    },
    {
      id: "2",
      name: "Past Lunches",
      rows: [],
    },
  ];

  const [currentId, setCurrentId] = useState(0);

  const [data, setData] = useState([]);

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

  const [currentModal, setCurrentModal] = useState(0);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setDateText(
      date.toISOString().split("T")[0].split("-")[1] +
        "-" +
        date.toISOString().split("T")[0].split("-")[2] +
        "-" +
        date.toISOString().split("T")[0].split("-")[0]
    );
    hideDatePicker();
  };

  const compareDates = (date) => {
    const dateNow = new Date();
    const compDate =
      dateNow.toISOString().split("T")[0].split("-")[1] +
      "-" +
      dateNow.toISOString().split("T")[0].split("-")[2] +
      "-" +
      dateNow.toISOString().split("T")[0].split("-")[0];

    const monthComp = date.split("-")[0];
    const dayComp = date.split("-")[1];
    const yearComp = date.split("-")[2];

    const monthNow = compDate.split("-")[0];
    const dayNow = compDate.split("-")[1];
    const yearNow = compDate.split("-")[2];

    if (yearComp > yearNow) {
      return "after";
    }

    if (monthComp > monthNow) {
      return "after";
    }

    if (dayComp > dayNow) {
      return "after";
    }

    if (yearComp === yearNow && monthComp === monthNow && dayComp === dayNow) {
      return "after";
    }

    return "before";
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

    const cardCol = compareDates(dateText);

    if (cardCol === "after") {
      addCard(1, currentId, atom[0], dateText, restaurant, color);
    } else {
      addCard(2, currentId, atom[0], dateText, restaurant, color);
    }

    setCurrentId(currentId + 1);

    // setHasResults(true);
    setDateText("");
    setRestaurant("");
  };

  const checkFieldsFilled = () => {
    return dateText !== "" && restaurant !== "" && selectedItem !== ""
      ? false
      : true;
  };

  let mockDataLength = mockData.length;
  let mockDataRowLength = {};
  mockData.forEach((column) => {
    mockDataRowLength[column.id] = column.rows.length;
  });

  const [repository] = useState(new Repository(mockData));

  const addCard = (columnId, itemId, name, date, restaurant, color) => {
    const data = {
      id: itemId,
      name: name,
      date: date,
      restaurant: restaurant,
      color: color,
    };

    // Call api add row here
    // Add row to the board
    repository.addRow(columnId, data);
  };

  const updateCard = (cardId, data) => {
    const dummy = data || { name: "Row updated" };

    // Call api update row here
    // Update row on the board
    repository.updateRow(cardId, dummy);
  };

  const deleteCard = (cardId) => {
    // Call api delete row here
    // Delete row on the board
    repository.deleteRow(cardId);
  };

  const renderCard = ({ item }) => {
    return (
      <View
        style={{
          borderRadius: 5,
          borderRightColor: "#F6F7FB",
          borderTopColor: "#F6F7FB",
          borderBottomColor: "#F6F7FB",
          borderRightWidth: 1,
          borderTopWidth: 1,
          borderBottomWidth: 1,
          borderLeftColor: item.color,
          borderLeftWidth: 10,
          backgroundColor: "#FFFFFF",
          paddingRight: 24,
          paddingLeft: 12,
          paddingVertical: 10,
          marginBottom: 12,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.22,
          shadowRadius: 2.22,

          elevation: 3,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "column" }}>
          <Text style={[{ fontWeight: "bold" }, styles.cardText]}>
            {item.name}
          </Text>
          <Text style={styles.cardText}>{item.date}</Text>
          <Text style={styles.cardText}>{item.restaurant}</Text>
        </View>

        <TouchableOpacity
          hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
          onPress={() => deleteCard(item.id)}
        >
          <Text>✕</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const addColumn = () => {
    mockDataRowLength[++mockDataLength] = 0;
    const column = {
      id: mockDataLength,
      name: `Column ${mockDataLength}`,
      rows: [],
    };

    // Call api add column here
    mockData.push(column);

    // Add column to the board
    repository.addColumn(column);
  };

  const updateColumn = (columnId, data) => {
    const dummy = data || { name: "Column name updated" };

    // Call api update column here
    const columnIndex = mockData.findIndex((column) => column.id === columnId);
    if (columnIndex > -1) {
      mockData[columnIndex].name = dummy.name;
    }

    // Update column on the board
    repository.updateColumn(columnId, dummy);
  };

  const deleteColumn = (columnId) => {
    // Call api delete column here
    const columnIndex = mockData.findIndex((column) => column.id === columnId);
    if (columnIndex > -1) {
      mockData.splice(columnIndex, 1);
    }

    // Delete column on the board
    repository.deleteColumn(columnId);
  };

  const renderColumn = ({ item, columnComponent, layoutProps, index }) => {
    return (
      <View style={styles.column} {...layoutProps}>
        <View style={styles.columnHeader}>
          <Text style={styles.columnName}>{item.name}</Text>
          {/* <TouchableOpacity
            hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
            onPress={() => deleteColumn(item.id)}
          >
            <Text>✕</Text>
          </TouchableOpacity> */}
        </View>
        {columnComponent}
      </View>
    );
  };

  const onCardPress = (card) => {
    console.log("Card ID: ", card.id);
  };

  const onDragEnd = (fromColumnId, toColumnId, card) => {
    //
  };

  return (
    <SafeAreaView style={styles.container}>
      <Board
        style={styles.board}
        repository={repository}
        renderRow={renderCard}
        renderColumnWrapper={renderColumn}
        onRowPress={onCardPress}
        onDragEnd={onDragEnd}
        columnWidth={COLUMN_WIDTH}
        // accessoryRight={
        //   <View style={[styles.column, styles.addColumn]}>
        //     <TouchableOpacity onPress={addColumn}>
        //       <Text>+ Add Column</Text>
        //     </TouchableOpacity>
        //   </View>
        // }
      />
      <TouchableOpacity style={styles.addButton} onPress={toggleModal}>
        <Icon size={32} name="plus" type="font-awesome" color="white" />
      </TouchableOpacity>
      <RNModal
        visible={isModalVisible}
        style={styles.view}
        animationType={"fade"}
      >
        <SafeAreaView style={styles.content}>
          <KeyboardAwareScrollView
            contentContainerStyle={{
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <Text style={styles.contentTitle}>Add a pair lunch</Text>
            <Image
              source={require("../../images/twopeoplelunch.png")}
              style={styles.pairLunchLogo}
            />
            <Touchable
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={setColorWheelOpen}
            >
              <View
                style={[
                  {
                    marginTop: 15,
                    width: 200,
                    borderRadius: 40 / 2,
                    height: 40,
                    borderColor: "lightgrey",
                    borderWidth: 1,
                    justifyContent: "center",
                    backgroundColor: "white",
                    shadowColor: "#171717",
                    shadowOffset: { width: -2, height: 4 },
                    shadowOpacity: 0.2,
                    shadowRadius: 3,
                    alignItems: "center",
                    flexDirection: "row",
                  },
                ]}
              >
                <View
                  style={{
                    backgroundColor: color,
                    width: 25,
                    height: 25,
                    borderRadius: 25 / 2,
                    marginRight: 10,
                    borderWidth: 1,
                    borderColor: "black",
                  }}
                ></View>
                <Text style={styles.headerText}>Choose a color</Text>
              </View>
            </Touchable>
            <View style={styles.selectContainer}>
              <Text style={styles.headerText}>Atom</Text>
              <Select2
                isSelectSingle
                style={{
                  borderRadius: 5,
                  width: "100%",
                  backgroundColor: "white",
                  height: 45,
                }}
                colorTheme="#fd4f57"
                popupTitle="Select an Atom"
                title="Select an Atom"
                data={atomic_people}
                onSelect={setSelectedItems}
                onRemoveItem={setSelectedItems}
                cancelButtonText={"Cancel"}
                selectButtonText={"Select"}
                searchPlaceHolderText={"Search for Atoms"}
                useNativeDriver={true}
                listEmptyTitle={"No Atoms were found"}
              />
            </View>
            <View style={styles.selectContainer}>
              <Text style={styles.headerText}>Date</Text>
              <Touchable onPress={showDatePicker}>
                <TextInput
                  style={styles.input}
                  placeholder={"Choose a date"}
                  placeholderTextColor={"grey"}
                  onChangeText={setDateText}
                  value={dateText}
                  editable={false}
                />
              </Touchable>
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
              />
            </View>
            <View style={styles.selectContainer}>
              <Text style={styles.headerText}>Restaurant</Text>
              <TextInput
                style={styles.input}
                placeholder={"Enter a restaurant"}
                placeholderTextColor={"grey"}
                onChangeText={setRestaurant}
                value={restaurant}
                editable={true}
              />
            </View>
            <AwesomeButton
              progress
              //@ts-ignore
              progressLoadingTime={1000}
              onPress={() => {
                setTimeout(() => {
                  toggleModal();
                  submitPairLunch();
                }, 1000);
              }}
              stretch
              style={styles.button}
              type="primary"
              height={55}
              backgroundColor={checkFieldsFilled() ? "#faa849" : "#ffcd6a"}
              backgroundDarker={"#faa849"}
              textColor={"black"}
              textSize={16}
              borderRadius={5}
              disabled={checkFieldsFilled()}
            >
              Add Pair Lunch
            </AwesomeButton>
            <Touchable
              style={{
                height: 30,
                width: 60,
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={toggleModal}
            >
              <Text style={{ fontWeight: "bold" }}>Cancel</Text>
            </Touchable>
          </KeyboardAwareScrollView>
        </SafeAreaView>
        <Modal
          isVisible={colorWheelOpen}
          onBackdropPress={setColorWheelOpen}
          onBackButtonPress={setColorWheelOpen}
          style={styles.colorWheelView}
          backdropOpacity={0.3}
        >
          <View
            style={{
              paddingBottom: 40,
              paddingHorizontal: 30,
              maxHeight: "55%",
              flex: 1,
              backgroundColor: "white",
            }}
          >
            <View style={{ alignItems: "center", marginTop: 10 }}>
              <TouchableOpacity
                style={styles.checkButton}
                onPress={() => {
                  setColorWheelOpen();
                }}
              >
                <Icon
                  size={32}
                  name="check"
                  type="font-awesome"
                  color="white"
                />
              </TouchableOpacity>
            </View>
            <ColorPicker
              color={color}
              thumbSize={40}
              sliderSize={40}
              noSnap={true}
              onColorChangeComplete={setColor}
              row={false}
              swatchesLast
              swatches
              discrete={false}
            />
          </View>
        </Modal>
      </RNModal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 16,
  },
  hederName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  board: {
    paddingVertical: 16,
    backgroundColor: "#E0E8EF",
  },
  column: {
    backgroundColor: "#F8FAFB",
    marginHorizontal: 6,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 4,
  },
  columnHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  columnName: {
    fontWeight: "bold",
  },
  addColumn: {
    marginRight: 12,
    padding: 12,
    minWidth: COLUMN_WIDTH,
  },
  card: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#F6F7FB",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 24,
    paddingVertical: 16,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  addCard: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(233, 233, 233)",
    borderRadius: 4,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#F5F6F8",
  },
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
    margin: 10,
    borderRadius: 50 / 2,
    justifyContent: "center",
    position: "absolute",
    bottom: 0,
    right: 0,
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
  cardText: {
    marginVertical: 2,
  },
});

export { DnDBoard };

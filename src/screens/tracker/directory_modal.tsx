import React, { FC, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  SectionList,
  SafeAreaView,
  Keyboard,
} from "react-native";
import { Icon } from "react-native-elements";
import Modal from "react-native-modal";
import SearchBar from "react-native-search-bar";
import SegmentedControlTab from "react-native-segmented-control-tab";
import {
  atomicDirectory,
  atomic_people,
  atomic_people_sorted,
} from "./people_list";

type Props = { toggleVisibility: () => void; isVisible: boolean };

export const DirectoryModal: FC<Props> = (props) => {
  const searchRef = useRef<SearchBar>();
  const [searchQuery, setSearchQuery] = useState("");
  const [aD, setAD] = useState(atomicDirectory);

  useEffect(() => {
    searchRef.current?.focus();
  }, []);

  const onTextChange = (text: string) => {
    setSearchQuery(text);
    const directory = atomic_people.filter((person) => {
      const personLower = person.toLowerCase();
      const textLower = text.toLowerCase();
      return personLower.indexOf(textLower) > -1;
    });
    let dictionary = directory.reduce(
      (a, x) => ({
        ...a,
        [x[0].toUpperCase()]:
          a[x[0].toUpperCase()] === undefined
            ? x
            : a[x[0].toUpperCase()] + "/" + x,
      }),
      {}
    );

    const finDictionary = Object.keys(dictionary).map((key, index) => {
      return { title: key, data: dictionary[key].split("/") as string[] };
    });
    setAD(finDictionary.sort((a, b) => (a.title > b.title ? 1 : -1)));
  };
  return (
    <Modal
      isVisible={props.isVisible}
      onBackdropPress={props.toggleVisibility}
      onBackButtonPress={props.toggleVisibility}
      style={styles.view}
      backdropOpacity={0.3}
      animationIn={"fadeIn"}
      animationOut={"fadeOut"}
    >
      <SafeAreaView style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            paddingVertical: 12,
            alignItems: "center",
          }}
        >
          <SearchBar
            placeholder="Search"
            ref={searchRef}
            hideBackground={true}
            textFieldBackgroundColor={"#f0f0f0"}
            searchBarStyle={"default"}
            showsCancelButtonWhileEditing={false}
            text={searchQuery}
            onChangeText={onTextChange}
            onCancelButtonPress={props.toggleVisibility}
            style={{ flex: 1, height: 30 }}
            // onSearchButtonPress={() => {
            //   onSubmit();
            // }}
          />
          <TouchableOpacity
            onPress={() => {
              props.toggleVisibility();
              Keyboard.dismiss();
            }}
          >
            <Icon
              size={30}
              name="times-circle"
              type="font-awesome"
              color="#fd4f57"
              style={{ marginRight: 10 }}
            />
          </TouchableOpacity>
        </View>
        <SectionList
          sections={aD}
          renderItem={({ item }) => (
            <TouchableOpacity>
              <Text style={styles.item}>{item}</Text>
            </TouchableOpacity>
          )}
          renderSectionHeader={({ section }) => (
            <Text style={styles.sectionHeader}>{section.title}</Text>
          )}
          keyExtractor={(item, index) => index}
        />
      </SafeAreaView>
    </Modal>
  );
};

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
  container: {
    flex: 1,
    paddingTop: 22,
    backgroundColor: "white",
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: "bold",
    backgroundColor: "rgba(240,240,240,1.0)",
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

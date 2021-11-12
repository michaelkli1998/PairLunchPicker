import React, { FC } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import Modal from "react-native-modal";

type Props = {
  toggleVisibility: () => void;
  isVisible: boolean;
  category: filterCategories;
};

export enum filterCategories {
  price = "price",
  distance = "distance",
  rating = "rating",
  open = "open",
}

export const FilterModal: FC<Props> = (props) => {
  if (props.category === filterCategories.price) {
    return (
      <Modal
        isVisible={props.isVisible}
        onBackdropPress={props.toggleVisibility}
        onBackButtonPress={props.toggleVisibility}
        style={styles.view}
        backdropOpacity={0.3}
      >
        <View style={styles.content}>
          <Text style={styles.contentTitle}>Hi 👋! Price!</Text>
          <Button
            testID={"close-button"}
            onPress={props.toggleVisibility}
            title="Close"
          />
        </View>
      </Modal>
    );
  } else if (props.category === filterCategories.distance) {
    return (
      <Modal
        isVisible={props.isVisible}
        onBackdropPress={props.toggleVisibility}
        onBackButtonPress={props.toggleVisibility}
        style={styles.view}
        backdropOpacity={0.3}
      >
        <View style={styles.content}>
          <Text style={styles.contentTitle}>Hi 👋! Distance!</Text>
          <Button
            testID={"close-button"}
            onPress={props.toggleVisibility}
            title="Close"
          />
        </View>
      </Modal>
    );
  } else if (props.category === filterCategories.rating) {
    return (
      <Modal
        isVisible={props.isVisible}
        onBackdropPress={props.toggleVisibility}
        onBackButtonPress={props.toggleVisibility}
        style={styles.view}
        backdropOpacity={0.3}
      >
        <View style={styles.content}>
          <Text style={styles.contentTitle}>Hi 👋! Rating!</Text>
          <Button
            testID={"close-button"}
            onPress={props.toggleVisibility}
            title="Close"
          />
        </View>
      </Modal>
    );
  } else {
    return (
      <View style={styles.content}>
        <Text style={styles.contentTitle}>We Broke!!!</Text>
      </View>
    );
  }
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
});

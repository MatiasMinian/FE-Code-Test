import React from "react";
import { StyleSheet, View } from "react-native";

const Card = props => <View style={[styles.card, props.style]}>{props.children}</View>;

export default Card;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 3,
    elevation: 5,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 3
  }
});

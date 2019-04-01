import React from "react";
import PropTypes from "prop-types";
import { Image, StyleSheet, Text, ScrollView, View } from "react-native";
import Card from "../../../components/Card";

const CocktailDetails = ({ cocktail }) => (
  <Card style={styles.card}>
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <Image source={{ uri: cocktail.strDrinkThumb }} style={styles.image} resizeMode="stretch" />
      <View style={styles.section}>
        <Text style={styles.title}>Ingredients</Text>
        {cocktail.ingredients.map(([measure, ingredient], index) => (
          <Text key={index}>{`\u2022 ${measure} - ${ingredient}`}</Text>
        ))}
      </View>
      <View style={styles.section}>
        <Text style={styles.title}>How to prepare</Text>
        <Text>{cocktail.strInstructions}</Text>
      </View>
    </ScrollView>
  </Card>
);

CocktailDetails.propTypes = {
  cocktail: PropTypes.shape({
    idDrink: PropTypes.string.isRequired,
    strDrink: PropTypes.string.isRequired,
    strDrinkThumb: PropTypes.string.isRequired,
    strInstructions: PropTypes.string.isRequired,
    ingredients: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string))
      .isRequired
  }).isRequired
};

export default CocktailDetails;

const styles = StyleSheet.create({
  card: {
    width: "100%"
  },
  scrollViewContent: {
    padding: 20
  },
  image: {
    width: "100%",
    height: 270,
    borderRadius: 3
  },
  section: {
    marginVertical: 15
  },
  title: {
    fontWeight: "bold",
    fontSize: 25,
    marginBottom: 5
  }
});

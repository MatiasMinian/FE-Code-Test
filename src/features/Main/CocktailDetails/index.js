import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { getCocktailDetails } from "../../../api/cocktails";
import Loader from "../../../components/Loader";
import CocktailDetails from "./CocktailDetails";

export default class CocktailDetailsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cocktail: null,
      isLoading: true
    };
  }

  async componentDidMount() {
    const { navigation } = this.props;
    const cocktailId = navigation.getParam("id");

    if (!cocktailId) this.setState({ isLoading: false });

    try {
      const cocktail = await getCocktailDetails(cocktailId);
      this.setState({ cocktail, isLoading: false });
    } catch (err) {
      this.setState({ isLoading: false });
    }
  }

  render() {
    const { cocktail, isLoading } = this.state;

    if (isLoading)
      return (
        <View style={styles.container}>
          <Loader />
        </View>
      );

    return (
      <View style={styles.container}>
        {cocktail ? (
          <CocktailDetails cocktail={cocktail} />
        ) : (
          <Text style={styles.text}>
            {"We couldn't find cocktail details.\nCome back later!"}
          </Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#b3ecff",
    padding: 30
  }
});

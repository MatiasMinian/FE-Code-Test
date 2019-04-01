import React, { Component } from "react";
import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import { getCocktails } from "../../api/cocktails";
import Loader from "../../components/Loader";
import CocktailsCard from "./components/CocktailsCard";

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cocktails: [],
      isLoading: true,
      search: false,
      searchText: "",
      filteredCocktails: []
    };
  }

  async componentDidMount() {
    this.props.navigation.setParams({ toggleSearch: this.toggleSearch });
    try {
      const cocktails = await getCocktails();
      this.setState({
        cocktails,
        isLoading: false,
        filteredCocktails: cocktails
      });
    } catch (err) {
      this.setState({ isLoading: false });
    }
  }

  toggleSearch = () => {
    this.setState(prevState => ({
      search: !prevState.search,
      searchText: "",
      filteredCocktails: prevState.cocktails
    }));
  };

  onChangeText = searchText => {
    const filteredCocktails = searchText
      ? this.searchCocktails(searchText)
      : this.state.cocktails;
    this.setState({ searchText, filteredCocktails });
  };

  searchCocktails(searchText) {
    const { cocktails } = this.state;
    return cocktails.filter(cocktail =>
      cocktail.strDrink.toLowerCase().includes(searchText.toLowerCase())
    );
  }

  cocktailsKeyExtractor(item) {
    return item.idDrink;
  }

  onItemPress = (id, title) => {
    this.props.navigation.navigate("CocktailDetails", { id, title });
  };

  renderItem = ({ item }) => (
    <CocktailsCard
      id={item.idDrink}
      onPress={this.onItemPress}
      title={item.strDrink}
      image={item.strDrinkThumb}
    />
  );

  render() {
    const { filteredCocktails, isLoading, search, searchText } = this.state;

    if (isLoading)
      return (
        <View style={styles.container}>
          <Loader />
        </View>
      );

    return (
      <View style={styles.container}>
        {search && (
          <TextInput
            style={styles.textInput}
            placeholder="Search for drinks"
            onChangeText={this.onChangeText}
            value={searchText}
          />
        )}
        <View style={styles.flatListContainer}>
          {filteredCocktails.length ? (
            <FlatList
              style={styles.flatList}
              contentContainerStyle={styles.flatListContent}
              data={filteredCocktails}
              renderItem={this.renderItem}
              keyExtractor={this.cocktailsKeyExtractor}
            />
          ) : (
            <Text style={styles.text}>{"We couldn't find any cocktails."}</Text>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#b3ecff"
  },
  textInput: {
    marginVertical: 10,
    backgroundColor: "#fff",
    height: 40,
    width: "70%",
    borderRadius: 15,
    paddingHorizontal: 15
  },
  flatListContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  flatList: {
    width: "100%"
  },
  flatListContent: {
    padding: 20
  },
  text: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  }
});

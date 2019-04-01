import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import Icon from "react-native-vector-icons/FontAwesome";
import Main from "./Main";
import CocktailDetails from "./CocktailDetails";

const MainNavigator = createStackNavigator(
  {
    Main: {
      screen: Main,
      navigationOptions: ({ navigation }) => ({
        title: "Random Drinks",
        headerRight: (
          <Icon.Button
            name="search"
            underlayColor="transparent"
            backgroundColor="transparent"
            onPress={navigation.getParam("toggleSearch")}
          />
        )
      })
    },
    CocktailDetails: {
      screen: CocktailDetails,
      navigationOptions: ({ navigation }) => ({
        title: navigation.getParam("title")
      })
    }
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#0086b3"
      },
      headerTintColor: "#fff"
    }
  }
);

export default createAppContainer(MainNavigator);

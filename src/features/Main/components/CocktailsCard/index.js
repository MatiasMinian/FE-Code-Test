import React, { Fragment, PureComponent } from "react";
import PropTypes from "prop-types";
import {
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from "react-native";
import Card from "../../../../components/Card";

export default class CocktailsCard extends PureComponent {
  onPress = () => {
    const { id, title, onPress } = this.props;
    onPress(id, title);
  };

  render() {
    const { title, image } = this.props;
    return (
      <Card style={styles.card}>
        <TouchableHighlight onPress={this.onPress}>
          <View style={styles.container}>
            <View style={styles.flex}>
              <Text style={styles.title}>{title}</Text>
            </View>
            <View style={styles.flex}>
              <Image source={{ uri: image }} style={styles.image} resizeMode="stretch" />
            </View>
          </View>
        </TouchableHighlight>
      </Card>
    );
  }
}

CocktailsCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  card: {
    height: 170,
    marginVertical: 10
  },
  container: {
    display: "flex",
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#fff"
  },
  flex: {
    flex: 1
  },
  image: {
    height: "100%",
    borderRadius: 3
  },
  title: {
    fontSize: 25
  }
});

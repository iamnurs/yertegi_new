import React, { Component } from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  Text,
  FlatList,
  TouchableOpacity,
  Platform
} from "react-native";
import { BoxShadow } from "react-native-shadow";
import { Icon } from "react-native-elements";
import tales from "../assets/tales";

const shadowOpt = {
  width: 130,
  height: 180,
  color: "#908686",
  border: 5,
  radius: 3,
  opacity: 0.3,
  x: 2,
  y: 4,
  style: { bottom: 5 }
};

export default class MainPage extends Component {
  state = {
    data: tales,
    noData: false,
    isReady: false
  };

  componentDidMount() {
    this.props.navigation.setParams({
      searchText: this.searchText
    });
  }

  searchText = e => {
    let text = e.toLowerCase();
    let foundTales = tales;
    let filteredName = foundTales.filter(item => {
      return item.name.toLowerCase().match(text);
    });
    if (!text || text === "") {
      this.setState({
        data: tales,
        noData: false
      });
    } else if (!Array.isArray(filteredName) || !filteredName.length) {
      this.setState({
        data: tales,
        noData: true
      });
    } else if (Array.isArray(filteredName)) {
      this.setState({
        noData: false,
        data: filteredName
      });
    }
  };

  _handleFinishLoading = () => {
    this.setState({ isReady: true });
  };

  _keyExtractor = (item, index) => {
    return index;
  };

  _renderItem = item => {
    return (
      <View style={[styles.container]}>
        <BoxShadow setting={shadowOpt}>
          <ImageBackground style={styles.book} source={item.item.image}>
            <TouchableOpacity
              style={styles.overlay}
              activeOpacity={0.7}
              onPress={() =>
                this.props.navigation.navigate("Tale", {
                  title: item.item.name,
                  text: item.item.text
                })
              }
            >
              <Text style={styles.text}>{item.item.name}</Text>
            </TouchableOpacity>
            {item.item.audio !== "" && (
              <Icon
                name="controller-play"
                type="entypo"
                color="#fff"
                raised
                containerStyle={styles.iconContainer}
                onPress={() =>
                  this.props.navigation.navigate("Player", {
                    title: item.item.name,
                    image: item.item.image,
                    audio: item.item.audio
                  })
                }
              />
            )}
          </ImageBackground>
        </BoxShadow>
      </View>
    );
  };

  render() {
    return (
      <View style={this.props.style}>
        {!this.state.noData && (
          <FlatList
            style={styles.flatlist}
            data={this.state.data}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
            initialNumToRender={10}
            numColumns={2}
            getItemLayout={(data, index) => ({
              length: 180,
              offset: 180 * index,
              index
            })}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 200,
    justifyContent: "flex-end",
    alignItems: "center",
    flex: 1
  },
  book: {
    bottom: 0,
    width: 130,
    height: 180,
    borderRadius: 10
  },
  text: {
    alignSelf: "center",
    fontSize: 17,
    color: "#fff",
    textAlign: "center",
    fontFamily: Platform.OS === "ios" ? "PT Serif" : "serif",
    fontStyle: "italic"
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.2)",
    justifyContent: "center"
  },
  iconContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#00B1B5",
    width: 40,
    height: 40
  }
});

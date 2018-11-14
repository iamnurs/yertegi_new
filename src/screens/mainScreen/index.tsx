import React, { Component } from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  Text,
  FlatList,
  TouchableOpacity,
  Platform,
  StatusBar,
} from "react-native";
import { Icon, SearchBar } from "react-native-elements";
import { NavigationScreenProp, NavigationState } from "react-navigation";
import { observer, inject } from "mobx-react";
import { TalesStore } from "@stores";
import { keyExtractor } from "../../utils";
import { width, height } from "../../constants";

interface IProps {
  navigation: NavigationScreenProp<NavigationState>;
  talesStore?: TalesStore;
}

@inject("talesStore")
@observer
export default class MainPage extends Component<IProps> {
  public static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: (
        <Icon
          color="#fff"
          onPress={() => navigation.toggleDrawer()}
          containerStyle={styles.backIcon}
          name="menu"
          type="entypo"
        />
      ),
      headerTitle: !navigation.getParam("search") ? (
        <Text style={styles.title}>Ертегілер</Text>
      ) : (
        <SearchBar
          lightTheme={true}
          round={true}
          autoFocus={true}
          containerStyle={styles.search}
          inputStyle={styles.input}
          onChangeText={navigation.getParam("searchText")}
          icon={{ type: "font-awesome", name: "search" }}
          placeholder="Іздеу"
          onSubmitEditing={() => navigation.setParams({ search: false })}
          onEndEditing={() => navigation.setParams({ search: false })}
        />
      ),
      headerRight: !navigation.getParam("search") && (
        <Icon
          color="#fff"
          type="ionicon"
          name="md-search"
          onPress={() => navigation.setParams({ search: true })}
          containerStyle={styles.searchIcon}
        />
      )
    };
  };

  public componentDidMount() {
    const { talesStore } = this.props;
    this.props.navigation.setParams({
      searchText: talesStore.searchText
    });
  }

  public render() {
    const { talesStore } = this.props;
    return (
      <View style={{flex: 1}}>
        <StatusBar backgroundColor="#00B1B5" barStyle="light-content" />
        <ImageBackground
          source={require("../../../assets/images/background.jpg")}
          style={styles.backImage}
        >
          {talesStore.tales.length !== 0 && (
            <FlatList
              style={styles.flatlist}
              data={talesStore.tales.slice()}
              keyExtractor={keyExtractor}
              renderItem={this.renderItem}
              numColumns={2}
              getItemLayout={(data, index) => ({
                length: 180,
                offset: 180 * index,
                index
              })}
            />
          )}
        </ImageBackground>
      </View>
    );
  }

  private renderItem = ({ item }) => {
    return (
      <View style={[styles.container]}>
        <ImageBackground style={styles.book} source={item.image}>
          <TouchableOpacity
            style={styles.overlay}
            activeOpacity={0.7}
            onPress={() =>
              this.props.navigation.navigate("Tale", {
                title: item.name,
                text: item.text
              })
            }
          >
            <Text style={styles.text}>{item.name}</Text>
          </TouchableOpacity>
          {item.audio !== "" && (
            <Icon
              name="controller-play"
              type="entypo"
              color="#fff"
              raised={true}
              containerStyle={styles.iconContainer}
              onPress={() =>
                this.props.navigation.navigate("Player", {
                  title: item.name,
                  image: item.image,
                  audio: item.audio
                })
              }
            />
          )}
        </ImageBackground>
      </View>
    );
  };
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
  },
  title: {
    fontFamily: "serif",
    fontStyle: "italic",
    textAlign: "center",
    flex: 1,
    fontSize: 22,
    color: "#fff",
    fontWeight: "bold"
  },
  searchIcon: {
    marginRight: 10
  },
  search: {
    backgroundColor: "transparent",
    borderBottomWidth: 0,
    borderTopWidth: 0,
    flex: 1
  },
  input: {
    opacity: 0.7,
    backgroundColor: "#fff"
  },
  searchContainer: {
    flexDirection: "row",
    flex: 1
  },
  backIcon: {
    marginLeft: 10
  },
  backImage: {
    width,
    height,
    flex: 1
  },
  flatlist: {
    bottom: 0,
    marginBottom: 20
  }
});

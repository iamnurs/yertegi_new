import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  Text,
  TouchableOpacity,
  Linking
} from "react-native";
import { createStackNavigator, createDrawerNavigator } from "react-navigation";
import { Icon, SearchBar } from "react-native-elements";
import Rate, { AndroidMarket } from "react-native-rate";
import SplashScreen from 'react-native-splash-screen'

import MainPage from "./components/MainPage";
import TaleScreen from "./components/TaleScreen";
import PlayerScreen from "./components/PlayerScreen";

const styles = StyleSheet.create({
  background: {
    position: "absolute",
    top: 0,
    left: 0,
    flex: 1,
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height
  },
  container: {
    flex: 1
  },
  main: {
    flex: 1,
    backgroundColor: "transparent"
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
  drawerHeader: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    flex: 2
  },
  appImage: {
    width: 80,
    height: 80
  },
  appName: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 7
  },
  drawerItem: {
    height: 40,
    justifyContent: "center",
    borderBottomWidth: 1,
    borderColor: "#00B1B5"
  },
  drawerText: {
    marginLeft: 20,
    fontSize: 16
  },
  drawerFooter: {
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: "#00B1B5",
    flex: 1
  },
  name: {
    fontSize: 16,
    textAlign: "center"
  },
  org: {
    fontSize: 13
  },
  drawerButtons: {
    flex: 4
  }
});

class Home extends Component {
  static navigationOptions = ({ navigation }) => {
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
          lightTheme
          round
          autoFocus
          containerStyle={styles.search}
          inputStyle={styles.input}
          onChangeText={navigation.getParam("searchText")}
          icon={{ type: "font-awesome", name: "search" }}
          placeholder="Іздеу"
          onSubmitEditing={() => navigation.setParams({ search: false })}
          onEndEditing={() => navigation.setParams({ search: false })}
          disableFullscreenUI
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

  componentDidMount() {
    // do stuff while splash screen is shown
      // After having done stuff (such as async tasks) hide the splash screen
      SplashScreen.hide();
  }

  render() {
    return (
      <View style={styles.main}>
        <Image
          source={require("./assets/images/background.jpg")}
          style={[styles.background]}
        />
        <MainPage style={styles.container} navigation={this.props.navigation} />
      </View>
    );
  }
}

const RootStack = createStackNavigator(
  {
    Home: {
      screen: Home
    },
    Tale: {
      screen: TaleScreen
    },
    Player: {
      screen: PlayerScreen
    }
  },
  {
    initialRouteName: "Home",
    navigationOptions: {
      headerStyle: {
        backgroundColor: "#00B1B5"
      },
      headerTintColor: "#fff"
    }
  }
);

const DrawerContent = props => (
  <View style={styles.container}>
    <View style={styles.drawerHeader}>
      <Image
        style={styles.appImage}
        source={require("./assets/images/appIcon.png")}
      />
      <Text style={styles.appName}>Yertegi</Text>
    </View>
    <View style={styles.drawerButtons}>
      <TouchableOpacity
        style={styles.drawerItem}
        onPress={() => Linking.openURL("mailto: nursultan1998@gmail.com")}
      >
        <Text style={styles.drawerText}>Ұсыныстар</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.drawerItem}
        onPress={() => {
          let options = {
            AppleAppID: "1421122494",
            GooglePackageName: "com.yertegi.yertegi",
            preferredAndroidMarket: AndroidMarket.Google
          };
          Rate.rate(options);
        }}
      >
        <Text style={styles.drawerText}>Бағалау</Text>
      </TouchableOpacity>
    </View>
    <View style={styles.drawerFooter}>
      <Text style={styles.name}>Нұрсұлтан Ахметжанов</Text>
      <Text style={styles.org}>n17r.com</Text>
    </View>
  </View>
);

export default (MyDrawerNavigator = createDrawerNavigator(
  {
    Home: {
      screen: RootStack
    }
  },
  { contentComponent: DrawerContent }
));
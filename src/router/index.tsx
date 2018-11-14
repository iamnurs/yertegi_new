import { createStackNavigator, createDrawerNavigator } from 'react-navigation';
import { MainScreen, TaleScreen, PlayerScreen } from '../screens';
import React from "react";
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  Text,
  TouchableOpacity,
  Linking,
  Platform
} from "react-native";
import Rate, { AndroidMarket } from "react-native-rate";

const RootStack = createStackNavigator(
  {
    Home: {
      screen: MainScreen
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

const DrawerContent = () => (
  <View style={styles.container}>
    <View style={styles.drawerHeader}>
      <Image
        style={styles.appImage}
        source={require("../../assets/images/appIcon.png")}
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
          const options = {
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
    </View>
  </View>
);


const Router = createDrawerNavigator(
  {
    Home: {
      screen: RootStack
    }
  },
  { contentComponent: DrawerContent }
);

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
    fontFamily: Platform.OS === "ios" ? "PT Serif" : "serif",
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

export default Router;

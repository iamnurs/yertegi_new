import React, { Component } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Platform
} from "react-native";
import Modal from "react-native-modal";
import { Icon, Slider } from "react-native-elements";

const styles = StyleSheet.create({
  text: {
    marginLeft: 17,
    marginRight: 17,
    marginTop: 17,
    lineHeight: 27
  },
  headerButton: {
    fontSize: 15,
    color: "#fff",
    marginRight: 10
  },
  modalContainer: {
    alignSelf: "stretch",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "grey",
    bottom: 0
  },
  select: {
    flexDirection: "row",
    marginTop: 10
  },
  modeSelect: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5
  },
  modal: {
    justifyContent: "flex-end",
    alignSelf: "center",
    marginBottom: 0,
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width
  },
  fontSelect: {
    flex: 1,
    textAlign: "center",
    marginTop: 5,
    fontSize: 15,
    height: 30
  },
  smallText: {
    fontSize: 10,
    textAlign: "center",
    flex: 1,
    alignSelf: "center"
  },
  largeText: {
    fontSize: 20,
    textAlign: "center",
    flex: 1,
    alignSelf: "center"
  },
  slider: {
    flex: 8
  }
});

export default class TaleScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam("title"),
      headerTitleStyle: {
        fontFamily: Platform.OS === 'ios' ? "PT Serif":"serif",
        fontStyle: "italic"
      },
      headerRight: (
        <Text
          style={styles.headerButton}
          onPress={navigation.state.params.setting}
        >
          Баптау
        </Text>
      )
    };
  };

  handleSettings = () => {
    this.setState({ settings: true });
  };

  state = {
    fontLoaded: false,
    fontSize: 15,
    fontFamily: Platform.OS === 'ios' ? "PT Serif":"serif",
    backColor: "#fff",
    textColor: "#000",
    settings: false
  };

  componentDidMount() {
    this.props.navigation.setParams({ setting: this.handleSettings });
  }

  render() {
    return (
      <ScrollView style={{ backgroundColor: this.state.backColor }}>
        <Text
          style={[
            styles.text,
            {
              fontFamily: this.state.fontFamily,
              fontSize: this.state.fontSize,
              color: this.state.textColor
            }
          ]}
        >
          {"\t"}
          {this.props.navigation.getParam("text")}
        </Text>
        <Modal
          isVisible={this.state.settings}
          onBackdropPress={() => this.setState({ settings: false })}
          onBackButtonPress={() => this.setState({ settings: false })}
          backdropOpacity={0.6}
          style={[styles.modal]}
        >
          <View style={styles.modalContainer}>
            <View style={styles.select}>
              <TouchableOpacity
                style={styles.modeSelect}
                onPress={() =>
                  this.setState({ backColor: "#fff", textColor: "#000" })
                }
              >
                <Icon
                  name="sun"
                  color={this.state.backColor === "#fff" ? "tomato" : "grey"}
                  type="feather"
                />
                <Text
                  style={{
                    color: this.state.backColor === "#fff" ? "tomato" : "grey"
                  }}
                >
                  Күн
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modeSelect}
                onPress={() =>
                  this.setState({ backColor: "#000", textColor: "#fff" })
                }
              >
                <Icon
                  name="moon"
                  color={this.state.backColor === "#000" ? "tomato" : "grey"}
                  type="feather"
                />
                <Text
                  style={{
                    color: this.state.backColor === "#000" ? "tomato" : "grey"
                  }}
                >
                  Түн
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.select}>
              <Text
                style={[
                  styles.fontSelect,
                  {
                    color: (this.state.fontFamily === "roman" || this.state.fontFamily === "Times New Roman") ? "tomato" : "grey"
                  }
                ]}
                onPress={() => this.setState({ fontFamily: Platform.OS === 'ios' ? "Times New Roman":"roman" })}
              >
                TN Roman
              </Text>
              <Text
                style={[
                  styles.fontSelect,
                  {
                    color: (this.state.fontFamily === "serif" || this.state.fontFamily === "PT serif") ? "tomato" : "grey"
                  }
                ]}
                onPress={() => this.setState({ fontFamily: Platform.OS === 'ios' ? "PT Serif":"serif" })}
              >
                Serif
              </Text>
              <Text
                style={[
                  styles.fontSelect,
                  {
                    color:
                      this.state.fontFamily === "tahoma" ? "tomato" : "grey"
                  }
                ]}
                onPress={() => this.setState({ fontFamily: "tahoma" })}
              >
                Tahoma
              </Text>
            </View>
            <View style={styles.select}>
              <Text style={styles.smallText}>Aa</Text>
              <Slider
                value={this.state.fontSize}
                onValueChange={value => this.setState({ fontSize: value })}
                maximumValue={20}
                minimumValue={10}
                style={styles.slider}
                step={1}
              />
              <Text style={styles.largeText}>Aa</Text>
            </View>
          </View>
        </Modal>
      </ScrollView>
    );
  }
}

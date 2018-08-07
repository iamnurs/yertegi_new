import React, { Component } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  Dimensions,
  NetInfo
} from "react-native";
import Modal from "react-native-modal";
import { Icon, Slider } from "react-native-elements";
import Video from "react-native-video";

export default class PlayerScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam("title"),
      headerTitleStyle: {
        fontFamily: "serif",
        fontStyle: "italic"
      }
    };
  };

  state = {
    paused: true,
    totalLength: 1,
    currentPosition: 0,
    selectedTrack: 0,
    isLoaded: false
  };

  setDuration = data => {
    this.setState({ totalLength: Math.floor(data.duration), isLoaded: true });
  };

  setTime = data => {
    this.setState({
      currentPosition: Math.floor(data.currentTime)
    });
  };

  seek = time => {
    time = Math.round(time);
    this.refs.audioElement && this.refs.audioElement.seek(time);
    this.setState({
      currentPosition: time,
      paused: false
    });
  };

  playPausPress = () => {
    this.setState(prevState => {
      return { paused: !prevState.paused };
    });
  };

  onForward = () => {
    if (this.state.totalLength - this.state.currentPosition <= 10) {
      this.seek(0);
    } else {
      this.seek(this.state.currentPosition + 10);
    }
  };

  onBack = () => {
    if (this.state.currentPosition <= 10) {
      this.seek(0);
    } else {
      this.seek(this.state.currentPosition - 10);
    }
  };

  pad = (n, width, z = 0) => {
    n = n + "";
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  };

  minutesAndSeconds = position => [
    this.pad(Math.floor(position / 60), 2),
    this.pad(position % 60, 2)
  ];

  render() {
    const elapsed = this.minutesAndSeconds(this.state.currentPosition);
    const remaining = this.minutesAndSeconds(this.state.totalLength);
    return (
      <View style={styles.container}>
        <Modal
          isVisible={!this.state.isLoaded}
          backdropOpacity={0.6}
          style={[styles.modal]}
          onBackButtonPress={() => this.props.navigation.goBack()}
        >
          <ActivityIndicator size="large" color="#00B1B5" />
        </Modal>
        <Image
          style={styles.portrait}
          source={this.props.navigation.getParam("image")}
        />
        <View style={[styles.playbackContainer]}>
          <View>
            <Slider
              style={styles.playbackSlider}
              minimumTrackTintColor="#00B1B5"
              onSlidingStart={() => this.setState({ paused: true })}
              maximumValue={Math.max(
                this.state.totalLength,
                1,
                this.state.currentPosition + 1
              )}
              onSlidingComplete={this.seek}
              value={this.state.currentPosition}
            />
            <Text style={[styles.timeText]}>
              {elapsed[0] + ":" + elapsed[1]}/{this.state.totalLength === 1
                ? "00:00"
                : remaining[0] + ":" + remaining[1]}
            </Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>
              {this.props.navigation.getParam("title")}
            </Text>
          </View>
          <View style={[styles.buttonsContainer]}>
            <Icon
              raised
              color="#00B1B5"
              underlayColor="#fff"
              containerStyle={styles.backForwardIcon}
              type="materialicons"
              name="replay-10"
              onPress={this.onBack}
            />
            <Icon
              raised
              color="#00B1B5"
              underlayColor="#fff"
              containerStyle={styles.playIcon}
              name={!this.state.paused ? "controller-paus" : "controller-play"}
              onPress={this.playPausPress}
              type="entypo"
            />
            <Icon
              raised
              color="#00B1B5"
              underlayColor="#fff"
              containerStyle={styles.backForwardIcon}
              type="materialicons"
              name="forward-10"
              onPress={this.onForward}
            />
          </View>
        </View>
        <Video
          source={{
            uri: `https://api.backendless.com/DAA77BA2-BFDD-D954-FFCF-E21433816500/11448731-2FCF-5D64-FF26-58DF40006E00/files/${this.props.navigation.getParam(
              "audio"
            )}`
          }}
          ref="audioElement"
          paused={this.state.paused} // Pauses playback entirely.
          onLoad={this.setDuration} // Callback when video loads
          onProgress={this.setTime} // Callback every ~250ms with currentTime
          style={styles.audioElement}
          repeat
          playInBackground
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  portrait: {
    marginTop: 20,
    resizeMode: "contain",
    flex: 1,
    alignSelf: "center"
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  backForwardIcon: {
    width: 50,
    height: 50
  },
  playIcon: {
    marginLeft: 10,
    marginRight: 10,
    width: 60,
    height: 60
  },
  playbackContainer: {
    alignSelf: "stretch",
    marginTop: 20,
    marginLeft: 7,
    marginRight: 7,
    flex: 1,
    justifyContent: "space-around"
  },
  timeText: {
    alignSelf: "flex-end",
    fontSize: 14,
    marginTop: -5,
    marginRight: 7
  },
  textContainer: {
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    fontFamily: "serif",
    fontSize: 20,
    textAlign: "center",
    alignSelf: "center"
  },
  loadingText: {
    fontSize: 15,
    height: 20
  },
  modal: {
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: 0,
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width
  },
  audioElement: {
    height: 0,
    width: 0
  }
});

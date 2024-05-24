import React, { Component } from "react";
import { View, Image, AsyncStorage, StyleSheet } from "react-native";

import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";

import { Text } from "react-native-elements";

import { hideNavigationBar } from "react-native-navigation-bar-color";

import styles from "../../app/style/style";
import functions from "../../app/function/function";

import Video from "react-native-video";

import "../config/config";

let timeOut = 2000;
let step1 = 1000;
let step2 = 500;
let value, zip, trainning;

class Splash1 extends Component {
  constructor(props) {
    super(props);
    this.opacity = new Animated.Value(0);

    this.state = {
      data: null,
      isLoading: true
    };
  }

  async componentDidMount() {
    /*Animated.timing(this.opacity, {
      duration: timeOut + step1, // some number in milliseconds
      toValue: 1,
      easing: Easing.circle // or whatever final opacity you'd like
    }).start();*/
    hideNavigationBar();

    /*value = await AsyncStorage.getItem("dataPersonal");

    const data = await this.performTimeConsumingTask();

    if (data !== null) {
      this.setState({ isLoading: false });
    }*/
  }

  /*performTimeConsumingTask = async () => {
    return new Promise((resolve) =>
      setTimeout(() => {
        resolve("result");
      }, timeOut + step1 + step2 + 500)
    );
  };*/

  endVideo = async () => {
    value = await AsyncStorage.getItem("data");
    zip = await AsyncStorage.getItem("zip");
    trainning = await AsyncStorage.getItem(global.trainning);

    try {
      value = JSON.parse(value);
      trainning = JSON.parse(trainning);
    } catch (error) {
      value = {};
      trainning = [];
    }

    value = value != null ? value : {};

    this.setState({ data: value, isLoading: false });
  }

  render() {
    if (this.state.isLoading)
      return (
        <Video
          source={{
            uri: "https://www.morpheus-cms.de/vu/Wewantu_Animation.mp4",
          }} // Can be a URL or a local file.
          style={style.backgroundVideo}
          onEnd={() => this.endVideo()}
        />
      );
    else {
      global.commonData = this.state.data;
      global.zip = zip;
      global.tranining = trainning;

      if (this.state.data != null) {
        try {
          if (!global.commonData.switch && global.commonData.user != null)
            functions.gotoScreen(this.props.navigation, "HomeScreen");
          else functions.gotoScreen(this.props.navigation, "LoginScreen");
        } catch (error) {
          console.log(error);
        }
      }
    }
  }
}

var style = StyleSheet.create({
  backgroundVideo: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000",
  },
});

export default Splash1;

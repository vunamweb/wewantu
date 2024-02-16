import React, { Component, createRef } from "react";
import {
  StyleSheet,
  View,
  AsyncStorage,
  Dimensions,
  ActivityIndicator,
} from "react-native";

import Video from "react-native-video";

import { ScrollView } from "react-native-gesture-handler";

import Background from "../components/Background";
import TextHeader2 from "../components/TextHeader2";
import TextHeader from "../components/TextHeader";
import IconBottom from "../components/IconBottom";
import Header from "../components/Header";

import styles from "../../app/style/style";
import functions from "../../app/function/function";

const borderColor = "#000";

const iconPlay = require("../images/play.png");

const data = [
  {
    label: "Is ja gut, ich habs verstanden",
    require: false,
  },
];

const data1 = [
  {
    link: "https://morpheus-cms.de/vu/video2.mp4",
  },

  {
    link: "https://morpheus-cms.de/vu/video1.mp4",
  },

  {
    link: "https://morpheus-cms.de/vu/video3.mp4",
  },
];

class Wlb extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true };
  }

  componentDidMount = async () => {
    const data = await this.performTimeConsumingTask();
    if (data !== null) {
      this.setState({ isLoading: true });
    }
  };

  callBack = (index) => {
    var data = {};

    data.type = index;
    data.value = 0;

    functions.gotoScreenWithParam(JSON.stringify(data), this.props.navigation, 'WorkFeeling');
  }

  performTimeConsumingTask = async () => {
    return new Promise((resolve) =>
      setTimeout(() => {
        resolve("result");
      }, 2000)
    );
  };

  static navigationOptions = ({ navigation }) => ({
    title: "",
  });

  render() {
    if (this.state.isLoading)
      return (
        <View style={styles.flexFull}>
          <Header component={this} />
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <Background>
            <TextHeader text1="tell" text2="us" text3="about" />
              <TextHeader2 
              text1="work" 
              text2="life" 
              text3="balance"
              callBack1={() => this.callBack(1)}
              callBack2={() => this.callBack(2)}
              callBack3={() => this.callBack(3)}
              />
            </Background>
          </ScrollView>
          <View style={[styles.bottomNavigation, styles.marginTopNavigation]}>
            {/* Bottom */}
            <IconBottom component={this} type="1" />
            {/* END */}
          </View>
        </View>
      );
    else {
      functions.gotoScreen(this.props.navigation, "WorkFeeling");
    }
  }
}

const style = StyleSheet.create({});

export default Wlb;

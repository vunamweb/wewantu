import React, { Component, createRef } from "react";
import {
  StyleSheet,
  View,
  AsyncStorage,
  Dimensions,
  TouchableOpacity,
} from "react-native";

import { ScrollView } from "react-native-gesture-handler";
import { hideNavigationBar } from "react-native-navigation-bar-color";

import Background from "../components/Background";
import TextHeader from "../components/TextHeader";
import Text from "../components/Paragraph";
import Image from "../components/Image";
import IconBottom from "../components/IconBottom";
import Header from "../components/Header";

import styles from "../../app/style/style";
import functions from "../../app/function/function";

const borderColor = "#000";
const bgDefault = "#2B2B2B";
const bgFocus = "#898166";
const imgNotification = require("../images/notification.png");
const imgDelete = require("../images/delete_large.png");

class DeleteJob extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true };
  }

  state = {};

  onClickItem = (index, link) => {
    this.collapse.current.setState({ activeIndex: index });
    functions.gotoScreen(this.props.navigation, link);
  };

  async componentDidMount() {
    // Preload data from an external API
    // Preload data using AsyncStorage
    const data = await this.performTimeConsumingTask();
    if (data !== null) {
      this.setState({ isLoading: false });
    }
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
          <ScrollView contentContainerStyle={styles.scroll}>
            <Background>
              <TextHeader special={true} icon={imgNotification} text2="jobs" />
              <Image style={style.view1} source={imgDelete} />
              <Text style={[styles.fontBoldNormal, style.view2]}>Gelöscht</Text>
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
      functions.gotoScreen(this.props.navigation, "NewJob");
    }
  }
}

const style = StyleSheet.create({
  view1: {
    marginTop: 60,
  },

  view2: {
    marginTop: 40,
  },
});

export default DeleteJob;

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
import Logo from "../components/Logo";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import TextHeader from "../components/TextHeader";
import HeadLine from "../components/HeadLine";
import Text from "../components/Paragraph";
import Drawer from "../components/Drawer";
import MessageNotification from "../components/MessageNotification";
import Collapse from "../components/Collapse";
import Image from "../components/Image";
import Href from "../components/Href";
import IconBottom from "../components/IconBottom";

import styles from "../../app/style/style";
import functions from "../../app/function/function";

const borderColor = "#000";
const bgDefault = "#151515";
const bgFocus = "#3a3a3a";
const imgNotification = require("../images/white_notification.png");
const imgHand = require("../images/hand_cobration.png");

const data1 = [
  {
    text: "Neue Job Angebote",
    link: "NewJob",
  },
  {
    text: "Meine Matches",
    link: "",
  },
  {
    text: "Mein Merkzettel",
    link: "",
  },
  {
    text: "Meine Nachrichten",
    link: "",
  },
];

class ConfirmLike extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true };
  }

  state = {};

  onClickItem = (index, link) => {
    this.collapse.current.setState({ activeIndex: index });
    functions.gotoScreen(this.props.navigation, link);
  };

  _renderItem = ({ item, index }) => {
    let height = item.border == "none" ? 0 : 1;
    let link = item.link != null ? item.link : "HomeScreen";

    var borderTop = (
      <View style={[{ height: height }, styles.borderTopAndBottom]} />
    );

    var borderBottom = (
      <View
        style={[
          { height: height },
          styles.borderTopAndBottom,
          style.borderBottom,
        ]}
      />
    );

    var bgColor =
      this.collapse.current != null &&
      index == this.collapse.current.state.activeIndex
        ? bgFocus
        : bgDefault;

    return (
      <TouchableOpacity
        style={[{ backgroundColor: bgColor }, style.root]}
        onPress={() => this.onClickItem(index, item.link)}
        onBlur={() => this.collapse.setState({ activeIndex: -1 })}
      >
        <View style={[styles.flexRowStart, styles.fullWith]}>
          <View style={styles.flexFull}>
            {borderTop}
            <View
              style={[styles.flexRowStart, styles.listView, { marginTop: -10 }]}
            >
              <Text style={[styles.fontBoldSmall, styles.textCapitalize]}>
                {item.text}
              </Text>
            </View>
            {borderBottom}
          </View>
        </View>
      </TouchableOpacity>
    );
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
    var commonData = global.commonData.languages;

    try {
      var text1 = commonData.jobs;
      var text2 = commonData.YOUR_MATCH_HAS_BEEN;
      var text3 = commonData.SUCCESSFULLY_SUBMITTED;
    } catch (error) {
      console.log(error);
    }

    if (this.state.isLoading)
      return (
        <View style={styles.flexFull}>
          <ScrollView contentContainerStyle={styles.scroll}>
            <Background>
              <Logo navigation={this.props.navigation} type={1} />
              <TextHeader
                styleSpecialIcon={style.styleSpecialIcon}
                special={true}
                icon={imgNotification}
                text2={text1}
              />
              <Image style={style.img1} source={imgHand} />
              <Text style={[style.text, styles.fontBoldNormal]}>{text2}</Text>
              <Text style={[style.text, styles.fontBoldNormal]}>{text3}</Text>
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
      functions.backScreen(this.props.navigation);
    }
  }
}

const style = StyleSheet.create({
  root: {
    marginBottom: 5,
    height: 35,
  },

  borderBottom: {
    marginTop: 7,
  },

  text: {
    //marginTop: 200,
  },

  styleSpecialIcon: {
    marginLeft: 10,
    marginTop: -5,
  },

  img1: {
    marginTop: 80,
    marginBottom: 80,
  },
});

export default ConfirmLike;

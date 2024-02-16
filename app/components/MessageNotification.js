import React from "react";
import { StyleSheet, View, AsyncStorage, Dimensions, PixelRatio } from "react-native";

import Text from "../components/Paragraph";
import Image from "../components/Image";
import Href from "../components/Href";

import styles from "../../app/style/style";
import functions from "../../app/function/function";

import '../config/config';

const alert = require("../images/Chat_Alert.png");
const newJob = require("../images/Neue_Jobs_Alert.png");

const pixelRatio = global.pixelRatio;

const TOP = (15 * pixelRatio) * PixelRatio.getFontScale();

export default function MessageNotification(props) {
  return (
    <View style={[styles.flexRow, styles.logo_0, style.view]}>
      <Href onPress={() => functions.gotoScreen(props.component.props.navigation, 'Message')}>
      <Image source={alert} />
      </Href>
      <Href onPress={() => functions.gotoScreen(props.component.props.navigation, 'NewJob')}>
      <Image style={style.marginLeft} source={newJob} />
      </Href>
    </View>
  );
}

const style = StyleSheet.create({
  view: {
    left: 20,
    marginTop: TOP
  },

  marginLeft: {
    marginLeft: 20,
  },
});

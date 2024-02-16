import React from "react";
import { View, StyleSheet, Image, PixelRatio } from "react-native";

import Text from "./Paragraph";

import styles from "../../app/style/style";

import '../config/config';

const arrowDown = require("../images/arrow.png");

const pixelRatio = global.pixelRatio;

// SET TOP, RIGHT FOR DRAWER
const MARGIN_TOP_ROOT = (10 * pixelRatio) * PixelRatio.getFontScale();
const MARGIN_BOTTOM_ROOT = (20 * pixelRatio) * PixelRatio.getFontScale() ;
const MARGIN_TOP_TEXT = (-50 * pixelRatio) * PixelRatio.getFontScale() ;

export default function TextHeader1({ text }) {
return (
    <View style={[style.view, styles.alignCenter]}>
      <Text style={[styles.fontBoldLarge, styles.textHeader_2, style.text1]}>{text}</Text>
      <Text style={[styles.fontBoldLarge, styles.textHeader_1, style.text2]}>...</Text>
      <Image source={arrowDown} />
    </View>
  );
}

const style = StyleSheet.create({
  view: {
    marginTop: MARGIN_TOP_ROOT,
    marginBottom: MARGIN_BOTTOM_ROOT,
    justifyContent: 'flex-start',
  },

  text1: {
    marginTop: MARGIN_TOP_ROOT
  },

  text2: {
    marginTop: MARGIN_TOP_TEXT,
  },
});

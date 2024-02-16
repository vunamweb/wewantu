import React from "react";
import { View, StyleSheet, Image } from "react-native";

import Text from "./Paragraph";

import styles from "../../app/style/style";

export default function HeadLine({ text, ...props }) {
  const textrequire = props.require ? (
    <Text style={[styles.fontBoldNormal, style.require]}>*</Text>
  ) : null;
  return (
    <View
      style={[styles.flexRowStart, styles.fullWith, style.view, props.style]}
    >
      <Text style={[styles.fontBoldNormal, styles.textHeadLine, style.text]}>{text}</Text>
      {textrequire}
    </View>
  );
}

const style = StyleSheet.create({
  view: {
    marginTop: 20,
  },

  require: {
    marginLeft: 10,
    marginTop: -3,
  },

  text: {
    textTransform: "uppercase",
    textDecorationLine: 'underline',
    marginLeft: 0,
    marginTop: -1
  }
});

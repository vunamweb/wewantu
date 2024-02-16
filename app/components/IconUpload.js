import React from "react";
import { View, StyleSheet } from "react-native";

import Text from "./Paragraph";
import Image from "./Image";

import styles from "../../app/style/style";

const arrowDown = require("../images/arrow.png");

export default function IconUpload({ img1, img2, text1, text2, ...props }) {
  return (
    <View style={[style.root, props.style]}>
      <View style={[style.view]}>
        <Image style={style.img1} source={img1} />
        <View style={style.children}>
          <Image source={img2} />
        </View>
      </View>
      <Text style={[style.text1, styles.fontBoldSmall]}>{text1}</Text>
      <Text style={[style.text2, styles.fontBoldSmall]}>{text2}</Text>
    </View>
  );
}

const style = StyleSheet.create({
  root: {
    alignItems: "center",
  },

  view: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  children: {
    position: "absolute",
    width: 85,
    height: 85,
    top: 0,
    left: 0,
    //backgroundColor: 'red',
    justifyContent: "center",
    alignItems: "center",
  },

  text1: {
    marginTop: 5,
  },

  text2: {},

  img1: {
    //width: 40,
    //height:40
  }
});

import React from "react";
import { View, StyleSheet } from "react-native";

import Text from "./Paragraph";
import Image from "./Image"

import styles from "../../app/style/style";

const arrowDown = require("../images/arrow.png");

export default function TextHeader({ text1, text2, text3, text4, special, icon, setMargin, styleSpecialIcon, ...props }) {
  var iconSpecial = <Image style={styleSpecialIcon} source={icon} />;
  //var fontSpecial = (special != undefined) ? styles.fontBoldSpecial : null;
  var fontSpecial = (special != undefined) ? null : null;
  
  var textHeader_3 =
    text3 != undefined ? (
      <Text style={[styles.fontBoldLarge, styles.textHeader_3]}>{text3}</Text>
    ) : null;
  var textHeader_1 =
    text1 != undefined ? (
      <Text style={[styles.fontBoldLarge, styles.textHeader_1]}>{text1}</Text>
    ) : null;

  var textHeader_2 =
    text1 != undefined ? (
      <Text style={[styles.fontBoldLarge, styles.textHeader_2]}>{text2}</Text>
    ) : (
      <Text style={[styles.fontBoldLarge, styles.textHeader_2, style.text2, fontSpecial]}>
        {text2}
      </Text>
    );

  textHeader_2 = setMargin != undefined && setMargin ? null : textHeader_2;
  textHeader_2 = (special != undefined) ? <View style={[style.special]}>{textHeader_2}{iconSpecial}</View> : textHeader_2;

  var textHeader_4 =
  text4 != undefined ? (
    <Text style={[styles.fontBoldLarge, styles.textHeader_3]}>{text4}</Text>
  ) : null;

  var styleImg =
    setMargin != undefined && setMargin ? style.imgMargin : style.imgNoMargin;

  return (
    <View style={[style.view, styles.alignCenter, props.style]}>
      {textHeader_1}
      {textHeader_2}
      {textHeader_3}
      {textHeader_4}
      {
        special == undefined ? null : null
      }
    </View>
  );
}

const style = StyleSheet.create({
  view: {
    marginTop: 10,
    justifyContent: "flex-start",
  },

  text2: {
    marginTop: 0,
  },

  imgMargin: {
    marginTop: 20,
  },

  imgNoMargin: {
    marginTop: 0,
  },

  special: {
flexDirection: 'row',
marginTop: 30,
marginBottom: 0,
alignItems: 'center'
  }
});

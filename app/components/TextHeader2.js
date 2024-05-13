import React, { useState } from "react";
import { View, StyleSheet, Image, PixelRatio, Dimensions } from "react-native";

import Text from "./Paragraph";
import Href from "./Href";

import styles from "../../app/style/style";

import "../config/config";

const arrowDown = require("../images/arrow.png");

const pixelRatio = global.pixelRatio;

var widthSmall = 350; // small device as iphone 5s
var widthNormal = 390; // normal device as iphone 12, 14
var widthLarge = 530; // large device as tablet, ipad



// SET TOP, RIGHT FOR DRAWER
const LINE_HEIGHT = 77 * pixelRatio;

const windowWidth = Dimensions.get("window").width;

export default function TextHeader2({
  text1,
  text2,
  text3,
  callBack1,
  callBack2,
  callBack3,
}) {
  const [color1, setColor1] = useState('#898166');
  const [bg1, setBg1] = useState('#fff');
  const [color2, setColor2] = useState('#898166');
  const [bg2, setBg2] = useState('#fff');
  const [color3, setColor3] = useState('#898166');
  const [bg3, setBg3] = useState('#fff');

  const goToWork = () => {
    setColor1('#fff');
    setBg1('#898166');

    setColor2('#898166');
    setBg2('#fff');

    setColor3('#898166');
    setBg3('#fff');

    callBack1();
  };

  const goToLife = () => {
    setColor2('#fff');
    setBg2('#898166');

    setColor1('#898166');
    setBg1('#fff');

    setColor3('#898166');
    setBg3('#fff');

    callBack2();
  };

  const goToBalance = () => {
    setColor3('#fff');
    setBg3('#898166');

    setColor2('#898166');
    setBg2('#fff');

    setColor1('#898166');
    setBg1('#fff');

    callBack3();
  };



  var view1 = (
    <Href onPress={() => goToWork()} style={[style.rotatedText, { backgroundColor: bg1 }]}>
      <Text style={[styles.fontBoldSpecialOfSpecial, style.text1, { color: color1 }]}>work</Text>
    </Href>
  );

  var view2 = (
    <Href onPress={() => goToLife()} style={[style.rotatedText, { backgroundColor: bg2 }]}>
      <Text style={[styles.fontBoldSpecialOfSpecial, style.text2, { color: color2 }]}>life</Text>
    </Href>
  );

  var view3 = (
    <Href
      onPress={() => goToBalance()}
      style={[style.rotatedText, { backgroundColor: bg3 }]}
    >
      <Text style={[styles.fontBoldSpecialOfSpecial, style.text3, { color: color3 }]}>
        balance
      </Text>
    </Href>
  );

  if (windowWidth <= widthSmall)
    return (
      <View style={[style.view]}>
        <View style={{ marginTop: -22, paddingLeft: 50 }}>{view1}</View>
        <View style={{ marginLeft: -63, zIndex: 999999 }}>{view2}</View>
        <View style={{ marginLeft: -95, marginTop: -55 }}>{view3}</View>
      </View>
    );
  else
    return (
      <View style={[style.view]}>
        <View style={{ marginTop: -30, paddingLeft: 50 }}>{view1}</View>
        <View style={{ marginLeft: -73, zIndex: 999999 }}>{view2}</View>
        <View style={{ marginLeft: -110, marginTop: -68 }}>{view3}</View>
      </View>
    );

}

const style = StyleSheet.create({
  view: {
    position: "absolute",
    bottom: 50,
    flexDirection: "row",
    //justifyContent: 'flex-end'
    justifyContent: "center",
    //alignItems: 'flex-start'
    //justifyContent: 'center',
    //margin: 40
  },

  common: {},

  text1: {
    //color: "#898166",
    //lineHeight: LINE_HEIGHT,
    //margin: 50,
    textTransform: "uppercase",
    marginTop: -5,
  },

  text2: {
    //color: "#898166",
    textTransform: "uppercase",
    marginTop: -5,
    //backgroundColor: '#898166',
  },

  text3: {
    textTransform: "uppercase",
    marginTop: -5,
    //color: "#898166",
  },

  rotatedText: {
    transform: [{ rotate: "270deg" }], // Điều chỉnh góc xoay tại đây
    padding: 10,
    borderRadius: 5,
    paddingTop: 0,
    paddingBottom: 0,
    backgroundColor: "#898166",
    //alignItems: 'center'
  },
});

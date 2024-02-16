import React from "react";
import { View, StyleSheet, Image, PixelRatio, Dimensions } from "react-native";

import Text from "./Paragraph";
import Href from "./Href";

import styles from "../../app/style/style";

import "../config/config";

const arrowDown = require("../images/arrow.png");

const pixelRatio = global.pixelRatio;

// SET TOP, RIGHT FOR DRAWER
const LINE_HEIGHT = 77 * pixelRatio * PixelRatio.getFontScale();

const windowHeight = Dimensions.get("window").height;

export default function TextHeader2({
  text1,
  text2,
  text3,
  callBack1,
  callBack2,
  callBack3,
}) {
  var view1 = (
    <Href onPress={() => callBack1()} style={[style.rotatedText]}>
      <Text style={[styles.fontBoldSpecialOfSpecial, style.text1]}>work</Text>
    </Href>
  );

  var view2 = (
    <Href onPress={() => callBack2()} style={[style.rotatedText, { backgroundColor: "#fff" }]}>
      <Text style={[styles.fontBoldSpecialOfSpecial, style.text2]}>life</Text>
    </Href>
  );

  var view3 = (
    <Href
      onPress={() => callBack3()}
      style={[style.rotatedText, { backgroundColor: "#fff" }]}
    >
      <Text style={[styles.fontBoldSpecialOfSpecial, style.text3]}>
        balance
      </Text>
    </Href>
  );
  return (
    <View style={[style.view]}>
      <View style={{ marginTop: -30, paddingLeft: 50 }}>{view1}</View>
      <View style={{ marginLeft: -70 }}>{view2}</View>
      <View style={{ marginLeft: -110, marginTop: -68 }}>{view3}</View>

      {/*<Href style={[styles.fontBoldSpecialOfSpecial, style.rotatedText, style.text3]}>
      <Text>dddf</Text>
  </Href>*/}
      {/*<Href
      onPress={() => callBack1()}
      >
      <Text style={[styles.fontBoldSpecialOfSpecial, style.rotatedText, style.text1]}>
        {text1}
        {"\n"}
       <Href 
       onPress={() => callBack2()}
       style={{ margin: 0 }}
       >
        <Text style={[styles.fontBoldSpecialOfSpecial, style.text2]}>
        {text2}
        </Text>
        </Href>
        {"\n"}
        <Href
        onPress={() => callBack3()}
        >
        <Text style={[styles.fontBoldSpecialOfSpecial, style.text3]}>
        {text3}
          </Text>
          </Href>
      </Text>
  </Href>*/}
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
    color: "#898166",
    textTransform: "uppercase",
    marginTop: -5,
    //backgroundColor: '#898166',
  },

  text3: {
    textTransform: "uppercase",
    marginTop: -5,
    color: "#898166",
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

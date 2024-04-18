import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  PixelRatio,
  Dimensions,
} from "react-native";

import Icon from "react-native-vector-icons/FontAwesome";

import Image from "../components/Image";
import Text from "../components/Paragraph";

import functions from "../../app/function/function";
import styles from "../../app/style/style";

import "../config/config";

//const imgBack = require("../images/arrow_back.png");
//const imgNext = require("../images/arrow_next.png");

const pixelRatio = global.pixelRatio;
const percent = 45;

const LEFT_RIGHT = -20;

const windowWidth = Dimensions.get("window").width;

const WIDTH_BACK_NEXT = (windowWidth * percent) / 100;

const PADDING_LEFT_NEXT_BUTTON = (windowWidth * percent) / 100 + LEFT_RIGHT * 2;

const size = 40;

export default function BackNext({
  navigation,
  data,
  dataBack,
  position,
  callBack,
  nextScreen,
  text,
  text1,
  backScreen,
  backEnable,
  nextEnable,
  ref_,
  ...props
}) {
  const [dataParam, setDataParam] = useState(null);

  var imgBack = <Icon name="caret-left" size={size} color="#898166" />;
  var imgNext = <Icon name="caret-right" size={size} color="#898166" />;

  if (ref_ != undefined) ref_.ref_ = setDataParam;

  var back =
    backEnable || backEnable == undefined ? (
      <TouchableOpacity onPress={() => goToBackScreen()} style={style.back}>
        {imgBack}
        {text1 != undefined ? (
          <Text style={[styles.fontBoldSmall, style.text1]}>{text1}</Text>
        ) : null}
      </TouchableOpacity>
    ) : (
      <TouchableOpacity onPress={null} style={style.back} />
    );
  var next =
    nextEnable || nextEnable == undefined ? (
      <TouchableOpacity onPress={() => goTonextScreen()} style={style.next}>
        {text != undefined ? (
          <Text style={[styles.fontBoldSmall, style.text]}>{text}</Text>
        ) : null}
        {imgNext}
      </TouchableOpacity>
    ) : (
      <TouchableOpacity style={style.next} onPress={null} />
    );

  const goTonextScreen = () => {
    if (callBack()) {
      if (data == undefined) functions.gotoScreen(navigation, nextScreen);
      else {
        if (dataParam == null)
          functions.gotoScreenWithParam(data, navigation, nextScreen);
        else functions.gotoScreenWithParam(dataParam, navigation, nextScreen);
      }
    }
  };

  const goToBackScreen = () => {
    if (true) {
      if (dataBack == undefined) functions.backScreen(navigation);
      else functions.gotoScreenWithParam(dataBack, navigation, backScreen);
    }
  };

  return (
    <View
      style={[
        position == "absolute" ? style.BackNext : style.BackNextNotAbsolute,
        props.style,
        { position: position },
      ]}
    >
      {back}
      <View style={style.viewMiddle} />
      {next}
    </View>
  );
}

const style = StyleSheet.create({
  viewMiddle: {
    height: 5,
    marginTop: 27,
    backgroundColor: "#898166",
    width: "70%",
  },

  BackNext: {
    backgroundColor: "#2B2B2B",
    paddingTop: 8,
    paddingBottom: 8,
    bottom: 0,
    marginTop: 20,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
  },

  BackNextNotAbsolute: {
    width: "100%",
    backgroundColor: "#2B2B2B",
    paddingTop: 15,
    paddingBottom: 15,
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
  },

  back: {
    /*backgroundColor: "#2B2B2B",
    width: WIDTH_BACK_NEXT,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: LEFT_RIGHT * -1,
    //paddingRight: PADDING_LARGE,
    left: LEFT_RIGHT,*/
    marginRight: -31,
    //backgroundColor: 'red',
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30
    //height: 30
  },

  next: {
    /*backgroundColor: "#2B2B2B",
    width: WIDTH_BACK_NEXT,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: PADDING_LEFT_NEXT_BUTTON,
    right: LEFT_RIGHT,
    flexDirection: 'row'*/
    marginLeft: -30,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    //backgroundColor: 'red'
  },

  text: {
    position: "absolute",
    top: 12,
    left: PADDING_LEFT_NEXT_BUTTON - 60,
  },

  text1: {
    position: "absolute",
    top: 12,
    left: PADDING_LEFT_NEXT_BUTTON - 80,
  },
});

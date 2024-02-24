import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  AsyncStorage,
  Dimensions,
  PixelRatio,
} from "react-native";

import FlatListViewNormal from "../components/ListView";

import Text from "../components/Paragraph";
import Image from "../components/Image";
import Href from "../components/Href";

import styles from "../../app/style/style";
import styleChat from "../../app/style/style_chat";

import functions from "../../app/function/function";

import "../config/config";

import UtilityFirebase from "../function/UtilityFirebase";

const alert = require("../images/chat_message.png");
const newJob = require("../images/notification.png");

const pixelRatio = global.pixelRatio;

const TOP = 15 * pixelRatio * PixelRatio.getFontScale();

const windowWidth = Dimensions.get("window").width;

let root;

const gotoChat = () => {
  let key = {};
  key.fromUser = "12345678"; //userId;
  key.toUser = "1234";

  functions.gotoScreenWithParam(
    JSON.stringify(key),
    root.component.props.navigation,
    "Chat"
  );
};

const renderItem = ({ item, index }) => (
  <Href onPress={() => gotoChat()}>
    <View style={style.render}>
      <Text style={[styles.fontNormal, styles.fontBoldSmall]}>
        {item.data.name}
      </Text>
      <Text style={styles.fontNormal}>{item.data.message}</Text>
      <Text style={[styles.fontNormalSmall, style.dateTime]}>
        {item.data.date}
      </Text>
    </View>
  </Href>
);

export default function MessageNotification(props) {
  const [isEnabled, setIsEnabled] = useState(false);

  root = props;

  global.notification =
    global.notification != undefined ? global.notification : [];

  let display = isEnabled ? "flex" : "none";

  return (
    <View style={[styles.flexRow, styles.logo_0, style.view]}>
      <Href onPress={() => setIsEnabled(!isEnabled)}>
        <Image source={alert} />
        {global.notification.length > 0 ? (
          <View style={[style.textNumber]}>
            <Text style={style.text1}>{global.notification.length}</Text>
          </View>
        ) : null}
        <View style={[style.inforNotification, { display: display, width: windowWidth/1 }]}>
          <FlatListViewNormal
            data={global.notification}
            renderItem={renderItem}
            horizontal={false}
            col="1"
          />
        </View>
      </Href>
      <Href
        onPress={() =>
          functions.gotoScreen(props.component.props.navigation, "NewJob")
        }
      >
        <Image style={style.marginLeft} source={newJob} />
        <View style={style.textNumber}>
          <Text style={style.text1}>1</Text>
        </View>
      </Href>
    </View>
  );
}

const style = StyleSheet.create({
  view: {
    left: 20,
    marginTop: TOP,
  },

  marginLeft: {
    marginLeft: 20,
  },

  textNumber: {
    position: "absolute",
    top: -10,
    right: -10,
    borderRadius: 10,
    borderColor: "#000",
    borderWidth: 1,
    backgroundColor: "#FF0000",
    alignItems: "center",
    width: 20,
    height: 20,
    zIndex: 3,
  },

  text1: {
    color: "white",
    fontSize: 13,
  },

  inforNotification: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    backgroundColor: "#898166",
    position: "absolute",
    top: 20,
    padding: 10,
  },

  render: {
    width: "100%",
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
});

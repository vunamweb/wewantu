import React from "react";
import { Image, StyleSheet } from "react-native";

import Href from "../components/Href";

import styles from "../../app/style/style";
import functions from "../../app/function/function";

export default function Logo({ ...props }) {
  const logo =
    props.type == 2
      ? require("../images/logo_white.png")
      : require("../images/logo.png");
  if (props.type == 0)
    return (
      <Href
        onPress={() => functions.gotoScreen(props.navigation, "HomeScreen")}
      >
        <Image style={[styles.logo_0, props.style]} source={logo} />
      </Href>
    );
  else
    return (
      <Href
        onPress={() => functions.gotoScreen(props.navigation, "HomeScreen")}
      >
        <Image style={[styles.logo_1, props.style]} source={logo} />
      </Href>
    );
}

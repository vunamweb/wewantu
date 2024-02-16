import React from "react";

import { ImageBackground, KeyboardAvoidingView } from "react-native";

import styles from "../../app/style/style";

export default function Background({ children, ...props }) {
  const source = require("../../app/images/logo.png");

  let style =
    props.center == "true"
      ? styles.container_root_full_center
      : styles.container_root_align_center;

  style =
    props.sourse != null || props.full == 1
      ? styles.container_root_align_center_full
      : style;

  if (props.start == 1)
    style = [style, { alignSelf: "flex-start", padding: 0 }];

  if (props.sourse != null)
    return (
      <ImageBackground
        source={source}
        resizeMode="cover"
        style={[styles.background_1]}
      >
        <KeyboardAvoidingView style={style} behavior="padding">
          {children}
        </KeyboardAvoidingView>
      </ImageBackground>
    );
  else if (!props.repeat)
    return (
      <ImageBackground style={styles.background_1}>
        <KeyboardAvoidingView style={style} behavior="padding">
          {children}
        </KeyboardAvoidingView>
      </ImageBackground>
    );
  else
    return (
      <ImageBackground resizeMode="repeat" style={styles.background_1}>
        <KeyboardAvoidingView style={style} behavior="padding">
          {children}
        </KeyboardAvoidingView>
      </ImageBackground>
    );
}

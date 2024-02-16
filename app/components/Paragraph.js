import React from "react";

import { Text } from "react-native-paper";

import styles from "../../app/style/style";

export default function Paragraph(props) {
  return <Text allowFontScaling={false} {...props} style={[styles.fontNormal, props.style]} />;
}

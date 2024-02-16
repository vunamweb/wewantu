import React from "react";
import { TouchableOpacity } from "react-native";

import Text from "../components/Paragraph";

import styles from "../../app/style/style";

export default function Button({ text, color, ...props }) {
  return (
    <TouchableOpacity {...props}>
      <Text style={[{ color: color }, styles.fontBoldNormal]}>{text}</Text>
    </TouchableOpacity>
  );
}

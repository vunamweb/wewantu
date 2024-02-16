import React from "react";
import { TouchableOpacity } from "react-native";

import Image from "../components/Image";

import styles from "../../app/style/style";

export default function Button({ icon, ...props }) {
  return (
    <TouchableOpacity {...props}>
      <Image source={icon} />
    </TouchableOpacity>
  );
}

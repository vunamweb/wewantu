import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  Image,
} from "react-native";

export default function ListView({ mode, style, ...props }) {
  return (
     <FlatList
        style={{ padding: 0, width: "100%"}}
        numColumns={props.col}
        ref={props.ref_ != undefined ? props.ref_ : null}
        {...props}
      />
  );
}

const style = StyleSheet.create({
  flastList: {
    padding: 0, 
    width: "100%"
  }
});

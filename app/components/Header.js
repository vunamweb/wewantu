import React from "react";
import { StyleSheet, View } from "react-native";

import Drawer from "../components/Drawer";
import MessageNotification from "../components/MessageNotification";
import Logo from "../components/Logo";

import styles from "../style/style";

export default function Header(props) {
  return (
    <View style={styles.header}>
      {/* DRAW */}
      <Drawer component={props.component} />
      {/* END DRAW */}
      {props.Notification == undefined ? (
        <MessageNotification component={props.component} onReceiveMessage={props.onReceiveMessage} />
      ) : null}
      <Logo navigation={props.component.props.navigation} type={1} />
    </View>
  );
}

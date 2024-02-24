import React, { Component } from "react";

import { createAppContainer } from "react-navigation";

//import { withNavigation } from '@react-navigation/compat';

//import { useNavigation } from '@react-navigation/native';

import router from "./app/function/router";

import "./app/config/config";

import UtilityFirebase from "./app/function/UtilityFirebase";

const AppNavigator = router.initNavigarion();

const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component {
  render() {
    // listen GCM
    var callbackNotificationListeners = (notification) => {
      if (global.screen.constructor.name != "Chat" && notification.data.message != '') {
        console.log("listen GCM");

        global.notification =
          global.notification != undefined ? global.notification : [];
        global.notification.push(notification);

        global.screen.setState({ notification: global.notification });
      }
    };
    new UtilityFirebase(this).onReceiveMessage(callbackNotificationListeners);

    return <AppContainer />;
  }
}

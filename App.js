import React, { Component } from "react";
import { AsyncStorage } from "react-native";

import { createAppContainer } from "react-navigation";

//import { withNavigation } from '@react-navigation/compat';

//import { useNavigation } from '@react-navigation/native';

import router from "./app/function/router";

import "./app/config/config";

import UtilityFirebase from "./app/function/UtilityFirebase";

import functions from "./app/function/function";

const AppNavigator = router.initNavigarion();

const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component {
  render() {
    let dataUser = null;

    // listen GCM
    var callbackNotificationListeners = async (notification) => {
      if (dataUser == null) {
        datauser = await functions.getDataUser();
        try {
          datauser = JSON.parse(datauser);
        } catch (error) {
          console.log(error);
        }
      }

      if (
        global.screen.constructor.name != "Chat" &&
        notification.data.message != ""
      ) {
        console.log("listen GCM");

        if(notification.data.message == 'redirect_home') {
          functions.login(global.mail_login, global.password_login, global.screen);
        } else {

          global.notification =
          datauser.notification != undefined ? datauser.notification : [];

        notification.data.read = false;

        global.notification.push(notification);
        datauser.notification = global.notification;

        AsyncStorage.setItem("data", JSON.stringify(datauser));

        global.screen.setState({ notification: global.notification });
      
        }
       }
    };
    new UtilityFirebase(this).onReceiveMessage(callbackNotificationListeners);

    return <AppContainer />;
  }
}

import React from "react";
import { StyleSheet, View, PixelRatio } from "react-native";

import Text from "../components/Paragraph";
import Href from "../components/Href";

import styles from "../style/style";
import functions from "../function/function";

// SET TOP, RIGHT FOR MENU
const TOP = (20 * PixelRatio.get()) / 2.6;
const LEFT = (30 * PixelRatio.get()) / 2.6;

export default function Menu(props) {
  var commonData = global.commonData.languages;

    try {
      var text1 = commonData.home;
      var text2 = commonData.chat;
      var text3 = commonData.job;
      var text4 = commonData.profile;
      var text5 = commonData.setting;
      var text6 = commonData.help_faq;
    } catch (error) {
      console.log(error);
    }

  return (
    <View style={style.root}>
      <Href
      onPress={() => functions.gotoScreen(props.navigation, 'HomeScreen')}
      >
        <Text style={[style.menu, styles.fontBoldSmall]}>{text1}</Text>
      </Href>
      <Href
      onPress={() => functions.gotoScreen(props.navigation, 'Message')}
      >
        <Text style={[style.menu, styles.fontBoldSmall]}>{text2}</Text>
      </Href>
      <Href
      onPress={() => functions.gotoScreen(props.navigation, 'Job')}
      >
        <Text style={[style.menu, styles.fontBoldSmall]}>{text3}</Text>
      </Href>
      <Href
      onPress={() => functions.gotoScreen(props.navigation, 'ProfileScreen')}
      >
        <Text style={[style.menu, styles.fontBoldSmall]}>{text4}</Text>
      </Href>
      <Href
      onPress={() => functions.gotoScreen(props.navigation, 'SettingScreen')}
      >
        <Text style={[style.menu, styles.fontBoldSmall]}>{text5}</Text>
      </Href>
      <Href>
        <Text style={[style.menu, styles.fontBoldSmall]}>{text6}</Text>
      </Href>
      <Href
      onPress={() => functions.logout(props.navigation)}
      >
        <Text style={[style.menu, styles.fontBoldSmall]}>Log out</Text>
      </Href>
    </View>
  );
}

const style = StyleSheet.create({
  root: {
    marginTop: TOP,
    marginLeft: LEFT,
  },

  menu: {
    marginBottom: 30,
    textTransform: "uppercase",
  },
});

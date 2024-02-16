import React, { Component, createRef } from "react";
import {
  StyleSheet,
  View,
  AsyncStorage,
  Dimensions,
  TouchableOpacity,
} from "react-native";

import { ScrollView } from "react-native-gesture-handler";
import { hideNavigationBar } from "react-native-navigation-bar-color";
import { WebView } from "react-native-webview";

import Background from "../components/Background";
import TextHeader from "../components/TextHeader";
import Text from "../components/Paragraph";
import Collapse from "../components/Collapse";
import IconBottom from "../components/IconBottom";
import Header from "../components/Header";
import BackNext from "../components/BackNext";

import styles from "../../app/style/style";
import functions from "../../app/function/function";

const borderColor = "#000";
const bgDefault = "#2B2B2B";
const bgFocus = "#2B2B2B";
const imgNotification = require("../images/notification.png");

const data1 = [
  {
    text: "faq",
    link: "",
  },
  {
    text: "Tipps vom Headhunter",
    link: "",
  },
  {
    text: "How to use Work Life Balance App",
    link: "",
  },
  {
    text: "Hilfe",
    link: "",
  },
  {
    text: "Kontakt",
    link: "",
  },
  {
    text: "Impressum",
    link: "",
  },
  {
    text: "agb",
    link: "",
  },
  {
    text: "Datenschutz",
    link: "",
  },
  {
    text: "Mit Freunden teilen",
    link: "Message",
  },
];

class Content extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = async () => {
    //hideNavigationBar();
  };

  static navigationOptions = ({ navigation }) => ({
    title: "",
  });

  render() {
    var url = this.props.navigation.state.params.data;

    return (
      <View style={[styles.flexFull, { backgroundColor: "#000" }]}>
        <Header component={this} />
        <ScrollView contentContainerStyle={styles.scroll}>
          <WebView
            source={{
              uri: url,
            }} // Provide the URL here
            style={{ flex: 1, marginTop: 50 }}
          />
          <BackNext
            nextScreen="HomeScreen"
            callBack={() => true}
            navigation={this.props.navigation}
            nextEnable={true}
          />
        </ScrollView>
        <View style={[styles.bottomNavigation, styles.marginTopNavigation]}>
          {/* Bottom */}
          <IconBottom component={this} type="1" />
          {/* END */}
        </View>
      </View>
    );
  }
}

const style = StyleSheet.create({
  root: {
    marginBottom: 5,
    height: 35,
  },

  borderBottom: {
    marginTop: 7,
  },
});

export default Content;

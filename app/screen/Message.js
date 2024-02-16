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

import Background from "../components/Background";
import TextHeader from "../components/TextHeader";
import Text from "../components/Paragraph";
import Image from "../components/Image";
import Href from "../components/Href";
import IconBottom from "../components/IconBottom";
import Header from "../components/Header";

import styles from "../../app/style/style";
import functions from "../../app/function/function";

const borderColor = "#000";
const bgDefault = "#2B2B2B";
const bgFocus = "#898166";
const imgNotification = require("../images/notification.png");
const imgHeart = require("../images/heart_like.png");
const imgMessage = require("../images/chat_message.png");

const data = [
  {
    title: "Staplerfahrer in Frankfurt am Main",
    text:
      "Hier steht das Abstract der Nachricht In zwei Zeilen. Der Rest kommt später",
    text1: "9:20 Uhr",
    hasMessage: false,
  },
  {
    title: "Staplerfahrer in Frankfurt am Main",
    text:
      "Hier steht das Abstract der Nachricht In zwei Zeilen. Der Rest kommt später",
    text1: "9:20 Uhr",
    hasMessage: true,
  },
  {
    title: "Staplerfahrer in Frankfurt am Main",
    text:
      "Hier steht das Abstract der Nachricht In zwei Zeilen. Der Rest kommt später",
    text1: "9:20 Uhr",
    hasMessage: false,
  },
  {
    title: "Staplerfahrer in Frankfurt am Main",
    text:
      "Hier steht das Abstract der Nachricht In zwei Zeilen. Der Rest kommt später",
    text1: "9:20 Uhr",
    hasMessage: true,
  },
];

class Message extends Component {
  constructor(props) {
    super(props);
  }

  state = {};

  onClickItem = (index, link) => {
    this.collapse.current.setState({ activeIndex: index });
    functions.gotoScreen(this.props.navigation, link);
  };

  componentDidMount = async () => {
    //hideNavigationBar();
  };

  static navigationOptions = ({ navigation }) => ({
    title: "",
  });

  render() {
    return (
      <View style={styles.flexFull}>
        <Header component={this} />
        <ScrollView contentContainerStyle={styles.scroll}>
          <Background>
            <TextHeader special={true} icon={imgMessage} text2="chat" />
            <View style={[style.data]}>
              {data.map(({ title, text, text1, hasMessage }, index) => {
                return (
                  <Href
                    onPress={() =>
                      functions.gotoScreen(this.props.navigation, "DetailJob")
                    }
                  >
                    <View style={style.parent}>
                      <Image source={require("../images/user_chat.png")} />
                      <View style={[style.childRen]}>
                        <Text
                          style={[styles.fontBoldSmallOfSmall, style.text4]}
                        >
                          {text1}
                        </Text>
                        <Text
                          style={[styles.fontBoldSmallOfSmall, style.text3]}
                        >
                          {title}
                        </Text>
                        <Text style={[styles.fontNormalSmall, style.text2]}>
                          {text}
                        </Text>
                      </View>
                    </View>
                  </Href>
                );
              })}
            </View>
          </Background>
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
  message: {
    position: "absolute",
    top: -10,
    right: -10,
  },

  text3: {
    color: "#fff",
    marginBottom: 2,
  },

  text4: {
    position: "absolute",
    top: 0,
    right: 0,
    color: "#898166",
  },

  text1: {
    color: "#898166",
    marginLeft: 10,
    marginTop: -3,
  },

  text2: {
    color: "#E4E4E4",
  },

  data: {
    flex: 1,
    backgroundColor: "#000",
    marginTop: 20,
  },

  childRen: {
    width: "85%",
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 30,
  },

  view1: {
    width: "100%",
    justifyContent: "center",
    flexDirection: "row",
  },

  parent: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
    alignItems: "center",
    borderWidth: 1,
    borderTopWidth: 1,
    borderTopColor: "#707070",
    marginBottom: 0,
    paddingTop: 5,
    paddingBottom: 5,
  },

  textInput: {
    marginTop: 15,
    height: 30,
    width: "100%",
  },
});

export default Message;

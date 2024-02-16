import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, PixelRatio } from "react-native";

import { Provider, Portal, Modal } from "react-native-paper";

import { ScrollView } from "react-native-gesture-handler";
import { hideNavigationBar } from "react-native-navigation-bar-color";

import IconFontAwesome from "react-native-vector-icons/FontAwesome";

import Background from "../components/Background";
import TextHeader from "../components/TextHeader";
import IconBottom from "../components/IconBottom";
import BackNext from "../components/BackNext";
import IconUpload from "../components/IconUpload";
import Header from "../components/Header";

import styles from "../../app/style/style";

import "../config/config";

const pixelRatio = global.pixelRatio;
const HEIGHT_TEXTINPUT = 200 * pixelRatio * PixelRatio.getFontScale();

const rectangle = require("../images/rectangle.png");
const camera = require("../images/camera.png");
const arrowUp = require("../images/arrow_up.png");

class UploadDocument extends Component {
  constructor(props) {
    super(props);

    this.state = {
      description: null,
    };
  }

  componentDidMount = () => {
    hideNavigationBar();
  };

  static navigationOptions = ({ navigation }) => ({
    title: "",
  });

  callBack = (check, index) => {
    return;
  };

  render() {
    return (
      <View style={styles.flexFull}>
        <Header component={this} Notification={false} />
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <Background>
            <TextHeader text1="that's" text2="my" text3="input" />
            <View style={style.view1}>
              <IconUpload
                img1={rectangle}
                img2={arrowUp}
                text1="MEIN"
                text2="LEBENSLAUF"
              />
              <IconUpload
                img1={rectangle}
                img2={arrowUp}
                text1="MEIN LETZTES"
                text2="ARBEITSZEUGNIS"
              />
            </View>
            <IconUpload
              img1={rectangle}
              img2={camera}
              text1="MEIN"
              text2="VIDEO-STATEMENT"
              style={style.marginTop1}
            />
            <BackNext
              nextScreen="WillingnessChange"
              position="absolute"
              callBack={() => true}
              navigation={this.props.navigation}
            />
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
  view1: {
    width: "70%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
  },

  marginTop1: {
    marginTop: 20,
  },
});

export default UploadDocument;

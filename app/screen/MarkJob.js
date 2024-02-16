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
import BackNext from "../components/BackNext";
import Header from "../components/Header";

import styles from "../../app/style/style";
import functions from "../../app/function/function";

const borderColor = "#000";
const bgDefault = "#2B2B2B";
const bgFocus = "#898166";
const imgNotification = require("../images/notification.png");
const imgHeart = require("../images/mark.png");
const imgMessage = require("../images/chat_message.png");

class MarkJob extends Component {
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

  getListJobMark = () => {
    var data = [];

    try {
      global.commonData.listJoBConfirm.map((item, index) => {
        var object = {};

        object.title = item.titel;
        object.text = item.arbeitgeber;
        object.hasMessage = true;

        data.push(object);
      });
    } catch (error) {
      console.log(error);
    }

    return data;
  };

  render() {
    var data = this.getListJobMark();

    return (
      <View style={styles.flexFull}>
        <Header component={this} />
        <ScrollView contentContainerStyle={styles.scroll}>
          <Background>
            <TextHeader special={true} icon={imgNotification} text2="jobs" />
            <View style={style.view1}>
              <Image source={imgHeart} />
              <Text style={[styles.fontBoldNormal, style.text1]}>Mark</Text>
            </View>
            <View style={[style.data]}>
              {data.map(({ title, text, hasMessage }, index) => {
                return (
                  <Href
                    onPress={() =>
                      functions.gotoScreenWithParam(JSON.stringify(global.commonData.listJoBConfirm[index]), this.props.navigation, "DetailJob")
                    }
                  >
                    <View style={style.parent}>
                      <Image source={imgHeart} />
                      <View style={[style.childRen]}>
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
            <BackNext
              nextScreen="PersonalData_2"
              position="absolute"
              nextEnable={false}
              //callBack={this.gotoNextStep}
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
  message: {
    position: "absolute",
    top: -10,
    right: -10,
  },

  text3: {
    color: "#fff",
    marginBottom: 2,
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
    borderColor: "#898166",
    backgroundColor: "#363636",
    marginBottom: 20,
  },
});

export default MarkJob;

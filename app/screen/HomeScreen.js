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
import Collapse from "../components/Collapse";
import Image from "../components/Image";
import Href from "../components/Href";
import IconBottom from "../components/IconBottom";
import Header from "../components/Header";

import styles from "../../app/style/style";
import functions from "../../app/function/function";

const bgDefault = "#2B2B2B";
const bgFocus = "#2B2B2B";
const imgFillProlie = require("../images/filled_profile.png");
const alert = require("../images/chat_message.png");
const newJob = require("../images/Neue_Jobs_Alert.png");

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this._renderItem = this._renderItem.bind(this);
    this.collapse = createRef();

    this.state = {
      notification: [],
    };
  }

  onClickItem = (index, link) => {
    this.collapse.current.setState({ activeIndex: index });
    functions.gotoScreen(this.props.navigation, link);
  };

  _renderItem = ({ item, index }) => {
    let height = item.border == "none" ? 0 : 2;
    let link = item.link != null ? item.link : "HomeScreen";

    var borderTop =
      index == 0 ? (
        <View style={[{ height: height }, styles.borderTopAndBottom]} />
      ) : null;

    var borderBottom = (
      <View
        style={[
          { height: height },
          styles.borderTopAndBottom,
          styles.marginTop15,
        ]}
      />
    );

    var bgColor =
      this.collapse.current != null &&
      index == this.collapse.current.state.activeIndex
        ? bgFocus
        : bgDefault;

    return (
      <TouchableOpacity
        style={[{ backgroundColor: bgColor }, styles.collapse]}
        onPress={() => this.onClickItem(index, item.link)}
        onBlur={() => this.collapse.setState({ activeIndex: -1 })}
      >
        <View style={[styles.flexRowStart, styles.fullWith]}>
          <View style={styles.flexFull}>
            {/*borderTop*/}
            <View style={[styles.flexRowStart, styles.listView]}>
              <Text style={[styles.fontBoldSmall, styles.textCapitalize]}>
                {item.text}
              </Text>
            </View>
            {/*borderBottom*/}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  componentDidMount = async () => {
    hideNavigationBar();

    global.screen = this;

    let datauser = await functions.getDataUser();

    try {
      datauser = JSON.parse(datauser);
    } catch (error) {
      console.log(error);
    }

    global.notification =
      datauser.notification != undefined ? datauser.notification : [];

    this.setState({ notification: global.notification });

    this.didFocusSubscription = this.props.navigation.addListener(
      "didFocus",
      (payload) => {
        // Logic to handle when the screen comes into focus (navigated back)
        console.log("Screen focused again:", payload);

        global.screen = this;
      }
    );
  };

  componentWillUnmount() {
    console.log("leave");
  }

  static navigationOptions = ({ navigation }) => ({
    title: "",
  });

  render() {
    global.notification =
      global.notification != undefined ? global.notification : [];

    var commonData = global.commonData.languages;

    try {
      var text1 = commonData.my;
      var text2 = commonData.head;
      var text3 = commonData.hunter;

      var text4 = commonData.jobprofile;
      var text5 = commonData.my_data;
      var text6 = commonData.my_message;
      var text7 = commonData.my_notepad;
      var text8 = commonData.jobs;

      var data1 = [
        {
          text: text4,
          link: "JobProfile",
        },
        {
          text: text5,
          link: "ProfileScreen",
        },
        {
          text: text6,
          link: "Message",
        },
        {
          text: text7,
          link: "LikeJob",
        },
        {
          text: text8,
          link: "Job",
        },
      ];
    } catch (error) {
      console.log(error);
    }

    return (
      <View style={styles.flexFull}>
        <Header component={this} onReceiveMessage={true} />
        <ScrollView contentContainerStyle={styles.scroll}>
          <Background>
            <TextHeader text1={text1} text2={text2} text3={text3} />
            <Collapse
              title="Hồ sơ"
              data={data1}
              renderItem={this._renderItem}
              col={1}
              ref={this.collapse}
              navigation={this.props.navigation}
            />
            <View style={[styles.flexRow, styles.fullWith, style.bottom]}>
              <Image source={imgFillProlie} />
              <View style={style.bottomNotification}>
                <Href
                  onPress={() =>
                    functions.gotoScreen(this.props.navigation, "Message")
                  }
                >
                  <Image source={alert} />
                  {functions.getCountNotification() > 0 ? (
                    <View style={[style.textNumber]}>
                      <Text style={style.text1}>
                        {functions.getCountNotification()}
                      </Text>
                    </View>
                  ) : null}
                </Href>
                <Href
                  onPress={() =>
                    functions.gotoScreen(this.props.navigation, "NewJob")
                  }
                >
                  <Image source={newJob} />
                </Href>
              </View>
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
  bottom: {
    justifyContent: "space-around",
    paddingTop: 30,
  },

  bottomNotification: {
    justifyContent: "space-around",
  },

  textNumber: {
    position: "absolute",
    top: -5,
    right: -10,
    borderRadius: 10,
    borderColor: "#000",
    borderWidth: 1,
    backgroundColor: "#FF0000",
    alignItems: "center",
    width: 20,
    height: 20,
    zIndex: 3,
  },

  text1: {
    color: "white",
    fontSize: 13,
  },
});

export default HomeScreen;

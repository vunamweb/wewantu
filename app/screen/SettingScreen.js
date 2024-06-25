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
import IconBottom from "../components/IconBottom";
import Header from "../components/Header";
import Switch from "../components/Switch";

import styles from "../../app/style/style";
import functions from "../../app/function/function";

const borderColor = "#000";
const bgDefault = "#2B2B2B";
const bgFocus = "#2B2B2B";
const imgFillProlie = require("../images/filled_profile.png");
const alert = require("../images/Chat_Alert.png");
const newJob = require("../images/Neue_Jobs_Alert.png");

class SettingScreen extends Component {
  constructor(props) {
    super(props);
    this._renderItem = this._renderItem.bind(this);
    this.collapse = createRef();
    this.switch = [];
  }

  state = {};

  onClickItem = (index, link) => {
    this.collapse.current.setState({ activeIndex: index });
    functions.gotoScreen(this.props.navigation, link);
  };

  callBack = (job, is_activate, index) => {
    is_activate = (is_activate) ? 1 : 0;

    global.commonData.user.another.notification_newletter = is_activate;

    let obj = {};

    obj.notification_newletter = is_activate;
    obj.user_id = global.commonData.user.user_id;

    functions.updateUser(this, obj, 11);
}

  _renderItem = ({ item, index }) => {
    let height = item.border == "none" ? 0 : 2;
    let link = item.link != null ? item.link : "HomeScreen";
    let notification_newletter = (global.commonData.user.another.notification_newletter == 1 || global.commonData.user.another.notification_newletter == null || global.commonData.user.another.notification_newletter == undefined) ? true : false;

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
    if (item.switch == undefined)
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
      )
    else
      return (
        <View>
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
          <View style={style.switch}>
            <Switch
              activeTrackColor={"#898166"}
              inactiveTrackColor={"#898166"}
              activeThumbColor={"#fff"}
              inactiveThumbColor={"#3e3e3e"}
              size={30}
              component={this}
              callBack={this.callBack}
              visible={notification_newletter}
              container={style.container}
              additionalThumb={style.additionalThumb}
            />
          </View>
        </View>
      )
  };

  componentDidMount = async () => {
    //hideNavigationBar();
  };

  static navigationOptions = ({ navigation }) => ({
    title: "",
  });

  render() {
    var commonData = global.commonData.languages;

    try {
      var text1 = commonData.notification;
      var text2 = commonData.newsletter;
      var text3 = commonData.language_setting;
      var text4 = commonData.setting;
    } catch (error) {
      console.log(error);
    }

    var data1 = [
      {
        text: text1,
        link: "Notification",
      },
      {
        text: text2,
        link: "",
        switch: true
      },
      {
        text: text3,
        link: "Language",
      },
    ];

    return (
      <View style={styles.flexFull}>
        <Header component={this} />
        <ScrollView contentContainerStyle={styles.scroll}>
          <Background>
            <TextHeader text2={text4} />
            <Collapse
              title="Hồ sơ"
              style={style.collapse}
              data={data1}
              renderItem={this._renderItem}
              col={1}
              ref={this.collapse}
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
  collapse: {
    marginBottom: 60,
  },

  additionalThumb: {
    height: 0,
    width: 25,
    borderRadius: 5,
    paddingTop: 15,
  },

  container: {
    height: 25,
    width: 60,
    borderWidth: 0,
  },

  switch: {
    position: 'absolute',
    right: 10,
    top: 10
  }
});

export default SettingScreen;

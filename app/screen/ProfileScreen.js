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

import styles from "../../app/style/style";
import functions from "../../app/function/function";

const borderColor = "#000";
const bgDefault = "#2B2B2B";
const bgFocus = "#2B2B2B";
const imgFillProlie = require("../images/filled_profile.png");
const alert = require("../images/Chat_Alert.png");
const newJob = require("../images/Neue_Jobs_Alert.png");

class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this._renderItem = this._renderItem.bind(this);
    this.collapse = createRef();
  }

  state = {};

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
    //hideNavigationBar();
  };

  static navigationOptions = ({ navigation }) => ({
    title: "",
  });

  render() {
    var commonData = global.commonData.languages;

    try {
      var text1 = commonData.personal_data;
      var text2 = commonData.e_mail_phone;
      var text3 = commonData.my_languages;
      var text4 = commonData.my_trainning_school_study;
      var text5 = commonData.my_driving_licen;
      var text6 = commonData.my_document_video;
      var text7 = commonData.hobiees;
      var text8 = commonData.how_i_am_doing_now;
      var text9 = commonData.my_address;
      var text10 = commonData.profile;
    } catch (error) {
      console.log(error);
    }

    var data1 = [
      {
        text: text1,
        link: "PersonalData_1",
      },
      {
        text: text2,
        link: "PersonalData_2",
      },
      {
        text: text3,
        link: "PersonalData_4",
      },
      {
        text: text4,
        link: "ReviewTrainingUniversity",
      },
      {
        text: text5,
        link: "Driver",
      },
      {
        text: text6,
        link: "UploadDocument",
      },
      {
        text: text7,
        link: "Hobiess",
      },
      {
        text: text8,
        link: "",
      },
      {
        text: text9,
        link: "PersonalData_3",
      },
    ];

    return (
      <View style={styles.flexFull}>
        <Header component={this} />
        <ScrollView contentContainerStyle={styles.scroll}>
          <Background>
            <TextHeader text2={text10} />
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
});

export default ProfileScreen;

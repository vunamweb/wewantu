import React, { Component, createRef } from "react";
import {
  StyleSheet,
  View,
  AsyncStorage,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import Svg, { Circle, G } from 'react-native-svg';

import { ScrollView } from "react-native-gesture-handler";
import { hideNavigationBar } from "react-native-navigation-bar-color";

import messaging from "@react-native-firebase/messaging";

import Background from "../components/Background";
import TextHeader from "../components/TextHeader";
import Text from "../components/Paragraph";
import Collapse from "../components/Collapse";
import Image from "../components/Image";
import Href from "../components/Href";
import IconBottom from "../components/IconBottom";
import Header from "../components/Header";
import CircularProgress from "../components/CircularProgress";

import styles from "../../app/style/style";
import functions from "../../app/function/function";

import "../config/config";

const bgDefault = "#2B2B2B";
const bgFocus = "#2B2B2B";
const imgFillProlie = require("../images/filled_profile.png");
const alert = require("../images/chat_message.png");
const newJob = require("../images/Neue_Jobs_Alert.png");

let zip, trainning;

const strAsyncStorage = global.trainning;

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this._renderItem = this._renderItem.bind(this);
    this.collapse = createRef();

    this.state = {
      notification: [],
      ActivityIndicator: false,
      media: {},
      reload: false,
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

  notification = async () => {
    var notification = await AsyncStorage.getItem("notification");

    if (
      notification != undefined &&
      notification != null &&
      notification != "0"
    ) {
      var a = await AsyncStorage.setItem("notification", "0");

      let key = {};
      key.fromUser = global.commonData.user.user_id; //userId;
      key.toUser = notification;

      functions.gotoScreenWithParam(
        JSON.stringify(key),
        this.props.navigation,
        "Chat"
      );
    }
  };

  componentDidMount = async () => {
    hideNavigationBar();

    var listMedia = [];

    global.screen = this;
    global.home = this;

    let datauser = await functions.getDataUser();

    this.requestUserPermission(datauser);
    
    try {
      datauser = JSON.parse(datauser);

      listMedia = datauser.listMedia;

      // check list of media has saved on local, if not call api to get data
      if ((Array.isArray(listMedia) && listMedia.length == 0) || listMedia == undefined)
        functions.getListMedia(this);
      else {
        this.setState({
          media: listMedia
        });
      }
      // END
} catch (error) {
      console.log(error);
    }

    if (!this.existPersonalData(datauser)) functions.getUser(this, datauser);

    //this.notification();

    global.notification =
      datauser.notification != undefined ? datauser.notification : [];

    this.setState({ notification: global.notification });

    this.didFocusSubscription = this.props.navigation.addListener(
      "didFocus",
      (payload) => {
        // Logic to handle when the screen comes into focus (navigated back)
        console.log("Screen focused again:", payload);

        global.screen = this;

        this.setState({ reload: !this.state.reload });

        //this.notification();
      }
    );
  };

  requestUserPermission = async (datauser) => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log("Authorization status:", authStatus);
      await messaging().registerDeviceForRemoteMessages();

      try {
        let fcmToken = await messaging().getToken();
    
        datauser = JSON.parse(datauser);
  
        let token = datauser.user.firebase_token;
  
        if (token != fcmToken) {
          datauser.user.firebase_token = fcmToken;
  
          await AsyncStorage.setItem("data", JSON.stringify(datauser));
  
          var obj = {};
  
          try {
            obj.firebase_token = fcmToken;
            obj.user_id = datauser.user.user_id;
          } catch (error) {
            console.log(error);
          }
  
          functions.updateTokenUser(this, obj);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  getPercentUser = () => {
    let count = 4;
    let total = 11;

    zip = global.zip;

    let common = global.commonData;

    try {
      if (this.state.media.file_img != null) count++;

      if (this.state.media.file_doc != null) count++;

      if (this.state.media.file_video != null) count++;

      if (common.userDriveLicense != undefined && (Array.isArray(common.userDriveLicense) && common.userDriveLicense.length > 0))
        count++;

      if (common.listUserLanguages != undefined && (Array.isArray(common.listUserLanguages) && common.listUserLanguages.length > 0))
        count++;

      if (global.tranining != undefined && (Array.isArray(global.tranining) && global.tranining.length > 0))
        count++;

      if (zip != undefined)
        count++;
    } catch (error) {
      console.log(error);
    }

    if (count == 0) return 0;
    else return parseInt((100 * (count / total)));
  };

  existPersonalData = (datauser) => {
    try {
      if (datauser.user.another == undefined || datauser.user.another == null)
        return false;
      else {
        global.commonData.user.another = datauser.user.another;
        return true;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  componentWillUnmount() {
    console.log("leave");
  }

  static navigationOptions = ({ navigation }) => ({
    title: "",
  });

  render() {
    //this.notification();

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

      var text9 = commonData.t_my_profile;

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
            <ActivityIndicator
              size="small"
              animating={this.state.ActivityIndicator}
            />
            <Collapse
              title="Hồ sơ"
              data={data1}
              renderItem={this._renderItem}
              col={1}
              ref={this.collapse}
              navigation={this.props.navigation}
            />
            <View style={[styles.flexRow, styles.fullWith, style.bottom]}>
              <View style={{ alignItems: "center" }}>
                <Text style={[styles.fontBoldSmall, style.textProfile]}>
                  {text9}
                </Text>
                <CircularProgress
                  size={150}
                  strokeWidth={10}
                  progress={this.getPercentUser()} // percentage completed
                  color="#898166"
                  backgroundColor="#ccc"
                />
                <Text style={[style.textPercent, styles.fontBoldLargeNormal]}>
                  {this.getPercentUser()}%
                </Text>
              </View>
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

  textPercent: {
    position: "absolute",
    left: "50%",
    top: "50%",
    marginLeft: -20,
    marginTop: -10,
  },

  textProfile: {
    marginBottom: 5,
  },
});

export default HomeScreen;

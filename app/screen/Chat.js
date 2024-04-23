import React, { Component } from "react";
import {
  StyleSheet,
  View,
  AsyncStorage,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { Input } from "react-native-elements";

import Text from "../components/Paragraph";
import { ScrollView } from "react-native-gesture-handler";

import Icon from "react-native-vector-icons/FontAwesome5";

import Background from "../components/Background";
import Logo from "../components/Logo";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import TextHeader from "../components/TextHeader";
import HeadLine from "../components/HeadLine";
import IconBottom from "../components/IconBottom";
import FlatListViewNormal from "../components/ListView";
import Header from "../components/Header";
import Image from "../components/Image";

import styles from "../../app/style/style";
import styleChat from "../../app/style/style_chat";

import functions from "../../app/function/function";
import UtilityFirebase from "../function/UtilityFirebase";

let key, fromUser, toUser;

var text8, text9, text10;

const imgMessage = require("../images/chat_message.png");
const imgFlag = require("../images/Flag.png");

let dataref = [];

class Chat extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    data: [],
    notification: [],
    //chatList: [],
    ActivityIndicator: false,
    fcmToken: null,
    message: "",
    display: "none",
  };

  componentDidMount = async () => {
    try {
      key = this.props.navigation.state.params.data;
      key = JSON.parse(key);

      fromUser = key.fromUser;
      toUser = key.toUser;
    } catch (error) {
      console.log(error);
    }

    var callbackListenChildRef = (data) => {
      console.log("data");

      var value = {
        dateTime: data._snapshot.value.dateTime,
        message: data._snapshot.value.message,
        fromUser: data._snapshot.value.fromUser,
      };

      //if(childExist)
      let valueToUser = (data._snapshot.value.fromUser != global.commonData.user.user_id) ? global.commonData.user.user_id : toUser;

      if(!this.checkExist(dataref, data._snapshot.value)) {
        dataref.push(data._snapshot.value);

        functions.insertChat(
          this,
          data._snapshot.value.fromUser,
          valueToUser,
          data._snapshot.value.message
        );
      }

      this.setState({
        data: [...this.state.data, value],
        message: "",
        display: "none",
      });
    };

    var callbackNotificationListeners = (notification) => {
      console.log("listen GCM");

      if (notification.data.message == "") this.setState({ display: "flex" });
    };

    let group = toUser + "_" + fromUser;
    ref = "messages/" + group + "";

    // listen change realtime database
    new UtilityFirebase(this).listenChildRef(ref, callbackListenChildRef);

    // listen GCM
    new UtilityFirebase(this).onReceiveMessage(callbackNotificationListeners);

    // get message list
    functions.getListMessage(this, fromUser, toUser);

    global.screen = this;
  };

  checkExist = (parent, child) => {
    let check = false;

    parent.map((item, index) => {
       if(item.dateTime == child.dateTime)
        check = true;
    })

    return check;
  }

  componentWillUnmount() {
    console.log("leave");

    new UtilityFirebase(this).deleteRef("messages");
  }

  static navigationOptions = ({ navigation }) => ({
    title: "",
  });

  rightIconNullText = () => {
    let group = fromUser + "_" + toUser;

    return (
      <View style={{ flexDirection: "row", paddingRight: 15 }}>
        <TouchableOpacity
          onPress={() => {
            //call firebase server to push message
            functions.pushMessage(fromUser, group, this.state.message, this);
          }}
        >
          <Icon name="arrow-right" size={24} />
        </TouchableOpacity>
      </View>
    );
  };

  pushMessage = () => {
    var childExist = true;

    let group = toUser + "_" + fromUser;

    functions.pushMessage(fromUser, group, this.state.message, this);
  };

  renderItem = ({ item, index }) =>
    item.fromUser != global.commonData.user.user_id ? ( // if not owner
      <View style={styleChat.containerList}>
        <View style={styleChat.messageContainer}>
          <Text style={styles.fontNormal}>{item.message}</Text>
          <Text style={[styles.fontNormalSmall, style.dateTime]}>
            {item.dateTime}
          </Text>
          <Image
            source={imgFlag}
            style={{ position: "absolute", top: -5, right: -5 }}
          />
        </View>
      </View>
    ) : (
      <View style={styleChat.containerList}>
        <View style={styleChat.messageContainerOwn}>
          <Text style={styles.fontNormal}>{item.message}</Text>
          <Text style={[styles.fontNormalSmall, style.dateTime]}>
            {item.dateTime}
          </Text>
        </View>
      </View>
    );

  render() {
    let typingUsers = "";

    var commonData = global.commonData.languages;

    try {
      text8 = commonData.Please_enter_First_name;
      text9 = commonData.Please_enter_last_name;
      text10 = commonData.please_enter_email;
    } catch (error) {
      console.log(error);
    }
    return (
      <View style={styles.flexFull}>
        <Header component={this} />
        <ScrollView contentContainerStyle={{ flex: 1 }} automaticallyAdjustKeyboardInsets={true}>
          <Background>
            <View>
              <Image source={require("../images/user_chat_1.png")} />
              <Image
                source={require("../images/Unknown.png")}
                style={style.imageProfile}
              />
            </View>
            <ActivityIndicator
              size="large"
              animating={this.state.ActivityIndicator}
            />
            <View style={style.containerMessageChat}>
              <View>
                <FlatListViewNormal
                  data={this.state.data}
                  renderItem={this.renderItem}
                  horizontal={false}
                  col="1"
                />
              </View>
              {this.state.display != "none" ? (
                <View style={[styleChat.typingUser]}>
                  <Text style={{ paddingBottom: 10 }}>...</Text>
                </View>
              ) : null}
            </View>
            <TextInput
            onChangeText={(value) => this.setState({ message: value })}
            value={this.state.message}
            component={this}
            styleParent={[styles.textInput]}
            fontAwesome="true"
            colorIcon="white"
            leftIcon={this.state.message == "" ? "edit" : ""}
            //onLeftClick={() => this.onClickEye(false)}
            leftStyle={style.leftStyle}
            rightIcon={this.state.message == "" ? "" : "send"}
            onRightClick={() => this.pushMessage()}
            bgFocus="white"
            bgBlur="#3f3f3f"
          />
          </Background>
        </ScrollView>
        <View style={style.containerSendMessage}>
          <Button
            color="white"
            text="UNTERNEHMENS-PROFIL"
            style={[styles.button, style.button]}
            onPress={() => null}
          />
        </View>
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
  code: {
    marginTop: 10,
    marginBottom: 20,
  },

  textInput: {
    marginBottom: 8,
  },

  leftStyle: {
    paddingTop: 10,
  },

  button: {
    backgroundColor: "#898166",
    marginTop: 15,
  },

  dateTime: {
    color: "#000000",
    marginTop: 5,
    paddingBottom: 10,
  },

  containerSendMessage: {
    width: "100%",
    paddingBottom: 10,
    paddingTop: 0,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: "black",
  },

  containerMessageChat: {
    flex: 1,
    width: "100%",
    flexDirection: "column",
  },

  imageProfile: {
    position: "absolute",
    top: 0,
    right: -20,
  },
});

export default Chat;

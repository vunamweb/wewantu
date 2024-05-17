import React, { Component, createRef } from "react";
import {
  StyleSheet,
  View,
  AsyncStorage,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
  Keyboard
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
import Href from "../components/Href";

import styles from "../../app/style/style";
import styleChat from "../../app/style/style_chat";

import functions from "../../app/function/function";
import UtilityFirebase from "../function/UtilityFirebase";
import { Portal, Provider, Modal } from "react-native-paper";

let key, fromUser, toUser;

var text8, text9, text10;

const imgMessage = require("../images/chat_message.png");
const iconPhone = require("../images/icon_phone.png");
const iconMail = require("../images/icon_mail.png");
const iconClose = require("../images/close.png");
const imgFlag = require("../images/Flag.png");


let dataref = [];

class Chat extends Component {
  constructor(props) {
    super(props);

    this.scrollview = createRef();
  }

  state = {
    data: [],
    notification: [],
    //chatList: [],
    ActivityIndicator: false,
    fcmToken: null,
    message: "",
    display: "none",
    visible: false,
    detailUser: [
      {
        street: null,
        address_addition: null,
        postal_code: null,
        city: null,
        mail: null,
        mobile_phone_number: null
      }
    ]
  };

  componentDidMount = async () => {
    /*try {
      this.scrollview.current.scrollToEnd({ animated: true });
    } catch (error) {
      console.log(error)
    }*/

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

      if (!this.checkExist(dataref, data._snapshot.value)) {
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

    let dataUser = await functions.getDataUser();
    var dataMessage = [];
    let pathMessage = 'message_' + fromUser + '_' + toUser;

    try {
      dataUser = JSON.parse(dataUser);

      dataMessage = dataUser[pathMessage];
    } catch (error) {
      console.log(error);
    }

    // check list of chat has saved on local, if not call api to get data
    if ((Array.isArray(dataMessage) && dataMessage.length == 0) || dataMessage == undefined)
      // get message list
      functions.getListMessage(this, fromUser, toUser);
    else {
      this.setState({
        data: dataMessage
      });
    }
    // END

    global.screen = this;
  };

  checkExist = (parent, child) => {
    let check = false;

    parent.map((item, index) => {
      if (item.dateTime == child.dateTime)
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
    Keyboard.dismiss();

    try {
      this.scrollview.current.scrollToEnd({ animated: true });
    } catch (error) {
      console.log(error)
    }

    var childExist = true;

    let group = toUser + "_" + fromUser;

    functions.pushMessage(fromUser, group, this.state.message, this);
  };

  getDetailUser = async () => {
    //this.setState({ visible: true });

    let datauser = await functions.getDataUser();

    functions.getDetailUser(this, datauser, toUser);
  }

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

    let text1;

    try {
      text8 = commonData.Please_enter_First_name;
      text9 = commonData.Please_enter_last_name;
      text10 = commonData.please_enter_email;

      text1 = commonData.contact_detail;
    } catch (error) {
      console.log(error);
    }

    let address = this.state.detailUser[0].street;
    let addressAdtional = this.state.detailUser[0].address_addition;
    let postcode = this.state.detailUser[0].postal_code;
    let city = this.state.detailUser[0].city;
    let email = this.state.detailUser[0].mail;
    let phone = this.state.detailUser[0].mobile_phone_number;

    return (
      <Provider>
        <Portal>
          <Modal visible={this.state.visible}>
            <View style={style.modalDeleteRoot}>
              <Href style={{ zIndex: 9999999 }} onPress={() => this.setState({ visible: false })}>
                <Image
                  source={iconClose}
                  style={style.close}
                />
              </Href>
              <Text style={[styles.fontBoldLargeMedium, style.textHeaderModal]}>
                {text1}
              </Text>
              <Text style={[styles.fontNormalSmall, style.textInfor]}>{address} {addressAdtional}</Text>
              <Text style={[styles.fontNormalSmall, style.textInfor]}>{postcode} {city}</Text>
              <View style={[styles.flexRow, style.viewRow]}>
                <Image
                  source={iconPhone}
                  style={style.viewIcon}
                />
                <Text style={[styles.fontNormalSmall]}>{phone}</Text>
              </View>
              <View style={[styles.flexRow, style.viewRow]}>
                <Image
                  source={iconMail}
                  style={style.viewIcon}
                />
                <Text style={[styles.fontNormalSmall]}>{email}</Text>
              </View>
            </View>
          </Modal>
        </Portal>
        <View style={styles.flexFull}>
          <Header component={this} />
          <ScrollView ref={this.scrollview} contentContainerStyle={{ flex: 1 }} automaticallyAdjustKeyboardInsets={true}>
            <Background>
              <View>
                <Href onPress={() => this.getDetailUser()}>
                  <Image source={require("../images/user_chat_1.png")} />
                </Href>
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
              onPress={() => this.getDetailUser()}
            />
          </View>
          <View style={[styles.bottomNavigation, styles.marginTopNavigation]}>
            {/* Bottom */}
            <IconBottom component={this} type="1" />
            {/* END */}
          </View>
        </View>
      </Provider>
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

  modalDeleteRoot: {
    width: "80%",
    marginLeft: "10%",
    marginRight: "10%",
    backgroundColor: "#363636",
    borderBottomColor: '#898166',
    borderLeftColor: '#898166',
    borderRightColor: '#898166',
    borderTopColor: '#898166',
    borderWidth: 2,
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
    height: "80%",
  },

  textHeaderModal: {
    color: "#000",
    marginBottom: 20,
    color: '#fff',
    textDecorationLine: 'underline',
  },

  textJob: {
    marginTop: 20,
    marginBottom: 30,
    color: "#000",
  },

  textInfor: {
    paddingBottom: 5
  },

  viewRow: {
    marginTop: 20
  },

  viewIcon: {
    marginRight: 20
  },
  close: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 999999
  }
});

export default Chat;

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
    visible1: global.commonData.user.another.notification_message == 1 ? false : true,
    detailUser: [
      {
        street: null,
        address_addition: null,
        postal_code: null,
        city: null,
        mail: null,
        mobile_phone_number: null
      }
    ],
    translation: [],
    userList: [],
  };

  componentDidMount = async () => {
    /*try {
      this.scrollview.current.scrollToEnd({ animated: true });
    } catch (error) {
      console.log(error)
    }*/

    global.chat = this;

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
        try {
          this.scrollview.current.scrollToEnd({ animated: true });
        } catch (error) {
          console.log(error)
        }

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
    var userList = [];
    let pathMessage = 'message_' + fromUser + '_' + toUser;

    try {
      dataUser = JSON.parse(dataUser);

      dataMessage = dataUser[pathMessage];

      userList = dataUser.userList;
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

    // check list of chat has saved on local, if not call api to get data
    if ((Array.isArray(userList) && userList.length == 0) || userList == undefined)
      functions.getListUser(this);
    else {
      this.setState({
        userList: userList,
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

  getProfilePicture = (user_id) => {
    let userList = this.state.userList;

    let imageProfile = <Image style={style.img} source={require("../images/user_profile.png")} />

    try {
      userList.map((item, index) => {
        if (item.user_id == user_id)
          if (item.profilePicture != null && item.profilePicture != undefined) {
            let urlProfilePicuture = global.urlRootWewantu + 'api/' + item.profilePicture;

            imageProfile = <View style={[style.viewProfilPicture, style.imageContainer]}><Image
              source={{ uri: urlProfilePicuture }}
              style={[style.profilePicture, style.image]}
            /></View>;
          }
      })
    } catch (error) {
      console.log(error);
    }

    return imageProfile;
  }

  getTokenWeb = (user_id) => {
    let userList = this.state.userList;

    let token = null;

    try {
      userList.map((item, index) => {
        if (item.user_id == user_id) {
          token = item.firebase_token_web;
        }
      })
    } catch (error) {
      console.log(error);
    }

    return token;
  }

  translation = (index, text) => {
    let translation = this.state.translation;
    let toLanguage = functions.getLanguageMother();
    let fromLanguage = 'Germany';

    if (translation[index] == undefined) {
      translation[index] = {};

      translation[index].status = true;
      translation[index].textOrginal = text;

      functions.translation(this, index, text, fromLanguage, toLanguage);
    } else if (!translation[index].status) {
      functions.translation(this, index, text, fromLanguage, toLanguage);
    } else {
      translation[index].status = false;

      this.setState({ translation: translation });
    }
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

    let token, name;

    try {
      this.scrollview.current.scrollToEnd({ animated: true });

      token = this.getTokenWeb(toUser);

      name = global.commonData.user.another.prename + ' ' + global.commonData.user.another.lastname;
    } catch (error) {
      console.log(error)
    }

    var childExist = true;

    let group = toUser + "_" + fromUser;

    functions.pushMessage(fromUser, group, this.state.message, this);
    functions.pushNotification(name, this.state.message, token);
  };

  getDetailUser = async () => {
    //this.setState({ visible: true });

    let datauser = await functions.getDataUser();

    functions.getDetailUser(this, datauser, toUser);
  }

  renderItem = ({ item, index }) => {
    let message = item.message;

    try {
      let translation = this.state.translation;

      message = translation[index].status ? translation[index].textTranslation : translation[index].textOrginal;
    } catch (error) {
      console.log(error);
    }

    return (
      item.fromUser != global.commonData.user.user_id ? ( // if not owner
        <View style={styleChat.containerList}>
          <View style={styleChat.messageContainer}>
            <Text style={styles.fontNormal}>{message}</Text>
            <Text style={[styles.fontNormalSmall, style.dateTime]}>
              {functions.convertDate(item.dateTime)}
            </Text>
            <Href style={style.flag} onPress={() => this.translation(index, item.message)}>
              <Image
                source={imgFlag}
              />
            </Href>
          </View>
        </View>
      ) : (
        <View style={styleChat.containerList}>
          <View style={styleChat.messageContainerOwn}>
            <Text style={styles.fontNormal}>{item.message}</Text>
            <Text style={[styles.fontNormalSmall, style.dateTime]}>
              {functions.convertDate(item.dateTime)}
            </Text>
          </View>
        </View>
      )
    )
  }


  render() {
    let typingUsers = "";

    var commonData = global.commonData.languages;

    let text1;

    try {
      var text4 = commonData.yes;
      var text5 = commonData.no;
      var text6 = commonData.notification_message_warning;

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
          <Modal visible={this.state.visible1}>
            <View style={style.modalNotification}>
              <Text>{text6}</Text>
              <View style={style.modalDelete}>
                <Href onPress={() => functions.gotoScreen(this.props.navigation, 'Notification')} style={style.buttonModal}>
                  <Text style={styles.textCapitalize}>{text4}</Text>
                </Href>
                <Href
                  onPress={() =>
                    this.setState({
                      visible1: false,
                    })
                  }
                  style={style.buttonModal}
                >
                  <Text style={styles.textCapitalize}>{text5}</Text>
                </Href>
              </View>
            </View>
          </Modal>
        </Portal>
        <View style={styles.flexFull}>
          <Header component={this} />
          <ScrollView contentContainerStyle={{ flex: 1 }} automaticallyAdjustKeyboardInsets={true}>
            <Background>
              <View>
                <Href onPress={() => this.getDetailUser()}>
                  {this.getProfilePicture(toUser)}
                </Href>
              </View>
              <ActivityIndicator
                size="large"
                animating={this.state.ActivityIndicator}
              />
              <View style={style.containerMessageChat}>
                <View>
                  <FlatListViewNormal
                    ref_={this.scrollview}
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
                multiline
                leftIcon={this.state.message == "" ? "edit" : ""}
                //onLeftClick={() => this.onClickEye(false)}
                leftStyle={style.leftStyle}
                rightIcon={this.state.message == "" ? "" : "send"}
                onRightClick={() => this.pushMessage()}
                bgFocus="#898166"
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

  modalNotification: {
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
    height: "50%",
  },

  modalDelete: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",
    marginTop: 20
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
  },
  flag: {
    position: "absolute",
    top: -5,
    right: -5
  },

  viewProfilPicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#898166'
  },

  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50
  },

  imageContainer: {
    overflow: 'hidden',
  },

  image: {
    resizeMode: 'cover',
  },

  buttonModal: {
    padding: 10,
    backgroundColor: "#898166",
    borderRadius: 10,
  },
});

export default Chat;

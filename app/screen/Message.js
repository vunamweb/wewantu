import React, { Component, createRef } from "react";
import {
  StyleSheet,
  View,
  AsyncStorage,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import UtilityFirebase from "../function/UtilityFirebase";

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
import { useRoute } from "@react-navigation/native";

const borderColor = "#000";
const bgDefault = "#2B2B2B";
const bgFocus = "#898166";
const imgNotification = require("../images/notification.png");
const imgHeart = require("../images/heart_like.png");
const imgMessage = require("../images/chat_message.png");

/*const data = [
  {
    title: "vu nam",
    text:
      "Hier steht das Abstract der Nachricht In zwei Zeilen. Der Rest kommt später",
    text1: "9:20 Uhr",
    hasMessage: false,
    id: "fc5e9483-2207-49c5-ad83-ab8b1a24fe23",
  },
  {
    title: "vu pixel",
    text:
      "Hier steht das Abstract der Nachricht In zwei Zeilen. Der Rest kommt später",
    text1: "9:20 Uhr",
    hasMessage: true,
    id: "fc5e9483-2207-49c5-ad83-ab8b1a24fe23",
  },
];*/

class Message extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataUser: {},
      notification: [],
      userList: [],
      chatList: [],
      ActivityIndicator: false,
    };
  }

  state = {};

  onClickItem = (index, link) => {
    this.collapse.current.setState({ activeIndex: index });
    functions.gotoScreen(this.props.navigation, link);
  };

  componentDidMount = async () => {
    global.Messages = this;

    let dataUser = await functions.getDataUser();

    this.setState({ dataUser: dataUser });
    //hideNavigationBar();

    var userList = [], chatList = [];

    try {
      dataUser = JSON.parse(dataUser);

      userList = dataUser.userList;
      chatList = dataUser.chatList;
    } catch (error) {
      console.log(error);
    }

    // check list of chat has saved on local, if not call api to get data
    if ((Array.isArray(chatList) && chatList.length == 0) || chatList == undefined)
      functions.getListUser(this);
    else {
      this.setState({
        userList: userList,
        chatList: chatList,
      });
    }
    // END

    global.screen = this;
  };

  static navigationOptions = ({ navigation }) => ({
    title: "",
  });

  getLastMesage = (from_user_id) => {
    let to_user_id = global.commonData.user.user_id;

    let mesages = [];

    try {
      if (global.commonData.chatList == undefined)
        global.commonData.chatList = [];
    } catch (error) {
      global.commonData.chatList = [];

    }

    global.commonData.chatList.map((item, index) => {
      if (
        (item.user_id_from == from_user_id ||
          item.user_id_from == to_user_id) &&
        (item.user_id_to == from_user_id || item.user_id_to == to_user_id)
      )
        mesages.push(item);
    });

    if (mesages.length == 0) {
      var obj = {};

      obj.create = null;
      obj.message = null;

      mesages.push(obj);
    }

    let length = mesages.length;

    return mesages[length - 1];
  };

  getNumberNotRead = (userId) => {
    let count = 0;

    global.notification.map((item, index) => {
      if (item.data.id == userId && !item.data.read) count = count + 1;
    });

    return count;
  };

  gotoChat = async (userId, key) => {
    global.notification.map((item, index) => {
      if (item.data.id == userId) global.notification[index].data.read = true;
    });

    let datauser = await functions.getDataUser();

    try {
      datauser = JSON.parse(datauser);
    } catch (error) {
      console.log(error);
    }

    datauser.notification = global.notification;

    AsyncStorage.setItem("data", JSON.stringify(datauser));

    functions.gotoScreenWithParam(
      JSON.stringify(key),
      this.props.navigation,
      "Chat"
    );
  };

  hashMesage = (chatList, user_id) => {
    let hasMessage = false;

    try {
      chatList.map((item, index) => {
        if (item.user_id_from == user_id || item.user_id_to == user_id)
          hasMessage = true;
      })
    } catch (error) {
      console.log(error)
    }

    return hasMessage;
  }

  render() {
    let userId,
      data = [];

    this.state.userList.map((item, index) => {
      try {
        if (item.firebase_token == null) {
          var lastMesage = this.getLastMesage(item.user_id);

          var obj = {};

          obj.title = item.prename + " " + item.lastname;
          obj.text = lastMesage.message;
          obj.text1 = lastMesage.create_at;
          obj.id = item.user_id;

          data.push(obj);
        }
      } catch (error) {
        console.log(error);
      }
    });

    try {
      userId = JSON.parse(this.state.dataUser).user.user_id;
    } catch (error) {
      userId = null;
    }

    return (
      <View style={styles.flexFull}>
        <Header component={this} />
        <ScrollView contentContainerStyle={styles.scroll}>
          <Background>
            <TextHeader special={true} icon={imgMessage} text2="chat" />
            <ActivityIndicator
              size="large"
              animating={this.state.ActivityIndicator}
            />
            <View style={[style.data]}>
              {data.map(({ title, text, text1, hasMessage, id }, index) => {
                let key = {};
                key.fromUser = global.commonData.user.user_id; //userId;
                key.toUser = id;

                if (this.getNumberNotRead(id) > 0 || this.hashMesage(this.state.chatList, id))
                  return (
                    <Href onPress={() => this.gotoChat(id, key)}>
                      <View style={style.parent}>
                        <View>
                          <Image source={require("../images/user_chat.png")} />
                          {this.getNumberNotRead(id) > 0 ? (
                            <View style={[style.textNumber]}>
                              <Text style={style.textNumber1}>
                                {this.getNumberNotRead(id)}
                              </Text>
                            </View>
                          ) : null}
                        </View>

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
                else
                  return null;
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

  textNumber1: {
    color: "white",
    fontSize: 13,
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

  textNumber: {
    position: "absolute",
    top: 20,
    right: -10,
    borderRadius: 10,
    borderColor: "#000",
    borderWidth: 1,
    backgroundColor: "#898166",
    alignItems: "center",
    width: 20,
    height: 20,
    zIndex: 3,
  },
});

export default Message;

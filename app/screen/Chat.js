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

class Chat extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    data: [],
    ActivityIndicator: false,
    fcmToken: null,
    message: null,
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
        fromUser: data._snapshot.value.fromUser
      };

      this.setState({
        data: [...this.state.data, value],
      });
    };

    let group = fromUser + "_" + toUser;
    ref = "messages/" + group + "";

    new UtilityFirebase(this).listenChildRef(ref, callbackListenChildRef);
  };

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

  renderItem = ({ item, index }) =>
    (item.fromUser == 'web')
    ? (
      <View style={styleChat.containerList}>
        <View style={styleChat.messageContainer}>
          <Text style={styles.fontNormal}>{item.message}</Text>
          <Text style={[styles.fontNormalSmall, style.dateTime]}>{item.dateTime}</Text>
          <Image source={imgFlag} style={{ position: 'absolute', top: -5, right: -5 }}/>
        </View>
      </View>
    ) : (
      <View style={styleChat.containerList}>
        <View style={styleChat.messageContainerOwn}>
          <Text style={styles.fontNormal}>{item.message}</Text>
          <Text style={[styles.fontNormalSmall, style.dateTime]}>{item.dateTime}</Text>
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
        <ScrollView contentContainerStyle={styles.scroll}>
          <Background>
            <TextHeader special={true} icon={imgMessage} text2="chat" />
            <View
              style={{
                flex: 1,
                width: '100%',
                flexDirection: "column",
                //backgroundColor: "#ccc",
              }}
            >
              <View style={{ }}>
                <FlatListViewNormal
                  data={this.state.data}
                  renderItem={this.renderItem}
                  horizontal={false}
                  col="1"
                />
              </View>
              <View style={{ }}>
                <Text style={{ paddingTop: 5 }}>{typingUsers}sdd</Text>
              </View>
            </View>
          </Background>
        </ScrollView>
        <View style={{ width: '100%', paddingBottom: 10, paddingTop: 0, paddingLeft: 20, paddingRight: 20, backgroundColor: 'black' }}>
              <TextInput
              onChangeText={(value) => this.setState({ message: value })}
              value={this.state.message}
              component={this}
              styleParent={[
                styles.textInput,
              ]}
              fontAwesome="true"
              leftIcon="eye"
              //onLeftClick={() => this.onClickEye(false)}
              leftStyle={style.leftStyle}
              rightIcon={
                (this.state.message == '') ? '' : 'eye'
            }
              bgFocus="white"
              bgBlur="#3f3f3f"
            />
            <Button
              color="white"
              text="UNTERNEHMENS-PROFIL"
              style={[styles.button, style.button]}
              onPress={() =>
                null
              }
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
    color: '#000000',
    marginTop: 5,
    paddingBottom: 10
  }
});

export default Chat;

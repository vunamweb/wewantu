import React, { Component } from "react";
import {
  StyleSheet,
  View,
  AsyncStorage,
  Dimensions,
  ActivityIndicator,
} from "react-native";

import Text from "../components/Paragraph";
import { ScrollView } from "react-native-gesture-handler";

import messaging from "@react-native-firebase/messaging";

import Background from "../components/Background";
import Logo from "../components/Logo";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import TextHeader from "../components/TextHeader";
import HeadLine from "../components/HeadLine";
import IconBottom from "../components/IconBottom";

import styles from "../../app/style/style";
import functions from "../../app/function/function";
//import firebase from '../function/UtilityFirebase';

const borderColor = "#000";

var text8, text9, text10;

class RegisterScreen_3 extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    colorBorder1: borderColor,
    colorBorder2: borderColor,
    colorBorder3: borderColor,
    errorMessage: "",
    marginTop: 0,
    firstName: "",
    lastName: "",
    email: "",
    display1: "none",
    display2: "none",
    ActivityIndicator: false,
    fcmToken: null,
  };

  componentDidMount = async () => {
    this.requestUserPermission();

    global.screen = this;
  };

  requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log("Authorization status:", authStatus);
      await messaging().registerDeviceForRemoteMessages();
      this.getToken();
    }
  };

  getToken = async () => {
    const fcmToken = await messaging().getToken();

    var datauser = await functions.getDataUser();

    try {
      datauser = JSON.parse(datauser);

      datauser.user = {};

      datauser.user.firebase_token = fcmToken;

      await AsyncStorage.setItem("data", JSON.stringify(datauser));
    } catch (error) {
      console.log(error);
    }
    console.log("token: " + fcmToken);

    this.setState({ fcmToken: fcmToken });
  };

  static navigationOptions = ({ navigation }) => ({
    title: "",
  });

  gotoNextStep = (component) => {
    let firstName = this.state.firstName;
    let lastName = this.state.lastName;
    let email = this.state.email;
    let marginTop = 20;

    if (firstName == "") {
      component.setState({
        colorBorder1: "red",
        marginTop: marginTop,
        errorMessage: text8,
      });
      return;
    } else {
      component.setState({ colorBorder1: borderColor, errorMessage: "" });
    }

    if (lastName == "") {
      component.setState({
        colorBorder2: "red",
        errorMessage: text9,
        marginTop: marginTop,
      });
      return;
    } else {
      component.setState({ colorBorder2: borderColor, errorMessage: "" });
    }

    if (!functions.validateEmail(email)) {
      component.setState({
        colorBorder3: "red",
        errorMessage: text10,
        marginTop: marginTop,
      });
      return;
    } else {
      component.setState({ colorBorder3: borderColor, errorMessage: "" });
    }

    try {
      var data = this.props.navigation.state.params.data;
      data = JSON.parse(data);

      var object = {};

      object.mail = email;
      object.password = data.password;
      object.firstName = firstName;
      object.lastName = lastName;
      object.cell_number = data.cell_number;
      object.mobile = data.mobile;
      object.firebase_token = this.state.fcmToken;

      global.mail_login = email;
      global.password_login = data.password;

      functions.register(object, this);
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    var commonData = global.commonData.languages;

    try {
      var text1 = commonData.let_s;
      var text2 = commonData.go;
      var text3 = commonData.regsiter;
      var text4 = commonData.first_name;
      var text5 = commonData.last_name;
      var text6 = commonData.e_mail;
      var text7 = commonData.login;
      text8 = commonData.Please_enter_First_name;
      text9 = commonData.Please_enter_last_name;
      text10 = commonData.please_enter_email;
      var text11 = commonData.activated_mail;
      var text12 = commonData.exist_mobile;
    } catch (error) {
      console.log(error);
    }
    return (
      <View style={styles.flexFull}>
        <ScrollView
          automaticallyAdjustKeyboardInsets={true}
          contentContainerStyle={{ flex: 1 }}
        >
          <Background>
            <Logo navigation={this.props.navigation} type={1} />
            <TextHeader text1={text1} text2={text2} />
            <HeadLine text={text3} />
            <Text style={styles.error}>{this.state.errorMessage}</Text>
            <ActivityIndicator
              size="large"
              animating={this.state.ActivityIndicator}
            />
            <Text
              style={[
                styles.error,
                { display: this.state.display1, marginBottom: 10 },
              ]}
            >
              {text12}
            </Text>
            <Text
              style={[
                styles.success,
                { display: this.state.display2, marginBottom: 10 },
              ]}
            >
              {text11}
            </Text>
            <TextInput
              placeholder={text4.toUpperCase()}
              onChangeText={(value) => this.setState({ firstName: value })}
              value={this.state.firstName}
              autoCapitalize="none"
              styleParent={[
                {
                  borderColor: this.state.colorBorder1,
                  marginTop: this.state.marginTop,
                },
                style.textInput,
                styles.textInput,
              ]}
              bgFocus="white"
              bgBlur="#3f3f3f"
            />
            <TextInput
              placeholder={text5.toUpperCase()}
              onChangeText={(value) => this.setState({ lastName: value })}
              value={this.state.lastName}
              component={this}
              styleParent={[
                {
                  borderColor: this.state.colorBorder2,
                },
                style.textInput,
                styles.textInput,
              ]}
              bgFocus="white"
              bgBlur="#3f3f3f"
            />
            <TextInput
              placeholder={text6.toUpperCase()}
              onChangeText={(value) => this.setState({ email: value })}
              value={this.state.email}
              component={this}
              styleParent={[
                {
                  borderColor: this.state.colorBorder3,
                },
                style.textInput,
                styles.textInput,
              ]}
              bgFocus="white"
              bgBlur="#3f3f3f"
            />
            <Button
              color="white"
              text={text3}
              style={[
                styles.button,
                { backgroundColor: "#898166", marginTop: 0 },
              ]}
              onPress={() => this.gotoNextStep(this)}
            />
          </Background>
        </ScrollView>
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
});

export default RegisterScreen_3;

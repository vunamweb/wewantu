import React, { Component } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  ActivityIndicator,
  AsyncStorage,
  Image,
  Dimensions,
} from "react-native";

import Text from "../components/Paragraph";
import { ScrollView } from "react-native-gesture-handler";

import Background from "../components/Background";
import Logo from "../components/Logo";
import TextInput from "../components/TextInput";
import Switch from "../components/Switch";
import Button from "../components/Button";
import IconBottom from "../components/IconBottom";

import styles from "../../app/style/style";
import functions from "../../app/function/function";

let borderColor = "#000";
const windowHeight = Dimensions.get("window").height;

class LoginScreen extends Component {
  constructor(props) {
    super(props);

    this.switch = [];
  }

  state = {
    userName: "",
    passWord: "",
    visible: false,
    colorBorderUserName: borderColor,
    colorBorderPassWord: borderColor,
    errorMessage: "",
    ActivityIndicator: false,
    secureTextEntry: true,
    checked: false,
    text: {},
  };

  componentDidMount = () => {
    functions.getText(this);

    this.automaticLogin();
  };

  static navigationOptions = ({ navigation }) => ({
    title: "",
  });

  onClickEye = () => {
    this.setState({ secureTextEntry: !this.state.secureTextEntry });
  };

  automaticLogin = () => {
    try {
      if (global.commonData.switch) {
        let userName = global.commonData.loginUser;
        let passWord = global.commonData.loginPassword;

        this.setState({
          userName: userName,
          passWord: passWord,
          visible: true,
        });

        functions.login(userName, passWord, this);
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    try {
      var textLanguage = global.commonData.languages;

      var text1 = textLanguage.username_or_email;
      var text2 = textLanguage.password;
      var text3 = textLanguage.login;
      var text4 = textLanguage.angemeldet_bleiben;
      var text5 = textLanguage.jetzt_bei;
      var text6 = textLanguage.WEWANTU_anmelden;
      var text7 = textLanguage.und_den_Karriere_Turbo_starten;
      var text8 = textLanguage.Passwort_vergessen;
    } catch (error) {
      console.log(error);
    }
    return (
      <View style={styles.flexFull}>
        <ScrollView
          keyboardShouldPersistTaps={"always"}
          contentContainerStyle={{ flex: 1 }}
        >
          <Background center="true">
            <Logo navigation={this.props.navigation} type={0} />
            <Image source={require("../images/profile.png")} />
            <Text style={styles.error}>{this.state.errorMessage}</Text>
            <ActivityIndicator
              size="small"
              animating={this.state.ActivityIndicator}
            />
            <TextInput
              placeholder={text1}
              onChangeText={(value) => this.setState({ userName: value })}
              value={this.state.userName}
              styleParent={[
                {
                  borderColor: this.state.colorBorderUserName,
                },
                style.textInput,
                styles.textInput,
              ]}
              leftStyle={style.leftStyle}
              bgFocus="white"
              bgBlur="#3f3f3f"
            />
            <TextInput
              secureTextEntry={this.state.secureTextEntry}
              title="Mật khẩu *"
              placeholder={text2}
              onChangeText={(value) => this.setState({ passWord: value })}
              value={this.state.passWord}
              returnKeyType="next"
              component={this}
              styleParent={[
                {
                  borderColor: this.state.colorBorderPassWord,
                },
                style.textInput,
                styles.textInput,
              ]}
              leftIcon={this.state.secureTextEntry ? "eye-off" : "eye"}
              onLeftClick={() => this.onClickEye(false)}
              leftStyle={style.leftStyle}
              bgFocus="white"
              bgBlur="#3f3f3f"
            />
            <Button
              color="white"
              text={text3}
              style={[styles.button, style.button]}
              onPress={() =>
                functions.login(this.state.userName, this.state.passWord, this)
              }
            />
            <View style={[styles.remember, style.marginRemember]}>
              <Text
                style={[
                  styles.colorTextCommon,
                  { marginRight: 20, marginTop: 5 },
                ]}
              >
                {text4}
              </Text>
              <Switch
                activeTrackColor={"#898166"}
                inactiveTrackColor={"#898166"}
                activeThumbColor={"#fff"}
                inactiveThumbColor={"#3e3e3e"}
                size={35}
                component={this}
                index={0}
                visible={this.state.visible}
              />
            </View>
            <View style={[styles.row]}>
              <Text style={[styles.colorTextCommon, style.text1]}>{text5}</Text>
              <TouchableOpacity
                onPress={() =>
                  functions.gotoScreen(
                    this.props.navigation,
                    "RegisterScreen_1"
                  )
                }
              >
                <Text style={[styles.link, styles.fontBoldNormal]}>
                  {text6}
                </Text>
              </TouchableOpacity>
            </View>
            <Text style={[styles.colorTextCommon, style.text2]}>{text7}</Text>
            <Text style={[styles.link, style.absolute, styles.fontNormalSmall]}>
              {text8}
            </Text>
          </Background>
        </ScrollView>
      </View>
    );
  }
}

const style = StyleSheet.create({
  absolute: {
    position: "absolute",
    bottom: 40,
  },

  marginRemember: {
    marginTop: 20,
    marginBottom: 40,
  },

  leftStyle: {
    paddingTop: 10,
  },

  button: {
    backgroundColor: "#898166",
    marginTop: 0,
  },

  text1: {
    marginRight: 5,
  },

  text2: {
    marginTop: 0,
  },

  textInput: {
    marginBottom: 15,
  },
});

export default LoginScreen;

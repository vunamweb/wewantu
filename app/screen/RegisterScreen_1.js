import React, { Component } from "react";
import { StyleSheet, View, AsyncStorage, Dimensions } from "react-native";

import { Provider, Portal, Modal } from "react-native-paper";

import Text from "../components/Paragraph";
import { ScrollView } from "react-native-gesture-handler";

import Background from "../components/Background";
import Logo from "../components/Logo";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import TextHeader from "../components/TextHeader";
import HeadLine from "../components/HeadLine";
import IconBottom from "../components/IconBottom";
import Href from "../components/Href";
import Image from "../components/Image";

import styles from "../../app/style/style";
import functions from "../../app/function/function";

const borderColor = "#000";
const imgClose = require("../images/close.png");

var text1, text2, text3;

class RegisterScreen_1 extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    mobile: "",
    passWord_1: "",
    passWord_2: "",
    colorBorder1: borderColor,
    colorBorder2: borderColor,
    colorBorder3: borderColor,
    colorBorder4: borderColor,
    errorMessage: "",
    secureTextEntry_1: true,
    secureTextEntry_2: true,
    marginTop: 0,
    visible: false,
    cellNumber: null,
  };

  componentDidMount = async () => {
    hideNavigationBar();

    let userName = await AsyncStorage.getItem("userName");
    let passWord = await AsyncStorage.getItem("passWord");

    if (userName != "" && userName != null) {
      this.setState({ userName: userName, passWord: passWord, checked: true });
    } else {
      this.setState({ userName: "", passWord: "", checked: false });
    }
  };

  static navigationOptions = ({ navigation }) => ({
    title: "",
  });

  onClickEye = (confirm) => {
    confirm
      ? this.setState({ secureTextEntry_2: !this.state.secureTextEntry_2 })
      : this.setState({ secureTextEntry_1: !this.state.secureTextEntry_1 });
  };

  gotoNextStep = (component) => {
    let mobile = this.state.mobile;
    let password1 = this.state.passWord_1;
    let password2 = this.state.passWord_2;
    let marginTop = 20;

    let cellNumber = this.state.cellNumber;
    cellNumber = cellNumber.split(" ");

    if (mobile == "") {
      component.setState({
        colorBorder1: "red",
        marginTop: marginTop,
        errorMessage: text1,
      });
      return;
    } else if (mobile != "") {
      component.setState({ colorBorder1: borderColor, errorMessage: "" });
    }

    if (password1 == "") {
      component.setState({
        colorBorder2: "red",
        errorMessage: text2,
        marginTop: marginTop,
      });
      return;
    } else {
      component.setState({ colorBorder2: borderColor, errorMessage: "" });
    }

    if (password2 != password1) {
      component.setState({
        colorBorder3: "red",
        errorMessage: text3,
        marginTop: marginTop,
      });
      return;
    } else {
      component.setState({ colorBorder3: borderColor, errorMessage: "" });
    }

    let object = {};

    object.mobile = mobile;
    object.password = password1;
    object.cell_number = cellNumber[0];

    functions.gotoScreenWithParam(
      JSON.stringify(object),
      this.props.navigation,
      "RegisterScreen_2"
    );
  };

  setCell = (name) => {
    this.setState({ cellNumber: name, visible: false });
  };

  render() {
    var commonData = global.commonData.languages;

    try {
      text1 = commonData.please_enter_mobile;
      text2 = commonData.please_enter_password;
      text3 = commonData.confirm_password_not_correct;

      var text4 = commonData.let_s;
      var text5 = commonData.go;
      var text6 = commonData.my_data;
      var text7 = commonData.mobile_number;
      var text8 = commonData.password;
      var text9 = commonData.repeat_password;
      var text10 = commonData.go;
      var text11 = commonData.no_i_dont_want_to;

      var text8_1 = commonData.germany;
      var text9_1 = commonData.austria;
      var text10_1 = commonData.Schweiz;
      var text11_1 = commonData.Polen;
      var text12_1 = commonData.Italien;
      var text13_1 = commonData.Portugal;
      var text14_1 = commonData.romania;
      var text15_1 = commonData.serbia;

      var cellNumbers = [
        {
          title: "+49 " + text8_1 + "",
        },
        {
          title: "+43 " + text9_1 + "",
        },
        {
          title: "+41 " + text10_1 + "",
        },
        {
          title: "+48 " + text11_1 + "",
        },
        {
          title: "+39 " + text12_1 + "",
        },
        {
          title: "+351 " + text13_1 + "",
        },
        {
          title: "+40 " + text14_1 + "",
        },
        {
          title: "+381 " + text15_1 + "",
        },
      ];
    } catch (error) {
      console.log(error);
    }

    let cellNumber = cellNumbers[0].title;

    this.state.cellNumber =
      this.state.cellNumber != null ? this.state.cellNumber : cellNumber;

    return (
      <Provider>
        <Portal>
          <Modal visible={this.state.visible}>
            <ScrollView>
              <View style={style.modal}>
                {/*<Text style={[style.modalHeadLine, styles.fontBoldNormal]}>
                  {text8}
    </Text>*/}
                <View style={style.close}>
                  <Href
                    onPress={() =>
                      this.setState({
                        visible: false,
                      })
                    }
                  >
                    <Image source={imgClose} />
                  </Href>
                </View>
                {cellNumbers.map(({ title }, index) => {
                  return (
                    <View style={[styles.fullWith, { marginTop: 10 }]}>
                      <View style={style.line} />
                      <Href onPress={() => this.setCell(title)}>
                        <View
                          style={[
                            styles.fullWith,
                            styles.fontBoldSmall,
                            style.language,
                          ]}
                        >
                          <Text>{title}</Text>
                        </View>
                      </Href>
                    </View>
                  );
                })}
              </View>
            </ScrollView>
          </Modal>
        </Portal>
        <View style={styles.flexFull}>
          <ScrollView
            automaticallyAdjustKeyboardInsets={true}
            contentContainerStyle={{ flex: 1 }}
          >
            <Background>
              <Logo navigation={this.props.navigation} type={1} />
              <TextHeader text1={text4} text2={text5} />
              <HeadLine text={text6} />
              <Text style={styles.error}>{this.state.errorMessage}</Text>
              <View style={[styles.flexRow, style.viewRoot]}>
                <TextInput
                  hideKeyboard={true}
                  callBack={() => this.setState({ visible: true })}
                  value={this.state.cellNumber}
                  styleParent={[
                    {
                      marginTop: this.state.marginTop,
                      borderColor: this.state.colorBorder4,
                    },
                    style.textInput,
                    styles.textInput,
                    { width: "35%" },
                  ]}
                  bgFocus="white"
                  bgBlur="#3f3f3f"
                />
                <TextInput
                  placeholder={text7.toUpperCase()}
                  onChangeText={(value) => this.setState({ mobile: value })}
                  value={this.state.mobile}
                  autoCapitalize="none"
                  styleParent={[
                    {
                      borderColor: this.state.colorBorder1,
                      marginTop: this.state.marginTop,
                    },
                    style.textInput,
                    styles.textInput,
                    { width: "65%" },
                  ]}
                  bgFocus="white"
                  bgBlur="#3f3f3f"
                />
              </View>
              <TextInput
                secureTextEntry={this.state.secureTextEntry_1}
                placeholder={text8.toUpperCase()}
                onChangeText={(value) => this.setState({ passWord_1: value })}
                value={this.state.passWord_1}
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
                leftIcon={this.state.secureTextEntry_1 ? "eye-off" : "eye"}
                onLeftClick={() => this.onClickEye(false)}
                leftStyle={style.leftStyle}
              />
              <TextInput
                secureTextEntry={this.state.secureTextEntry_2}
                placeholder={text9.toUpperCase()}
                onChangeText={(value) => this.setState({ passWord_2: value })}
                value={this.state.passWord_2}
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
                leftIcon={this.state.secureTextEntry_2 ? "eye-off" : "eye"}
                onLeftClick={() => this.onClickEye(true)}
                leftStyle={style.leftStyle}
              />
              <Button
                color="white"
                text={text10}
                style={[
                  styles.button,
                  { backgroundColor: "#898166", marginTop: 0 },
                ]}
                onPress={() => this.gotoNextStep(this)}
              />
              <Button
                color="white"
                text={text11}
                style={[
                  styles.button,
                  styles.Bottome_1,
                  { backgroundColor: "#3f3f3f" },
                ]}
                onPress={() =>
                  functions.gotoScreen(this.props.navigation, "LoginScreen")
                }
              />
            </Background>
          </ScrollView>
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

  modal: {
    width: "60%",
    marginLeft: "30%",
    marginRight: "30%",
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 30,
    height: "100%",
    backgroundColor: "#414141",
    alignItems: "center",
  },

  close: {
    position: "absolute",
    right: 10,
    top: 5,
  },

  line: {
    height: 1,
    width: "100%",
    backgroundColor: "#707070",
  },

  language: {
    marginTop: 10,
    marginBottom: 10,
  },

  viewRoot: {
    width: "100%",
    justifyContent: "space-between",
  },
});

export default RegisterScreen_1;

import React, { Component } from "react";
import { StyleSheet, View, AsyncStorage, Dimensions } from "react-native";

import Text from "../components/Paragraph";
import { ScrollView } from "react-native-gesture-handler";

import Background from "../components/Background";
import Logo from "../components/Logo";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import TextHeader from "../components/TextHeader";
import HeadLine from "../components/HeadLine";
import IconBottom from "../components/IconBottom";

import styles from "../../app/style/style";
import functions from "../../app/function/function";

const borderColor = "#000";

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
    errorMessage: "",
    secureTextEntry_1: true,
    secureTextEntry_2: true,
    marginTop: 0,
  };

  componentDidMount = async () => {
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

    functions.gotoScreenWithParam(
      JSON.stringify(object),
      this.props.navigation,
      "RegisterScreen_2"
    );
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
    } catch (error) {
      console.log(error);
    }
    return (
      <View style={styles.flexFull}>
        <ScrollView
          keyboardShouldPersistTaps={"always"}
          contentContainerStyle={{ flex: 1 }}
        >
          <Background>
            <Logo navigation={this.props.navigation} type={1} />
            <TextHeader text1={text4} text2={text5} />
            <HeadLine text={text6} />
            <Text style={styles.error}>{this.state.errorMessage}</Text>
            <TextInput
              placeholder={text7}
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
              ]}
              bgFocus="white"
              bgBlur="#3f3f3f"
            />
            <TextInput
              secureTextEntry={this.state.secureTextEntry_1}
              placeholder={text8}
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
              placeholder={text9}
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

export default RegisterScreen_1;

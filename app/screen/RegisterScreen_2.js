import React, { Component, createRef } from "react";
import {
  StyleSheet,
  View,
  AsyncStorage,
  Dimensions,
  Text,
  PixelRatio,
  ActivityIndicator,
} from "react-native";

import { ScrollView } from "react-native-gesture-handler";

import Background from "../components/Background";
import Logo from "../components/Logo";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import IconBottom from "../components/IconBottom";

import styles from "../../app/style/style";
import functions from "../../app/function/function";

import "../config/config";

let borderColor = "#000";
const pixelRatio = global.pixelRatio;

var pin, data;

const MARGIN_BOTTOM_TEXT_TOP = 100 * pixelRatio * PixelRatio.getFontScale();
const MARGIN_TOP_TEXT_BOTTOM = 60 * pixelRatio * PixelRatio.getFontScale();
const MARGIN_TOP_BUTTON_BOTTOM = 40 * pixelRatio * PixelRatio.getFontScale();

class RegisterScreen_2 extends Component {
  constructor(props) {
    super(props);
    this.input1 = createRef();
    this.input2 = createRef();
    this.input3 = createRef();
    this.input4 = createRef();
    this.input5 = createRef();
  }

  state = {
    value1: "",
    value2: "",
    value3: "",
    value4: "",
    value5: "",
    colorBorder1: borderColor,
    colorBorder2: borderColor,
    colorBorder3: borderColor,
    colorBorder4: borderColor,
    colorBorder5: borderColor,
    errorMessage: "",
    marginTop: 0,
    ActivityIndicator: false,
  };

  componentDidMount = async () => {
    try {
      data = this.props.navigation.state.params.data;
      data = JSON.parse(data);

      var mobile = data.mobile;

      pin = 12345; //this.generateRandomNumberString(5);

      console.log(pin);

      //functions.sendSMS(this, mobile, pin);
    } catch (error) {
      console.log(error);
    }
  };

  generateRandomNumberString = (length) => {
    const characters = "0123456789";
    let result = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }

    return result;
  };

  static navigationOptions = ({ navigation }) => ({
    title: "",
  });

  onChangeValue = (position, value) => {
    var match = /[^0-9]/g;

    switch (position) {
      case 2:
        value = value.replace(match, "");
        this.setState({ value2: value });

        if (value != "") this.input3.current.focus();

        break;

      case 3:
        value = value.replace(match, "");
        this.setState({ value3: value });

        if (value != "") this.input4.current.focus();

        break;

      case 4:
        value = value.replace(match, "");
        this.setState({ value4: value });

        if (value != "") this.input5.current.focus();

        break;

      case 5:
        value = value.replace(match, "");
        this.setState({ value5: value });

        break;

      default:
        value = value.replace(match, "");
        this.setState({ value1: value });

        if (value != "") this.input2.current.focus();
    }
  };

  gotoNextStep = (component) => {
    let value1 = this.state.value1;
    let value2 = this.state.value2;
    let value3 = this.state.value3;
    let value4 = this.state.value4;
    let value5 = this.state.value5;
    let marginTop = 20;

    if (value1 == "") {
      component.setState({
        colorBorder1: "red",
        marginTop: marginTop,
        errorMessage: "Please enter value",
      });
      return;
    } else if (value1 != "") {
      component.setState({ colorBorder1: borderColor, errorMessage: "" });
    }

    if (value2 == "") {
      component.setState({
        colorBorder2: "red",
        errorMessage: "Please enter value",
        marginTop: marginTop,
      });
      return;
    } else {
      component.setState({ colorBorder2: borderColor, errorMessage: "" });
    }

    if (value3 == "") {
      component.setState({
        colorBorder3: "red",
        errorMessage: "Please enter value",
        marginTop: marginTop,
      });
      return;
    } else {
      component.setState({ colorBorder3: borderColor, errorMessage: "" });
    }

    if (value4 == "") {
      component.setState({
        colorBorder4: "red",
        errorMessage: "Please enter value",
        marginTop: marginTop,
      });
      return;
    } else {
      component.setState({ colorBorder4: borderColor, errorMessage: "" });
    }

    if (value5 == "") {
      component.setState({
        colorBorder5: "red",
        errorMessage: "Please enter value",
        marginTop: marginTop,
      });
      return;
    } else {
      component.setState({ colorBorder5: borderColor, errorMessage: "" });
    }

    let enterPin = value1 + value2 + value3 + value4 + value5;

    if (pin == enterPin)
      functions.gotoScreenWithParam(
        JSON.stringify(data),
        this.props.navigation,
        "RegisterScreen_3"
      );
    else {
      component.setState({
        errorMessage: "Pin is wrong, Please try again",
        marginTop: marginTop,
      });
    }
  };

  render() {
    return (
      <View style={styles.flexFull}>
        <ScrollView
          keyboardShouldPersistTaps={"always"}
          contentContainerStyle={{ flex: 1 }}
        >
          <Background center="true">
            <Logo
              style={style.logo}
              navigation={this.props.navigation}
              type={0}
            />
            <View style={style.parentTextTop}>
              <Text style={[styles.fontBoldSmall, style.textTop]}>
                You will shortly receive your You will shortly receive your
                confirmation code by SMS
              </Text>
            </View>
            <ActivityIndicator
              size="large"
              animating={this.state.ActivityIndicator}
            />
            <Text style={styles.error}>{this.state.errorMessage}</Text>
            <View
              style={[
                styles.flexRow,
                style.viewRoot,
                { marginTop: this.state.marginTop },
              ]}
            >
              <TextInput
                ref_={this.input1}
                onChangeText={(value) => this.onChangeValue(1, value)}
                value={this.state.value1}
                styleParent={[
                  {
                    borderColor: this.state.colorBorder1,
                  },
                  styles.textInputSmall,
                ]}
                bgFocus="#3f3f3f"
                bgBlur="white"
                keyboardType="number-pad"
                maxLength={1}
              />
              <TextInput
                ref_={this.input2}
                onChangeText={(value) => this.onChangeValue(2, value)}
                value={this.state.value2}
                styleParent={[
                  {
                    borderColor: this.state.colorBorder2,
                  },
                  styles.textInputSmall,
                ]}
                bgFocus="#3f3f3f"
                bgBlur="white"
                keyboardType="number-pad"
                maxLength={1}
              />
              <TextInput
                ref_={this.input3}
                onChangeText={(value) => this.onChangeValue(3, value)}
                value={this.state.value3}
                styleParent={[
                  {
                    borderColor: this.state.colorBorder3,
                  },
                  styles.textInputSmall,
                ]}
                bgFocus="#3f3f3f"
                bgBlur="white"
                keyboardType="number-pad"
                maxLength={1}
              />
              <TextInput
                ref_={this.input4}
                onChangeText={(value) => this.onChangeValue(4, value)}
                value={this.state.value4}
                styleParent={[
                  {
                    borderColor: this.state.colorBorder4,
                  },
                  styles.textInputSmall,
                ]}
                bgFocus="#3f3f3f"
                bgBlur="white"
                keyboardType="number-pad"
                maxLength={1}
              />
              <TextInput
                ref_={this.input5}
                onChangeText={(value) => this.onChangeValue(5, value)}
                value={this.state.value5}
                styleParent={[
                  {
                    borderColor: this.state.colorBorder5,
                  },
                  styles.textInputSmall,
                ]}
                bgFocus="#3f3f3f"
                bgBlur="white"
                keyboardType="number-pad"
                maxLength={1}
              />
            </View>
            <Button
              color="white"
              text="GO!"
              style={[
                styles.button,
                { backgroundColor: "#898166", marginTop: 20 },
              ]}
              onPress={() => this.gotoNextStep(this)}
            />
            <Text style={[style.textBottom, styles.fontBoldSmall]}>
              Code not received?
            </Text>
            <Button
              color="white"
              text="Enter a different phone number"
              style={[
                styles.button,
                {
                  backgroundColor: "#2B2B2B",
                  marginTop: MARGIN_TOP_BUTTON_BOTTOM,
                },
              ]}
              onPress={() => functions.backScreen(this.props.navigation)}
            />
          </Background>
        </ScrollView>
      </View>
    );
  }
}

const style = StyleSheet.create({
  viewRoot: {
    width: "100%",
    justifyContent: "space-between",
  },

  parentTextTop: {
    width: "100%",
    alignItems: "center",
    marginBottom: MARGIN_BOTTOM_TEXT_TOP,
  },

  textTop: {
    color: "#fff",
    textAlign: "center",
  },

  textBottom: {
    marginTop: MARGIN_TOP_TEXT_BOTTOM,
    color: "#fff",
  },

  logo: {
    left: -20,
  },
});

export default RegisterScreen_2;

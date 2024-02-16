import React, { Component } from "react";
import { StyleSheet, View, AsyncStorage, Dimensions } from "react-native";

import Text from "../components/Paragraph";
import { ScrollView } from "react-native-gesture-handler";

import Background from "../components/Background";
import TextInput from "../components/TextInput";
import TextHeader from "../components/TextHeader";
import HeadLine from "../components/HeadLine";
import IconBottom from "../components/IconBottom";
import BackNext from "../components/BackNext";
import Header from "../components/Header";

import styles from "../../app/style/style";
import functions from "../function/function";

const borderColor = "#000";
var component;
var text6, text7;

class PersonalData_2 extends Component {
  constructor(props) {
    super(props);

    this.gotoNextStep.bind(this);

    this.state = {
      colorBorder1: borderColor,
      colorBorder2: borderColor,
      marginTop: 0,
      mobile: null,
      email: null,
    };
  }

  componentDidMount = async () => {};

  static navigationOptions = ({ navigation }) => ({
    title: "",
  });

  onChangeValue = (value) => {
    var match = /[^0-9 +]/g;

    value = value.replace(match, "");

    this.setState({ mobile: value });
  };

  gotoNextStep = () => {
    let mobile = this.state.mobile;
    let email = this.state.email;
    let marginTop = 20;

    component = this;

    if (mobile == null || mobile == "+") {
      component.setState({
        colorBorder1: "red",
        marginTop: marginTop,
        errorMessage: text6,
      });
      return false;
    } else if (mobile != "") {
      component.setState({ colorBorder1: borderColor, errorMessage: "" });
    }

    /*if (email == null) {
      component.setState({
        colorBorder2: "red",
        errorMessage: "Please enter email",
        marginTop: marginTop,
      });
      return false;
    } else {
      component.setState({ colorBorder2: borderColor, errorMessage: "" });
    }*/

    if (!functions.validateEmail(email)) {
      component.setState({
        colorBorder2: "red",
        errorMessage: text7,
        marginTop: marginTop,
      });
      return false;
    } else {
      component.setState({ colorBorder2: borderColor, errorMessage: "" });
    }

    return true;
  };

  render() {
    var commonData = global.commonData.languages;

    try {
      var text1 = commonData.the_ber_way_to_reach_me;
      var text2 = commonData.mobile;
      var text3 = commonData.e_mail;
      var text4 = commonData.contact;
      var text5 = commonData.me;
      text6 = commonData.please_enter_mobile;
      text7 = commonData.please_enter_email;
    } catch (error) {
      console.log(error);
    }

    return (
      <View style={styles.flexFull}>
        <Header component={this} Notification={false} />
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <Background>
            <TextHeader text1={text4} text2={text5} />
            <HeadLine text={text1} />
            <Text style={styles.error}>{this.state.errorMessage}</Text>
            <TextInput
              keyboardType="number-pad"
              placeholder={text2 + " *"}
              onChangeText={(value) => this.onChangeValue(value)}
              value={this.state.mobile}
              styleParent={[
                {
                  marginTop: this.state.marginTop,
                  borderColor: this.state.colorBorder1,
                },
                style.textInput,
                styles.textInput,
              ]}
              bgFocus="white"
              bgBlur="#3f3f3f"
            />
            <TextInput
              placeholder={text3 + " *"}
              onChangeText={(value) => this.setState({ email: value })}
              value={this.state.email}
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
            <BackNext
              nextScreen="PersonalData_3"
              position="absolute"
              callBack={this.gotoNextStep}
              navigation={this.props.navigation}
            />
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
  img: {
    marginTop: 30,
  },

  CheckBox: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    marginTop: 40,
  },

  textInput: {
    marginBottom: 15,
  },
});

export default PersonalData_2;

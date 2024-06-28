import React, { Component, createRef } from "react";
import { StyleSheet, View, AsyncStorage, Dimensions } from "react-native";

import { Provider, Portal, Modal } from "react-native-paper";

import Text from "../components/Paragraph";
import { ScrollView } from "react-native-gesture-handler";

import Background from "../components/Background";
import TextInput from "../components/TextInput";
import TextHeader from "../components/TextHeader";
import HeadLine from "../components/HeadLine";
import IconBottom from "../components/IconBottom";
import BackNext from "../components/BackNext";
import Header from "../components/Header";
import Href from "../components/Href";
import Image from "../components/Image";

import styles from "../../app/style/style";
import functions from "../function/function";

const borderColor = "#000";
const imgClose = require("../images/close.png");
var component;
var text6, text7, text17;

class PersonalData_2 extends Component {
  constructor(props) {
    super(props);

    this.input1 = createRef();
    this.input2 = createRef();
    this.input3 = createRef();
    this.input4 = createRef();
    this.input5 = createRef();

    this.input1 = createRef();

    this.gotoNextStep.bind(this);

    this.state = {
      colorBorder1: borderColor,
      colorBorder2: borderColor,
      colorBorder3: borderColor,
      marginTop: 0,
      mobile: null,
      email: null,
      visible: false,
      cellNumber: null,
      value1: "",
      value2: "",
      value3: "",
      value4: "",
      value5: "",
      colorBorder1_: borderColor,
      colorBorder2_: borderColor,
      colorBorder3_: borderColor,
      colorBorder4_: borderColor,
      colorBorder5_: borderColor,
      errorMessage: "",
      errorMessage1: "",
      marginTop: 0,
      displayCode: 'none'
    };
  }

  componentDidMount = async () => { };

  static navigationOptions = ({ navigation }) => ({
    title: "",
  });

  onChangeValue = (value) => {
    var match = /[^0-9 +]/g;

    value = value.replace(match, "");

    this.setState({ mobile: value });
  };

  setCell = (name) => {
    this.setState({ cellNumber: name, visible: false });

    this.input1.current.focus();
  };

  gotoNextStep = () => {
    let cellNumber = this.state.cellNumber;
    let mobile = this.state.mobile;
    let email = this.state.email;
    let marginTop = 20;
    let pin = '12345';

    component = this;

    if (cellNumber == null) {
      component.setState({
        colorBorder3: "red",
        marginTop: marginTop,
        errorMessage: text6,
      });
      return false;
    } else if (mobile != "") {
      component.setState({ colorBorder3: borderColor, errorMessage: "" });
    }

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

    if (this.isInsert()) {
      let value1 = this.state.value1;
      let value2 = this.state.value2;
      let value3 = this.state.value3;
      let value4 = this.state.value4;
      let value5 = this.state.value5;

      if (this.state.displayCode == 'none') {
        this.setState({ displayCode: 'flex' })

        return false;
      }

      if (value1 == "") {
        component.setState({
          colorBorder1_: "red",
        });
        return false;
      } else {
        component.setState({ colorBorder1_: borderColor });
      }

      if (value2 == "") {
        component.setState({
          colorBorder2_: "red",
        });
        return false;
      } else {
        component.setState({ colorBorder2_: borderColor });
      }

      if (value3 == "") {
        component.setState({
          colorBorder3_: "red",
        });
        return false;
      } else {
        component.setState({ colorBorder3_: borderColor });
      }

      if (value4 == "") {
        component.setState({
          colorBorder4_: "red",
        });
        return false;
      } else {
        component.setState({ colorBorder4_: borderColor });
      }

      if (value5 == "") {
        component.setState({
          colorBorder5_: "red",
        });
        return false;
      } else {
        component.setState({ colorBorder5_: borderColor });
      }

      let enterPin = value1 + value2 + value3 + value4 + value5;

      if (enterPin != pin) {
        this.setState({ errorMessage1: text17 });
        return false;
      }

      var obj = {};

      try {
        let cellNumber = this.state.cellNumber;
        cellNumber = cellNumber.split(" ");

        obj.mail = this.state.email;
        obj.cell_number = cellNumber[0];
        obj.mobile_phone_number = this.state.mobile;
        obj.user_id = global.commonData.user.user_id;

        global.commonData.user.another.mail = this.state.email;
        global.commonData.user.another.mobile_phone_number = this.state.mobile;
        global.commonData.user.another.cell_number = cellNumber[0];
      } catch (error) {
        console.log(error);
      }

      functions.updateUser(this, obj, 2);

      return true;
    } else {
      return true;
    }
  };

  isInsert = () => {
    let mobile, email, cellNumber;

    try {
      mobile = global.commonData.user.another.mobile_phone_number;
      email = global.commonData.user.another.mail;
      cellNumber = global.commonData.user.another.cell_number;

      if (
        mobile == this.state.mobile &&
        email == this.state.email &&
        (this.state.cellNumber.includes(cellNumber) && cellNumber != undefined)
      )
        return false;

      return true;
    } catch (error) {
      console.log(error);
      return true;
    }
  };

  onChangeValue_ = (position, value) => {
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
      var text8 = commonData.cell_number;

      var text8 = commonData.germany;
      var text9 = commonData.austria;
      var text10 = commonData.Schweiz;
      var text11 = commonData.Polen;
      var text12 = commonData.Italien;
      var text13 = commonData.Portugal;
      var text14 = commonData.romania;
      var text15 = commonData.serbia;

      var text16 = commonData.You_will_shortly_receive_your_code;
      text17 = commonData.pin_is_wrong;

      var cellNumbers = [
        {
          title: "+49 " + text8 + "",
        },
        {
          title: "+43 " + text9 + "",
        },
        {
          title: "+41 " + text10 + "",
        },
        {
          title: "+48 " + text11 + "",
        },
        {
          title: "+39 " + text12 + "",
        },
        {
          title: "+351 " + text13 + "",
        },
        {
          title: "+40 " + text14 + "",
        },
        {
          title: "+381 " + text15 + "",
        },
      ];
    } catch (error) {
      console.log(error);
    }

    var param = {};

    var cellNumber;

    switch (global.commonData.user.another.cell_number) {
      case "+43":
        cellNumber = cellNumbers[1].title;
        break;

      case "+41":
        cellNumber = cellNumbers[2].title;
        break;
      case "+48":
        cellNumber = cellNumbers[3].title;
        break;
      case "+39":
        cellNumber = cellNumbers[4].title;
        break;
      case "+351":
        cellNumber = cellNumbers[5].title;
        break;
      case "+40":
        cellNumber = cellNumbers[6].title;
        break;
      case "+381":
        cellNumber = cellNumbers[7].title;
        break;
      default:
        cellNumber = cellNumbers[0].title;
    }

    this.state.cellNumber =
      this.state.cellNumber != null ? this.state.cellNumber : cellNumber;

    try {
      param = JSON.parse(this.props.navigation.state.params.data);

      param.step2 = {};
      param.step2.mobile = this.state.mobile;
      param.step2.email = this.state.email;
    } catch (error) {
      console.log(error);
    }

    try {
      this.state.mobile =
        this.state.mobile != null
          ? this.state.mobile
          : global.commonData.user.another.mobile_phone_number;

      this.state.email =
        this.state.email != null
          ? this.state.email
          : global.commonData.user.another.mail;
    } catch (error) {
      console.log(error);
    }

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
          <Header component={this} Notification={false} />
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <Background>
              <TextHeader text1={text4} text2={text5} />
              <HeadLine text={text1} />
              <Text style={styles.error}>{this.state.errorMessage}</Text>
              <View style={[styles.flexRow, style.viewRoot]}>
                <TextInput
                  hideKeyboard={true}
                  callBack={() => this.setState({ visible: true })}
                  value={this.state.cellNumber}
                  styleParent={[
                    {
                      marginTop: this.state.marginTop,
                      borderColor: this.state.colorBorder3,
                    },
                    style.textInput,
                    styles.textInput,
                    { width: "45%" },
                  ]}
                  bgFocus="white"
                  bgBlur="#3f3f3f"
                />
                <TextInput
                  keyboardType="number-pad"
                  ref_={this.input1}
                  placeholder={text2.toUpperCase() + " *"}
                  onChangeText={(value) => this.onChangeValue(value)}
                  value={this.state.mobile}
                  styleParent={[
                    {
                      marginTop: this.state.marginTop,
                      borderColor: this.state.colorBorder1,
                    },
                    style.textInput,
                    styles.textInput,
                    { width: "55%" },
                  ]}
                  bgFocus="white"
                  bgBlur="#3f3f3f"
                />
              </View>

              <TextInput
                placeholder={text3.toUpperCase() + " *"}
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

              <Text style={[styles.fontBoldSmall, style.textTop, { display: this.state.displayCode }]}>{text16}</Text>
              <Text style={[styles.error, { marginBottom: 20 }]}>{this.state.errorMessage1}</Text>
              <View
                style={[
                  styles.flexRow,
                  style.viewRoot,
                  { marginTop: this.state.marginTop, display: this.state.displayCode },
                ]}
              >
                <TextInput
                  ref_={this.input1}
                  onChangeText={(value) => this.onChangeValue_(1, value)}
                  value={this.state.value1}
                  styleParent={[
                    {
                      borderColor: this.state.colorBorder1_,
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
                  onChangeText={(value) => this.onChangeValue_(2, value)}
                  value={this.state.value2}
                  styleParent={[
                    {
                      borderColor: this.state.colorBorder2_,
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
                  onChangeText={(value) => this.onChangeValue_(3, value)}
                  value={this.state.value3}
                  styleParent={[
                    {
                      borderColor: this.state.colorBorder3_,
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
                  onChangeText={(value) => this.onChangeValue_(4, value)}
                  value={this.state.value4}
                  styleParent={[
                    {
                      borderColor: this.state.colorBorder4_,
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
                  onChangeText={(value) => this.onChangeValue_(5, value)}
                  value={this.state.value5}
                  styleParent={[
                    {
                      borderColor: this.state.colorBorder5_,
                    },
                    styles.textInputSmall,
                  ]}
                  bgFocus="#3f3f3f"
                  bgBlur="white"
                  keyboardType="number-pad"
                  maxLength={1}
                />
              </View>
              <BackNext
                nextScreen="PersonalData_3"
                data={JSON.stringify(param)}
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
      </Provider>
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

  viewRoot: {
    width: "100%",
    justifyContent: "space-between",
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

  textTop: {
    color: "#fff",
    textAlign: "center",
    marginBottom: 20
  },
});

export default PersonalData_2;

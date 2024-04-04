import React, { Component, createRef } from "react";
import { StyleSheet, View, AsyncStorage } from "react-native";

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
import functions from "../../app/function/function";

const borderColor = "#000";
const imgClose = require("../images/close.png");
var text11, text12;

class PersonalData_3 extends Component {
  constructor(props) {
    super(props);

    this.gotoNextStep.bind(this);

    this.input1 = createRef();

    this.state = {
      colorBorder1: borderColor,
      colorBorder2: borderColor,
      marginTop: 10,
      street: null,
      house_number: null,
      address_addition: null,
      city: null,
      postal_code: "",
      year_birthday: "",
      errorMessage: "",
      display: "none",
      visible: false,
    };
  }

  componentDidMount = async () => {};

  static navigationOptions = ({ navigation }) => ({
    title: "",
  });

  onChangeValue = (value) => {
    var match = /[^0-9]/g;

    value = value.replace(match, "");

    this.setState({ postal_code: value });
  };

  gotoNextStep = () => {
    let zip = this.state.postal_code;
    let year = this.state.year_birthday;
    let marginTop = 20;

    var component = this;

    if (zip.length != 5) {
      component.setState({
        colorBorder1: "red",
        marginTop: marginTop,
        errorMessage: text11,
        display: "flex",
      });
      return false;
    } else if (zip != "") {
      component.setState({ colorBorder1: borderColor, errorMessage: "" });
    }

    if (year == "") {
      component.setState({
        colorBorder2: "red",
        marginTop: marginTop,
        errorMessage: text12,
        display: "flex",
      });
      return false;
    } else if (year != "") {
      component.setState({ colorBorder2: borderColor, errorMessage: "" });
    }

    this.saveZip(zip);

    // if user change any information of address, then insert or update to server
    if (this.isInsertAndUpdate()) {
      let zip = global.commonData.user.another.postal_code;

      // if user has no address, then insert to database
      if (zip == null || zip == undefined) functions.insertAdress(this.state);
      // update user on server
      else functions.updateAdress(this.state);
    }

    return true;
  };

  isInsertAndUpdate = () => {
    let street, no, address, zip, city, year;

    try {
      street = global.commonData.user.another.street;
      no = global.commonData.user.another.house_number;
      address = global.commonData.user.another.address_addition;
      zip = global.commonData.user.another.postal_code;
      city = global.commonData.user.another.city;
      year = global.commonData.user.another.year_birthday;

      if (
        street == this.state.street &&
        no == this.state.house_number &&
        address == this.state.address_addition &&
        zip == this.state.postal_code &&
        city == this.state.city &&
        year == this.state.year_birthday
      )
        return false;

      return true;
    } catch (error) {
      console.log(error);
      return true;
    }
  };

  saveZip = async (zip) => {
    try {
      await AsyncStorage.setItem("zip", zip);
    } catch (error) {
      console.log(error);
    }
  };

  initYear = () => {
    var result = [];

    for (let year_ = 1940; year_ < 2023; year_++) result.push(year_);

    return result;
  };

  setYear = (name) => {
    this.input1.current.blur();
    this.setState({ year_birthday: name, visible: false });
  };

  render() {
    var commonData = global.commonData.languages;

    try {
      var text1 = commonData.meine_anschrift;
      var text2 = commonData.street;
      var text3 = commonData.no;
      var text4 = commonData.address_additional;
      //var text5 = commonData.me;
      var text6 = commonData.zip;
      var text7 = commonData.city;
      var text8 = commonData.year_of_birthday;
      var text9 = commonData.that_s;
      var text10 = commonData.me;

      text11 = commonData.please_enter_zip;
      text12 = commonData.please_enter_year;
    } catch (error) {
      console.log(error);
    }

    var param = {};

    try {
      param = JSON.parse(this.props.navigation.state.params.data);

      param.step3 = {};

      param.step3.street = this.state.street;
      param.step3.no = this.state.house_number;
      param.step3.address = this.state.address_addition;
      param.step3.zip = this.state.postal_code;
      param.step3.city = this.state.city;
      param.step3.year = this.state.year_birthday;

      this.state.street =
        this.state.street != null
          ? this.state.street
          : global.commonData.user.another.street;

      this.state.house_number =
        this.state.house_number != null
          ? this.state.house_number
          : global.commonData.user.another.house_number;

      this.state.address_addition =
        this.state.address_addition != null
          ? this.state.address_addition
          : global.commonData.user.another.address_addition;

      this.state.postal_code =
        this.state.postal_code != ""
          ? this.state.postal_code
          : global.commonData.user.another.postal_code;

      this.state.city =
        this.state.city != null
          ? this.state.city
          : global.commonData.user.another.city;

      this.state.year_birthday =
        this.state.year_birthday != ""
          ? this.state.year_birthday
          : global.commonData.user.another.year_birthday;
    } catch (error) {
      console.log(error);
    }

    var year = this.initYear();

    var numberYear = this.state.year_birthday + "";

    return (
      <Provider>
        <Portal>
          <Modal visible={this.state.visible}>
            <ScrollView>
              <View style={style.modal}>
                <Text style={[style.modalHeadLine, styles.fontBoldNormal]}>
                  Year
                </Text>
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
                {year.map((name, index) => {
                  return (
                    <View style={styles.fullWith}>
                      <View style={style.line} />
                      <Href onPress={() => this.setYear(name)}>
                        <View
                          style={[
                            styles.fullWith,
                            styles.fontBoldSmall,
                            style.language,
                          ]}
                        >
                          <Text>{name}</Text>
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
              <TextHeader text1={text9} text2={text10} />
              <HeadLine text={text1} />
              <Text style={[styles.error, { display: this.state.display }]}>
                {this.state.errorMessage}
              </Text>
              <View
                style={[
                  styles.flexRow,
                  styles.fullWith,
                  { marginTop: this.state.marginTop },
                ]}
              >
                <View style={style.view1}>
                  <TextInput
                    placeholder={text2}
                    onChangeText={(value) => this.setState({ street: value })}
                    value={this.state.street}
                    styleParent={[styles.textInput, style.textInput]}
                    bgFocus="white"
                    bgBlur="#3f3f3f"
                  />
                </View>
                <View style={[style.view2, style.view2Marginleft]}>
                  <TextInput
                    placeholder={text3}
                    onChangeText={(value) =>
                      this.setState({ house_number: value })
                    }
                    value={this.state.house_number}
                    styleParent={[{}, styles.textInput, style.textInput]}
                    fontSize={styles.fontBoldSmallOfSmall}
                    bgFocus="white"
                    bgBlur="#3f3f3f"
                  />
                </View>
              </View>
              <TextInput
                placeholder={text4}
                onChangeText={(value) =>
                  this.setState({ address_addition: value })
                }
                value={this.state.address_addition}
                component={this}
                styleParent={[{}, style.textInput, styles.textInput]}
                bgFocus="white"
                bgBlur="#3f3f3f"
              />
              <View style={[styles.flexRow, styles.fullWith]}>
                <View style={[style.view2, style.view2MarginRight]}>
                  <TextInput
                    keyboardType="number-pad"
                    maxLength={5}
                    placeholder={text6 + " *"}
                    onChangeText={(value) => this.onChangeValue(value)}
                    value={this.state.postal_code}
                    styleParent={[
                      {
                        borderColor: this.state.colorBorder1,
                      },
                      styles.textInput,
                      style.textInput,
                    ]}
                    fontSize={styles.fontBoldSmallOfSmall}
                    bgFocus="white"
                    bgBlur="#3f3f3f"
                  />
                </View>
                <View style={style.view1}>
                  <TextInput
                    placeholder={text7}
                    onChangeText={(value) => this.setState({ city: value })}
                    value={this.state.city}
                    styleParent={[{}, styles.textInput, style.textInput]}
                    bgFocus="white"
                    bgBlur="#3f3f3f"
                  />
                </View>
              </View>
              <TextInput
                ref_={this.input1}
                placeholder={text8}
                //onChangeText={(value) => this.setState({ year: value })}
                callBack={() => this.setState({ visible: true })}
                value={numberYear}
                component={this}
                styleParent={[
                  style.textInput,
                  styles.textInput,
                  style.year,
                  {
                    borderColor: this.state.colorBorder2,
                  },
                ]}
                bgFocus="white"
                bgBlur="#3f3f3f"
              />
              <BackNext
                nextScreen="PersonalData_4"
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
  textInput: {
    marginBottom: 8,
  },

  year: {
    marginTop: 30,
  },

  view1: {
    width: "75%",
  },

  view2: {
    width: "24%",
  },

  view2Marginleft: {
    marginLeft: "1%",
  },

  view2MarginRight: {
    marginRight: "1%",
  },

  close: {
    position: "absolute",
    right: 20,
    top: 20,
  },

  modal: {
    width: "40%",
    marginLeft: "30%",
    marginRight: "30%",
    paddingLeft: 30,
    paddingRight: 30,
    height: "100%",
    backgroundColor: "#414141",
    alignItems: "center",
  },

  modalHeadLine: {
    marginTop: 30,
    marginBottom: 30,
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
});

export default PersonalData_3;

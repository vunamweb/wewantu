import React, { Component, createRef } from "react";
import {
  StyleSheet,
  View,
  AsyncStorage,
  Dimensions,
  Text,
  PixelRatio,
} from "react-native";

import { ScrollView } from "react-native-gesture-handler";

import Background from "../components/Background";
import TextInput from "../components/TextInput";
import IconBottom from "../components/IconBottom";
import HeadLine from "../components/HeadLine";
import Slider from "../components/Slider";
import BackNext from "../components/BackNext";
import TextHeader from "../components/TextHeader";
import CheckBox from "../components/Checkbox";
import Image from "../components/Image";
import Header from "../components/Header";

import styles from "../../app/style/style";
import functions from "../../app/function/function";

import "../config/config";

let borderColor = "#000";
const pixelRatio = global.pixelRatio;

const MARGIN_BOTTOM_TEXT_TOP = 100 * pixelRatio * PixelRatio.getFontScale();
const MARGIN_TOP_TEXT_BOTTOM = 60 * pixelRatio * PixelRatio.getFontScale();
const MARGIN_TOP_BUTTON_BOTTOM = 40 * pixelRatio * PixelRatio.getFontScale();

const iconDistance = require("../images/distance.png");

const minimumValue1 = 1;

class JobProfile_6 extends Component {
  constructor(props) {
    super(props);
    this.input1 = createRef();
    this.input2 = createRef();
    this.input3 = createRef();
    this.input4 = createRef();
    this.input5 = createRef();

    this.callBack1.bind(this);
    this.callBack.bind(this);

    this.data = null;
    this.ref_ = null;
  }

  state = {
    value1: null,
    value2: null,
    value3: null,
    value4: null,
    value5: null,
    enable1: true,
    enable2: true,
    enable3: true,
    enable4: true,
    enable5: true,
    disableSlide: false,
    zip: null,
    colorBorder1: borderColor,
    colorBorder2: borderColor,
    colorBorder3: borderColor,
    colorBorder4: borderColor,
    colorBorder5: borderColor,
    errorMessage: "",
    marginTop: 0,
  };

  componentDidMount = async () => {
    this.data = this.props.navigation.state.params.data;

    this.initData();

    this.getZip();
  };

  getZip = async () => {
    let zip = await AsyncStorage.getItem("zip");

    this.setState({ zip: zip });
  };

  gotoNextStep = (component) => {
    /*let value1 = this.state.value1;
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
      return false;
    } else if (value1 != "") {
      component.setState({ colorBorder1: borderColor, errorMessage: "" });
    }

    if (value2 == "") {
      component.setState({
        colorBorder2: "red",
        errorMessage: "Please enter value",
        marginTop: marginTop,
      });
      return false;
    } else {
      component.setState({ colorBorder2: borderColor, errorMessage: "" });
    }

    if (value3 == "") {
      component.setState({
        colorBorder3: "red",
        errorMessage: "Please enter value",
        marginTop: marginTop,
      });
      return false;
    } else {
      component.setState({ colorBorder3: borderColor, errorMessage: "" });
    }

    if (value4 == "") {
      component.setState({
        colorBorder4: "red",
        errorMessage: "Please enter value",
        marginTop: marginTop,
      });
      return false;
    } else {
      component.setState({ colorBorder4: borderColor, errorMessage: "" });
    }

    if (value5 == "") {
      component.setState({
        colorBorder5: "red",
        errorMessage: "Please enter value",
        marginTop: marginTop,
      });
      return false;
    } else {
      component.setState({ colorBorder5: borderColor, errorMessage: "" });
    }*/

    return true;
  };

  initData = () => {
    this.data = JSON.parse(this.data);

    var index = functions.getIndex(this.data);
    var data = functions.getData(this.data);

    data[index].distance = minimumValue1;
    data[index].distance1 =
      this.state.value1 +
      this.state.value2 +
      this.state.value3 +
      this.state.value4 +
      this.state.value5;

    this.data.data = data;

    this.data = JSON.stringify(this.data);

    this.ref_(this.data);
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

  callBack1 = (value) => {
    this.data = JSON.parse(this.data);

    var index = functions.getIndex(this.data);
    var data = functions.getData(this.data);

    data[index].distance = Math.round(value);
    data[index].distance1 =
      this.state.value1 +
      this.state.value2 +
      this.state.value3 +
      this.state.value4 +
      this.state.value5;

    this.data.data = data;

    this.data = JSON.stringify(this.data);

    this.ref_(this.data);
  };

  callBack2 = (index) => {
    var zip = [null, null, null, null, null];
    this.setState({ zip: zip });
  };

  callBack = async (index) => {
    if (index != -1) {
      var zip = ["", "", "", "", ""];

      this.setState({
        zip: zip,
        disableSlide: true,
      });
    } else {
      let zip = await AsyncStorage.getItem("zip");

      this.setState({ zip: zip, disableSlide: false });
    }
  };

  setZip = () => {
    var zip = this.state.zip;

    if (zip != null) {
      this.state.value1 = zip[0];
      this.state.value2 = zip[1];
      this.state.value3 = zip[2];
      this.state.value4 = zip[3];
      this.state.value5 = zip[4];
    }
  };

  setInput = () => {
    if (
      this.state.value1 == "" &&
      this.state.value2 == "" &&
      this.state.value3 == "" &&
      this.state.value4 == "" &&
      this.state.value5 == ""
    ) {
      try {
        this.state.enable1 = false;
        this.state.enable2 = false;
        this.state.enable3 = false;
        this.state.enable4 = false;
        this.state.enable5 = false;
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        this.state.enable1 = true;
        this.state.enable2 = true;
        this.state.enable3 = true;
        this.state.enable4 = true;
        this.state.enable5 = true;
      } catch (error) {
        console.log(error);
      }
    }
  };

  render() {
    this.setZip();

    this.setInput();

    var commonData = global.commonData.languages;

    try {
      var text1 = commonData.that_s;
      var text2 = commonData.how_i;
      var text3 = commonData.want_it;
      var text4 = commonData.My_ZIP_CODE_REQUEST;
      var text5 = commonData.throughout_Germany;
      var text6 = commonData.MAX_DISTANCE_TO_YOUR_DREAM_JOB;

      var data = [
        {
          id: 0,
          label: text5,
          require: false,
        },
      ];
    } catch (error) {
      console.log(error);
    }

    return (
      <View style={styles.flexFull}>
        <Header component={this} Notification={false} />
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <Background>
            <TextHeader text1={text1} text2={text2} text3={text3} />
            <HeadLine style={style.headLine} text={text4} />
            <Text style={styles.error}>{this.state.errorMessage}</Text>
            <View style={[styles.flexRow, style.viewRoot, { marginTop: 10 }]}>
              <TextInput
                editable={this.state.enable1}
                ref_={this.input1}
                onChangeText={(value) => this.onChangeValue(1, value)}
                value={this.state.value1}
                callBack={() => this.callBack2(1)}
                styleParent={[
                  {
                    borderColor: this.state.colorBorder1,
                  },
                  styles.textInputSmall1,
                ]}
                bgFocus="#3f3f3f"
                bgBlur="white"
                keyboardType="number-pad"
                maxLength={1}
              />
              <TextInput
                editable={this.state.enable2}
                ref_={this.input2}
                onChangeText={(value) => this.onChangeValue(2, value)}
                value={this.state.value2}
                callBack={() => this.callBack2(2)}
                styleParent={[
                  {
                    borderColor: this.state.colorBorder2,
                  },
                  styles.textInputSmall1,
                ]}
                bgFocus="#3f3f3f"
                bgBlur="white"
                keyboardType="number-pad"
                maxLength={1}
              />
              <TextInput
                editable={this.state.enable3}
                ref_={this.input3}
                onChangeText={(value) => this.onChangeValue(3, value)}
                value={this.state.value3}
                styleParent={[
                  {
                    borderColor: this.state.colorBorder3,
                  },
                  styles.textInputSmall1,
                ]}
                bgFocus="#3f3f3f"
                bgBlur="white"
                keyboardType="number-pad"
                maxLength={1}
              />
              <TextInput
                editable={this.state.enable4}
                ref_={this.input4}
                onChangeText={(value) => this.onChangeValue(4, value)}
                value={this.state.value4}
                styleParent={[
                  {
                    borderColor: this.state.colorBorder4,
                  },
                  styles.textInputSmall1,
                ]}
                bgFocus="#3f3f3f"
                bgBlur="white"
                keyboardType="number-pad"
                maxLength={1}
              />
              <TextInput
                editable={this.state.enable5}
                ref_={this.input5}
                onChangeText={(value) => this.onChangeValue(5, value)}
                value={this.state.value5}
                styleParent={[
                  {
                    borderColor: this.state.colorBorder5,
                  },
                  styles.textInputSmall1,
                ]}
                bgFocus="#3f3f3f"
                bgBlur="white"
                keyboardType="number-pad"
                maxLength={1}
              />
            </View>
            <View style={styles.fullWith}>
              <CheckBox
                data={data}
                callBack={this.callBack}
                style={style.checkbox}
                styleRowCheckbox={styles.rowCheckbox}
              />
            </View>
            <HeadLine text={text6} />
            <View style={[styles.fullWith, styles.flexRowStart]}>
              <Image style={style.img1} source={iconDistance} />
              <Slider
                unit="km"
                minimumValue={minimumValue1}
                maximumValue={40}
                callBack={this.callBack1}
                disabled={this.state.disableSlide}
              />
            </View>
            <BackNext
              nextScreen="JobProfile_7"
              position="absolute"
              data={[]}
              callBack={() => this.gotoNextStep(this)}
              ref_={this}
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
  img1: {
    marginTop: 15,
  },

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

  headLine: {
    marginTop: 50,
  },

  checkbox: {
    marginTop: 10,
  },
});

export default JobProfile_6;

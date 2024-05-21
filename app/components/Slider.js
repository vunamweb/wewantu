import React, { Fragment, Component } from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  StatusBar,
  Alert,
  AppRegistry,
  TouchableOpacity,
  Dimensions,
} from "react-native";

import { Slider } from "react-native-elements";

import Image from "../components/Image";
import Text from "../components/Paragraph";

import styles from "../../app/style/style";
import functions from "../../app/function/function";

const icon = require("../images/line_vertical.png");
const windowWidth = Dimensions.get("window").width;

class MySlider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: (this.props.value != undefined) ? this.props.value : 1,
    };
  }

  changeValue = (value) => {
    if(this.props.disabled == undefined || this.props.disabled == false) {
      this.setState({ value: Math.round(value) });
      this.props.callBack(value);
    }
  };

  render() {
    var left =
      this.state.value > 0
        ? windowWidth / (this.props.maximumValue / this.state.value) - 60
        : 50;

    left = left > 50 ? left : 50;
    left = left > windowWidth - 100 ? windowWidth - 100 : left;

    var value = (this.props.step != undefined) ? this.state.value * this.props.step : this.state.value;

    return (
      <View style={style.view}>
        <Text style={[styles.fontBoldSmall, style.unit, { left: left, display: this.props.disabled ? 'none' : 'flex' }]}>
          {value + " " + this.props.unit}
        </Text>
        <Slider
          style={[style.slider, this.props.style]}
          minimumValue={this.props.minimumValue}
          maximumValue={this.props.maximumValue}
          value={this.state.value}
          onValueChange={(value) => this.changeValue(value)}
          minimumTrackTintColor="#898166"
          maximumTrackTintColor="#898166"
          thumbStyle={[style.thumbStyle, { display: this.props.disabled ? 'none' : 'flex' }]}
          disabled={this.props.disabled}
        />
        <Image style={style.line} source={icon} />
        <Text style={[styles.fontBoldNormal, style.text]}>Flexibel</Text>
      </View>
    );
  }
}

const style = StyleSheet.create({
  unit: {
    position: "absolute",
    top: 40,
  },

  view: {
    width: "100%",
  },

  line: {
    marginTop: 5,
  },

  slider: {
    width: "100%",
    height: 1,
    marginTop: 30,
  },

  thumbStyle: {
    width: 15,
    height: 15,
    backgroundColor: "#898166",
  },

  text: {
    fontSize: 10,
    color: "#898166",
  },
});

export default MySlider;

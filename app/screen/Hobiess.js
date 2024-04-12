import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, PixelRatio } from "react-native";

import { Provider, Portal, Modal } from "react-native-paper";

import { ScrollView } from "react-native-gesture-handler";
import { hideNavigationBar } from "react-native-navigation-bar-color";

import IconFontAwesome from "react-native-vector-icons/FontAwesome";

import Background from "../components/Background";
import TextInput from "../components/TextInputHobbies";
import TextHeader from "../components/TextHeader";
import HeadLine from "../components/HeadLine";
import IconBottom from "../components/IconBottom";
import BackNext from "../components/BackNext";
import Header from "../components/Header";

import Icon from "react-native-vector-icons/FontAwesome5";

import styles from "../../app/style/style";

import "../config/config";

const pixelRatio = global.pixelRatio;
const HEIGHT_TEXTINPUT = 200 * pixelRatio * PixelRatio.getFontScale();

class Hobiess extends Component {
  constructor(props) {
    super(props);

    this.state = {
      description: null,
    };
  }

  componentDidMount = () => {
    hideNavigationBar();
  };

  static navigationOptions = ({ navigation }) => ({
    title: "",
  });

  callBack = (check, index) => {
    return;
  };

  render() {
    var commonData = global.commonData.languages;

    try {
      var text1 = commonData.ride;
      var text2 = commonData.read;
      var text3 = commonData.craft;
      var text4 = commonData.my_hobiess_line_sepration;
    } catch (error) {
      console.log(error);
    }

    return (
      <View style={styles.flexFull}>
        <ScrollView keyboardShouldPersistTaps={'always'} contentContainerStyle={{ flexGrow: 1 }}>
          <Background>
            <Header component={this} Notification={false} />
            <TextHeader text1={text1} text2={text2} text3={text3} />
            <HeadLine style={style.headLine} text={text4} />
            <TextInput
              styleParent={[styles.textInput, style.textInput]}
              bgFocus="white"
              bgBlur="#3f3f3f"
            />
            <BackNext
              nextScreen="UploadDocument"
              position="absolute"
              callBack={() => true}
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
  headLine: {
    marginTop: 40,
    marginBottom: 5,
  },

  textInput: {
    marginBottom: 15,
  },

  styleTextInput: {
    textAlign: "left",
  },
});

export default Hobiess;

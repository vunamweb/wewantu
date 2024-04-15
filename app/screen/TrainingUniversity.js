import React, { Component } from "react";
import { StyleSheet, View, Dimensions, PixelRatio } from "react-native";

import { Provider, Portal, Modal } from "react-native-paper";

import { ScrollView } from "react-native-gesture-handler";
import { hideNavigationBar } from "react-native-navigation-bar-color";

import IconFontAwesome from "react-native-vector-icons/FontAwesome";

import Background from "../components/Background";
import TextHeader from "../components/TextHeader";
import HeadLine from "../components/HeadLine";
import IconBottom from "../components/IconBottom";
import BackNext from "../components/BackNext";
import ButtonImage from "../components/ButtonImage";
import Header from "../components/Header";

import styles from "../../app/style/style";
import functions from "../../app/function/function";

import "../config/config";

const borderColor = "#000";
const windowHeight = Dimensions.get("window").height;
const icon = require("../images/plus.png");
const imgClose = require("../images/close.png");

const pixelRatio = global.pixelRatio;

const MARGIN_TOP_TEXTLANGUAGE_PLUSBUTTON =
  50 * pixelRatio;
const MARGIN_TOP_PLUSBUTTON = -30 * pixelRatio;

var preLanguage = null;

const data = [
  {
    id: 1,
    name: "Bulgarisch",
  },
  {
    id: 2,
    name: "Dänisch",
  },
  {
    id: 3,
    name: "Bulgarisch",
  },
  {
    id: 4,
    name: "Deutsch",
  },
  {
    id: 5,
    name: "Englisch",
  },
  {
    id: 6,
    name: "Estnisch",
  },
  {
    id: 7,
    name: "Finnisch",
  },
  {
    id: 8,
    name: "Französisch",
  },
  {
    id: 9,
    name: "Bulgarisch",
  },
  {
    id: 10,
    name: "Galicisch",
  },
  {
    id: 11,
    name: "Griechisch",
  },
  {
    id: 12,
    name: "Bulgarisch",
  },
  {
    id: 13,
    name: "Irisch (Gälisch)",
  },
  {
    id: 14,
    name: "Italienisch",
  },
  {
    id: 15,
    name: "Katalanisch",
  },
  {
    id: 12,
    name: "Irisch (Gälisch)",
  },
  {
    id: 16,
    name: "Kroatisch",
  },
  {
    id: 17,
    name: "Norwegisch",
  },
  {
    id: 18,
    name: "Rumänisch",
  },
];

class TrainingUniversity extends Component {
  constructor(props) {
    super(props);

    this.state = {
      languages: [],
      visible: false,
      openModal: false,
      closeModal: false,
      isBack: false,
    };
  }

  componentDidMount = () => {};

  static navigationOptions = ({ navigation }) => ({
    title: "",
  });

  selectLanguage = (id, name) => {
    var languages = this.state.languages;
    var lengthOFlanguage = languages.length;

    var language = id + "," + name;

    languages[lengthOFlanguage] = language;

    this.setState({ languages: languages, visible: false });
  };

  selectLanguage = () => {
    if (this.props.navigation.state.params == undefined) return false;

    var preLanguage = this.props.navigation.state.params.data;

    if (preLanguage == null || preLanguage == "" || preLanguage == undefined)
      return false;

    return true;
  };

  getAllLanguages = () => {
    if (this.props.navigation.state.params != undefined) {
      var languages = this.props.navigation.state.params.data;
      languages = languages.split(",");

      return languages;
    }

    return [];
  };

  gotoScreenWithParam = (selectLanguage) => {
    var data =
      preLanguage != null ? selectLanguage + "," + preLanguage : selectLanguage;

    functions.gotoScreenWithParam(
      data,
      this.props.navigation,
      "PersonalData_Language"
    );

    this.setState({ isBack: true });
  };

  render() {
    var next = !this.selectLanguage() ? false : true;
    var visible = next ? false : this.state.visible;

    visible = this.state.openModal ? true : visible;
    visible = this.state.closeModal ? false : visible;

    if (next && this.state.isBack) {
      preLanguage = this.props.navigation.state.params.data;
      visible = false;
    }

    var languages = this.getAllLanguages();

    return (
      <View style={styles.flexFull}>
        <Header component={this} Notification={false} />
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <Background>
            <TextHeader text1="that's" text2="my" text3="status" />
            <HeadLine style={style.headLine} text="AUSBILDUNG UND STUDIUM" />
            <View style={style.languages} />
            <View style={styles.fullWith}>
              <View style={style.view1}>
                <ButtonImage
                  onPress={() =>
                    functions.gotoScreen(
                      this.props.navigation,
                      "TrainingUniversity_1"
                    )
                  }
                  icon={icon}
                  style={style.button}
                />
              </View>
            </View>
            <BackNext
              nextScreen="FinalTrainingUniversity"
              position="absolute"
              callBack={() => true}
              navigation={this.props.navigation}
              nextEnable={true}
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
  view1: {
    width: 70,
    marginTop: MARGIN_TOP_TEXTLANGUAGE_PLUSBUTTON,
  },

  button: {
    backgroundColor: "#414141",
    alignItems: "center",
    borderRadius: 5,
    height: 60,
    marginTop: MARGIN_TOP_PLUSBUTTON,
  },

  headLine: {
    marginTop: 50,
  },
});

export default TrainingUniversity;

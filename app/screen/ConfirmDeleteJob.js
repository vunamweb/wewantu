import React, { Component, createRef } from "react";
import {
  StyleSheet,
  View,
  AsyncStorage,
  Dimensions,
  TouchableOpacity,
} from "react-native";

import { ScrollView } from "react-native-gesture-handler";
import { hideNavigationBar } from "react-native-navigation-bar-color";

import Background from "../components/Background";
import Button from "../components/Button";
import TextHeader from "../components/TextHeader";
import Text from "../components/Paragraph";
import Image from "../components/Image";
import IconBottom from "../components/IconBottom";
import Header from "../components/Header";

import styles from "../../app/style/style";
import functions from "../../app/function/function";

const borderColor = "#000";
const bgDefault = "#2B2B2B";
const bgFocus = "#898166";
const imgNotification = require("../images/notification.png");
const imgDelete = require("../images/delete_fill.png");

class ConfirmDeleteJob extends Component {
  constructor(props) {
    super(props);
  }

  state = {};

  onClickItem = (index, link) => {
    this.collapse.current.setState({ activeIndex: index });
    functions.gotoScreen(this.props.navigation, link);
  };

  componentDidMount = async () => {
    //hideNavigationBar();
  };

  static navigationOptions = ({ navigation }) => ({
    title: "",
  });

  render() {
    return (
      <View style={styles.flexFull}>
        <Header component={this} />
        <ScrollView contentContainerStyle={styles.scroll}>
          <Background>
            <TextHeader special={true} icon={imgNotification} text2="jobs" />
            <View style={style.view1}>
              <Image source={imgDelete} />
              <Text style={[styles.fontBoldNormal, style.text1]}>LÖSCHEN</Text>
            </View>
            <Text style={[styles.fontBoldNormal, style.text2]}>
              BIST DU DIR SICHER, DASS DU DIESEN JOB LÖSCHEN MÖCHTEST?
            </Text>
            <View style={[style.data]}>
              <View style={[styles.fullWith, style.childRen]}>
                <Text style={[styles.fontBoldNormal, styles.titleJob]}>
                  STAPLERFAHRER IN FRANKFURT AM MAIN
                </Text>
                <Text style={[styles.fontNormal, styles.descriptionJob]}>
                  Hier steht die Kurzbeschreibung des Jobangebotes ohne den
                  Arbeitgeber zu nennen. Es geht lediglich darum ein Match auf
                  Arbeitgeberseite zu melden und den potentiellen neuen
                  Arbeitnehmer darauf hinzuweisen. Der Arbeitnehmer hat die
                  Möglichkeit den Job zu „Swipen“, zu markieren, oder zu teilen.
                </Text>
              </View>
            </View>

            <View style={style.viewParent}>
              <View style={style.view2}>
                <Button
                  color="white"
                  text="WEG DAMIT"
                  style={[styles.button, style.button1]}
                  onPress={() =>
                    functions.gotoScreen(this.props.navigation, "DeleteJob")
                  }
                />
              </View>
              <View style={style.view3}>
                <Button
                  color="white"
                  text="Hups…"
                  style={[styles.button, style.button2]}
                  onPress={() => functions.backScreen(this.props.navigation)}
                />
              </View>
            </View>
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
  root: {
    marginBottom: 5,
    height: 35,
  },

  borderBottom: {
    marginTop: 7,
  },

  view1: {
    width: "100%",
    justifyContent: "center",
    flexDirection: "row",
  },

  text1: {
    color: "#898166",
    marginLeft: 10,
  },

  text2: {
    color: "#fff",
    textAlign: "center",
    marginTop: 40,
  },

  data: {
    flex: 1,
    backgroundColor: "#000",
    marginTop: 20,
  },

  childRen: {
    padding: 20,
    borderWidth: 1,
    borderColor: "#898166",
    backgroundColor: "#363636",
  },

  viewParent: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },

  view2: {
    width: "40%",
  },

  view3: {
    width: "40%",
  },

  button1: {
    backgroundColor: "#898166",
  },

  button2: {
    backgroundColor: "#2B2B2B",
  },
});

export default ConfirmDeleteJob;

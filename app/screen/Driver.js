import React, { Component } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import { Provider, Portal, Modal } from "react-native-paper";

import { ScrollView } from "react-native-gesture-handler";
import { hideNavigationBar } from "react-native-navigation-bar-color";

import IconFontAwesome from "react-native-vector-icons/FontAwesome";

import Text from "../components/Paragraph";
import Background from "../components/Background";
import TextHeader from "../components/TextHeader";
import HeadLine from "../components/HeadLine";
import IconBottom from "../components/IconBottom";
import BackNext from "../components/BackNext";
import CheckBox from "../components/Checkbox";
import Image from "../components/Image";
import Href from "../components/Href";
import Button from "../components/Button";
import Switch from "../components/Switch";
import Header from "../components/Header";

import styles from "../../app/style/style";
import functions from "../function/function";

const imgClose = require("../images/close.png");

class Driver extends Component {
  constructor(props) {
    super(props);

    this.switch = [];

    this.state = {
      visible: false,
      ActivityIndicator: false,
      listDiveLicense: [],
      userDriveLicense: [],
    };
  }

  componentDidMount = () => {
    hideNavigationBar();

    functions.getListDriveLiense(this);
  };

  static navigationOptions = ({ navigation }) => ({
    title: "",
  });

  callBack = (check, index) => {
    return;
  };

  setSwitch = (index) => {
    this.switch[index]((isEnable) => !isEnable);
  };

  close = () => {
    this.setState({ visible: false });

    let driveLicence = "";

    this.state.listDiveLicense.map((item, index) => {
      if (this.switch[index]) driveLicence = driveLicence + item.id + ";";
    });

    functions.updateUserDriveLicense(this, driveLicence);
  };

  render() {
    var commonData = global.commonData.languages;

    try {
      var text1 = commonData.that_s;
      var text2 = commonData.how_i;
      var text3 = commonData.roll;
      var text4 = commonData.driver_license;
      var text5 = commonData.that_s_obvious;
      var text6 = commonData.no;
      var text7 = commonData.driving_license_class;
      var text8 = commonData.passenger_transport_license;
      var text9 = commonData.people_what;

      var data1 = [
        {
          label: text5,
          require: false,
        },

        {
          label: text6,
          require: false,
        },
      ];

      var data2 = [
        {
          label: text5,
          require: false,
        },

        {
          label: text9,
          require: false,
        },
      ];
    } catch (error) {
      console.log(error);
    }

    return (
      <Provider>
        <Portal>
          <Modal visible={this.state.visible}>
            <ScrollView>
              <View style={style.modal}>
                <Text style={[style.modalHeadLine, styles.fontBoldNormal]}>
                  FÜHRERSCHEINKLASSEN
                </Text>
                <View style={style.close}>
                  <Href onPress={() => this.close()}>
                    <Image source={imgClose} />
                  </Href>
                </View>
                {this.state.listDiveLicense.map(({ name, id }, index) => {
                  let visible = this.state.userDriveLicense.includes(id)
                    ? true
                    : false;

                  return (
                    <View style={styles.fullWith}>
                      <View style={style.line} />
                      <Href onPress={() => this.setSwitch(index)}>
                        <View
                          style={[
                            styles.fullWith,
                            styles.fontBoldSmall,
                            style.language,
                          ]}
                        >
                          <Text>{name}</Text>
                          <Switch
                            activeTrackColor={"#898166"}
                            inactiveTrackColor={"#898166"}
                            activeThumbColor={"#fff"}
                            inactiveThumbColor={"#3e3e3e"}
                            size={25}
                            container={style.container}
                            additionalThumb={style.additionalThumb}
                            component={this}
                            index={index}
                            visible={visible}
                          />
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
              <TextHeader text1={text1} text2={text2} text3={text3} />
              <ActivityIndicator
                size="small"
                animating={this.state.ActivityIndicator}
              />
              <HeadLine style={style.headLine} text={text4} />
              <View style={[styles.fullWith, style.root]}>
                <CheckBox
                  data={data1}
                  callBack={this.callBack}
                  style={style.checkbox}
                />
                {/*<View style={style.checkbox}>
                  <CheckBox
                    label="na klaro"
                    index={1}
                    callBack={this.callBack}
                  />
                  <CheckBox
                    label="Nein"
                    index={2}
                    callBack={this.callBack}
                    style={style.maginLeft1}
                  />
              </View>*/}
              </View>
              <Button
                color="white"
                text={text7}
                style={[styles.button, style.button]}
                onPress={() => this.setState({ visible: true })}
              />
              <HeadLine style={style.headLine} text={text8} />
              <View style={[styles.fullWith, style.root]}>
                <CheckBox
                  data={data2}
                  callBack={this.callBack}
                  style={style.checkbox}
                />
                {/*<View style={style.checkbox}>
                  <CheckBox
                    label="na klaro"
                    index={1}
                    callBack={this.callBack}
                  />
                  <CheckBox
                    label="Personen… was?"
                    index={2}
                    callBack={this.callBack}
                    style={style.maginLeft1}
                  />
            </View>*/}
              </View>
              <BackNext
                nextScreen="Hobiess"
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
      </Provider>
    );
  }
}

const style = StyleSheet.create({
  headLine: {
    marginTop: 40,
  },

  checkbox: {
    marginTop: 10,
    marginLeft: -10,
    flexDirection: "row",
  },

  button: {
    backgroundColor: "#3f3f3f",
    marginTop: 5,
    marginBottom: -20,
  },

  maginLeft1: {
    marginLeft: 60,
  },

  root: {
    marginBottom: 5,
  },

  line: {
    height: 1,
    width: "100%",
    backgroundColor: "#707070",
  },

  modal: {
    width: "80%",
    marginLeft: "10%",
    marginRight: "10%",
    paddingLeft: 30,
    paddingRight: 30,
    height: "100%",
    backgroundColor: "#414141",
    alignItems: "center",
  },

  modalHeadLine: {
    marginTop: 50,
    marginBottom: 30,
  },

  language: {
    marginTop: 10,
    marginBottom: 10,
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },

  close: {
    position: "absolute",
    right: 20,
    top: 20,
  },

  languages: {
    marginTop: 20,
  },

  container: {
    height: 25,
    width: 60,
    borderWidth: 0,
  },

  additionalThumb: {
    height: 0,
    width: 25,
    borderRadius: 5,
    paddingTop: 15,
  },
});

export default Driver;

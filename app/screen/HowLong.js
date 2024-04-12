import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";

import { Provider, Portal, Modal } from "react-native-paper";

import { ScrollView } from "react-native-gesture-handler";
import { hideNavigationBar } from "react-native-navigation-bar-color";

import IconFontAwesome from "react-native-vector-icons/FontAwesome";

import Background from "../components/Background";
import TextHeader from "../components/TextHeader";
import HeadLine from "../components/HeadLine";
import IconBottom from "../components/IconBottom";
import BackNext from "../components/BackNext";
import CheckBox from "../components/Checkbox";
import Header from "../components/Header";
import Text from "../components/Paragraph";
import TextInput from "../components/TextInput";
import Href from "../components/Href";
import Image from "../components/Image";

import styles from "../../app/style/style";
import functions from "../function/function";

const jobs = [
  {
    id: 1,
    name: "Dachdecker",
  },
  {
    id: 2,
    name: "Bäckereifachverkäufer",
  },
  {
    id: 3,
    name: "Bekleidungsnäherin",
  },
  {
    id: 4,
    name: "Justizvollzugsbeamte",
  },
  {
    id: 5,
    name: "Einzelhandelskaufmann",
  },
  {
    id: 6,
    name: "Berufskraftfahrer",
  },
  {
    id: 7,
    name: "Mediengestalter",
  },
  {
    id: 8,
    name: "Drucker",
  },
  {
    id: 9,
    name: "Tanzlehrer",
  },
  {
    id: 10,
    name: "Kabelsortierer",
  },
  {
    id: 11,
    name: "Koch",
  },
  {
    id: 12,
    name: "Küchenhilfe",
  },
  {
    id: 13,
    name: "Dachdecker",
  },
  {
    id: 14,
    name: "Küchenhilfe",
  },
  {
    id: 15,
    name: "Kabelsortierer",
  },
  {
    id: 12,
    name: "Dachdecker",
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
  {
    id: 1,
    name: "Dachdecker",
  },
  {
    id: 2,
    name: "Bäckereifachverkäufer",
  },
  {
    id: 3,
    name: "Bekleidungsnäherin",
  },
  {
    id: 4,
    name: "Justizvollzugsbeamte",
  },
  {
    id: 5,
    name: "Einzelhandelskaufmann",
  },
  {
    id: 6,
    name: "Berufskraftfahrer",
  },
  {
    id: 7,
    name: "Mediengestalter",
  },
  {
    id: 8,
    name: "Drucker",
  },
  {
    id: 9,
    name: "Tanzlehrer",
  },
  {
    id: 10,
    name: "Kabelsortierer",
  },
  {
    id: 11,
    name: "Koch",
  },
  {
    id: 12,
    name: "Küchenhilfe",
  },
  {
    id: 13,
    name: "Dachdecker",
  },
  {
    id: 14,
    name: "Küchenhilfe",
  },
  {
    id: 15,
    name: "Kabelsortierer",
  },
  {
    id: 12,
    name: "Dachdecker",
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

const imgClose = require("../images/close.png");
var howLong = -1;

class HowLong extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      search: "",
      nextEnable: false,
    };
  }

  componentDidMount = () => {
    /*this.didFocusSubscription = this.props.navigation.addListener(
      'didFocus',
      payload => {
        // Logic to handle when the screen comes into focus (navigated back)
        console.log('Screen focused again:', payload);
        this.setState({ job: 'dcvd' });
        // You can perform actions or update state upon returning to this screen
      }
    );*/
  };

  callBack = () => {
    this.setState({ visible: true });
  };

  callBack_1 = (index) => {
    howLong = index;

    if (this.state.job != null) this.setState({ nextEnable: true });
    //functions.gotoScreen(this.props.navigation, "Driver");
  };

  setJob = (name) => {
    var nextEnable = howLong != -1 ? true : false;

    this.setState({ job: name, visible: false, nextEnable: nextEnable });
  };

  static navigationOptions = ({ navigation }) => ({
    title: "",
  });

  render() {
    var commonData = global.commonData.languages;

    try {
      var text1 = commonData.that_s;
      var text2 = commonData.what;
      var text3 = commonData.i_do;
      var text4 = commonData.currently_i_am_working_as;
      var text5 = commonData.profession;

      var data = [
        {
          label: commonData.to_2_years,
          require: false,
        },

        {
          label: commonData.from_2_to_5_years,
          require: false,
        },

        {
          label: commonData.from_5_to_10_years,
          require: false,
        },

        {
          label: commonData.more_than_10_years,
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
                  {text5}
                </Text>
                <TextInput
                  onChangeText={(value) => this.setState({ search: value })}
                  value={this.state.search}
                  returnKeyType="next"
                  component={this}
                  styleParent={[
                    {
                      borderColor: "#414141",
                    },
                    styles.textInput,
                    style.textInput1,
                  ]}
                  styleTextInput={style.styleTextInput}
                  leftIcon="search"
                  colorIcon="#414141"
                  size={20}
                  fontAwesome="true"
                  onLeftClick={() => null}
                  leftStyle={style.leftStyle}
                  bgFocus="#898166"
                  bgBlur="white"
                />
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
                {jobs.map(({ name, id }, index) => {
                  if (name.includes(this.state.search))
                    return (
                      <View style={styles.fullWith}>
                        <View style={style.line} />
                        <Href onPress={() => this.setJob(name)}>
                          <View
                            style={[
                              styles.fullWith,
                              styles.fontBoldSmall,
                              style.language,
                            ]}
                          >
                            <Text style={style.textModal}>{name}</Text>
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
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <Background>
              <Header component={this} Notification={false} />
              <TextHeader text1={text1} text2={text2} text3={text3} />
              <HeadLine style={style.headLine} text={text4} />
              <TextInput
                onChangeText={(value) => this.setState({ job: value })}
                hideKeyboard={true}
                callBack={this.callBack}
                value={this.state.job}
                styleParent={[
                  style.textInput,
                  styles.textInput,
                  {
                    borderColor: this.state.colorBorder,
                  },
                ]}
                //leftStyle={style.leftStyle}
                bgFocus="white"
                bgBlur="#3f3f3f"
              />
              <HeadLine text="BERUFSERFAHRUNG" />

              <View style={[styles.fullWith, style.root]}>
                <CheckBox
                  style={style.checkbox}
                  styleRowCheckbox={styles.rowCheckbox}
                  data={data}
                  callBack={this.callBack_1}
                />

                {/*<View style={style.checkbox}>
                <CheckBox label="In Festanstellung" index={1} callBack={this.callBack} />
                <CheckBox
                  label="freiberuflich tätig"
                  index={2}
                  callBack={this.callBack}
                />
                <CheckBox
                  label="In einer Weiterbildung"
                  index={3}
                  callBack={this.callBack}
                />
                <CheckBox label="In Ausbildung" index={4} callBack={this.callBack} />
                <CheckBox label="Im Studium" index={4} callBack={this.callBack} />
                <CheckBox label="Arbeitssuchend" index={4} callBack={this.callBack} />
    </View>*/}
              </View>
              <BackNext
                nextScreen="Driver"
                position="absolute"
                callBack={() => true}
                navigation={this.props.navigation}
                nextEnable={this.state.nextEnable}
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
    marginTop: 50,
  },

  checkbox: {
    marginTop: 10,
  },

  textInput: {
    marginBottom: 10,
    marginTop: 20,
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

  close: {
    position: "absolute",
    right: 20,
    top: 20,
  },

  modalHeadLine: {
    marginTop: 30,
    marginBottom: 30,
  },

  textInput1: {
    marginBottom: 15,
    borderRadius: 5,
    height: 40,
  },

  line: {
    height: 1,
    width: "100%",
    backgroundColor: "#707070",
  },

  language: {
    marginTop: 5,
    marginBottom: 5,
  },

  textModal: {
    paddingTop: 5,
    paddingBottom: 5,
  },
});

export default HowLong;

import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  PixelRatio,
  ActivityIndicator,
} from "react-native";

import { Provider, Portal, Modal } from "react-native-paper";

import { ScrollView } from "react-native-gesture-handler";
import { hideNavigationBar } from "react-native-navigation-bar-color";

import IconFontAwesome from "react-native-vector-icons/FontAwesome";

import Text from "../components/Paragraph";
import Background from "../components/Background";
import TextInput from "../components/TextInput";
import TextHeader from "../components/TextHeader";
import HeadLine from "../components/HeadLine";
import IconBottom from "../components/IconBottom";
import BackNext from "../components/BackNext";
import ButtonImage from "../components/ButtonImage";
import Image from "../components/Image";
import Href from "../components/Href";

import styles from "../../app/style/style";
import functions from "../../app/function/function";
import Header from "../components/Header";

import "../config/config";

const borderColor = "#000";

const windowWidth = Dimensions.get("window").width;
const LEFT_SEARCH = windowWidth / 2;

const icon = require("../images/plus.png");
const imgClose = require("../images/close.png");
const imgDelete = require("../images/icon_delete.png");

const pixelRatio = global.pixelRatio;

const MARGIN_TOP_TEXTLANGUAGE_PLUSBUTTON =
  50 * pixelRatio;

var preLanguage = null;

var deleteItem = null,
  languageId;

var text1_1, text1_2, text1_3, text1_4;

class PersonalData_4 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      languages: [],
      languageServer: [],
      userLanguages: [],
      position: null,
      visible: false,
      visible1: false,
      openModal: false,
      closeModal: false,
      isBack: false,
      search: "",
      ActivityIndicator: false,
    };
  }

  componentDidMount = async () => {
    hideNavigationBar();

    var datauser = await functions.getDataUser();

    var listLanguages = [], listUserLanguages = [];

    try {
      datauser = JSON.parse(datauser);

      listUserLanguages = datauser.listUserLanguages;
      listLanguages = datauser.listLanguages;
    } catch (error) {
      console.log(error);
    }

    // check list of languages saved on local, if not call api to get data
    if ((Array.isArray(listLanguages) && listLanguages.length == 0) || listLanguages == undefined)
      functions.getListLanguages(this);
    else {
      this.setState({
        languageServer: listLanguages
      });
    }
    // END

    // check list of user languages saved on local, if not call api to get data
    if ((Array.isArray(listUserLanguages) && listUserLanguages.length == 0) || listUserLanguages == undefined)
      functions.getListUserLanguages(this);
    else {
      this.setState({
        userLanguages: listUserLanguages
      });
    }
    // END

    global.updateLanguage = false;
  };

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

  existLanguage = (data, langauge) => {
    let exist = false;

    data.map((item, index) => {
      let a = item.split(";");

      if (a[2] == langauge) exist = true;
    });

    return exist;
  };

  getAllLanguages = () => {
    let serverLanguages = [];

    this.state.userLanguages.map((item, index) => {
      let nameLanguages = this.getNameLanguage(item);

      serverLanguages.push(nameLanguages);
    });

    // if add new language
    if (this.props.navigation.state.params != undefined && global.updateLanguage) {
      serverLanguages.push(this.props.navigation.state.params.data);

      let param = this.props.navigation.state.params.data.split(";");

      let $obj = {};

      $obj.id = param[2];
      $obj.name = param[0];

      switch (param[1]) {
        case text1_2:
          $obj.level = 1;
          break;

        case text1_3:
          $obj.level = 2;
          break;

        case text1_4:
          $obj.level = 3;
          break;

        default:
          $obj.level = 0;
      }

      this.state.userLanguages.push($obj);

      global.updateLanguage = false;
    }

    return serverLanguages;
  };

  getNameLanguage = (item) => {
    let text;

    switch (item.level) {
      case 1:
        text = text1_2;
        break;

      case 2:
        text = text1_3;
        break;

      case 3:
        text = text1_4;
        break;

      default:
        text = text1_1;
    }

    let nameLanguages = item.name + ";" + text + ";" + item.id;

    return nameLanguages;
  };

  checkExitLanguage = (selectLanguage) => {
    var check = true;
    var languages = this.state.userLanguages;

    languages.map((item, index) => {
      if (item.name == selectLanguage) {
        check = false;
      }
    });

    return check;
  };

  gotoScreenWithParam = (selectLanguage, idLanguage) => {
    global.chooseLanguage = idLanguage;

    var data = selectLanguage;

    if (this.checkExitLanguage(selectLanguage)) {
      functions.gotoScreenWithParam(
        data,
        this.props.navigation,
        "PersonalData_Language"
      );

      this.setState({ isBack: true });
    }
  };

  openModal = (item, language_id) => {
    deleteItem = item;
    languageId = language_id;

    this.setState({ visible1: true });
  };

  closeModal = () => {
    this.setState({ visible1: false });
  };

  delete = () => {
    var languages = this.state.userLanguages;

    languages.map(async (item, index) => {
      if (deleteItem == index) {
        languages.splice(index, 1);

        var datauser = await functions.getDataUser();

        try {
          datauser = JSON.parse(datauser);

          let listUserLanguages = datauser.listUserLanguages;

          listUserLanguages.splice(index, 1);

          global.commonData.listUserLanguages = listUserLanguages;

          await functions.setDataAsyncStorage(
            "data",
            JSON.stringify(datauser)
          );
        } catch (error) {
          console.log(error);
        }
      }
    });

    functions.deleteUserLanguage(this, languageId);

    //this.setState({ visible1: false });
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

    var commonData = global.commonData.languages;

    try {
      var text1 = commonData.i_speak;
      var text2 = commonData.languages;
      var text3 = commonData.are_you_sure_to_delete;
      var text4 = commonData.yes;
      var text5 = commonData.no;
      var text6 = commonData.languages;

      text1_1 = commonData.mother_tongue;
      text1_2 = commonData.business_fluent_in_spoken_and_written;
      text1_3 = commonData.school_level;
      text1_4 = commonData.Can_order_a_pizza;
    } catch (error) {
      console.log(error);
    }

    return (
      <Provider>
        <Portal>
          <Modal visible={visible}>
            <ScrollView>
              <View style={style.modal}>
                <Text style={[style.modalHeadLine, styles.fontBoldNormal]}>
                  {text6}
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
                        closeModal: true,
                        openModal: false,
                        isBack: false,
                      })
                    }
                  >
                    <Image source={imgClose} />
                  </Href>
                </View>
                {this.state.languageServer.map(({ name, id }, index) => {
                  if (name.includes(this.state.search))
                    return (
                      <View style={styles.fullWith}>
                        <View style={style.line} />
                        <Href
                          onPress={() => this.gotoScreenWithParam(name, id)}
                        >
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
          <Modal visible={this.state.visible1}>
            <View style={styles.modal1}>
              <Text style={style.textHeaderModal}>{text3}</Text>
              <View style={style.modalDelete}>
                <Href onPress={() => this.delete()} style={styles.confirmYesNo}>
                  <Text style={styles.textCapitalize}>{text4}</Text>
                </Href>
                <Href
                  onPress={() =>
                    this.setState({
                      visible1: false,
                    })
                  }
                  style={styles.confirmYesNo}
                >
                  <Text style={styles.textCapitalize}>{text5}</Text>
                </Href>
              </View>
            </View>
          </Modal>
        </Portal>
        <View style={styles.flexFull}>
          <Header component={this} Notification={false} />
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <Background>
              <TextHeader text1={text1} />
              <ActivityIndicator
                size="small"
                animating={this.state.ActivityIndicator}
              />
              <HeadLine require={true} text={text2} />
              <View style={style.languages} />
              {languages.map((item, index) => {
                if (item) {
                  item = item.split(";");

                  return (
                    <View style={styles.fullWith}>
                      <View style={[styles.fullWith, style.delete]}>
                        <Text style={styles.fontBoldSmall}>{item[0]}</Text>
                        <Href onPress={() => this.openModal(index, item[2])}>
                          <Image width={20} height={18} source={imgDelete} />
                        </Href>
                      </View>
                      <Text style={styles.fontBoldSmall}>{item[1]}</Text>
                      <View style={style.line_1} />
                    </View>
                  );
                }
              })}

              <View style={styles.fullWith}>
                <View style={style.view1}>
                  <ButtonImage
                    onPress={() =>
                      this.setState({
                        visible: true,
                        openModal: true,
                        closeModal: false,
                        isBack: false,
                      })
                    }
                    icon={icon}
                    style={style.button}
                  />
                </View>
              </View>
              <BackNext
                nextScreen="SchoolScreen"
                position="absolute"
                callBack={() => true}
                navigation={this.props.navigation}
                nextEnable={next}
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
  view1: {
    width: 70,
    marginTop: MARGIN_TOP_TEXTLANGUAGE_PLUSBUTTON,
    marginBottom: 100,
  },

  button: {
    backgroundColor: "#414141",
    alignItems: "center",
    borderRadius: 5,
    height: 60,
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
    marginTop: 30,
    marginBottom: 30,
  },

  line: {
    height: 1,
    width: "100%",
    backgroundColor: "#707070",
  },

  line_1: {
    height: 1,
    width: "100%",
    backgroundColor: "#707070",
    marginTop: 10,
    marginBottom: 10,
  },

  language: {
    marginTop: 10,
    marginBottom: 10,
  },

  close: {
    position: "absolute",
    right: 20,
    top: 20,
  },

  languages: {
    marginTop: 20,
  },

  delete: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  modalDelete: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",
  },

  modalDeleteRoot: {
    width: "80%",
    height: 150,
    marginLeft: "10%",
    marginRight: "10%",
    backgroundColor: "#898166",
    justifyContent: "center",
    borderRadius: 10,
  },

  textHeaderModal: {
    textAlign: "center",
    marginBottom: 20,
  },

  buttonModal: {
    padding: 10,
    backgroundColor: "#000",
    borderRadius: 10,
  },

  textInput1: {
    marginBottom: 15,
    borderRadius: 5,
    height: 40,
  },

  leftStyle: {
    paddingTop: 5,
    marginLeft: LEFT_SEARCH,
  },

  styleTextInput: {
    textAlign: "left",
    paddingLeft: "40%",
  },
});

export default PersonalData_4;

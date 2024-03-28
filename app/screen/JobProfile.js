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
import ButtonImage from "../components/ButtonImage";
import Image from "../components/Image";
import Href from "../components/Href";
import Header from "../components/Header";
import Collapse from "../components/Collapse";
import Switch from "../components/Switch";

import styles from "../../app/style/style";
import functions from "../../app/function/function";
import Button from "../components/Button";

import "../config/config";

const borderColor = "#000";

const windowWidth = Dimensions.get("window").width;
const LEFT_SEARCH = windowWidth / 2;

const icon = require("../images/plus.png");
const imgClose = require("../images/close.png");
const imgDelete = require("../images/delete_job_profile.png");
const imgDeleteLarge = require("../images/delete_job_profile_large.png");
const imgEdit = require("../images/edit_job_profile.png");

const pixelRatio = global.pixelRatio;

const number = 100;

const MARGIN_TOP_TEXTLANGUAGE_PLUSBUTTON =
  50 * pixelRatio * PixelRatio.getFontScale();

var preLanguage = null;

var deleteItem = null;

class JobProfile extends Component {
  constructor(props) {
    super(props);

    this.switch = [];

    this.state = {
      languages: [],
      userJobprofile: [],
      position: null,
      visible: false,
      visible1: false,
      openModal: false,
      closeModal: false,
      isBack: false,
      ActivityIndicator: false,
      search: "",
      jobs: [],
      position: 1,
      data1: [],
      data2: [],
      data3: [],
      data4: [],
    };
  }

  componentDidMount = () => {
    functions.getJobs(this);

    functions.getListWAH(this);
    functions.getListWAN(this);
    functions.getListWWK(this);
    functions.getListAmbitiion(this);

    functions.getListUserJobprofiles(this);
  };

  _renderItem = ({ item, index }) => {
    try {
      var job = item.job;
      job = global.data[job].name;

      var workHome = item.work_home;
      workHome = functions.getLabelWorkat(global.data1, workHome); //global.data1[workHome].label;

      var distance = item.distance;
      var distance1 = item.distance1;

      var week = item.week_hour;

      var salary = item.gross_year;
    } catch (error) {
      console.log(error);
    }

    return (
      <View style={[styles.fullWith, style.view3]}>
        <View style={styles.flexFull}>
          <Switch
            activeTrackColor={"#898166"}
            inactiveTrackColor={"#898166"}
            activeThumbColor={"#fff"}
            inactiveThumbColor={"#3e3e3e"}
            size={30}
            component={this}
            index={0}
            container={{
              position: "absolute",
              right: 5,
              top: 5,
              borderWidth: 0,
            }}
          />
          {/*borderTop*/}
          <View style={style.view2}>
            <Text
              style={[styles.fontBoldSmall, styles.textCapitalize, style.text2]}
            >
              {job}/-In
            </Text>
            <Text
              style={[styles.fontBoldSmall, styles.textCapitalize, style.text1]}
            >
              {distance} km Radius um {distance1}
            </Text>
            <Text
              style={[styles.fontBoldSmall, styles.textCapitalize, style.text1]}
            >
              {week} h Woche • Gehalt {salary} • Homeoffice {workHome}
            </Text>
          </View>
          <View style={[styles.fullWith, style.view1]}>
            <Href
              style={style.imgDelete}
              onPress={() => this.delete(job, index)}
            >
              <Image source={imgDelete} />
            </Href>
            <Href onPress={() => this.edit(index)}>
              <Image source={imgEdit} />
            </Href>
          </View>
          {/*borderBottom*/}
        </View>
      </View>
    );
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

  getAllLanguages = () => {
    if (this.props.navigation.state.params != undefined) {
      var languages = this.props.navigation.state.params.data;
      languages = languages.split(",");

      return languages;
    }

    return [];
  };

  checkExitLanguage = (selectLanguage) => {
    var check = true;

    if (this.props.navigation.state.params == undefined) return true;

    var languages = this.props.navigation.state.params.data;
    languages = languages.split(",");

    languages.map((item, index) => {
      item = item.split(";");

      if (item[0] == selectLanguage) {
        check = false;
      }
    });

    return check;
  };

  gotoScreenWithParam = (job) => {
    var data =
      this.props.navigation.state.params != undefined
        ? JSON.parse(this.props.navigation.state.params.data)
        : {};

    var index = data.index != undefined ? data.index : 0;

    data.index = index;

    if (data.data == undefined) data.data = [];

    data.data[index] = {};
    data.data[index].job = job;

    functions.gotoScreenWithParam(
      JSON.stringify(data),
      this.props.navigation,
      "JobProfile_1"
    );
  };

  openModal = (item) => {
    deleteItem = item;
    this.setState({ visible1: true });
  };

  closeModal = () => {
    this.setState({ visible1: false });
  };

  delete = () => {
    var result = "";

    var languages = this.props.navigation.state.params.data;
    languages = languages.split(",");

    languages.map((item, index) => {
      if (deleteItem == index) {
        languages.splice(index, 1);
        deleteItem = -1;
      } else result = result + item + ",";
    });

    this.props.navigation.state.params.data = result;

    this.setState({ visible1: false });
  };

  handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.y;
    const scrollViewHeight = event.nativeEvent.layoutMeasurement.height;
    const contentHeight = event.nativeEvent.contentSize.height;

    const atBottom = scrollPosition >= contentHeight - scrollViewHeight - 100;

    if (atBottom) this.setState({ position: this.state.position + 1 });
  };

  render() {
    var visible;

    var data =
      this.props.navigation.state.params != undefined
        ? this.props.navigation.state.params.data
        : null;

    if (data == null) visible = this.state.visible;
    else {
      data = JSON.parse(data);

      if (data.openModal) visible = true;
      else visible = this.state.visible;
    }

    var commonData = global.commonData.languages;

    try {
      var text1 = commonData.job;
      var text2 = commonData.profile;
      var text3 = commonData.what_i_want_to_do;

      global.data1 = this.state.data1;
      global.data2 = this.state.data2;
      global.data3 = this.state.data3;
      global.data4 = this.state.data4;
    } catch (error) {
      console.log(error);
    }

    var dataJob = this.state.userJobprofile;

    return (
      <Provider>
        <Portal>
          <Modal visible={visible}>
            <View style={style.modalHeader}>
              <Text style={[style.modalHeadLine, styles.fontBoldNormal]}>
                Beruf
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
            </View>
            <ScrollView onScroll={this.handleScroll}>
              <View style={style.modal}>
                {this.state.jobs.map(({ name, id }, index) => {
                  if (
                    name.includes(this.state.search) &&
                    index < number * this.state.position
                  )
                    return (
                      <View style={styles.fullWith}>
                        <View style={style.line} />
                        <Href onPress={() => this.gotoScreenWithParam(index)}>
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
          <Header component={this} />
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <Background>
              <TextHeader text1={text1} text2={text2} />
              <ActivityIndicator
                size="small"
                animating={this.state.ActivityIndicator}
              />
              <HeadLine style={style.headLine} text={text3} />
              <View style={style.languages} />
              <Collapse
                title=""
                style={style.collapse}
                data={dataJob}
                renderItem={this._renderItem}
                col={1}
                ref={this.collapse}
                navigation={this.props.navigation}
              />
              <View style={styles.fullWith}>
                <View style={style.buttonPlus}>
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
    marginTop: 30,
  },

  buttonPlus: {
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

  modalHeader: {
    width: "80%",
    marginLeft: "10%",
    marginRight: "10%",
    marginTop: 50,
    paddingLeft: 30,
    paddingRight: 30,
    backgroundColor: "#414141",
    alignItems: "center",
  },

  view3: {
    backgroundColor: "#E4E4E4",
    marginBottom: 15,
  },

  view2: {
    paddingTop: 10,
    paddingLeft: 20,
  },

  view1: {
    justifyContent: "flex-end",
    alignItems: "center",
    flexDirection: "row",
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 0,
  },

  imgDelete: {
    marginRight: 5,
  },

  text1: {
    color: "#898166",
  },

  text2: {
    color: "#000",
  },
});

export default JobProfile;

import React, { Component, createRef } from "react";
import {
  StyleSheet,
  View,
  AsyncStorage,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import { ScrollView } from "react-native-gesture-handler";
import { hideNavigationBar } from "react-native-navigation-bar-color";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { Provider, Portal, Modal } from "react-native-paper";
import { Rating, AirbnbRating, Tooltip } from "react-native-elements";
import IconFontAwesome from "react-native-vector-icons/FontAwesome";

import Background from "../components/Background";
import Logo from "../components/Logo";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import TextHeader from "../components/TextHeader";
import HeadLine from "../components/HeadLine";
import Text from "../components/Paragraph";
import Drawer from "../components/Drawer";
import MessageNotification from "../components/MessageNotification";
import Collapse from "../components/Collapse";
import Image from "../components/Image";
import Href from "../components/Href";
import IconBottom from "../components/IconBottom";
import Header from "../components/Header";

import styles from "../../app/style/style";
import functions from "../../app/function/function";

const borderColor = "#000";
const bgDefault = "#151515";
const bgFocus = "#3a3a3a";

const imgNotification = require("../images/white_notification.png");
const imgLike = require("../images/heart_like.png");
const imgNoLike = require("../images/no_like.png");
const imgNoMark = require("../images/no_mark.png");
const imgMark = require("../images/mark.png");
const imgShare = require("../images/share.png");
const imgDelete = require("../images/delete_job.png");
const imgInfo = require("../images/info.png");
const imgClose = require("../images/close.png");
const imgCobration = require("../images/cobration.png");

const width = (Dimensions.get("window").width * 80) / 100;
const height = (Dimensions.get("window").height * 80) / 100;

var text6;

class NewJob extends Component {
  constructor(props) {
    super(props);

    this.state = {
      index: 0,
      routes: [],
      SceneMap: {},
      ActivityIndicator: false,
      orderList: [],
      jobsList: [
        {
          arbeitsort: {},
        },
      ],
      detailJob: {},
      visible: false,
      visible1: false,
      like: false,
      mark: false,
      ActivityIndicator: false,
      ActivityIndicatorModal: false,
      listJoBlike: [],
      position: 0,
      display: 'none',
      display1: 'flex'
    };
  }

  componentDidMount = async () => {
    functions.getListJob(this, false);
    //hideNavigationBar();
    this.didFocusSubscription = this.props.navigation.addListener(
      "didFocus",
      (payload) => {
        // Logic to handle when the screen comes into focus (navigated back)
        console.log("Screen focused again:", payload);
        this.setState({ visible1: false });
        // You can perform actions or update state upon returning to this screen
      }
    );
  };

  static navigationOptions = ({ navigation }) => ({
    title: "",
  });

  gotoScreen = (type) => {
    switch (type) {
      case 2:
        this.setState({ mark: !this.state.mark });
        break;

      default:
        this.setState({ like: !this.state.like });
    }

    //functions.gotoScreen(this.props.navigation, "ConfirmLike");
  };

  gotoConfirm = (index) => {
    functions.gotoScreen(this.props.navigation, "ConfirmLike");

    functions.updateListConfirmJob(index, this);
  };

  getDetailJob = (index) => {
    let id = 0;

    try {
      id = this.state.jobsList[index].hashId;
    } catch (error) {
      console.log(error);
    }

    this.setState({ display: 'flex', display1: 'none', position: index });

    functions.getDetailJob(this, id);
  };

  confirmDelete = (idJob) => {
    functions.gotoScreen(this.props.navigation, "ConfirmDeleteJob");
  };

  _renderScene_ = SceneMap({
    "1": () => {
      return this.Route(1);
    },
    "2": () => {
      return scenes[0];
    },
  });

  _renderScene = () => {
    let scenes = [];

    this.state.jobsList.map((item, index) => {
      scenes.push(() => this.Route(index));
    });

    var sceneMap = {};

    this.state.jobsList.map((item, index) => {
      sceneMap[index + 1] = scenes[index];
    });

    return SceneMap(sceneMap);
  };

  Route = (status) => {
    var like =
      functions.checkJobIntoListLike(
        this.state.jobsList[status],
        this.state.listJoBlike
      ) > -1
        ? imgLike
        : imgNoLike;
    var mark = this.state.mark ? imgMark : imgNoMark;

    return (
      <View style={[style.data]}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={[styles.fullWith, style.childRen]}>
            <View style={[style.childRen_1]}>
              <View style={[styles.flexRow, style.containerJob1, { display: this.state.display1 }]}>
                <Text style={[styles.fontNormal, styles.titleJob]}>
                  Beruf:{" "}
                </Text>
                <Text
                  style={[
                    styles.fontNormal,
                    styles.descriptionJob,
                    style.descriptionTitleJob,
                  ]}
                >
                  {this.state.jobsList[status].beruf}
                </Text>
              </View>
              <View style={[styles.flexRow, style.containerJob1, { display: this.state.display1 }]}>
                <Text style={[styles.fontNormal, styles.titleJob]}>
                  Titel:{" "}
                </Text>
                <Text
                  style={[
                    styles.fontNormal,
                    styles.descriptionJob,
                    style.descriptionTitleJob,
                  ]}
                >
                  {this.state.jobsList[status].titel}
                </Text>
              </View>
              <View style={[styles.flexRow, style.containerJob1, { display: this.state.display1 }]}>
                <Text style={[styles.fontNormal, styles.titleJob]}>
                  Arbeitgeber:{" "}
                </Text>
                <Text
                  style={[
                    styles.fontNormal,
                    styles.descriptionJob,
                    style.descriptionTitleJob,
                  ]}
                >
                  {this.state.jobsList[status].arbeitgeber}
                </Text>
              </View>
              <Href
                style={[style.tooltip, { display: this.state.display1 }]}
                onPress={() => this.getDetailJob(status)}
              >
                <Image style={style.info} source={imgInfo} />
              </Href>
              {/*<ScrollView contentContainerStyle={{ height: '100%' }}>*/}
              <View style={[style.modal, style.modal2, { display: this.state.display }]}>
                <View style={[style.childRen_1, style.children_2]}>
                  <ActivityIndicator
                    size="large"
                    animating={this.state.ActivityIndicatorModal}
                  />
                  <View style={[style.containerJob, styles.marginBottom0]}>
                    <Text style={[styles.fontBoldSmall]}>
                      {this.state.jobsList[status].beruf}
                    </Text>
                  </View>
                  <View style={[style.containerJob, styles.marginBottom20]}>
                    <Text
                      style={[
                        styles.fontBoldLargeNormal,
                      ]}
                    >
                      {this.state.jobsList[status].titel}
                    </Text>
                  </View>
                  <View style={[styles.flexRow, style.containerJob]}>
                    <Text
                      style={[
                        styles.fontBoldSmall,
                      ]}
                    >
                      {this.state.jobsList[status].arbeitgeber}
                    </Text>
                  </View>
                  <View style={[styles.flexRow, style.containerJob]}>
                    <Text
                      style={[
                        styles.fontBoldSmall,
                      ]}
                    >
                      {this.state.jobsList[status].arbeitsort.plz} Remagen
                    </Text>
                  </View>
                  <View style={[styles.flexRow, style.containerJob]}>
                    <Text style={[styles.fontNormalSmall]}>
                      Eintrittsdatum:{" "}
                    </Text>
                    <Text
                      style={[
                        styles.fontNormalSmall
                      ]}
                    >
                      {this.state.jobsList[status].eintrittsdatum}
                    </Text>
                  </View>
                  <View style={[styles.flexRow, style.containerJob]}>
                    <Text style={[styles.fontNormalSmall]}>
                      Betriebsgroesse:{" "}
                    </Text>
                    <Text
                      style={[
                        styles.fontNormalSmall
                      ]}
                    >
                      {this.state.detailJob.betriebsgroesse}
                    </Text>
                  </View>
                  <View style={[styles.flexRow, style.containerJob]}>
                    <Text style={[styles.fontNormalSmall]}>
                      Allianzpartner:{" "}
                    </Text>
                    <Text
                      style={[
                        styles.fontNormalSmall
                      ]}
                    >
                      {this.state.detailJob.allianzpartner}
                    </Text>
                  </View>
                  <View style={[styles.flexRow, style.containerJob, styles.marginBottom20]}>
                    <Text style={[styles.fontNormalSmall]}>
                      AllianzpartnerUrl:{" "}
                    </Text>
                    <Text
                      style={[
                        styles.fontNormalSmall
                      ]}
                    >
                      {this.state.detailJob.allianzpartnerUrl}
                    </Text>
                  </View>
                  <View style={[styles.flexRow, style.containerJob]}>
                    <Text
                      style={[
                        styles.fontNormalSmall
                      ]}
                    >
                      {this.state.detailJob.stellenbeschreibung}
                    </Text>
                  </View>
                </View>
              </View>
              {/*</ScrollView>*/}
              <Href
                style={null}
                onPress={() =>
                  this.setState({ visible1: true, position: status })
                }
              >
                <View style={[styles.fullWith, style.cobration]}>
                  <Text>{text6}</Text>
                  <Image style={style.button_cobration} source={imgCobration} />
                </View>
              </Href>
            </View>

            <View style={[style.close, { display: this.state.display }]}>
              <Href
                onPress={() =>
                  this.setState({
                    display: 'none', display1: 'flex'
                  })
                }
              >
                <Image source={imgClose} />
              </Href>
            </View>

            <View style={[style.bottom]}>
              <Href onPress={() => this.confirmDelete(status)}>
                <Image source={imgDelete} />
              </Href>
              <Href onPress={() => functions.updateListLikeJob(status, this)}>
                <Image source={like} />
              </Href>
              {/*<Href onPress={() => this.gotoScreen(2)}>
              <Image source={mark} />
    </Href>*/}
              <Image source={imgShare} />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  };

  _handleIndexChange = (index) => {
    this.setState({ index });
  };

  getCountTab = (status) => {
    return "1";
  };

  render() {
    var commonData = global.commonData.languages;

    try {
      var text1 = commonData.jobs;
      var text2 = commonData.Employer;
      var text3 = commonData.notify;
      var text4 = commonData.yes;
      var text5 = commonData.no;
      text6 = commonData.Confirm_match;
    } catch (error) {
      console.log(error);
    }

    var renderData = this._renderScene();

    var status = this.state.position;

    return (
      <Provider>
        <Portal>
          <Modal visible={this.state.visible}>
            <ScrollView>
              <View style={[style.modal, style.modal2]}>
                <View style={[style.childRen_1, style.children_2]}>
                  <ActivityIndicator
                    size="large"
                    animating={this.state.ActivityIndicatorModal}
                  />
                  <View style={[style.containerJob, styles.marginBottom0]}>
                    <Text style={[styles.fontBoldSmall]}>
                      {this.state.jobsList[status].beruf}
                    </Text>
                  </View>
                  <View style={[style.containerJob, styles.marginBottom20]}>
                    <Text
                      style={[
                        styles.fontBoldLargeNormal,
                      ]}
                    >
                      {this.state.jobsList[status].titel}
                    </Text>
                  </View>
                  <View style={[styles.flexRow, style.containerJob]}>
                    <Text
                      style={[
                        styles.fontBoldSmall,
                      ]}
                    >
                      {this.state.jobsList[status].arbeitgeber}
                    </Text>
                  </View>
                  <View style={[styles.flexRow, style.containerJob]}>
                    <Text
                      style={[
                        styles.fontBoldSmall,
                      ]}
                    >
                      {this.state.jobsList[status].arbeitsort.plz} Remagen
                    </Text>
                  </View>
                  <View style={[styles.flexRow, style.containerJob]}>
                    <Text style={[styles.fontNormalSmall]}>
                      Eintrittsdatum:{" "}
                    </Text>
                    <Text
                      style={[
                        styles.fontNormalSmall
                      ]}
                    >
                      {this.state.jobsList[status].eintrittsdatum}
                    </Text>
                  </View>
                  <View style={[styles.flexRow, style.containerJob]}>
                    <Text style={[styles.fontNormalSmall]}>
                      Betriebsgroesse:{" "}
                    </Text>
                    <Text
                      style={[
                        styles.fontNormalSmall
                      ]}
                    >
                      {this.state.detailJob.betriebsgroesse}
                    </Text>
                  </View>
                  <View style={[styles.flexRow, style.containerJob]}>
                    <Text style={[styles.fontNormalSmall]}>
                      Allianzpartner:{" "}
                    </Text>
                    <Text
                      style={[
                        styles.fontNormalSmall
                      ]}
                    >
                      {this.state.detailJob.allianzpartner}
                    </Text>
                  </View>
                  <View style={[styles.flexRow, style.containerJob, styles.marginBottom20]}>
                    <Text style={[styles.fontNormalSmall]}>
                      AllianzpartnerUrl:{" "}
                    </Text>
                    <Text
                      style={[
                        styles.fontNormalSmall
                      ]}
                    >
                      {this.state.detailJob.allianzpartnerUrl}
                    </Text>
                  </View>
                  <View style={[styles.flexRow, style.containerJob]}>
                    <Text
                      style={[
                        styles.fontNormalSmall
                      ]}
                    >
                      {this.state.detailJob.stellenbeschreibung}
                    </Text>
                  </View>
                </View>
              </View>
            </ScrollView>
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
          </Modal>
          <Modal visible={this.state.visible1}>
            <View style={style.modal1}>
              <Text style={[styles.fontBoldLargeNormal]}>{text2}</Text>
              <Text style={[styles.fontBoldLargeNormal]}>{text3}</Text>
              <View style={[styles.flexRow, style.parentConfirm]}>
                <Href
                  onPress={() => this.gotoConfirm(this.state.position)}
                  style={style.confirmYesNo}
                >
                  <Text style={[styles.textCapitalize, styles.fontBoldSmall]}>
                    {text4}
                  </Text>
                </Href>
                <Href
                  onPress={() => this.setState({ visible1: false })}
                  style={style.confirmYesNo}
                >
                  <Text style={[styles.textCapitalize, styles.fontBoldSmall]}>
                    {text5}
                  </Text>
                </Href>
              </View>
            </View>
          </Modal>
        </Portal>
        <View style={[styles.flexFull]}>
          <Header component={this} />
          <ScrollView contentContainerStyle={styles.scrollView}>
            <View style={[styles.fullWith, style.childrenOFScrool]}>
              <TextHeader
                styleSpecialIcon={style.styleSpecialIcon}
                special={true}
                icon={imgNotification}
                text2={text1}
              />
              <View style={style.line} />
              <Href onPress={() => functions.getListJob(this, true)}>
                <IconFontAwesome name="refresh" size={24} color="white" />
              </Href>
              <View style={style.parentTabview}>
                <ActivityIndicator
                  size="large"
                  animating={this.state.ActivityIndicator}
                />
                <TabView
                  navigationState={this.state}
                  renderScene={renderData}
                  onIndexChange={this._handleIndexChange}
                  //tabStyle={{ color: "red" }}
                  //initialLayout={{ width: layout.width }}
                  renderTabBar={(props) => <View />}
                />
              </View>
            </View>
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
  parentConfirm: {
    marginTop: 30,
  },

  confirmYesNo: {
    borderColor: "#898166",
    borderWidth: 2,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 50,
    paddingRight: 50,
    marginRight: 20,
    backgroundColor: "#363636",
    //zIndex: 9999999
  },

  cobration: {
    //backgroundColor: 'green',
    marginTop: 40,
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
    borderColor: "#898166",
    borderWidth: 2,
  },

  button_cobration: {
    marginTop: 3,
  },

  data: {
    flex: 1,
    backgroundColor: "#000",
    padding: 20,
  },

  styleSpecialIcon: {
    marginLeft: 10,
    marginTop: -5,
  },

  childRen: {
    flex: 1,
    padding: 20,
    borderWidth: 1,
    borderColor: "#898166",
    backgroundColor: "#363636",
    height: "100%",
  },

  childRen_1: {
    flex: 8,
  },

  children_2: {
    paddingLeft: 20,
    paddingRight: 20,
  },

  bottom: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "space-around",
    //position: "absolute",
    //bottom: 10,
    //left: 20,
    //backgroundColor: 'red',
    width: "100%",
    marginTop: 20,
    alignItems: "flex-end",
  },

  childrenOFScrool: {
    backgroundColor: "#000",
    alignItems: "center",
    height: "100%",
  },

  parentTabview: {
    marginTop: 20,
    flex: 1,
    width: "100%",
    height: "100%",
  },

  TabBar: {
    backgroundColor: "#000",
    //width: 150
  },

  textTitleTabview: {
    color: "#fff",
    //width: 100
  },

  logo: {
    marginTop: 40,
  },

  line: {
    height: 1,
    backgroundColor: "#323232",
    width: "90%",
    marginLeft: "5%",
    marginRight: "5%",
    marginBottom: 10,
  },

  info: {
    /*position: "absolute",
    left: "50%",
    top: 20,*/
  },

  tooltip: {
    /*alignItems: 'center',
    marginTop: 20*/
    position: "absolute",
    right: -10,
    top: -10,
  },

  close: {
    position: "absolute",
    right: 15,
    top: 15,
  },

  modal: {
    width: "100%",
    //marginLeft: "5%",
    //marginRight: "5%",
    //marginTop: 70,
    //paddingLeft: 30,
    //paddingRight: 30,
    //paddingTop: 50,
    //height: "100%",
    //backgroundColor: "#323232",
    //alignItems: "center",
    borderColor: "#898166",
    borderWidth: 0,
  },

  modal2: {
    /*width: "80%",
    marginLeft: "10%",
    marginRight: "10%",*/
    marginLeft: -20
  },

  modal1: {
    width: "100%",
    //marginLeft: "5%",
    //marginRight: "5%",
    //paddingLeft: 30,
    //paddingRight: 30,
    //paddingTop: 50,
    height: "100%",
    backgroundColor: "#363636",
    opacity: 0.8,
    //backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
    //zIndex: -1
  },

  descriptionTitleJob: {
    //marginLeft: 10,
  },

  containerJob: {
    marginBottom: 3,
    borderBottomColor: "#ccc",
    borderBottomWidth: 0,
    paddingBottom: 0,
    paddingTop: 0,
    paddingRight: 10,
    //alignItems: "center",
    //backgroundColor: 'red',
    //justifyContent: 'center'
  },

  containerJob1: {
    marginBottom: 10,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    paddingBottom: 10,
    paddingTop: 0,
    paddingRight: 100,
    alignItems: "center",
    flexWrap: 'nowrap',
    //backgroundColor: 'red',
    //justifyContent: 'center'
  },
});

export default NewJob;

import React, { Component, createRef } from "react";
import {
  StyleSheet,
  View,
  AsyncStorage,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";

import { ScrollView } from "react-native-gesture-handler";
import { hideNavigationBar } from "react-native-navigation-bar-color";

import Background from "../components/Background";
import TextHeader from "../components/TextHeader";
import Text from "../components/Paragraph";
import Image from "../components/Image";
import Href from "../components/Href";
import IconBottom from "../components/IconBottom";
import Header from "../components/Header";

import styles from "../../app/style/style";
import functions from "../../app/function/function";

const borderColor = "#000";
const bgDefault = "#2B2B2B";
const bgFocus = "#898166";
const imgNotification = require("../images/notification.png");
const imgHeart = require("../images/heart_like.png");
const imgMessage = require("../images/chat_message.png");
const imgLike = require("../images/heart_like.png");
const imgNoLike = require("../images/no_like.png");
const imgNoMark = require("../images/no_mark.png");
const imgMark = require("../images/mark.png");
const imgShare = require("../images/share.png");
const imgDelete = require("../images/delete_job.png");
const imgInfo = require("../images/info.png");
const imgBack = require("../images/arrow_back.png");

class DetailJob extends Component {
  constructor(props) {
    super(props);

    this.state = {
      like: false,
      mark: false,
      listJoBlike: [],
      detailJob: {},
      ActivityIndicatorModal: false,
    };
  }

  state = {};

  onClickItem = (index, link) => {
    this.collapse.current.setState({ activeIndex: index });
    functions.gotoScreen(this.props.navigation, link);
  };

  componentDidMount = async () => {
    hideNavigationBar();

    var detailJob, id = 1;

    try {
      detailJob = this.props.navigation.state.params.data;
      detailJob = JSON.parse(detailJob);

      id = detailJob.refnr;

      functions.getDetailJob(this, id);
    } catch (error) {
      detailJob = {};
      detailJob.arbeitsort = {};
    }

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

    functions.gotoScreen(this.props.navigation, "ConfirmLike");
  };

  updateLike = async (detailJob, component) => {
    var listJoBlike = global.commonData.listJoBlike;

    let position = functions.checkJobIntoListLike(detailJob, listJoBlike);

    if (position > -1) listJoBlike.splice(position, 1);
    else listJoBlike.push(detailJob);

    global.commonData.listJoBlike = listJoBlike;

    await functions.setDataAsyncStorage(
      "data",
      JSON.stringify(global.commonData)
    );

    component.setState({ listJoBlike: listJoBlike });
  };

  confirmDelete = (idJob) => {
    functions.gotoScreen(this.props.navigation, "ConfirmDeleteJob");
  };

  goToBackScreen = () => {
    functions.backScreen(this.props.navigation);
  };

  render() {
    var commonData = global.commonData.languages;

    let displayError = 'none';

    try {
      var text1 = commonData.not_find_job;

      displayError = (this.state.detailJob.hasError == true) ? 'flex' : 'none';
    } catch (error) {
      console.log(error);
    }

    var mark = this.state.mark ? imgMark : imgNoMark;

    var back = (
      <TouchableOpacity
        onPress={() => this.goToBackScreen()}
        style={style.back}
      >
        <Image source={imgBack} />
      </TouchableOpacity>
    );

    var detailJob;

    try {
      detailJob = this.props.navigation.state.params.data;
      detailJob = JSON.parse(detailJob);
    } catch (error) {
      detailJob = {};
      detailJob.arbeitsort = {};
    }

    var like =
      functions.checkJobIntoListLike(detailJob, global.commonData.listJoBlike) >
        -1
        ? imgLike
        : imgNoLike;

    return (
      <View style={styles.flexFull}>
        <Header component={this} />
        <ScrollView contentContainerStyle={styles.scroll}>
          <Background>
            <TextHeader special={true} icon={imgNotification} text2="jobs" />
            <Text style={[styles.error, { display: displayError }]}>
              {text1}
            </Text>

            <ActivityIndicator
              size="large"
              animating={this.state.ActivityIndicatorModal}
            />
            <View style={[styles.childRen, { display: this.state.display, paddingLeft: 30, paddingRight: 30 }]}>
              <View>
                <View style={[styles.flexRow, styles.containerJob]}>
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
                <View style={[styles.flexRow, styles.containerJob]}>
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
                <View style={[styles.flexRow, styles.containerJob, styles.marginBottom20]}>
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
                <View style={[styles.flexRow, styles.containerJob]}>
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

            <View style={[style.bottom]}>
              {back}
              <Href onPress={() => this.updateLike(detailJob, this)}>
                <Image source={like} />
              </Href>
              {/*<Href onPress={() => this.gotoScreen(2)}>
                <Image source={mark} />
                </Href>*/}
              <Href onPress={() => functions.share(this.state.detailJob)}>
                <Image source={imgShare} />
              </Href>
              <Href onPress={() => this.confirmDelete(1)}>
                <Image source={imgDelete} />
              </Href>
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
  back: {
    backgroundColor: "#2B2B2B",
    paddingVertical: 5,
    paddingHorizontal: 25,
  },

  data: {
    flex: 1,
    backgroundColor: "#000",
    marginBottom: 20,
  },

  childRen: {
    padding: 20,
    borderWidth: 1,
    borderColor: "#898166",
    backgroundColor: "#363636",
    height: "100%",
  },

  view1: {
    width: "100%",
    justifyContent: "center",
    flexDirection: "row",
  },

  text1: {
    color: "#898166",
    marginLeft: 10,
    marginTop: -3,
  },

  bottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    //backgroundColor: 'red',
    width: "100%",
    marginBottom: 20,
    marginTop: 10
  },

  containerJob: {
    marginBottom: 10,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    paddingBottom: 10,
    paddingRight: 20,
    paddingLeft: 5,
    alignItems: "center",
    //backgroundColor: 'red',
  },

  descriptionTitleJob: {
    marginLeft: 10,
  },
});

export default DetailJob;

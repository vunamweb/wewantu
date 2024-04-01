import React, { Component } from "react";
import { StyleSheet, View, Dimensions, PixelRatio } from "react-native";

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
import ButtonImage from "../components/ButtonImage";
import Image from "../components/Image";
import Href from "../components/Href";
import Header from "../components/Header";

import styles from "../../app/style/style";
import functions from "../../app/function/function";

import "../config/config";

const icon = require("../images/plus.png");
const imgDelete = require("../images/icon_delete.png");
const iconPlus = require("../images/plus.png");
const pixelRatio = global.pixelRatio;

const MARGIN_TOP_TEXTLANGUAGE_PLUSBUTTON =
  50 * pixelRatio * PixelRatio.getFontScale();
const MARGIN_TOP_PLUSBUTTON = -30 * pixelRatio * PixelRatio.getFontScale();

var preLanguage = null;
var deleteItem = null;

const strAsyncStorage = global.trainning;

var component;

class ReviewTrainingUniversity extends Component {
  constructor(props) {
    super(props);

    this.state = {
      trainning: [],
      visible: false,
      visible1: false,
      openModal: false,
      closeModal: false,
      isBack: false,
    };
  }

  componentDidMount = async () => {
    component = this;

    var trainning = await this.getAllTraining();

    this.setState({ trainning: trainning });

    if (this.props.navigation.state.params != undefined)
      functions.setDataAsyncStorage(
        strAsyncStorage,
        this.props.navigation.state.params.data
      );
    else {
      component.props.navigation.state.params = {};

      component.props.navigation.state.params.data = await functions.getDataAsyncStorage(
        strAsyncStorage
      );

      console.log("ok");
    }
  };

  static navigationOptions = ({ navigation }) => ({
    title: "",
  });

  getAllTraining = async () => {
    var data;

    if (this.props.navigation.state.params != undefined) {
      data = this.props.navigation.state.params.data;

      data = JSON.parse(data);
      data = data.data;

      return data;
    } else {
      data = await functions.getDataAsyncStorage(strAsyncStorage);

      /*this.props.navigation.state.params = {};
      this.props.navigation.state.params.data = data;*/

      if (data != null) return JSON.parse(data).data;
    }

    return [];
  };

  openModal = (item) => {
    deleteItem = item;
    this.setState({ visible1: true });
  };

  delete = () => {
    var data = this.props.navigation.state.params.data;
    data = JSON.parse(data);

    var trainings = data.data;

    trainings.map((item, index) => {
      if (deleteItem == index) trainings.splice(index, 1);
    });

    data.data = trainings;

    this.props.navigation.state.params.data = JSON.stringify(data);

    this.setState({ visible1: false });
  };

  add = () => {
    var data;
    
    try {
      data = this.props.navigation.state.params.data;
      data = JSON.parse(data);

      data.add = true;
    } catch (error) {
      console.log(error);

      data = {};

      data.data = [];
      data.add = true;
    }

    functions.gotoScreenWithParam(
      JSON.stringify(data),
      this.props.navigation,
      "TrainingUniversity_1"
    );
  };

  edit = (edit) => {
    var data = this.props.navigation.state.params.data;
    data = JSON.parse(data);

    data.edit = edit;
    data.type = data.data[edit].type;

    functions.gotoScreenWithParam(
      JSON.stringify(data),
      this.props.navigation,
      "AddEducation"
    );
  };

  render() {
    var trainings; //= this.state.trainning;

    var commonData = global.commonData.languages;

    try {
      var text1 = commonData.that_s;
      var text2 = commonData.my;
      var text3 = commonData.status;
      var text4 = commonData.education_and_study;
      var text5 = commonData.are_you_sure_to_delete;
      var text6 = commonData.yes;
      var text7 = commonData.no;
      var text8 = commonData.continue_education;
      var text9 = commonData.studies;
      var text10 = commonData.education;
    } catch (error) {
      console.log(error);
    }

    try {
      trainings =
        this.props.navigation.state.params == undefined
          ? this.state.trainning
          : JSON.parse(this.props.navigation.state.params.data).data;
    } catch (error) {
      trainings = [];
    }

    return (
      <Provider>
        <Portal>
          <Modal visible={this.state.visible1}>
            <View style={style.modalDeleteRoot}>
              <Text style={style.textHeaderModal}>{text5}</Text>
              <View style={style.modalDelete}>
                <Href onPress={() => this.delete()} style={style.buttonModal}>
                  <Text style={styles.textCapitalize}>{text6}</Text>
                </Href>
                <Href
                  onPress={() =>
                    this.setState({
                      visible1: false,
                    })
                  }
                  style={style.buttonModal}
                >
                  <Text style={styles.textCapitalize}>{text7}</Text>
                </Href>
              </View>
            </View>
          </Modal>
        </Portal>
        <View style={styles.flexFull}>
          <Header component={this} Notification={false} />
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <Background>
              <TextHeader text1={text1} text2={text2} text3={text3} />
              <HeadLine style={style.headLine} text={text4} />
              <View style={style.languages} />
              {trainings.map((item, index) => {
                var title;

                switch (item.type) {
                  case 1:
                    title = text8 + ": ";
                    break;

                  case 2:
                    title = text9 + ": ";
                    break;

                  default:
                    title = text10 + ": ";
                }
                if (item.job)
                  return (
                    <View style={styles.fullWith}>
                      <View style={[styles.fullWith, style.delete]}>
                        <Href
                          style={style.textJob}
                          onPress={() => this.edit(index)}
                        >
                          <Text style={[styles.fontBoldSmall]}>
                            {title}
                            {item.job}
                          </Text>
                        </Href>
                        <Href onPress={() => this.openModal(index)}>
                          <Image width={20} height={18} source={imgDelete} />
                        </Href>
                      </View>

                      <Text style={styles.fontBoldSmall}>{item.name}</Text>
                      <View style={style.line_1} />
                    </View>
                  );
              })}
              <View style={styles.fullWith}>
                <View style={style.view1}>
                  <ButtonImage
                    onPress={() => this.add()}
                    icon={iconPlus}
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
      </Provider>
    );
  }
}

const style = StyleSheet.create({
  textJob: {
    paddingRight: 10,
    width: '90%'
  },

  view1: {
    width: 70,
    marginTop: MARGIN_TOP_TEXTLANGUAGE_PLUSBUTTON,
  },

  headLine: {
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

  delete: {
    flexDirection: "row",
    justifyContent: "space-between",
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

  modalDelete: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",
  },

  buttonModal: {
    padding: 10,
    backgroundColor: "#000",
    borderRadius: 10,
  },

  button: {
    backgroundColor: "#414141",
    alignItems: "center",
    borderRadius: 5,
    height: 60,
    marginTop: MARGIN_TOP_PLUSBUTTON,
    marginBottom: 60,
  },
});

export default ReviewTrainingUniversity;

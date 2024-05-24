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
  50 * pixelRatio;
const MARGIN_TOP_PLUSBUTTON = -30 * pixelRatio;

var preLanguage = null;
var deleteItem = null,
  deleteId;

const strAsyncStorage = global.trainning;

var component;

class ReviewTrainingUniversity extends Component {
  constructor(props) {
    super(props);

    this.state = {
      trainning: [],
      listEducation: [],
      EducationalStageTypes: [
        {
          id: 0,
        },
        {
          id: 0,
        },
        {
          id: 0,
        },
      ],
      visible: false,
      visible1: false,
      openModal: false,
      closeModal: false,
      isBack: false,
      ActivityIndicator: false,
    };
  }

  componentDidMount = async () => {
    component = this;

    global.reviewTraining = this;

    var trainning = await this.getAllTraining();

    // if not data is saved in local
    if (
      trainning == null ||
      trainning == undefined ||
      (Array.isArray(trainning) && trainning.length == 0)
    )
      functions.getListUserEducation(this);
    else {
      try {
        trainning = JSON.parse(trainning);
      } catch (error) {
        trainning = [];
      }

      this.setState({ trainning: trainning });
    }

    var datauser = await functions.getDataUser();

    var listEducationStage = [];

    try {
      datauser = JSON.parse(datauser);

      listEducationStage = datauser.listEducationStage;
    } catch (error) {
      console.log(error);
    }

    // check list of education stage has saved on local, if not call api to get data
    if ((Array.isArray(listEducationStage) && listEducationStage.length == 0) || listEducationStage == undefined)
      functions.getListEducationalStageTypes(this); // get list of education stage type
    else {
      this.setState({
        EducationalStageTypes: listEducationStage
      });
    }
    // END
  };

  static navigationOptions = ({ navigation }) => ({
    title: "",
  });

  getAllTraining = async () => {
    var data = await functions.getDataAsyncStorage(strAsyncStorage);

    return data;
  };

  openModal = (index, id) => {
    deleteItem = index;
    deleteId = id;

    this.setState({ visible1: true });
  };

  delete = async () => {
    try {
      global.reviewTraining.state.trainning.splice(deleteItem, 1);

      global.tranining = global.reviewTraining.state.trainning;

      await functions.setDataAsyncStorage(
        strAsyncStorage,
        JSON.stringify(global.reviewTraining.state.trainning)
      );
    } catch (error) {
      console.log(error);
    }

    functions.deleteEducation(this, deleteId);

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
    //var data = this.props.navigation.state.params.data;
    //data = JSON.parse(data);
    var data = {};

    data.data = this.state.trainning;
    data.edit = edit;

    try {
      data.type = data.data[edit].type;
    } catch (error) {
      console.log(error);
    }

    functions.gotoScreenWithParam(
      JSON.stringify(data),
      this.props.navigation,
      "AddEducation"
    );
  };

  setTypeFortraining = (training) => {
    try {
      training.map((item, index) => {
        if (item.educationstage_id == this.state.EducationalStageTypes[0].id)
          training[index].type = 0;
        else if (
          item.educationstage_id == this.state.EducationalStageTypes[1].id
        )
          training[index].type = 1;
        else training[index].type = 2;
      });
    } catch (error) {
      return training;
    }

    return training;
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

    trainings = this.state.trainning;

    trainings = this.setTypeFortraining(trainings);

    return (
      <Provider>
        <Portal>
          <Modal visible={this.state.visible1}>
            <View style={styles.modal1}>
              <Text style={style.textHeaderModal}>{text5}</Text>
              <View style={style.modalDelete}>
                <Href onPress={() => this.delete()} style={styles.confirmYesNo}>
                  <Text style={styles.textCapitalize}>{text6}</Text>
                </Href>
                <Href
                  onPress={() =>
                    this.setState({
                      visible1: false,
                    })
                  }
                  style={styles.confirmYesNo}
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
              <ActivityIndicator
                size="large"
                animating={this.state.ActivityIndicator}
              />
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
                        <Href onPress={() => this.openModal(index, item.id)}>
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
    width: "90%",
  },

  view1: {
    width: 70,
    marginBottom: 50,
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

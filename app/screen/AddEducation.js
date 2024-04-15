import React, { Component, createRef } from "react";
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
import Logo from "../components/Logo";
import TextHeader from "../components/TextHeader";
import HeadLine from "../components/HeadLine";
import IconBottom from "../components/IconBottom";
import BackNext from "../components/BackNext";
import Drawer from "../components/Drawer";
import ButtonImage from "../components/ButtonImage";
import Image from "../components/Image";
import Href from "../components/Href";
import CheckBox from "../components/Checkbox";
import TextInput from "../components/TextInput";

import styles from "../../app/style/style";
import functions from "../../app/function/function";

import "../config/config";

const borderColor = "#000";

const windowWidth = Dimensions.get("window").width;
const LEFT_SEARCH = windowWidth / 2;

const iconCheck = require("../images/check.png");
const iconDelete = require("../images/delete.png");
const imgClose = require("../images/close.png");

const pixelRatio = global.pixelRatio;

var text5;

const MARGIN_TOP_TEXTLANGUAGE_PLUSBUTTON =
  50 * pixelRatio;

const number = 100;

const strAsyncStorage = global.trainning;

var data;

var textHeader;
var headLine1;
var headLine2;

class AddEducation extends Component {
  constructor(props) {
    super(props);

    this.input1 = createRef();

    this.callBack.bind(this);
    this.checkStudy.bind(this);
    this.gotoReview.bind(this);

    this.setPosition = "";

    this.state = {
      job: null,
      job_id: null,
      company: null,
      visible: false,
      visible1: false,
      display: "none",
      display1: "flex",
      search: "",
      errorMessage: "",
      marginTop: 0,
      colorBorder: borderColor,
      jobs: [],
      ActivityIndicator: false,
      position: 1,
    };
  }

  componentDidMount = () => {
    functions.getJobs(this);
  };

  static navigationOptions = ({ navigation }) => ({
    title: "",
  });

  gotoReview = async () => {
    if (this.state.job == null)
      this.setState({
        errorMessage: text5,
        colorBorder: "red",
        marginTop: 20,
      });
    else {
      var strAsyncStorage = global.trainning;
      let dataEcuation, count;

      //await functions.setDataAsyncStorage(strAsyncStorage, data);

      try {
        dataEcuation = JSON.parse(data);
        count = dataEcuation.data.length - 1;
      } catch (error) {
        dataEcuation = {};
        dataEcuation.data = [];

        count = 0;
      }

      // if add
      if (dataEcuation.add)
        functions.insertUserEducation(this, dataEcuation.data[count]);
      else {
        let education_id, data;

        try {
          let position = dataEcuation.edit;

          let data = dataEcuation.data[position];

          education_id = data.id;

          //delete data.id;

          functions.updateUserEducation(this, education_id, data, position);
        } catch (error) {}
      }
    }
  };

  setJob = (name, job_id) => {
    var check = true;

    var data = this.props.navigation.state.params.data;
    data = JSON.parse(data);

    var type = data.type;

    data.data.map((item, index) => {
      if (item.type == type && item.job == name) {
        check = false;
      }
    });

    if (check) {
      if (data.edit != undefined) {
        var edit = data.edit;
        data.data[edit].job = name;

        this.props.navigation.state.params.data = JSON.stringify(data);
      }

      this.input1.current.blur();
      this.setState({
        job: name,
        job_id: job_id,
        visible: false,
        display1: "flex",
      });
    }
  };

  callBack = () => {
    data = this.getEducation();

    var type = data.type;
    if (type != 2) this.setState({ visible: true });
  };

  checkStudy = (index) => {
    if (this.state.job == null)
      functions.gotoScreen(this.props.navigation, "ReviewTrainingUniversity");
    else this.gotoReview();
  };

  clear = () => {
    /*this.setPosition(-1);
    this.setState({ display: "none" });
    this.input1.curcurrent.focus();*/
    this.setState({ visible1: true });
  };

  delete = async () => {
    let dataEcuation, education_id;

    try {
      dataEcuation = JSON.parse(data);

      let position = dataEcuation.edit;

      // id of education will be deleted
      education_id = dataEcuation.data[position].id;

      global.reviewTraining.state.trainning.splice(position, 1);

      // update local
      await functions.setDataAsyncStorage(
        strAsyncStorage,
        JSON.stringify(global.reviewTraining.state.trainning)
      );

      // delete education id from server
      functions.deleteEducation(this, education_id, true);
    } catch (error) {
      console.log(error);
    }
  };

  addEducation = (data, type, educationstage_id, id) => {
    var obj = {};

    obj.type = type;
    obj.educationstage_id = educationstage_id;
    obj.id = id;
    obj.job = this.state.job;
    obj.job_id = this.state.job_id;
    obj.name = this.state.company;

    data.push(obj);
  };

  getEducation = () => {
    try {
      data = this.props.navigation.state.params.data;
      data = JSON.parse(data);
    } catch (error) {
      data = {};
      data.data = [];

      console.log(error);
    }

    var type = data.type;
    var educationstage_id = data.educationstage_id;
    var id = data.id;
    var add = true;

    if (data.edit == null) {
      if (data.add == undefined) {
        data.data.map((item, index) => {
          if (item.type == type) {
            add = false;

            data.data[index].job = this.state.job;
            data.data[index].name = this.state.company;
          }
        });

        if (add) {
          this.addEducation(data.data, type, educationstage_id, id);
        }
      } else {
        this.addEducation(data.data, type, educationstage_id, id);
      }
    }

    return data;
  };

  checkComplete = (data) => {
    if (data.edit != undefined) return true;

    return false;
  };

  setCompany = (value) => {
    data = this.getEducation();

    if (data.edit != undefined) {
      var edit = data.edit;

      data.data[edit].name = value;

      this.props.navigation.state.params.data = JSON.stringify(data);

      this.setState({ company: value });
    } else {
      this.setState({ company: value });
    }
  };

  handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.y;
    const scrollViewHeight = event.nativeEvent.layoutMeasurement.height;
    const contentHeight = event.nativeEvent.contentSize.height;

    const atBottom = scrollPosition >= contentHeight - scrollViewHeight - 100;

    if (atBottom) this.setState({ position: this.state.position + 1 });
  };

  render() {
    var width1, width2;

    data = this.getEducation();

    var type = data.type;

    var hideKeyboard = type != 2 ? true : false;

    var commonData = global.commonData.languages;

    try {
      var text1_1 = commonData.education;
      var text1_2_1 = commonData.further;
      var text1_2_2 = commonData.education;
      var text1_3_1 = commonData.studies;

      var text2_1 = commonData.job;
      var text2_2_1 = commonData.further;
      var text2_2_2 = commonData.education;
      var text2_3 = commonData.studies;

      var text3_1 = commonData.name_company;
      var text3_2 = commonData.name_instutation;
      var text3_3_1 = commonData.university_of_apply_science;
      var text3_3_2 = commonData.university;

      var text4 = commonData.completed;

      text5 = commonData.please_enter_job;

      var data_ = [
        {
          label: text4,
          require: false,
        },
      ];
    } catch (error) {
      console.log(error);
    }

    if (this.checkComplete(data)) {
      width1 = "70%";
      width2 = "20%";

      this.state.display = "flex";

      var edit = data.edit;

      this.state.job = data.data[edit].job;
      this.state.company = data.data[edit].name;
    } else {
      this.state.display = "none";

      width1 = "100%";
      width2 = "0%";
    }

    data = JSON.stringify(data);

    switch (type) {
      case 1:
        textHeader = <TextHeader text1={text1_2_1} text2={text1_2_2} />;
        headLine1 = (
          <HeadLine
            style={style.headlineFirst}
            require={true}
            text={text2_2_1 + " " + text2_2_2}
          />
        );
        headLine2 = <HeadLine text={text3_2} />;
        break;

      case 2:
        textHeader = <TextHeader setMargin={true} text1={text1_3_1} />;
        headLine1 = (
          <HeadLine style={style.headlineFirst} require={true} text={text2_3} />
        );
        headLine2 = <HeadLine text={text3_3_1 + "/" + text3_3_2} />;
        break;

      default:
        textHeader = <TextHeader setMargin={true} text1={text1_1} />;
        headLine1 = (
          <HeadLine style={style.headlineFirst} require={true} text={text2_1} />
        );
        headLine2 = <HeadLine text={text3_1} />;
    }

    return (
      <Provider>
        <Portal>
          <Modal visible={this.state.visible}>
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
                        <Href onPress={() => this.setJob(name, id)}>
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
          <Modal visible={this.state.visible1}>
            <View style={style.modalDeleteRoot}>
              <Text style={style.textHeaderModal}>Are you sure to delete?</Text>
              <View style={style.modalDelete}>
                <Href onPress={() => this.delete()} style={style.buttonModal}>
                  <Text>Yes</Text>
                </Href>
                <Href
                  onPress={() =>
                    this.setState({
                      visible1: false,
                    })
                  }
                  style={style.buttonModal}
                >
                  <Text>No</Text>
                </Href>
              </View>
            </View>
          </Modal>
        </Portal>
        <View style={styles.flexFull}>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <Background>
              <Logo navigation={this.props.navigation} type={1} />
              {textHeader}
              <Text style={[styles.error, { marginTop: this.state.marginTop }]}>
                {this.state.errorMessage}
              </Text>
              <ActivityIndicator
                size="large"
                animating={this.state.ActivityIndicator}
              />
              {headLine1}
              <TextInput
                ref_={this.input1}
                hideKeyboard={hideKeyboard}
                onChangeText={(value) => this.setState({ job: value })}
                callBack={this.callBack}
                value={this.state.job}
                styleParent={[
                  style.textInput,
                  styles.textInput,
                  {
                    borderColor: this.state.colorBorder,
                  },
                ]}
                leftStyle={style.leftStyle}
                bgFocus="white"
                bgBlur="#3f3f3f"
              />
              {headLine2}
              <TextInput
                onChangeText={(value) => this.setCompany(value)}
                value={this.state.company}
                styleParent={[
                  {
                    borderColor: this.state.colorBorderUserName,
                  },
                  style.textInput,
                  styles.textInput,
                ]}
                leftStyle={style.leftStyle}
                bgFocus="white"
                bgBlur="#3f3f3f"
              />
              <CheckBox
                data={data_}
                //callBack={() => this.setState({ display: "flex" })}
                callBack={this.gotoReview}
                style={[
                  styles.fullWith,
                  style.root,
                  { display: this.state.display1 },
                ]}
                component={this}
              />
              {/*<View style={[styles.fullWith, style.root]}>
                <CheckBox label="Completed" index={1} callBack={() => true} />
              </View>*/}
              <View
                style={[styles.flexRow, styles.fullWith, style.buttonBottom]}
              >
                <View style={{ width: width1 }}>
                  <ButtonImage
                    onPress={() => this.checkStudy()}
                    icon={iconCheck}
                    style={style.button1}
                  />
                </View>
                <View style={[{ width: width2, display: this.state.display }]}>
                  <ButtonImage
                    onPress={() => this.clear()}
                    icon={iconDelete}
                    style={style.button2}
                  />
                </View>
              </View>

              <BackNext
                nextScreen="SchoolScreen"
                //backScreen="TrainingUniversity_1"
                //dataBack={data}
                position="absolute"
                callBack={() => true}
                navigation={this.props.navigation}
                nextEnable={false}
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
  buttonBottom: {
    marginTop: 20,
    justifyContent: "space-between",
  },

  view1: {
    width: "100%",
  },

  view2: {
    width: "0%",
  },

  root: {
    marginTop: 20,
    marginLeft: -20,
  },

  button1: {
    backgroundColor: "#898166",
    alignItems: "center",
    borderRadius: 5,
    height: 50,
    justifyContent: "center",
  },

  button2: {
    backgroundColor: "#414141",
    alignItems: "center",
    borderRadius: 5,
    height: 50,
    justifyContent: "center",
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

  close: {
    position: "absolute",
    right: 20,
    top: 20,
  },

  textInput: {
    marginBottom: 0,
    marginTop: 5,
  },

  headlineFirst: {
    marginTop: 50,
  },

  checkbox: {
    marginTop: 10,
    marginLeft: -10,
  },

  textModal: {
    paddingTop: 5,
    paddingBottom: 5,
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

  line: {
    height: 1,
    width: "100%",
    backgroundColor: "#707070",
  },

  language: {
    marginTop: 5,
    marginBottom: 5,
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
});

export default AddEducation;

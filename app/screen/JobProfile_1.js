import React, { Component } from "react";
import { StyleSheet, View, Dimensions, PixelRatio } from "react-native";

import { Provider, Portal, Modal } from "react-native-paper";

import { ScrollView } from "react-native-gesture-handler";
import { hideNavigationBar } from "react-native-navigation-bar-color";

import IconFontAwesome from "react-native-vector-icons/FontAwesome";

import Background from "../components/Background";
import TextHeader from "../components/TextHeader";
import HeadLine from "../components/HeadLine";
import IconBottom from "../components/IconBottom";
import BackNext from "../components/BackNext";
import Slider from "../components/Slider";
import Header from "../components/Header";

import styles from "../style/style";
import functions from "../function/function";

import "../config/config";

const windowWidth = Dimensions.get("window").width;
const LEFT_SEARCH = windowWidth / 2;

const pixelRatio = global.pixelRatio;

const MARGIN_TOP_TEXTLANGUAGE_PLUSBUTTON =
  50 * pixelRatio;

const minimumValue1 = 1;
const minimumValue2 = 10;

let valueGrossSalary, valueWorkPerWeek;

class JobProfile_1 extends Component {
  constructor(props) {
    super(props);

    this.callBack1.bind(this);
    this.callBack2.bind(this);

    this.data = null;
    this.ref_ = null;

    this.state = {
      languages: [],
      position: null,
      visible: false,
      visible1: false,
      openModal: false,
      closeModal: false,
      isBack: false,
      search: "",
      data: null,
    };
  }
  callBack1 = (value) => {
    this.data = JSON.parse(this.data);

    var index = functions.getIndex(this.data);
    var data = functions.getData(this.data);

    data[index].gross_year = Math.round(value);

    this.data.data = data;

    this.data = JSON.stringify(this.data);

    this.ref_(this.data);
  };

  callBack2 = (value) => {
    this.data = JSON.parse(this.data);

    var index = functions.getIndex(this.data);
    var data = functions.getData(this.data);

    data[index].week_hour = Math.round(value);

    this.data.data = data;

    this.data = JSON.stringify(this.data);

    this.ref_(this.data);
  };

  componentDidMount = () => {
    this.data = this.props.navigation.state.params.data;

    this.initData();
  };

  static navigationOptions = ({ navigation }) => ({
    title: "",
  });

  gotoScreenWithParam = (job) => {
    var data =
      this.props.navigation.state.params != undefined
        ? JSON.parse(this.props.navigation.state.params.data)
        : [];

    index = 0;

    data[0] = {};
    data[0].job = job;

    functions.gotoScreenWithParam(
      JSON.stringify(data),
      this.props.navigation,
      "PersonalData_Language"
    );
  };

  initData = () => {
    this.data = JSON.parse(this.data);

    var index = functions.getIndex(this.data);
    var data = functions.getData(this.data);

    data[index].week_hour = valueWorkPerWeek;
    data[index].gross_year = valueGrossSalary;

    this.data.data = data;

    this.data = JSON.stringify(this.data);

    this.ref_(this.data);
  };

  render() {
    var commonData = global.commonData.languages;

    try {
      var text1 = commonData.that_s;
      var text2 = commonData.how_i;
      var text3 = commonData.want_it;
      var text4 = commonData.mY_DESIRED_SALARY_gross_year;
      var text5 = commonData.MY_DESIRED_WEEKLY_HOURS;
    } catch (error) {
      console.log(error);
    }

    valueGrossSalary = 1;
    valueWorkPerWeek = 1;
    var edit = 0;
    var editUser = null;

    try {
      var data = this.props.navigation.state.params.data;
      data = JSON.parse(data);

      edit = data.edit;

      editUser = functions.getJobProfileEdit(
        global.jobprofile.state.userJobprofile,
        edit
      );

      valueGrossSalary = editUser.gross_year;
      //this.callBack1(valueGrossSalary);

      valueWorkPerWeek = editUser.week_hour;
      //this.callBack2(valueWorkPerWeek);

      //minimumValue1 = editUser != null ? editUser.gross_year : minimumValue1;
      //minimumValue2 = editUser != null ? editUser.week_hour : minimumValue2;
    } catch (error) {
      console.log(error);
    }

    return (
      <Provider>
        <View style={styles.flexFull}>
          <Header component={this} Notification={false} />
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <Background>
              <TextHeader text1={text1} text2={text2} text3={text3} />
              <HeadLine style={style.headLine1} text={text4} />
              <Slider
                unit="€"
                minimumValue={minimumValue1}
                maximumValue={200}
                value={valueGrossSalary}
                step={500}
                callBack={this.callBack1}
              />
              <HeadLine text={text5} />
              <Slider
                unit=""
                minimumValue={minimumValue2}
                maximumValue={40}
                value={valueWorkPerWeek}
                callBack={this.callBack2}
              />
              <BackNext
                nextScreen="JobProfile_2"
                position="absolute"
                data={[]}
                callBack={() => true}
                ref_={this}
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
  headLine1: {
    marginTop: 60,
  },

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

export default JobProfile_1;

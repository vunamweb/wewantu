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

import {
  SvgUri,
  SvgXml,
  Svg,
  Circle,
  Path,
  G,
  SvgCss,
  SvgWithCss,
} from "react-native-svg";

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
const imgDeleteLarge = require("../images/delete_job_profile_large.png");

const pixelRatio = global.pixelRatio;

const number = 100;

const MARGIN_TOP_TEXTLANGUAGE_PLUSBUTTON =
  50 * pixelRatio;


var indexDeleteJob, jobProfile_Id;

const svgCode1 = `
<?xml version="1.0" encoding="UTF-8"?>
<svg id="Ebene_1" data-name="Ebene 1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 24.7 23.3">
  <defs>
    <style>
      .cls-1 {
        clip-path: url(#clippath);
      }

      .cls-2 {
        fill: none;
      }

      .cls-2, .cls-3, .cls-4 {
        stroke-width: 0px;
      }

      .cls-3 {
        fill: #898166;
      }

      .cls-4 {
        fill: #fff;
      }
    </style>
    <clipPath id="clippath">
      <rect class="cls-2" y="0" width="24.7" height="23.3"/>
    </clipPath>
  </defs>
  <g class="cls-1">
    <path id="Pfad_146" data-name="Pfad 146" class="cls-3" d="M0,11.7C0,5.2,5.5,0,12.4,0s12.4,5.2,12.4,11.7-5.5,11.7-12.4,11.7S0,18.1,0,11.7"/>
    <path id="Pfad_142" data-name="Pfad 142" class="cls-4" d="M16.5,10.1l-2.6-2.6-6.3,6.3c.2,0,.4.2.7.2,0,0,0,0,.1.1,0,.4.2.8.2,1.1,0,0,0,0,0,0,.4,0,.8.2,1.1.2,0,0,.1,0,.1.1,0,.2.1.4.2.6,0,0,0,0,0,0l6.3-6.3M15,6.4l2.6,2.6c.3-.3.5-.5.8-.8.4-.4.4-1,0-1.4-.4-.4-.8-.8-1.2-1.2-.4-.4-1-.4-1.4,0-.3.3-.5.5-.8.8M6.7,15.9s0,0,0,0c-.2.5-.4,1-.5,1.5,0,.1,0,.3.1.4,0,0,.2,0,.3,0,.5-.2,1-.4,1.5-.5,0,0,0,0,0,0l-1.4-1.4"/>
  </g>
</svg>
`;

const svgCode2 = `
<?xml version="1.0" encoding="UTF-8"?>
<svg id="Ebene_1" data-name="Ebene 1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 24.7 23.3">
  <defs>
    <style>
      .cls-1 {
        clip-path: url(#clippath);
      }

      .cls-2 {
        fill: none;
      }

      .cls-2, .cls-3, .cls-4 {
        stroke-width: 0px;
      }

      .cls-3 {
        fill: #898166;
      }

      .cls-4 {
        fill: #fff;
      }
    </style>
    <clipPath id="clippath">
      <rect class="cls-2" width="24.7" height="23.3"/>
    </clipPath>
  </defs>
  <g class="cls-1">
    <path id="Pfad_146" data-name="Pfad 146" class="cls-3" d="M0,11.7C0,5.2,5.5,0,12.4,0s12.4,5.2,12.4,11.7-5.5,11.7-12.4,11.7S0,18.1,0,11.7"/>
    <g>
      <path id="Pfad_147" data-name="Pfad 147" class="cls-4" d="M16.4,18.2h-7.7c-.6-.2-.8-.4-.8-1.1v-8.1h-.8s0,0,0,0v-1.4c0,0,0-.1,0-.2.1-.4.5-.7,1-.7h1.8v-1.1c0-.3.2-.5.5-.5h4.4c.2,0,.4.1.5.4,0,0,0,0,0,0v1h0c0,.1.2.1.2.1h1.6c.5,0,.9.3,1,.8,0,.5,0,1,0,1.5,0,0,0,0,0,0h-.8v8.3c0,.3-.2.6-.5.7,0,0-.2,0-.3,0M8.7,9h0v8.2c0,.1,0,.2.2.2,2.4,0,4.8,0,7.2,0,.1,0,.2,0,.2-.2,0-2.7,0-5.4,0-8.1,0,0,0,0,0-.1h-7.6ZM17.1,8.2v-.5q0-.2-.2-.2h-8.8s0,0-.1,0c0,0,0,0,0,0,0,.2,0,.4,0,.7h9.2ZM14.3,5.9h-3.6v.7h3.6v-.7Z"/>
      <rect id="Rechteck_157" data-name="Rechteck 157" class="cls-4" x="10.1" y="9.8" width=".8" height="6.5"/>
      <path id="Pfad_148" data-name="Pfad 148" class="cls-4" d="M12.9,16.2h-.8v-6.3c0-.1,0-.2.2-.2.2,0,.4,0,.7,0v6.5Z"/>
      <rect id="Rechteck_158" data-name="Rechteck 158" class="cls-4" x="14" y="9.8" width=".8" height="6.5"/>
    </g>
  </g>
</svg>
`;

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
      visible2: false,
      openModal: false,
      closeModal: false,
      isBack: false,
      ActivityIndicator: false,
      search: "",
      edit: -1,
      positionEdit: -1,
      jobs: [],
      position: 1,
      data1: [],
      data2: [],
      data3: [],
      data4: [],
    };
  }

  componentDidMount = async () => {
    global.jobprofile = this;

    var datauser = await functions.getDataUser();

    var jobs = [];

    try {
      datauser = JSON.parse(datauser);
      jobs = datauser.jobs;
    } catch (error) {
      console.log(error);
    }

    if ((Array.isArray(jobs) && jobs.length == 0) || jobs == undefined)
      functions.getJobs(this);
    else {
      global.data = jobs;

      this.setState({
        jobs: jobs
      });
    }

    functions.getListWAH(this);
    functions.getListWAN(this);
    functions.getListWWK(this);
    functions.getListAmbitiion(this);

    functions.getListUserJobprofiles(this);
  };

  edit = (edit, position) => {
    global.typeEdit = 1;

    this.setState({ visible: true, edit: edit, positionEdit: position });
  };

  getNameJobFromId = (id) => {
    let jobList = global.data;
    let name = null;

    jobList.map((item, index) => {
      if (item.id == id)
        name = item.name;
    })

    return name;
  }

  _renderItem = ({ item, index }) => {
    try {
      var job = item.job;
      job = this.getNameJobFromId(job);

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
          <View style={style.parentSwitch}>
            <Switch
              activeTrackColor={"#898166"}
              inactiveTrackColor={"#898166"}
              activeThumbColor={"#fff"}
              inactiveThumbColor={"#3e3e3e"}
              size={30}
              component={this}
              index={0}
              visible={false}
              container={style.container}
              additionalThumb={style.additionalThumb}
            />
          </View>
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
              onPress={() =>
                this.deleteJobProfile(job, index, item.job_search_profile_id)
              }
            >
              <SvgWithCss xml={svgCode2} width="24.7" height="23.3" />
            </Href>
            <Href onPress={() => this.edit(item.job_search_profile_id, index)}>
              <SvgWithCss xml={svgCode1} width="24.7" height="23.3" />
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

  gotoScreenWithParam = (job, jobID) => {
    var data = {};
    data.edit = this.state.edit;
    data.position = this.state.positionEdit;

    var index = data.index != undefined ? data.index : 0;

    data.index = index;

    if (data.data == undefined) data.data = [];

    data.data[index] = {};
    data.data[index].job = jobID;

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

  deleteJobProfile = (job, index, jobProfileId) => {
    //deleteJob = job;
    indexDeleteJob = index;
    jobProfile_Id = jobProfileId;

    this.setState({ visible2: true });
  };

  deleteJob = () => {
    try {
      var data = this.state.userJobprofile;

      data.splice(indexDeleteJob, 1);
      //global.userJobprofile.splice(indexDeleteJob, 1);
    } catch (error) {
      console.log(error);
    }

    this.setState({ visible2: false, userJobprofile: data });

    functions.deleteUserJobProfile(this, jobProfile_Id);
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
      var text4 = commonData.profession;

      global.data1 = this.state.data1;
      global.data2 = this.state.data2;
      global.data3 = this.state.data3;
      global.data4 = this.state.data4;
    } catch (error) {
      console.log(error);
    }

    var dataJob = this.state.userJobprofile;

    var editUser = null;
    var actualJob = null;

    try {
      editUser = functions.getJobProfileEdit(
        global.jobprofile.state.userJobprofile,
        this.state.edit
      );

      actualJob = (editUser != null && editUser != undefined) ? this.getNameJobFromId(editUser.job) : actualJob;
    } catch (error) {

    }

    return (
      <Provider>
        <Portal>
          <Modal visible={visible}>
            <View style={style.modalHeader}>
              <Text style={[style.modalHeadLine, styles.fontBoldNormal]}>
                {text4}{'\n'}{actualJob}
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
                        <Href onPress={() => this.gotoScreenWithParam(index, id)}>
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
          <Modal visible={this.state.visible2}>
            <View style={style.modalDeleteRoot}>
              <Text style={[styles.fontBoldLargeMedium, style.textHeaderModal]}>
                Willst Du Dein Jobprofil {"\n"} wirklich löschen?
              </Text>
              <Text style={style.textHeaderModal}>
                Du kannst es auch {"\n"} vorübergehend pausieren.
              </Text>
              <Text style={[styles.fontBoldSmall, style.textJob]} />
              <Button
                color="white"
                text="ABBRUCH"
                style={[styles.button, style.buttonCancel]}
                onPress={() => this.setState({ visible2: false })}
              />
              <Href style={style.deleteModal} onPress={() => this.deleteJob()}>
                <Image style={style.deleteModal} source={imgDeleteLarge} />
              </Href>
            </View>
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
    width: 50,
    marginTop: MARGIN_TOP_TEXTLANGUAGE_PLUSBUTTON,
    marginBottom: 100,
    marginLeft: -20
  },

  button: {
    backgroundColor: "#414141",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    height: 50,
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

  deleteModal: {
    position: "absolute",
    bottom: 10,
    left: "50%",
  },

  modalHeadLine: {
    marginTop: 30,
    marginBottom: 30,
  },

  buttonCancel: {
    backgroundColor: "#898166",
    marginTop: 0,
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
    marginLeft: "10%",
    marginRight: "10%",
    backgroundColor: "#E4E4E4",
    paddingTop: 50,
    paddingLeft: 20,
    paddingRight: 20,
    height: "80%",
  },

  textHeaderModal: {
    color: "#000",
    marginBottom: 20,
  },

  textJob: {
    marginTop: 20,
    marginBottom: 30,
    color: "#000",
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
    paddingRight: 10,
    paddingBottom: 5,
    paddingTop: 0,
  },

  imgDelete: {
    marginRight: 20,
  },

  text1: {
    color: "#898166",
  },

  text2: {
    color: "#000",
    width: "70%"
  },

  additionalThumb: {
    height: 0,
    width: 25,
    borderRadius: 5,
    paddingTop: 15,
  },

  container: {
    height: 25,
    width: 60,
    borderWidth: 0,
  },

  parentSwitch: {
    position: 'absolute', right: 10, top: 10, zIndex: 9999999
  }
});

export default JobProfile;

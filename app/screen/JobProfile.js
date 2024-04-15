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
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="20.09" height="20.09" viewBox="0 0 20.09 20.09">
  <defs>
	<clipPath id="clip-path">
	  <rect id="Rechteck_156" data-name="Rechteck 156" width="20.09" height="20.09" fill="none"/>
	</clipPath>
  </defs>
  <g id="Gruppe_561" data-name="Gruppe 561" transform="translate(0 0)">
	<g id="Gruppe_288" data-name="Gruppe 288" transform="translate(0 0)" clip-path="url(#clip-path)">
	  <path id="Pfad_141" data-name="Pfad 141" d="M0,10.046A10.045,10.045,0,1,1,10.046,20.091,10.046,10.046,0,0,1,0,10.046" transform="translate(0 0)" fill="#898166"/>
	  <path id="Pfad_142" data-name="Pfad 142" d="M16.335,9.85l-2.82-2.82L6.706,13.838c.239.08.488.165.738.244a.14.14,0,0,1,.11.123c.08.416.166.829.245,1.245a.114.114,0,0,0,.108.106c.415.079.829.166,1.244.245a.138.138,0,0,1,.122.111c.071.226.148.45.223.675a.763.763,0,0,0,.031.071L16.335,9.85m-1.654-4L17.5,8.679c.278-.273.578-.541.846-.837a1.111,1.111,0,0,0-.025-1.521q-.633-.658-1.291-1.29a1.107,1.107,0,0,0-1.506-.038c-.3.272-.572.577-.849.859M5.627,16.206c-.014.036-.026.065-.036.095-.195.552-.388,1.1-.585,1.656a.292.292,0,0,0,.394.394q.827-.294,1.655-.586l.092-.037L5.627,16.206" transform="translate(-1.586 -1.503)" fill="#fff"/>
	  <path id="Pfad_143" data-name="Pfad 143" d="M17.144,10.932l-6.808,6.808c-.01-.022-.022-.046-.031-.071-.075-.225-.152-.449-.222-.675a.14.14,0,0,0-.122-.112c-.416-.079-.829-.166-1.245-.245a.114.114,0,0,1-.108-.106c-.079-.416-.166-.829-.245-1.245a.14.14,0,0,0-.11-.123c-.25-.079-.5-.163-.738-.243l6.81-6.809,2.82,2.82" transform="translate(-2.395 -2.586)" fill="#fff"/>
	  <path id="Pfad_144" data-name="Pfad 144" d="M19.222,5.851c.277-.282.548-.587.849-.859a1.107,1.107,0,0,1,1.506.038q.658.632,1.291,1.29a1.112,1.112,0,0,1,.025,1.521c-.268.3-.568.563-.846.837L19.222,5.851" transform="translate(-6.127 -1.503)" fill="#fff"/>
	  <path id="Pfad_145" data-name="Pfad 145" d="M5.627,21.583l1.521,1.523-.092.037q-.828.292-1.655.586a.292.292,0,0,1-.394-.394c.2-.551.39-1.1.585-1.656.01-.03.022-.059.036-.095" transform="translate(-1.586 -6.88)" fill="#fff"/>
	</g>
  </g>
</svg>
`;

const svgCode2 = `
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="19.607" height="19.607" viewBox="0 0 19.607 19.607">
  <defs>
	<clipPath id="clip-path">
	  <rect id="Rechteck_159" data-name="Rechteck 159" width="19.607" height="19.607" fill="none"/>
	</clipPath>
  </defs>
  <g id="Gruppe_560" data-name="Gruppe 560" transform="translate(-135.165 -3.154)">
	<g id="Gruppe_290" data-name="Gruppe 290" transform="translate(135.165 3.154)" clip-path="url(#clip-path)">
	  <path id="Pfad_146" data-name="Pfad 146" d="M0,9.8a9.8,9.8,0,1,1,9.8,9.8A9.8,9.8,0,0,1,0,9.8" transform="translate(0 0)" fill="#898166"/>
	  <path id="Pfad_147" data-name="Pfad 147" d="M14.249,16.384h-7.2a.893.893,0,0,1-.731-1.044V7.322H5.564c0-.039-.007-.063-.007-.088,0-.449,0-.9,0-1.347a.927.927,0,0,1,.021-.2.866.866,0,0,1,.892-.682c.516,0,1.032,0,1.548,0H8.16c0-.358,0-.7,0-1.037s.147-.479.473-.478l4.078,0a.4.4,0,0,1,.431.429c0,.315,0,.63,0,.944v.139h.17c.508,0,1.015,0,1.523,0a.85.85,0,0,1,.9.777c.019.5.006,1.007,0,1.51,0,.007-.008.013-.022.034h-.728V7.5q0,3.934,0,7.869c0,.067,0,.135,0,.2a.83.83,0,0,1-.485.725,1.985,1.985,0,0,1-.248.087M7.118,7.329v.136q0,3.978,0,7.956c0,.124.03.165.161.165q3.372-.006,6.745,0c.13,0,.161-.04.161-.165q0-3.978,0-7.956c0-.044,0-.088-.007-.136Zm7.817-.806V6c0-.191,0-.191-.2-.191H6.559a.38.38,0,0,0-.112,0c-.03.009-.076.039-.076.061-.006.216,0,.432,0,.652ZM12.33,4.3H8.967V5H12.33Z" transform="translate(-0.749 -0.133)" fill="#fff"/>
	  <rect id="Rechteck_157" data-name="Rechteck 157" width="0.764" height="6.395" transform="translate(7.714 7.929)" fill="#fff"/>
	  <path id="Pfad_148" data-name="Pfad 148" d="M14.945,18.314h-.772v-.138q0-3.059,0-6.116c0-.126.034-.16.156-.154.2.01.406,0,.619,0Z" transform="translate(-4.664 -3.99)" fill="#fff"/>
	  <rect id="Rechteck_158" data-name="Rechteck 158" width="0.764" height="6.398" transform="translate(11.323 7.926)" fill="#fff"/>
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

  componentDidMount = () => {
    global.jobprofile = this;

    functions.getJobs(this);

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
              <SvgWithCss xml={svgCode2} width="23" height="23" />
            </Href>
            <Href onPress={() => this.edit(item.job_search_profile_id, index)}>
            <SvgWithCss xml={svgCode1} width="23" height="23" />
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
    var data = {};
    data.edit = this.state.edit;
    data.position = this.state.positionEdit;

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
    marginRight: 10,
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

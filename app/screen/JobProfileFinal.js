import React, { Component, createRef } from "react";
import {
  StyleSheet,
  View,
  AsyncStorage,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

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

import { ScrollView } from "react-native-gesture-handler";
import { hideNavigationBar } from "react-native-navigation-bar-color";
import { Provider, Portal, Modal } from "react-native-paper";

import Background from "../components/Background";
import Button from "../components/Button";
import TextHeader from "../components/TextHeader";
import HeadLine from "../components/HeadLine";
import Text from "../components/Paragraph";
import Collapse from "../components/Collapse";
import Image from "../components/Image";
import Href from "../components/Href";
import IconBottom from "../components/IconBottom";
import ButtonImage from "../components/ButtonImage";
import Header from "../components/Header";
import Switch from "../components/Switch";

import styles from "../../app/style/style";
import functions from "../../app/function/function";

const imgInfo = require("../images/info.png");
const imgClose = require("../images/close.png");
const imgDeleteLarge = require("../images/delete_job_profile_large.png");
const iconPlus = require("../images/plus.png");

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

var deleteJob, indexDeleteJob, jobProfile_Id;

class JobProfileFinal extends Component {
  constructor(props) {
    super(props);
    this._renderItem = this._renderItem.bind(this);
    this.collapse = createRef();

    this.switch = [];

    this.state = {
      visibel1: false,
      visible2: false,
      ActivityIndicator: false,
      userJobprofile: [],
    };
  }

  state = {};

  onClickItem = (index, link) => {
    this.collapse.current.setState({ activeIndex: index });
    functions.gotoScreen(this.props.navigation, link);
  };

  delete = (job, index, jobProfileId) => {
    deleteJob = job;
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

  edit = (position, edit) => {
    global.typeEdit = 2;
    
    var data;

    try {
      data = this.props.navigation.state.params.data;
      data = JSON.parse(data);

      //data.index = index;
      data.openModal = true;
    } catch (error) {
      data = {};
      //data.index = index;
      data.openModal = true;

      console.log(error);
    }

    global.jobprofile.state.edit = edit;
    global.jobprofile.state.positionEdit = position;

    functions.gotoScreenWithParam(
      JSON.stringify(data),
      this.props.navigation,
      "JobProfile"
    );
  };

  add = () => {
    var data = this.props.navigation.state.params.data;
    data = JSON.parse(data);

    data.index = data.data.length;

    functions.gotoScreenWithParam(
      JSON.stringify(data),
      this.props.navigation,
      "JobProfile"
    );
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
                this.delete(job, index, item.job_search_profile_id)
              }
            >
              <SvgWithCss xml={svgCode2} width="23" height="23" />
            </Href>
            <Href onPress={() => this.edit(index, item.job_search_profile_id)}>
            <SvgWithCss xml={svgCode1} width="23" height="23" />
            </Href>
          </View>
          {/*borderBottom*/}
        </View>
      </View>
    );
  };

  componentDidMount = async () => {
    hideNavigationBar();

    var data;

    try {
      data = this.props.navigation.state.params.data;
      data = JSON.parse(data);

      let userProfileJob =
        data.position == -1
          ? this.updateUserProfile(data)
          : global.userJobprofile;

      functions.insertAndUpdateUserProfile(
        this,
        this.validate(data.data[data.index]),
        userProfileJob,
        data.edit,
        data.position
      );
    } catch (error) {
      console.log(error);
    }
  };

  validate = (data) => {
    if(data.work_home == 0)
    data.work_home = global.data1[0].id;

    if(data.work_night == 0)
    data.work_night = global.data3[0].id;

    if(data.work_weekend == 0)
    data.work_weekend = global.data2[0].id;

    if(data.intres == 0)
    data.intres = global.data4[0].id;

    return data;
  }

  static navigationOptions = ({ navigation }) => ({
    title: "",
  });

  updateUserProfile = (data) => {
    let userJobprofile = global.userJobprofile;

    try {
      userJobprofile.map((item, index) => {
        data.data.push(item);
      });
    } catch (error) {
      console.log(error);

      return data;
    }

    return data.data;
  };

  render() {
    return (
      <Provider>
        <Portal>
          <Modal visible={this.state.visibel1}>
            <ScrollView>
              <View style={style.modal}>
                <Text style={[style.modalHeadLine, styles.fontBoldNormal]}>
                  pscing elitr, sed diam nonumy eirmod tempor invidunt ut labore
                  et dolore magna aliquyam erat, sed diam voluptua. At vero eos
                  et accusam et justo duo dolores et ea rebum. Stet clita kasd
                  gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
                  amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                  sed diam nonumy eirmod tempor invidunt ut labore et dolore
                  magna aliquyam erat, sed diam voluptua. At vero eos et accusam
                  et justo duo dolores et ea rebum. Stet clita kasd gubergren,
                  no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem
                  ipsum dolor sit amet, consetetur sadi pscing elitr, sed diam
                  nonumy eirmod tempor invidunt ut labore et dolore magna
                  aliquyam erat, sed diam voluptua. At vero eos et accusam et
                  justo duo dolores et ea rebum. Stet clita kasd gubergren, no
                  sea takimata sanctus est orem incum delor cit omet crom insum
                  pscing elitr, sed diam nonumy eirmod tempor invidunt ut labore
                  et dolore magna aliquyam erat, sed diam voluptua. At vero eos
                  et accusam et justo duo dolores et ea rebum. Stet clita kasd
                  gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
                  amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                  sed diam nonumy eirmod tempor invidunt ut labore et dolore
                  magna aliquyam erat, sed diam voluptua. At vero eos et accusam
                  et justo duo dolores et ea rebum. Stet clita kasd gubergren,
                  no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem
                  ipsum dolor sit amet, consetetur sadi pscing elitr, sed diam
                  nonumy eirmod tempor invidunt ut labore et dolore magna
                  aliquyam erat, sed diam voluptua. At vero eos et accusam et
                  justo duo dolores et ea rebum. Stet clita kasd gubergren, no
                  sea takimata sanctus est orem incum delor cit omet crom insum
                </Text>
              </View>
            </ScrollView>
            <View style={style.close}>
              <Href
                onPress={() =>
                  this.setState({
                    visibel1: false,
                  })
                }
              >
                <Image source={imgClose} />
              </Href>
            </View>
          </Modal>
          <Modal visible={this.state.visible2}>
            <View style={style.modalDeleteRoot}>
              <Text style={[styles.fontBoldLargeMedium, style.textHeaderModal]}>
                Willst Du Dein Jobprofil {"\n"} wirklich löschen?
              </Text>
              <Text style={style.textHeaderModal}>
                Du kannst es auch {"\n"} vorübergehend pausieren.
              </Text>
              <Text style={[styles.fontBoldSmall, style.textJob]}>
                {deleteJob}/-In
              </Text>
              <Button
                color="white"
                text="ABBRUCH"
                style={[styles.button, style.button]}
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
          <ScrollView contentContainerStyle={styles.scroll}>
            <Background>
              <TextHeader text1="job" text2="profile" />
              <ActivityIndicator
                size="small"
                animating={this.state.ActivityIndicator}
              />
              <View
                style={[
                  styles.fullWith,
                  styles.flexRowStart,
                  style.view,
                  style.view1_,
                ]}
              >
                <HeadLine style={style.headLine} text="Was ich machen will" />
                <Href
                  style={{ position: "absolute", right: -20 }}
                  onPress={() =>
                    this.setState({
                      visibel1: true,
                    })
                  }
                >
                  <Image style={style.info} source={imgInfo} />
                </Href>
              </View>
              <Collapse
                title=""
                style={style.collapse}
                data={this.state.userJobprofile}
                renderItem={this._renderItem}
                col={1}
                ref={this.collapse}
                navigation={this.props.navigation}
              />
              <View style={styles.fullWith}>
                <View style={style.viewPlus}>
                  <ButtonImage
                    onPress={() => this.add()}
                    icon={iconPlus}
                    style={style.buttonPlus}
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
  root: {
    marginBottom: 5,
    height: 35,
  },

  borderBottom: {
    marginTop: 7,
  },

  headLine: {
    marginTop: 50,
    width: 200,
  },

  info: {
    marginLeft: 20,
  },

  view: {
    alignItems: "flex-end",
  },

  view1_: {
    marginLeft: -20,
  },

  viewPlus: {
    width: 50,
    marginTop: 30,
    marginBottom: 100,
    marginLeft: -20
  },

  view1: {
    justifyContent: "flex-end",
    alignItems: "center",
    flexDirection: "row",
    paddingLeft: 5,
    paddingRight: 10,
    paddingTop: 0,
    paddingBottom: 5,
  },

  view2: {
    paddingTop: 10,
    paddingLeft: 20,
  },

  view3: {
    backgroundColor: "#E4E4E4",
    marginBottom: 15,
  },

  modal: {
    width: "90%",
    marginLeft: "5%",
    marginRight: "5%",
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 50,
    height: "100%",
    backgroundColor: "rgba(228,228,228,255)",
    alignItems: "center",
  },

  close: {
    position: "absolute",
    right: 25,
    top: 10,
  },

  modalHeadLine: {
    color: "#000",
  },

  text1: {
    color: "#898166",
  },

  text2: {
    color: "#000",
    width: '70%'
  },

  button: {
    backgroundColor: "#898166",
    marginTop: 0,
  },

  buttonPlus: {
    backgroundColor: "#414141",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    height: 50,
  },

  deleteModal: {
    position: "absolute",
    bottom: 10,
    left: "50%",
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

  imgDelete: {
    marginRight: 20,
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

export default JobProfileFinal;

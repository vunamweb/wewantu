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
    width: 70,
    marginTop: 30,
    marginBottom: 100,
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
    borderRadius: 5,
    height: 60,
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
    marginRight: 10,
  },

  widthIconEditDelete: {
  }
});

export default JobProfileFinal;

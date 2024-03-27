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
const imgDelete = require("../images/delete_job_profile.png");
const imgDeleteLarge = require("../images/delete_job_profile_large.png");
const imgEdit = require("../images/edit_job_profile.png");
const iconPlus = require("../images/plus.png");

var deleteJob, indexDeleteJob;

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
    };
  }

  state = {};

  onClickItem = (index, link) => {
    this.collapse.current.setState({ activeIndex: index });
    functions.gotoScreen(this.props.navigation, link);
  };

  delete = (job, index) => {
    deleteJob = job;
    indexDeleteJob = index;

    this.setState({ visible2: true });
  };

  deleteJob = () => {
    var data = this.props.navigation.state.params.data;
    data = JSON.parse(data);

    data.data.splice(indexDeleteJob, 1);

    this.props.navigation.state.params.data = JSON.stringify(data);

    this.setState({ visible2: false });
  };

  edit = (index) => {
    var data = this.props.navigation.state.params.data;
    data = JSON.parse(data);

    data.index = index;
    data.openModal = true;

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
      workHome = global.data1[workHome].label;

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
              onPress={() => this.delete(job, index)}
            >
              <Image source={imgDelete} />
            </Href>
            <Href onPress={() => this.edit(index)}>
              <Image source={imgEdit} />
            </Href>
          </View>
          {/*borderBottom*/}
        </View>
      </View>
    );
  };

  componentDidMount = async () => {
    hideNavigationBar();

    var data = this.props.navigation.state.params.data;

    try {
      data = JSON.parse(data);
    } catch (error) {
      data = [];
      console.log(error);
    }

    functions.insertUserProfile(this, data.data[data.index]);
  };

  static navigationOptions = ({ navigation }) => ({
    title: "",
  });

  render() {
    var data = this.props.navigation.state.params.data;
    try {
      data = JSON.parse(data);
    } catch (error) {
      data = [];
      console.log(error);
    }

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
                data={data.data}
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
    paddingRight: 5,
    paddingTop: 0,
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
    marginRight: 5,
  },
});

export default JobProfileFinal;

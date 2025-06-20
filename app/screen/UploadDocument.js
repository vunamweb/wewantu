import React, { Component } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  PixelRatio,
  ActivityIndicator,
  Text,
  Image,
} from "react-native";

import { Provider, Portal, Modal } from "react-native-paper";

import { ScrollView } from "react-native-gesture-handler";
import { hideNavigationBar } from "react-native-navigation-bar-color";

import Icon from "react-native-vector-icons/FontAwesome";

import Video from "react-native-video";

import * as ImagePicker from "react-native-image-picker";

import network from "../network/network";

import Background from "../components/Background";
import TextHeader from "../components/TextHeader";
import IconBottom from "../components/IconBottom";
import BackNext from "../components/BackNext";
import IconUpload from "../components/IconUpload";
import Header from "../components/Header";
import Href from "../components/Href";

import styles from "../../app/style/style";
import functions from "../function/function";

import "../config/config";

const pixelRatio = global.pixelRatio;
const HEIGHT_TEXTINPUT = 200 * pixelRatio;

const rectangle = require("../images/rectangle.png");
const camera = require("../images/camera.png");
const arrowUp = require("../images/arrow_up.png");
const imgClose = require("../images/close.png");

class UploadDocument extends Component {
  constructor(props) {
    super(props);

    this.state = {
      description: null,
      media: {},
      ActivityIndicator: false,
      statusUpload: {
        status: null,
      },
      visible: false,
      visible1: false,
      callback: 0,
      typeDelete: 0,
      diplayTypeCamera: false,
    };
  }

  componentDidMount = async () => {
    hideNavigationBar();

    global.uploadDocument = this;

    var listMedia = [];

    var datauser = await functions.getDataUser();

    try {
      datauser = JSON.parse(datauser);

      listMedia = datauser.listMedia;
    } catch (error) {
      console.log(error);
    }

    // check list of media has saved on local, if not call api to get data
    if ((Array.isArray(listMedia) && listMedia.length == 0) || listMedia == undefined)
      functions.getListMedia(this);
    else {
      this.setState({
        media: listMedia
      });
    }
    // END
  };

  openImagePicker = (type) => {
    ImagePicker.launchImageLibrary({}, (response) => {
      if (response) {
        //setMediaFiles([...mediaFiles, { type: "image", uri: response.assets[0].uri }]);
        let fileImg = this.state.media.file_img;
        let fileDoc = this.state.media.file_doc;
        let fileVideo = this.state.media.file_video;

        try {
          functions.upload(
            this,
            response.assets[0].uri,
            type,
            fileImg,
            fileDoc,
            fileVideo
          );
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  openVideoPicker = () => {
    ImagePicker.launchImageLibrary({ mediaType: "video" }, (response) => {
      if (response) {
        let fileImg = this.state.media.file_img;
        let fileDoc = this.state.media.file_doc;
        let fileVideo = this.state.media.file_video;

        try {
          functions.upload(
            this,
            response.assets[0].uri,
            "video",
            fileImg,
            fileDoc,
            fileVideo
          );
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  delete = () => {
    this.setState({ visible1: false });

    functions.deleteMedia(this, this.state.typeDelete);
  };

  static navigationOptions = ({ navigation }) => ({
    title: "",
  });

  callBack = (check, index) => {
    return;
  };

  gotoRecordvideo = () => {
    functions.gotoScreenWithParam(null, this.props.navigation, "Record");
  };

  render() {
    var commonData = global.commonData.languages;

    try {
      var text1 = commonData.upload_error;
      var text2 = commonData.upload_success;
      var text3 = commonData.are_you_sure_to_delete;
      var text4 = commonData.yes;
      var text5 = commonData.no;
    } catch (error) {
      console.log(error);
    }

    var diplayTypeCamera = this.state.diplayTypeCamera ? "flex" : "none";

    var view = null;

    if (this.state.statusUpload.status == 401)
      view = <Text style={styles.error}>{text1}</Text>;
    else if (this.state.statusUpload.status == 200)
      view = <Text style={[styles.success]}>{text2}</Text>;

    let urlIamage, view1;

    if (this.state.callback == 0) {
      urlIamage = global.urlImage + this.state.media.file_img;

      view1 = (
        <Image
          source={{ uri: urlIamage }}
          style={{ width: "100%", height: "100%" }}
        />
      );
    } else if (this.state.callback == 1) {
      urlIamage = global.urlImage + this.state.media.file_doc;

      view1 = (
        <Image
          source={{ uri: urlIamage }}
          style={{ width: "100%", height: "100%" }}
        />
      );
    } else {
      urlIamage = global.urlImage + this.state.media.file_video;

      view1 = (
        <Video
          source={{ uri: urlIamage }}
          style={{ width: "100%", height: "100%" }}
          resizeMode="cover"
          repeat={true}
          paused={false}
        />
      );
    }

    return (
      <Provider>
        <Portal>
          <Modal visible={this.state.visible}>
            <View style={[style.modal, style.modal2]}>{view1}</View>
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
          </Modal>
          <Modal visible={this.state.visible1}>
            <View style={style.modalDeleteRoot}>
              <Text style={style.textHeaderModal}>{text3}</Text>
              <View style={style.modalDelete}>
                <Href onPress={() => this.delete()} style={style.buttonModal}>
                  <Text style={styles.textCapitalize}>{text4}</Text>
                </Href>
                <Href
                  onPress={() =>
                    this.setState({
                      visible1: false,
                    })
                  }
                  style={style.buttonModal}
                >
                  <Text style={styles.textCapitalize}>{text5}</Text>
                </Href>
              </View>
            </View>
          </Modal>
        </Portal>
        <View style={styles.flexFull}>
          <Header component={this} Notification={false} />
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <Background>
              <TextHeader text1="that's" text2="my" text3="input" />
              <ActivityIndicator
                size="small"
                animating={this.state.ActivityIndicator}
              />
              <View style={{ marginBottom: 20 }}>{view}</View>
              <View style={style.view1}>
                <Href onPress={() => this.openImagePicker("img")}>
                  <IconUpload
                    img1={rectangle}
                    img2={arrowUp}
                    text1="MEIN"
                    text2="LEBENSLAUF"
                  />
                  {this.state.media.file_img ? (
                    <View style={style.viewEdit}>
                      <Href
                        onPress={() =>
                          this.setState({ visible: true, callback: 0 })
                        }
                      >
                        <Icon name="eye" size={20} color="#fff" />
                      </Href>
                      <Href
                        onPress={() =>
                          this.setState({ visible1: true, typeDelete: 0 })
                        }
                      >
                        <Icon name="trash-o" size={20} color="#fff" />
                      </Href>
                    </View>
                  ) : null}
                </Href>
                <Href onPress={() => this.openImagePicker("doc")}>
                  <IconUpload
                    img1={rectangle}
                    img2={arrowUp}
                    text1="MEIN LETZTES"
                    text2="ARBEITSZEUGNIS"
                  />
                  {this.state.media.file_doc ? (
                    <View style={style.viewEdit}>
                      <Href
                        onPress={() =>
                          this.setState({ visible: true, callback: 1 })
                        }
                      >
                        <Icon name="eye" size={20} color="#fff" />
                      </Href>
                      <Href
                        onPress={() =>
                          this.setState({ visible1: true, typeDelete: 1 })
                        }
                      >
                        <Icon name="trash-o" size={20} color="#fff" />
                      </Href>
                    </View>
                  ) : null}
                </Href>
              </View>

              <Href
                style={style.viewVideo}
                onPress={() =>
                  this.setState({
                    diplayTypeCamera: !this.state.diplayTypeCamera,
                  })
                }
              >
                <View>
                  <IconUpload
                    img1={rectangle}
                    img2={camera}
                    text1="MEIN"
                    text2="VIDEO-STATEMENT"
                    style={style.marginTop1}
                  />
                  {this.state.media.file_video ? (
                    <View style={style.viewEdit1}>
                      <Href
                        onPress={() =>
                          this.setState({ visible: true, callback: 2 })
                        }
                      >
                        <Icon name="eye" size={20} color="#fff" />
                      </Href>
                      <Href
                        onPress={() =>
                          this.setState({ visible1: true, typeDelete: 2 })
                        }
                      >
                        <Icon name="trash-o" size={20} color="#fff" />
                      </Href>
                    </View>
                  ) : null}
                  <View
                    style={[style.viewEdit2, { display: diplayTypeCamera }]}
                  >
                    <Href onPress={() => this.openVideoPicker()}>
                      <Icon name="file-video-o" size={20} color="#fff" />
                    </Href>
                    <Href onPress={() => this.gotoRecordvideo()}>
                      <Icon name="video-camera" size={20} color="#fff" />
                    </Href>
                  </View>
                </View>
              </Href>

              <BackNext
                nextScreen="WillingnessChange"
                position="absolute"
                callBack={() => true}
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
  view1: {
    width: "70%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
  },

  marginTop1: {
    marginTop: 20,
  },

  viewEdit: {
    position: "absolute",
    left: 0,
    top: -40,
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },

  viewEdit1: {
    position: "absolute",
    left: 0,
    top: 0,
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    //backgroundColor: 'blue'
  },

  viewEdit2: {
    position: "absolute",
    left: "100%",
    bottom: 30,
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
    backgroundColor: "#898166",
    paddingBottom: 10,
    paddingTop: 10,
    borderRadius: 10,
  },

  viewVideo: {
    marginBottom: 90,
    marginTop: 20,
  },

  close: {
    position: "absolute",
    right: 15,
    top: 15,
  },

  modal: {
    width: "100%",
    //marginLeft: "5%",
    //marginRight: "5%",
    //marginTop: 70,
    //paddingLeft: 30,
    //paddingRight: 30,
    //paddingTop: 50,
    height: "80%",
    backgroundColor: "#323232",
    //alignItems: "center",
    borderColor: "#898166",
    borderWidth: 0,
  },

  modal2: {
    /*width: "80%",
    marginLeft: "10%",
    marginRight: "10%",*/
    //marginLeft: -20,
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
    backgroundColor: "#ccc",
    justifyContent: "center",
    borderRadius: 10,
  },

  textHeaderModal: {
    textAlign: "center",
    marginBottom: 20,
  },

  buttonModal: {
    padding: 10,
    backgroundColor: "#898166",
    borderRadius: 10,
  },
});

export default UploadDocument;

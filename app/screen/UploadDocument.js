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

import Video from 'react-native-video';

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
const HEIGHT_TEXTINPUT = 200 * pixelRatio * PixelRatio.getFontScale();

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
      callback: 0,
      urlImg: null,
      urlDoc: null,
      urlVideo: null
    };
  }

  componentDidMount = () => {
    functions.getListMedia(this);
  };

  openImagePicker = (type) => {  
    ImagePicker.launchImageLibrary({}, (response) => {
      if (response) {
        //setMediaFiles([...mediaFiles, { type: "image", uri: response.assets[0].uri }]);
        let fileImg = this.state.media.file_img;
        let fileDoc = this.state.media.file_doc;
        let fileVideo = this.state.media.file_video;

        functions.upload(
          this,
          response.assets[0].uri,
          type,
          fileImg,
          fileDoc,
          fileVideo
        );
      }
    });
  };

  openVideoPicker = () => {
    ImagePicker.launchImageLibrary({ mediaType: "video" }, (response) => {
      if (response) {
        let fileImg = this.state.media.file_img;
        let fileDoc = this.state.media.file_doc;
        let fileVideo = this.state.media.file_video;

        functions.upload(
          this,
          response.assets[0].uri,
          'video',
          fileImg,
          fileDoc,
          fileVideo
        );
      }
    });
  };

  static navigationOptions = ({ navigation }) => ({
    title: "",
  });

  callBack = (check, index) => {
    return;
  };

  render() {
    var commonData = global.commonData.languages;

    try {
      var text1 = commonData.upload_error;
      var text2 = commonData.upload_success;
    } catch (error) {
      console.log(error);
    }

    var view = null;

    if (this.state.statusUpload.status == 401)
      view = <Text style={styles.error}>{text1}</Text>;
    else if (this.state.statusUpload.status == 200)
      view = <Text style={[styles.success]}>{text2}</Text>;

    let urlIamage, view1;

    if(this.state.callback == 0) {
      urlIamage = (this.state.urlImg == null) ? global.urlImage + this.state.media.file_img : global.urlImage + this.state.urlImg;
view1 = <Image
source={{ uri: urlIamage }}
style={{ width: "100%", height: "100%" }}
/>
    } else if(this.state.callback == 1) {
      urlIamage = (this.state.urlDoc == null) ? global.urlImage + this.state.media.file_doc : global.urlImage + this.state.urlDoc;
      <Image
      source={{ uri: urlIamage }}
      style={{ width: "100%", height: "100%" }}
    />
    } else {
      urlIamage = (this.state.urlVideo == null) ? global.urlImage + this.state.media.file_video : global.urlImage + this.state.urlVideo;
     
view1 = <Video
source={{ uri: urlIamage }}
style={{ width: '100%', height: '100%' }}
resizeMode="cover"
repeat={true}
paused={false}
/>
    }


    return (
      <Provider>
        <Portal>
          <Modal visible={this.state.visible}>
            <View style={[style.modal, style.modal2]}>
              {view1}
            </View>
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
                <Href onPress={() => this.openImagePicker('img')}>
                  <IconUpload
                    img1={rectangle}
                    img2={arrowUp}
                    text1="MEIN"
                    text2="LEBENSLAUF"
                  />
                  {this.state.media.file_img ? (
                    <View style={style.viewEdit}>
                      <Href onPress={() => this.setState({ visible: true, callback: 0 })}>
                        <Icon name="eye" size={20} color="#fff" />
                      </Href>
                      <Href onPress={() => null}>
                        <Icon name="trash-o" size={20} color="#fff" />
                      </Href>
                    </View>
                  ) : null}
                </Href>
                <Href onPress={() => this.openImagePicker('doc')}>
                  <IconUpload
                    img1={rectangle}
                    img2={arrowUp}
                    text1="MEIN LETZTES"
                    text2="ARBEITSZEUGNIS"
                  />
                  {this.state.media.file_doc ? (
                    <View style={style.viewEdit}>
                      <Href onPress={() => this.setState({ visible: true, callback: 1 })}>
                        <Icon name="eye" size={20} color="#fff" />
                      </Href>
                      <Href onPress={() => null}>
                        <Icon name="trash-o" size={20} color="#fff" />
                      </Href>
                    </View>
                  ) : null}
                </Href>
              </View>
              
              
              <Href style={{ marginBottom: 90, marginTop:20 }} onPress={() => this.openVideoPicker()}>
              <IconUpload
                img1={rectangle}
                img2={camera}
                text1="MEIN"
                text2="VIDEO-STATEMENT"
                style={style.marginTop1}
              />
                  {this.state.media.file_video ? (
                    <View style={style.viewEdit1}>
                      <Href onPress={() => this.setState({ visible: true, callback: 2 })}>
                        <Icon name="eye" size={20} color="#fff" />
                      </Href>
                      <Href onPress={() => null}>
                        <Icon name="trash-o" size={20} color="#fff" />
                      </Href>
                    </View>
                  ) : null}
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
});

export default UploadDocument;

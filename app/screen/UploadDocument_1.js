import React, { Component, useState, useRef, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  Alert,
  AppRegistry,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  Button,
} from "react-native";
import { Camera, useCameraDevices } from "react-native-vision-camera";
import Video from "react-native-video";

import Icon from "react-native-vector-icons/FontAwesome";

import { hideNavigationBar } from "react-native-navigation-bar-color";

import functions from "../function/function";

function Meida() {
  const [recording, setRecording] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [response, setResponse] = useState();
  const [uploadVideo, setUploadVideo] = useState(false);
  const [text, onChangeText] = React.useState();
  const [video, setVideo] = React.useState({});
  const [type, setType] = React.useState("front");
  const [mirrorImage, setMirrorImage] = React.useState(true);

  hideNavigationBar();

  //const devices = useCameraDevices('wide-angle-camera');
  const devices = useCameraDevices();
  //const devices = await Camera.getAvailableCameraDevices();
  //const device = devices.back;
  const device = type == "back" ? devices.back : devices.front;

  const camera = useRef(null);

  const size = 30;

  const startRecording = async () => {
    setRecording(true);

    camera.current.startRecording({
      flash: "on",
      onRecordingFinished: async (video) => {
        setVideo(video);
        setUploadVideo(true);
      },
      onRecordingError: (error) => console.error(error),
    });
  };

  const upload = () => {
    let fileImg = global.uploadDocument.state.media.file_img;
    let fileDoc = global.uploadDocument.state.media.file_doc;
    let fileVideo = global.uploadDocument.state.media.file_video;

    functions.upload(
      global.uploadDocument,
      video.path,
      "video",
      fileImg,
      fileDoc,
      fileVideo,
      1
    );

    setProcessing(true);
  };

  const stopRecording = async () => {
    await camera.current.stopRecording();
  };

  const front = () => {
    if(!mirrorImage) {
      setType("front");
      setMirrorImage(true);
    } else {
      setType("back");
      setMirrorImage(false);  
    }
  };

  const back = () => {
    setType("back");
    setMirrorImage(false);
  };

  let button = (
    <TouchableOpacity onPress={startRecording}>
      <Icon name="play" size={size} color="#fff" />
    </TouchableOpacity>
  );

  if (recording) {
    button = (
      <TouchableOpacity onPress={stopRecording}>
        <Icon name="stop" size={size} color="#fff" />
      </TouchableOpacity>
    );
  }

  if (uploadVideo) {
    button = <View />;
  }

  if (processing) {
    button = (
      <View>
        <ActivityIndicator animating size={18} />
      </View>
    );
  }

  let display = (
    <View>
      <Camera
        ref={camera}
        device={device}
        isActive={true}
        video={true}
        audio={true}
        type={type}
        mirrorImage={mirrorImage}
        style={styles.camera}
      />
      <View style={styles.viewAction}>
        <TouchableOpacity style={{ marginRight: 20 }} onPress={front}>
          <Icon name="camera" size={size} color="#fff" />
        </TouchableOpacity>
        {button}
        {/*<TouchableOpacity onPress={back}>
          <Text style={{ fontSize: 14, color: "red" }}> Back </Text>
      </TouchableOpacity>*/}
      </View>
    </View>
  );

  if (uploadVideo) {
    upload();

    setUploadVideo(false);
    } 

  if (device == null) return <Text>Waiting...</Text>;

  return <View style={styles.viewRoot}>{display}</View>;
}

const styles = StyleSheet.create({
  viewRoot: {
    flex: 1,
  },

  uploadVideo: {
    width: "100%",
    height: "70%",
  },

  viewAction: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#898166",
    height: "10%",
  },

  camera: {
    width: "100%",
    height: "90%",
  },
});

export default Meida;

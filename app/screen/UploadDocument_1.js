import React, { useState, useEffect } from "react";
import { View, ScrollView, Image, Dimensions, Button } from "react-native";

import Video from 'react-native-video';

import RNFS from "react-native-fs";
//import ImagePicker from "react-native-image-picker";
import * as ImagePicker from 'react-native-image-picker';

const DeviceMediaScreen = () => {
  const [mediaFiles, setMediaFiles] = useState([]);

  useEffect(() => {
    //loadMediaFromDevice();
  }, []);

  const loadMediaFromDevice = async () => {
    try {
      const imagesDir = `${RNFS.CachesDirectoryPath}`;
      const videosDir = `${RNFS.CachesDirectoryPath}`;

      const imageFiles = await RNFS.readDir(imagesDir);
      const videoFiles = await RNFS.readDir(videosDir);

      const images = imageFiles.map((file) => ({
        type: "image",
        uri: `file://${file.path}`,
      }));
      const videos = videoFiles.map((file) => ({
        type: "video",
        uri: `file://${file.path}`,
      }));

      setMediaFiles([...images, ...videos]);
    } catch (error) {
      console.error("Error loading media:", error);
    }
  };

  const openImagePicker = () => {
    ImagePicker.launchImageLibrary({}, (response) => {
      if (response.uri) {
        setMediaFiles([...mediaFiles, { type: "image", uri: response.assets[0].uri }]);
      }
    });
  };

  const openVideoPicker = () => {
    ImagePicker.launchImageLibrary({ mediaType: "video" }, (response) => {
      if (response.uri) {
        setMediaFiles([...mediaFiles, { type: "video", uri: response.uri }]);
      }
    });
  };

  return (
    <ScrollView>
    <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        {mediaFiles.map((item, index) => (
          <View key={index} style={{ margin: 5 }}>
            {item.type === "image" ? (
              <Image
                source={{ uri: item.uri }}
                style={{ width: 100, height: 100 }}
              />
            ) : (
              <Video
                source={{ uri: item.uri }}
                style={{ width: 100, height: 100 }}
                resizeMode="cover"
                repeat={true}
                paused={true}
              />
            )}
          </View>
        ))}
            </View>
      <Button title="Pick Image" onPress={openImagePicker} />
      <Button title="Pick Video" onPress={openImagePicker} />
    </ScrollView>
  );
};

export default DeviceMediaScreen;

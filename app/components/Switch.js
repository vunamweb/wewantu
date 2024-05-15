import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

import Switch from "react-native-switch-toggles-2";

import Image from "../components/Image";

const imgOff = require("../images/off.png");
const imgOn = require("../images/on.png");

export default function MySwitch({ mode, style, ...props }) {
  const [isEnabled, setIsEnabled] = useState(props.visible ? true : false);

  props.component.switch[props.index] = isEnabled;

  const changeValue = (value) => {
    setIsEnabled(value);
    if(props.callBack != undefined)
      props.callBack(props.job_search_profile_id, value, props.index)
  }

  return (
    <View>
      {
        isEnabled ? <Image style={styles.imgon} source={imgOn} /> : <Image style={styles.imgoff} source={imgOff} /> 
      }
      
    <Switch
      containerStyle={[styles.container, props.container]}
      additionalThumbStyle={[styles.additionalThumb, props.additionalThumb]}
      renderActiveThumbIcon={() => (isEnabled ? null : null)}
      /*renderInactiveThumbIcon={() =>
          !isEnabled ? <View style={{ height: 30, width: 30, borderRadius: 5, backgroundColor: "#898166" }} /> : null
        }*/
      {...props}
      value={isEnabled}
      onChange={(value) => changeValue(value)}
    />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#898166",
    borderWidth: 1,
    borderRadius: 5,
    height: 28,
  },
  additionalThumb: {
    height: 10,
    width: 25,
    borderRadius: 5,
    paddingTop: 20,
  },

  imgoff: {
    position: 'absolute',
    right: 5,
    top: '50%',
    marginTop: -7,
    zIndex: 99999,
    width: 15,
    height: 15
  },

  imgon: {
    position: 'absolute',
    left: 5,
    top: '50%',
    marginTop: -7,
    zIndex: 99999,
    width: 15,
    height: 15
  }
});

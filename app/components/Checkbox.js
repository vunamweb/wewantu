import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";

import { CheckBox } from "react-native-elements";

import Text from "../components/Paragraph";
import Href from "./Href";

import styles from "../../app/style/style";

function MyCheckBox({ data, callBack, type, ...props }) {
  let setIndex = (props.setIndex == undefined) ? -1 : props.setIndex;

  const [position, setPosition] = useState(setIndex);

  if (props.component != undefined && props.component.setPosition != undefined)
    props.component.setPosition = setPosition;

  const onPress = (id, index) => {
    let value = (id == undefined) ? index : id;

    var setIndex = position != value ? value : -1;

    setPosition(setIndex);
    callBack(setIndex);
  };

  return (
    <View style={[props.style, style.root]}>
      {data.map(({ label, require, id }, index) => {
        var textRequire = require ? (
          <Text style={[style.require, styles.fontBoldNormal]}>*</Text>
        ) : null;

        var bgColor = (index == position || id == position) ? style.bgCheck : style.bgNotCheck;
        var check = (index == position || id == position) ? true : false;

        return (
          <Href onPress={() => onPress(id, index)}>
            {type == undefined ? (
              <View style={[{ flexDirection: "row" }, props.styleRowCheckbox]}>
                <CheckBox
                  containerStyle={[bgColor, style.containerStyle]}
                  checkedIcon={null}
                  uncheckedIcon={null}
                  checked={check}
                  onPress={() => onPress(id, index)}
                  {...props}
                />
                <Text
                  style={[style.label, styles.fontBoldSmall, props.styleFont]}
                >
                  {label}
                </Text>
                {textRequire}
              </View>
            ) : (
              <View style={[style.view, props.styleRowCheckbox]}>
                <View style={style.view1}>
                  <Text
                    style={[style.label, styles.fontBoldSmall, props.styleFont]}
                  >
                    {label}
                  </Text>
                </View>
                <CheckBox
                  containerStyle={[bgColor, style.containerStyle]}
                  checkedIcon={null}
                  uncheckedIcon={null}
                  checked={check}
                  onPress={() => onPress(id, index)}
                  {...props}
                />
                {textRequire}
              </View>
            )}
          </Href>
        );
      })}
    </View>
  );
}

const style = StyleSheet.create({
  root: {
    marginLeft: -10,
  },

  containerStyle: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },

  label: {
    color: "#fff",
    textTransform: "uppercase",
    marginTop: 5,
  },

  require: {
    marginLeft: 8,
  },

  bgCheck: {
    backgroundColor: "#898166",
  },

  bgNotCheck: {
    backgroundColor: "#fff",
  },

  view: {
    flexDirection: "row",
    alignItems: "center",
    width: 150,
  },

  view1: {
    width: 130,
    justifyContent: "flex-end",
    marginRight: 10,
  },
});

export default MyCheckBox;

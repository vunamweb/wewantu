import React, { useState } from "react";
import { View, StyleSheet, Keyboard } from "react-native";

import { TextInput } from "react-native-paper";
import Text from "../components/Paragraph";
import Href from "./Href";

import { theme } from "../core/theme";
import IconFontAwesome from "react-native-vector-icons/FontAwesome";

import styleRoot from "../../app/style/style";

// SET MAXWIDTH
const MAX_WIDTH = 767;

export default function MyTextInput({
  errorText,
  description,
  callBack,
  ...props
}) {
  //let style = (props.bg != null) ? [styles.input] : [styles.input];
  const [focus, setFocus] = useState(false);

  const handleFocus = () => {
    setFocus(true);

    if (props.hideKeyboard != undefined && props.hideKeyboard == true)
      Keyboard.dismiss();

    if (callBack != undefined) callBack();
  };

  const handleBlur = () => {
    setFocus(false);

    //Keyboard.dismiss();
  };

  const handlePress = () => {
    if (callBack != undefined) callBack();
  };

  let left =
    props.fontAwesome == "true" ? (
      <TextInput.Icon
        style={props.leftStyle}
        name={() => (
          <IconFontAwesome
            name={props.leftIcon}
            size={props.size ? props.size : 24}
            color={props.colorIcon}
          />
        )}
      />
    ) : (
      <TextInput.Icon
        style={props.leftStyle}
        name={props.leftIcon}
        color={!focus ? props.bgFocus : props.bgBlur}
        onPress={props.onLeftClick ? props.onLeftClick : null}
      />
    );

  left = props.leftIcon ? left : null;

  let right = props.fontAwesome != "true" ? (
    <TextInput.Icon
    style={props.leftStyle}
      color={props.colorIcon}
      name={props.rightIcon}
      onPress={props.onRightClick ? props.onRightClick : null}
    />
  ) :
  (
    <TextInput.Icon
        style={props.leftStyle}
        onPress={props.onRightClick ? props.onRightClick : null}
        name={() => (
          <IconFontAwesome
            name={props.rightIcon}
            size={props.size ? props.size : 24}
            color={props.colorIcon}
          />
        )}
      />
  );

  right = props.rightIcon ? right : null;

  var bgColor =
    props.editable != undefined
      ? {
          backgroundColor:
            props.editable != undefined && props.editable == false
              ? props.bgFocus
              : props.bgBlur,
        }
      : {
          backgroundColor: focus ? props.bgFocus : props.bgBlur,
        };

  return (
    <View style={[styles.viewRoot, props.styleParent]}>
      <TextInput
        onFocus={() => handleFocus()}
        onBlur={() => handleBlur()}
        onPress={() => handlePress()}
        style={[
          bgColor,
          styles.textInput,
          styleRoot.fontBoldSmall,
          props.fontSize,
          props.styleTextInput,
        ]}
        theme={{
          colors: {
            placeholder: "#fff",
            text: focus ? props.bgBlur : props.bgFocus,
            primary: "transparent",
            underlineColor: "transparent",
            background: "#003489",
          },
        }}
        selectionColor={theme.colors.primary}
        underlineColor="transparent"
        mode="flat"
        ref={props.ref_}
        {...props}
        left={left}
        right={right}
        fontSize={150}
      />
      {description && !errorText ? (
        <Text style={styles.description}>{description}</Text>
      ) : null}
      {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  description: {
    fontSize: 13,
    color: theme.colors.secondary,
    paddingTop: 0,
  },
  error: {
    fontSize: 13,
    color: theme.colors.error,
    paddingTop: 8,
  },
  viewRoot: {
    borderWidth: 1,
    borderRadius: 10,
    overflow: "hidden",
  },
  textInput: {
    overflow: "hidden",
    height: "100%",
    width: "100%",
    maxWidth: MAX_WIDTH,
    textAlign: "center",
  },
});

import React, { Component } from "react";
import { StyleSheet, View, AsyncStorage, Dimensions, ActivityIndicator } from "react-native";

import Text from "../components/Paragraph";
import { ScrollView } from "react-native-gesture-handler";

import * as ImagePicker from "react-native-image-picker";

import Background from "../components/Background";
import TextInput from "../components/TextInput";
import TextHeader from "../components/TextHeader";
import IconBottom from "../components/IconBottom";
import Image from "../components/Image";
import CheckBox from "../components/Checkbox";
import BackNext from "../components/BackNext";
import Header from "../components/Header";
import Href from "../components/Href";

import styles from "../../app/style/style";
import functions from "../function/function";

import "../config/config";

const borderColor = "#000";
const imgProfile = require("../images/user_profile.png");
var text9, text10, text11;

class PersonalData_1 extends Component {
  constructor(props) {
    super(props);

    this.checkBox = [];
    this.checkBox[0] = null;
    this.checkBox[1] = null;
    this.checkBox[2] = null;

    this.index = -1;

    this.gotoNextStep.bind(this);

    this.state = {
      colorBorder1: borderColor,
      colorBorder2: borderColor,
      errorMessage: "",
      marginTop: 0,
      title: null,
      firstName: null,
      lastName: null,
      profileImage: null,
      ActivityIndicator: false,
    };
  }

  componentDidMount = async () => { };

  static navigationOptions = ({ navigation }) => ({
    title: "",
  });

  gotoNextStep = () => {
    let firstName = this.state.firstName;
    let lastName = this.state.lastName;
    let marginTop = 20;

    const component = this;

    if (this.index == -1) {
      component.setState({
        marginTop: marginTop,
        errorMessage: text9,
      });
      return false;
    }

    if (firstName == null) {
      component.setState({
        colorBorder1: "red",
        marginTop: marginTop,
        errorMessage: text10,
      });
      return false;
    } else if (firstName != "") {
      component.setState({ colorBorder1: borderColor, errorMessage: "" });
    }

    if (lastName == null) {
      component.setState({
        colorBorder2: "red",
        errorMessage: text11,
        marginTop: marginTop,
      });
      return false;
    } else {
      component.setState({ colorBorder2: borderColor, errorMessage: "" });
    }

    if (this.isInsert()) {
      var obj = {};

      try {
        obj.sex = this.index;
        obj.title = this.state.title;
        obj.prename = this.state.firstName;
        obj.lastname = this.state.lastName;
        obj.user_id = global.commonData.user.user_id;

        global.commonData.user.another.sex = this.index;
        global.commonData.user.another.title = this.state.title;
        global.commonData.user.another.prename = this.state.firstName;
        global.commonData.user.another.lastname = this.state.lastName;
      } catch (error) {
        console.log(error);
      }

      functions.updateUser(this, obj);
    }

    return true;
  };

  setCheckBox = (index) => {
    this.checkBox[index](true);
  };

  callBack = (index) => {
    this.index = index;
  };

  isInsert = () => {
    let sex, title, firstName, lastName;

    try {
      sex = global.commonData.user.another.sex;
      title = global.commonData.user.another.title;
      firstName = global.commonData.user.another.prename;
      lastName = global.commonData.user.another.lastname;

      if (
        sex == this.index &&
        title == this.state.title &&
        firstName == this.state.firstName &&
        lastName == this.state.lastName
      )
        return false;

      return true;
    } catch (error) {
      console.log(error);
      return true;
    }
  };

  openImagePicker = () => {
    ImagePicker.launchImageLibrary({}, (response) => {
      if (response) {
        //setMediaFiles([...mediaFiles, { type: "image", uri: response.assets[0].uri }]);
        try {
          functions.uploadProfileImage(
            this,
            response.assets[0].uri
          );
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  render() {
    var commonData = global.commonData.languages;
    var setIndex;

    let profilePicture = <Image style={style.img} source={imgProfile} />;

    try {
      var text1 = commonData.that_s;
      var text2 = commonData.me;
      var text3 = commonData.mr;
      var text4 = commonData.mrs;
      var text5 = commonData.drivers;
      var text6 = commonData.title;
      var text7 = commonData.first_name;
      var text8 = commonData.last_name;
      text9 = commonData.Please_enter_kind_of_user;
      text10 = commonData.Please_enter_First_name;
      text11 = commonData.Please_enter_last_name;

      var data = [
        {
          label: text3,
          require: true,
        },

        {
          label: text4,
          require: true,
        },

        {
          label: text5,
          require: true,
        },
      ];

      if (global.commonData.user.another.profilePicture != undefined) {
        let urlIamage = global.urlImage + global.commonData.user.another.profilePicture;

        profilePicture = <View style={[style.viewProfilPicture, style.imageContainer]}><Image
          source={{ uri: urlIamage }}
          style={[style.profilePicture, style.image]}
        /></View>
      }
    } catch (error) {
      console.log(error);
    }

    try {
      this.state.firstName =
        this.state.firstName != null
          ? this.state.firstName
          : global.commonData.user.another.prename;

      this.state.lastName =
        this.state.lastName != null
          ? this.state.lastName
          : global.commonData.user.another.lastname;

      this.state.title =
        this.state.title != null
          ? this.state.title
          : global.commonData.user.another.title;

      setIndex =
        global.commonData.user.another.sex == null ||
          global.commonData.user.another.sex == undefined
          ? -1
          : global.commonData.user.another.sex;

      this.index = setIndex;
    } catch (error) {
      console.log(error);
    }

    var param = {};

    try {
      param.step1 = {};
      param.step1.sex = this.index;
      param.step1.titel = this.state.title;
      param.step1.firstName = this.state.firstName;
      param.step1.lastName = this.state.lastName;
    } catch (error) {
      console.log(error);
    }

    return (
      <View style={styles.flexFull}>
        <Header component={this} Notification={false} />
        <ScrollView automaticallyAdjustKeyboardInsets={true} contentContainerStyle={{ flexGrow: 1 }}>
          <Background>
            <TextHeader text1={text1} text2={text2} />
            <ActivityIndicator
                size="small"
                animating={this.state.ActivityIndicator}
              />

            <Href onPress={() => this.openImagePicker("img")}>
              {profilePicture}
            </Href>
            <Text style={[styles.error, { marginTop: this.state.marginTop }]}>
              {this.state.errorMessage}
            </Text>
            <CheckBox
              data={data}
              callBack={this.callBack}
              style={style.CheckBox}
              setIndex={setIndex}
            />
            <TextInput
              placeholder={text6.toUpperCase()}
              onChangeText={(value) => this.setState({ title: value })}
              value={this.state.title}
              styleParent={[
                {
                  marginTop: this.state.marginTop,
                },
                style.textInput,
                styles.textInput,
              ]}
              bgFocus="white"
              bgBlur="#3f3f3f"
            />
            <TextInput
              placeholder={text7.toUpperCase() + " *"}
              onChangeText={(value) => this.setState({ firstName: value })}
              value={this.state.firstName}
              component={this}
              styleParent={[
                {
                  borderColor: this.state.colorBorder1,
                },
                style.textInput,
                styles.textInput,
              ]}
              bgFocus="white"
              bgBlur="#3f3f3f"
            />
            <TextInput
              placeholder={text8.toUpperCase() + " *"}
              onChangeText={(value) => this.setState({ lastName: value })}
              value={this.state.lastName}
              component={this}
              styleParent={[
                {
                  borderColor: this.state.colorBorder2,
                },
                style.textInput,
                styles.textInput,
              ]}
              bgFocus="white"
              bgBlur="#3f3f3f"
            />
            <BackNext
              nextScreen="PersonalData_2"
              data={JSON.stringify(param)}
              position="relative"
              backEnable={false}
              callBack={this.gotoNextStep}
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
    );
  }
}

const style = StyleSheet.create({
  img: {
    marginTop: 30,
  },

  viewProfilPicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#898166'
  },

  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50
  },

  imageContainer: {
    overflow: 'hidden',
  },
  image: {
    resizeMode: 'cover',
  },

  CheckBox: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    marginBottom: 10,
    marginTop: 10,
  },

  textInput: {
    marginBottom: 15,
  },
});

export default PersonalData_1;

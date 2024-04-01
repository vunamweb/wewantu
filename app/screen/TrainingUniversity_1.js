import React, { Component } from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";

import Text from "../components/Paragraph";
import { ScrollView } from "react-native-gesture-handler";

import Background from "../components/Background";
import Logo from "../components/Logo";
import TextInput from "../components/TextInput";
import TextHeader from "../components/TextHeader";
import Button from "../components/Button";
import HeadLine from "../components/HeadLine";
import IconBottom from "../components/IconBottom";
import BackNext from "../components/BackNext";
import Drawer from "../components/Drawer";

import styles from "../../app/style/style";
import functions from "../../app/function/function";

const borderColor = "#000";

class TrainingUniversity_1 extends Component {
  constructor(props) {
    super(props);

    this.gotoNextStep.bind(this);

    this.state = {
      colorBorder1: borderColor,
      marginTop: 10,
      street: null,
      no: null,
      address: null,
      city: null,
      zip: null,
      errorMessage: "",
      display: "none",
      EducationalStageTypes: [
        {
          id: 0,
        },
        {
          id: 0,
        },
        {
          id: 0,
        },
      ],
      ActivityIndicator: false,
    };
  }

  componentDidMount = () => {
    //functions.getListEducationalStageTypes(this);
  };

  static navigationOptions = ({ navigation }) => ({
    title: "",
  });

  gotoNextStep = (type, educationstage_id) => {
    var data =
      this.props.navigation.state.params != undefined
        ? this.props.navigation.state.params.data
        : global.reviewTraining.state.trainning;

    // if is first time go to this screen
    if (data == null) {
      data = {};

      data.type = type;
      data.educationstage_id = educationstage_id;

      data.data = [];

      data.data[0] = {};

      data.data[0].type = type;
      data.data[0].educationstage_id = educationstage_id;
      data.data[0].job = null;
      data.data[0].name = null;
    } else {
      // if ready go to this screen
      data = JSON.parse(data);

      data.type = type;
      data.educationstage_id = educationstage_id;
    }

    data.edit = undefined;

    data = JSON.stringify(data);

    functions.gotoScreenWithParam(data, this.props.navigation, "AddEducation");
  };

  render() {
    var commonData = global.commonData.languages;

    try {
      var text1 = commonData.that_s;
      var text2 = commonData.my;
      var text3 = commonData.status;
      var text4 = commonData.my_trainning_professional;
      var text5 = commonData.traning_professional;
      var text6 = commonData.continue_education;
      var text7 = commonData.studies;
      var text8 = commonData.university_of_apply_science;
    } catch (error) {
      console.log(error);
    }

    try {
      this.state.EducationalStageTypes = global.reviewTraining.state.EducationalStageTypes;
    } catch(error) {
      console.log(error);
    }

    return (
      <View style={styles.flexFull}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <Background>
            <Logo navigation={this.props.navigation} type={1} />
            <TextHeader text1={text1} text2={text2} text3={text3} />
            <ActivityIndicator
              size="small"
              animating={this.state.ActivityIndicator}
            />
            <HeadLine style={style.headlineFirst} text={text4} />
            <Button
              color="white"
              text={text5}
              style={[styles.button, style.button]}
              onPress={() =>
                this.gotoNextStep(0, this.state.EducationalStageTypes[0].id)
              }
            />
            <HeadLine text={text6} />
            <Button
              color="white"
              text={text6}
              style={[styles.button, style.button]}
              onPress={() =>
                this.gotoNextStep(1, this.state.EducationalStageTypes[1].id)
              }
            />
            <HeadLine text={text7 + "/" + text8} />
            <Button
              color="white"
              text={text7}
              style={[styles.button, style.button]}
              onPress={() =>
                this.gotoNextStep(2, this.state.EducationalStageTypes[2].id)
              }
            />
            <BackNext
              style={style.backNext}
              //position="absolute"
              callBack={() => true}
              navigation={this.props.navigation}
              nextEnable={false}
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
  button: {
    backgroundColor: "#3f3f3f",
    marginTop: 5,
  },

  headlineFirst: {
    marginTop: 50,
  },

  backNext: {
    marginTop: 50,
  },
});

export default TrainingUniversity_1;

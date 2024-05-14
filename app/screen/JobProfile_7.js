import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";

import { Provider, Portal, Modal } from "react-native-paper";

import { ScrollView } from "react-native-gesture-handler";
import { hideNavigationBar } from "react-native-navigation-bar-color";

import IconFontAwesome from "react-native-vector-icons/FontAwesome";

import Background from "../components/Background";
import TextHeader from "../components/TextHeader";
import HeadLine from "../components/HeadLine";
import IconBottom from "../components/IconBottom";
import BackNext from "../components/BackNext";
import CheckBox from "../components/Checkbox";
import Image from "../components/Image";
import Header from "../components/Header";
import Text from "../components/Paragraph";

import styles from "../../app/style/style";
import functions from "../function/function";

const data = global.data1;
const icon = require("../images/thang.png");

var text5;
var check;

class JobProfile_7 extends Component {
  constructor(props) {
    super(props);

    this.data = null;
    this.ref_ = null;

    this.state = {
      errorMessage: "",
      marginTop: 0,
    };
  }

  componentDidMount = () => {
    this.data = this.props.navigation.state.params.data;

    this.initData();
  };

  initData = () => {
    this.data = JSON.parse(this.data);

    var index = functions.getIndex(this.data);
    var data = functions.getData(this.data);

    data[index].intres = 0;

    this.data.data = data;

    this.data = JSON.stringify(this.data);

    this.ref_(this.data);

    this.check = false;
  };

  static navigationOptions = ({ navigation }) => ({
    title: "",
  });

  callBack = (position) => {
    this.check = true;

    this.data = JSON.parse(this.data);

    var index = functions.getIndex(this.data);
    var data = functions.getData(this.data);

    data[index].intres = position;

    this.data.data = data;

    this.data = JSON.stringify(this.data);

    functions.gotoScreenWithParam(
      this.data,
      this.props.navigation,
      "JobProfileFinal"
    );
  };

  gotoNextStep = () => {
    var component = this;

    if (!check) {
      component.setState({
        marginTop: 20,
        errorMessage: text5,
      });
      return false;
    }

    return true;
  };

  render() {
    var commonData = global.commonData.languages;

    var edit = 0;
    var editUser = null;
    var setIndex = -1;
    var data4 = [];

    try {
      text5 = commonData.please_select_item;
      var text6 = commonData.MY_CAREER_AMBITIONS;
      var text7 = commonData.Learning_New_Skills;
      var text8 = commonData.Job_Satisfaction;
      var text9 = commonData.Making_a_Difference;
      var text10 = commonData.FERTIG;

      data4 = [
        {
          id: 0,
          label: text7
        },

        {
          id: 1,
          label: text8
        },

        {
          id: 2,
          label: text9
        },
      ]
      
      var data = this.props.navigation.state.params.data;
      data = JSON.parse(data);

      edit = data.edit;

      editUser = functions.getJobProfileEdit(
        global.jobprofile.state.userJobprofile,
        edit
      );

      setIndex = editUser.intres;

      //minimumValue1 = editUser != null ? editUser.gross_year : minimumValue1;
      //minimumValue2 = editUser != null ? editUser.week_hour : minimumValue2;
    } catch (error) {
      console.log(error);
    }

    check = (setIndex == -1) ? false : true;
    
    return (
      <View style={styles.flexFull}>
        <Header component={this} Notification={false} />
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <Background>
            <TextHeader text1="my" text2="job" text3="goals" />
            <Text style={[styles.error, { marginTop: this.state.marginTop }]}>
              {this.state.errorMessage}
            </Text>
            <HeadLine style={style.headLine} text={text6} />
            <View style={[styles.fullWith, style.root]}>
              <Image style={{ marginRight: 10 }} source={icon} />
              <CheckBox
                data={data4}
                setIndex={setIndex}
                callBack={this.callBack}
                style={style.checkbox}
                styleFont={style.text1}
                styleRowCheckbox={styles.rowCheckbox}
                type={1}
              />
              {/*<View style={style.checkbox}>
                <CheckBox label="Ohne" index={1} callBack={this.callBack} />
                <CheckBox
                  label="Hauptschulabschluss"
                  index={2}
                  callBack={this.callBack}
                />
                <CheckBox
                  label="Mittlere Reife"
                  index={3}
                  callBack={this.callBack}
                />
                <CheckBox label="Abitur" index={4} callBack={this.callBack} />
    </View>*/}
            </View>
            <BackNext
              nextScreen="JobProfileFinal"
              text={text10}
              position="absolute"
              data={[]}
              ref_={this}
              callBack={this.gotoNextStep}
              navigation={this.props.navigation}
              nextEnable={true}
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
  headLine: {
    marginTop: 50,
  },

  checkbox: {
    marginTop: 10,
  },

  text1: {
    textAlign: "right",
  },

  root: {
    flexDirection: "row",
    //justifyContent: 'space-evenly',
    paddingLeft: 40,
    marginTop: 20,
    //backgroundColor: 'red'
  },
});

export default JobProfile_7;

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
import Header from "../components/Header";
import Text from "../components/Paragraph";

import styles from "../../app/style/style";
import functions from "../function/function";

const data = global.data1;
var text5;
var check;
var setIndex;

class JobProfile_5 extends Component {
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

    data[index].work_night = (setIndex == -1) ? 0 : setIndex;

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

    data[index].work_night = position;

    this.data.data = data;

    this.data = JSON.stringify(this.data);

    functions.gotoScreenWithParam(
      this.data,
      this.props.navigation,
      "JobProfile_6"
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

    try {
      var text1 = commonData.that_s;
      var text2 = commonData.my;
      var text3 = commonData.status;
      var text4 = commonData.Would_YOU_work_at_night_too;
      text5 = commonData.please_select_item;
    } catch (error) {
      console.log(error);
    }

    var edit = 0;
    var editUser = null;
    setIndex = -1;

    try {
      var data = this.props.navigation.state.params.data;
      data = JSON.parse(data);

      edit = data.edit;

      editUser = functions.getJobProfileEdit(
        global.jobprofile.state.userJobprofile,
        edit
      );

      /*if( global.typeEdit == 1)
      setIndex = editUser.work_weekend;
      else */
      setIndex = editUser.work_night;
      
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
            <TextHeader text1={text1} text2={text2} text3={text3} />
            <Text style={[styles.error, { marginTop: this.state.marginTop }]}>
              {this.state.errorMessage}
            </Text>
            <HeadLine style={style.headLine} text={text4} />
            <View style={[styles.fullWith, style.root]}>
              <CheckBox
                data={global.data3}
                setIndex={setIndex}
                callBack={this.callBack}
                style={style.checkbox}
                styleRowCheckbox={styles.rowCheckbox}
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
              nextScreen="JobProfile_6"
              position="absolute"
              callBack={this.gotoNextStep}
              data={[]}
              ref_={this}
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
});

export default JobProfile_5;

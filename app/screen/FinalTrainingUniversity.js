import React, { Component } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

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

var text5, component;

class FinalTrainingUniversity extends Component {
  constructor(props) {
    super(props);

    this.state = {
      positionNext: false,
      moment: [],
      ActivityIndicator: false,
      errorMessage: "",
      marginTop: 0,
    };
  }

  componentDidMount = () => {
    component = this;

    hideNavigationBar();

    functions.getListMoment(this);

    this.callBack.bind(this);

    this.didFocusSubscription = this.props.navigation.addListener(
      "didFocus",
      (payload) => {
        // Logic to handle when the screen comes into focus (navigated back)
        this.setState({ positionNext: !this.state.positionNext });
      }
    );
  };

  gotoNextStep = () => {
    return true;
  };

  static navigationOptions = ({ navigation }) => ({
    title: "",
  });

  callBack = (position) => {
    var obj = {};

    try {
      let moment_id = position;

      obj.moment_id = moment_id;
      obj.user_id = global.commonData.user.user_id;

      global.commonData.user.another.moment = moment_id;

      functions.updateUser(this, obj, 4);
    } catch (error) {
      console.log(error);
    }
    global.positionNext = position;

    if (
      component.state.moment[0].id == position ||
      component.state.moment[1].id == position
    )
      functions.gotoScreen(this.props.navigation, "HowLong");
    else functions.gotoScreen(this.props.navigation, "Driver");
  };

  render() {
    var commonData = global.commonData.languages;

    try {
      var text1 = commonData.that_s;
      var text2 = commonData.what;
      var text3 = commonData.i_do;
      var text4 = commonData.at_the_moment_i_am;
    } catch (error) {
      console.log(error);
    }

    let nextBack;

    try {
      nextBack =
        global.positionNext == this.state.moment[0].id || global.commonData.user.another.moment == this.state.moment[0].id ||
        global.positionNext == this.state.moment[1].id ||  global.commonData.user.another.moment == this.state.moment[1].id
          ? "HowLong"
          : "Driver";
    } catch (error) {
      nextBack = "HowLong";
      console.log(error);
    }

    return (
      <View style={styles.flexFull}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <Background>
            <Header component={this} Notification={false} />
            <TextHeader text1={text1} text2={text2} text3={text3} />
            <ActivityIndicator
              size="small"
              animating={this.state.ActivityIndicator}
            />
            <HeadLine style={style.headLine} text={text4} />
            <View style={[styles.fullWith, style.root]}>
              <CheckBox
                style={style.checkbox}
                styleRowCheckbox={styles.rowCheckbox}
                data={this.state.moment}
                setIndex={global.commonData.user.another.moment}
                callBack={this.callBack}
              />

              {/*<View style={style.checkbox}>
                <CheckBox label="In Festanstellung" index={1} callBack={this.callBack} />
                <CheckBox
                  label="freiberuflich tätig"
                  index={2}
                  callBack={this.callBack}
                />
                <CheckBox
                  label="In einer Weiterbildung"
                  index={3}
                  callBack={this.callBack}
                />
                <CheckBox label="In Ausbildung" index={4} callBack={this.callBack} />
                <CheckBox label="Im Studium" index={4} callBack={this.callBack} />
                <CheckBox label="Arbeitssuchend" index={4} callBack={this.callBack} />
    </View>*/}
            </View>
            <BackNext
              nextScreen={nextBack}
              position="absolute"
              callBack={() => this.gotoNextStep()}
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

export default FinalTrainingUniversity;

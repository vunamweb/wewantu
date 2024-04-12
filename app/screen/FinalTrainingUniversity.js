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

import styles from "../../app/style/style";
import functions from "../function/function";

class FinalTrainingUniversity extends Component {
  constructor(props) {
    super(props);

    this.state = {
      positionNext: false
    };
  }

  componentDidMount = () => {
    hideNavigationBar();

    this.didFocusSubscription = this.props.navigation.addListener(
      "didFocus",
      (payload) => {
        // Logic to handle when the screen comes into focus (navigated back)
        this.setState({ positionNext: !this.state.positionNext });
      }
    );
  };

  static navigationOptions = ({ navigation }) => ({
    title: "",
  });

  callBack = (position) => {
    global.positionNext = position;

    if (position == 0 || position == 1)
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

      var data = [
        {
          label: commonData.In_permanent_employment,
          require: false,
        },

        {
          label: commonData.freelancer,
          require: false,
        },

        {
          label: commonData.in_futher_trainning,
          require: false,
        },

        {
          label: commonData.in_education,
          require: false,
        },

        {
          label: commonData.in_studies,
          require: false,
        },

        {
          label: commonData.job_seeking,
          require: false,
        },
      ];
    } catch (error) {
      console.log(error);
    }

    let nextBack =
      global.positionNext == 0 || global.positionNext == 1 ? "HowLong" : "Driver";

    return (
      <View style={styles.flexFull}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <Background>
            <Header component={this} Notification={false} />
            <TextHeader text1={text1} text2={text2} text3={text3} />
            <HeadLine style={style.headLine} text={text4} />
            <View style={[styles.fullWith, style.root]}>
              <CheckBox
                style={style.checkbox}
                styleRowCheckbox={styles.rowCheckbox}
                data={data}
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
              callBack={() => true}
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

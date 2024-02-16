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

class SchoolScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = () => {
    hideNavigationBar();
  };

  static navigationOptions = ({ navigation }) => ({
    title: "",
  });

  callBack = (position) => {
    functions.gotoScreen(this.props.navigation, "ReviewTrainingUniversity");
  };

  render() {
    var commonData = global.commonData.languages;

    try {
      var text1 = commonData.that_s;
      var text2 = commonData.my;
      var text3 = commonData.status;
      var text4 = commonData.my_graduation;

      var data = [
        {
          label: commonData.without,
          require: false,
        },

        {
          label: commonData.Secondary_school_diploma,
          require: false,
        },

        {
          label: commonData.Middle_maturity,
          require: false,
        },

        {
          label: commonData.high_school_diploma,
          require: false,
        },
      ];
    } catch (error) {
      console.log(error);
    }

    return (
      <View style={styles.flexFull}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <Header component={this} Notification={false} />
          <Background>
            <TextHeader text1={text1} text2={text2} text3={text3} />
            <HeadLine style={style.headLine} text={text4} />
            <View style={[styles.fullWith, style.root]}>
              <CheckBox
                data={data}
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
              nextScreen="ReviewTrainingUniversity"
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

export default SchoolScreen;

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

class WillingnessChange extends Component {
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

  callBack = (check, index) => {
    return;
  };

  render() {
    var commonData = global.commonData.languages;

    try {
      var text1 = commonData.yes;
      var text2 = commonData.no;
      var text3 = commonData.maybe;
      var text4 = commonData.my_willing_to_change;

      var data = [
        {
          label: commonData.SOS_get_me_out_of_here,
          require: false,
        },

        {
          label: commonData.Yes_I_open_to_new_things,
          require: false,
        },
      ];
    } catch (error) {
      console.log(error);
    }
    return (
      <View style={styles.flexFull}>
        <Header component={this} Notification={false} />
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <Background>
            <TextHeader text1={text1} text2={text2} text3={text3} />
            <HeadLine style={style.headLine} text={text4} />
            <View style={[styles.fullWith, style.root]}>
              <CheckBox
                style={style.checkbox}
                styleRowCheckbox={styles.rowCheckbox}
                data={data}
                callBack={this.callBack}
              />
            </View>
            <BackNext
              nextScreen="FellWork"
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
    marginLeft: -10,
  },
});

export default WillingnessChange;

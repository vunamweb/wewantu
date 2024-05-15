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

const data = [
  {
    label: "English",
    require: false,
  },
  {
    label: "Germany",
    require: false,
  },
];

class Language extends Component {
  constructor(props) {
    super(props);

    this.data = null;
    this.ref_ = null;

    this.state = {
      text: {},
    };
  }

  componentDidMount = () => {};

  static navigationOptions = ({ navigation }) => ({
    title: "",
  });

  callBack = (position) => {
    global.selectLanguage = (position == 0) ? 'en' : 'de';
    
    functions.getTextLanguage(this, position);
  };

  render() {
    var commonData = global.commonData.languages;

    try {
      var text1 = commonData.languages;
    } catch (error) {
      console.log(error);
    }

    return (
      <View style={styles.flexFull}>
        <Header component={this} Notification={false} />
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <Background>
            <HeadLine style={style.headLine} text={text1} />
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
              nextScreen="HomeScreen"
              position="absolute"
              callBack={() => true}
              //data={[]}
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

export default Language;

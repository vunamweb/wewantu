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

import Text from "../components/Paragraph";
import Background from "../components/Background";
import TextHeader from "../components/TextHeader";
import IconBottom from "../components/IconBottom";
import BackNext from "../components/BackNext";
import CheckBox from "../components/Checkbox";
import Header from "../components/Header";

import styles from "../../app/style/style";
import functions from "../function/function";

var data;

class PersonalData_Language extends Component {
  constructor(props) {
    super(props);

    this.callBack.bind(this);

    this.state = {
      languages: [],
      visible: false,
      ActivityIndicator: false,
    };
  }

  componentDidMount = async () => {
    hideNavigationBar();
  };

  static navigationOptions = ({ navigation }) => ({
    title: "",
  });

  selectLanguage = (id, name) => {
    var languages = this.state.languages;
    var lengthOFlanguage = languages.length;

    var language = id + "," + name;

    languages[lengthOFlanguage] = language;

    this.setState({ languages: languages, visible: false });
  };

  callBack = (position) => {
    try {
      var language = this.props.navigation.state.params.data;

      let languageId = global.chooseLanguage;

      var language = language + ";" + data[position].label + ';' + languageId;

      global.updateLanguage  = true;

      functions.insertUserLanguage(this, languageId, position, language);
    } catch (error) {
      console.log(error);
    }
    /*functions.gotoScreenWithParam(
      language,
      this.props.navigation,
      "PersonalData_4"
    );*/
  };

  render() {
    var language = this.props.navigation.state.params.data;

    var arrayLanguage = language.split(",");
    var length = arrayLanguage.length;

    var selectedLanguage = arrayLanguage[length - 1];

    var commonData = global.commonData.languages;

    try {
      var text1 = commonData.i_speak;

      data = [
        {
          label: commonData.mother_tongue,
          require: false,
        },

        {
          label: commonData.business_fluent_in_spoken_and_written,
          require: false,
        },

        {
          label: commonData.school_level,
          require: false,
        },

        {
          label: commonData.Can_order_a_pizza,
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
            <TextHeader text1={text1} />
            <ActivityIndicator
              size="small"
              animating={this.state.ActivityIndicator}
            />
            <View style={[styles.fullWith, style.root]}>
              <Text style={styles.fontBoldNormal}>{selectedLanguage}</Text>
              <CheckBox
                data={data}
                callBack={this.callBack}
                style={style.checkbox}
                styleRowCheckbox={styles.rowCheckbox}
                styleFont={style.styleFont}
              />
              {/*<View style={style.checkbox}>
                <CheckBox
                  label="Muttersprache"
                  index={1}
                  callBack={this.callBack}
                />
                <CheckBox
                  label="business fluent in spoken and written"
                  index={2}
                  callBack={this.callBack}
                />
                <CheckBox
                  label="School level"
                  index={3}
                  callBack={this.callBack}
                />
                <CheckBox
                  label="Can order a pizza"
                  index={4}
                  callBack={this.callBack}
                />
    </View>*/}
            </View>
            <BackNext
              nextScreen="PersonalData_4"
              data={language}
              position="absolute"
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
  root: {
    marginTop: 50,
  },

  checkbox: {
    marginTop: 10,
  },

  styleFont: {
    fontSize: 14,
  },
});

export default PersonalData_Language;

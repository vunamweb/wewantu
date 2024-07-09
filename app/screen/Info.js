import React, { Component, createRef } from "react";
import {
  StyleSheet,
  View,
  AsyncStorage,
  Dimensions,
  TouchableOpacity,
} from "react-native";

import { ScrollView } from "react-native-gesture-handler";
import { hideNavigationBar } from "react-native-navigation-bar-color";

import Background from "../components/Background";
import TextHeader from "../components/TextHeader";
import Text from "../components/Paragraph";
import Collapse from "../components/Collapse";
import IconBottom from "../components/IconBottom";
import Header from "../components/Header";

import styles from "../../app/style/style";
import functions from "../../app/function/function";

import '../config/config';

const borderColor = "#000";
const bgDefault = "#2B2B2B";
const bgFocus = "#2B2B2B";
const imgNotification = require("../images/notification.png");

const data1 = [
  {
    text: "faq",
    link: "",
  },
  {
    text: "Tipps vom Headhunter",
    link: "",
  },
  {
    text: "How to use Work Life Balance App",
    link: "",
  },
  {
    text: "Hilfe",
    link: "",
  },
  {
    text: "Kontakt",
    link: "",
  },
  {
    text: "Impressum",
    link: "",
  },
  {
    text: "agb",
    link: "",
  },
  {
    text: "Datenschutz",
    link: "",
  },
  {
    text: "Mit Freunden teilen",
    link: "Message",
  },
];

class Info extends Component {
  constructor(props) {
    super(props);
    this._renderItem = this._renderItem.bind(this);
    this.collapse = createRef();
  }

  state = {};

  onClickItem = (index, link, url) => {
    this.collapse.current.setState({ activeIndex: index });
    if(url == undefined)
      functions.gotoScreen(this.props.navigation, link);
    else {
      functions.gotoScreenWithParam(url, this.props.navigation, 'Content');
    } 
  };

  _renderItem__ = ({ item, index }) => {
    let height = item.border == "none" ? 0 : 1;
    let link = item.link != null ? item.link : "HomeScreen";

    var borderTop = (
      <View style={[{ height: height }, styles.borderTopAndBottom]} />
    );

    var borderBottom = (
      <View
        style={[
          { height: height },
          styles.borderTopAndBottom,
          style.borderBottom,
        ]}
      />
    );

    var bgColor =
      this.collapse.current != null &&
      index == this.collapse.current.state.activeIndex
        ? bgFocus
        : bgDefault;

    return (
      <TouchableOpacity
        style={[{ backgroundColor: bgColor }, style.root]}
        onPress={() => this.onClickItem(index, item.link)}
        onBlur={() => this.collapse.setState({ activeIndex: -1 })}
      >
        <View style={[styles.flexRowStart, styles.fullWith]}>
          <View style={styles.flexFull}>
            {borderTop}
            <View
              style={[styles.flexRowStart, styles.listView, { marginTop: -10 }]}
            >
              <Text style={[styles.fontBoldSmall, styles.textCapitalize]}>
                {item.text}
              </Text>
            </View>
            {borderBottom}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  _renderItem = ({ item, index }) => {
    let language = (global.selectLanguage == undefined) ? 'en' : global.selectLanguage;
    
    let height = item.border == "none" ? 0 : 2;
    let link = item.link != null ? item.link : "HomeScreen";

    let url = language == 'en' ? item.url_en : item.url_de;

    var borderTop =
      index == 0 ? (
        <View style={[{ height: height }, styles.borderTopAndBottom]} />
      ) : null;

    var borderBottom = (
      <View
        style={[
          { height: height },
          styles.borderTopAndBottom,
          styles.marginTop15,
        ]}
      />
    );

    var bgColor =
      this.collapse.current != null &&
      index == this.collapse.current.state.activeIndex
        ? bgFocus
        : bgDefault;

    return (
      <TouchableOpacity
        style={[{ backgroundColor: bgColor }, styles.collapse]}
        onPress={() => this.onClickItem(index, item.link, url)}
        onBlur={() => this.collapse.setState({ activeIndex: -1 })}
      >
        <View style={[styles.flexRowStart, styles.fullWith]}>
          <View style={styles.flexFull}>
            {/*borderTop*/}
            <View style={[styles.flexRowStart, styles.listView]}>
              <Text style={[styles.fontBoldSmall, styles.textCapitalize]}>
                {item.text}
              </Text>
            </View>
            {/*borderBottom*/}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  componentDidMount = async () => {
    //hideNavigationBar();
  };

  static navigationOptions = ({ navigation }) => ({
    title: "",
  });

  render() {
    var commonData = global.commonData.languages;

    try {
      var text1 = commonData.info;

      var data1 = [
        {
          text: commonData.faq,
          link: "Faq",
        },
        {
          text: commonData.Tips_from_the_headhunter,
          link: "Tipp",
        },
        {
          text: commonData.How_to_use_Work_Life_Balance_App,
          link: "HowToUse",
        },
        {
          text: commonData.help,
          link: "Help",
        },
        {
          text: commonData.contact,
          link: "Content",
          url_de: global.contact_de,
          url_en: global.contact_en,
        },
        {
          text: commonData.imprint,
          link: "Content",
          url_de: global.impresumm_de,
          url_en: global.impresumm_en
        },
        {
          text: commonData.agb,
          link: "Content",
          url_de: global.agb_de,
          url_en: global.agb_en
        },
        {
          text: commonData.data_protection,
          link: "Content",
          url_de: global.datenschutz_de,
          url_en: global.datenschutz_en
        },
        {
          text: commonData.share_with_friend,
          link: "",
        },
      ];
    } catch (error) {
      console.log(error);
    }

    return (
      <View style={styles.flexFull}>
        <Header component={this} />
        <ScrollView contentContainerStyle={styles.scroll}>
          <Background>
            <TextHeader special={true} text2={text1} />
            <Collapse
              title=""
              style={style.collapse}
              data={data1}
              renderItem={this._renderItem}
              col={1}
              ref={this.collapse}
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
  root: {
    marginBottom: 5,
    height: 35,
  },

  borderBottom: {
    marginTop: 7,
  },
});

export default Info;

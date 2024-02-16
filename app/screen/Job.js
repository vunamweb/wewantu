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

const borderColor = "#000";
const bgDefault = "#2B2B2B";
const bgFocus = "#2B2B2B";
const imgNotification = require("../images/white_notification.png");

class Job extends Component {
  constructor(props) {
    super(props);
    this._renderItem = this._renderItem.bind(this);
    this.collapse = createRef();
  }

  state = {};

  onClickItem = (index, link) => {
    this.collapse.current.setState({ activeIndex: index });
    functions.gotoScreen(this.props.navigation, link);
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
    let height = item.border == "none" ? 0 : 2;
    let link = item.link != null ? item.link : "HomeScreen";

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
        onPress={() => this.onClickItem(index, item.link)}
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
      var text1 = commonData.jobs;
      var text2 = commonData.new_job_offers;
      var text3 = commonData.my_matches;
      var text4 = commonData.my_notepad;
      var text5 = commonData.my_news;
      
      var data1 = [
        {
          text: text2,
          link: "NewJob",
        },
        {
          text: text4,
          link: "LikeJob",
        },
        {
          text: text3,
          link: "MarkJob",
        },
        {
          text: text5,
          link: "Message",
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
            <TextHeader styleSpecialIcon={style.styleSpecialIcon} special={true} icon={imgNotification} text2={text1} />
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

  styleSpecialIcon: {
    marginLeft: 10,
    marginTop: -5
  }
});

export default Job;

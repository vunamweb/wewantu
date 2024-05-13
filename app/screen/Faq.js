import React, { Component, createRef } from "react";
import {
  StyleSheet,
  View,
  AsyncStorage,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import { ScrollView } from "react-native-gesture-handler";
import { hideNavigationBar } from "react-native-navigation-bar-color";

import Background from "../components/Background";
import TextHeader from "../components/TextHeader";
import Text from "../components/Paragraph";
import Image from "../components/Image";
import Collapse from "../components/Collapse";
import IconBottom from "../components/IconBottom";
import Header from "../components/Header";
import BackNext from "../components/BackNext";

import styles from "../../app/style/style";
import functions from "../../app/function/function";

const borderColor = "#000";
const bgDefault = "#2B2B2B";
const bgFocus = "#2B2B2B";
const imgArrowDown = require("../images/arrow_down_1.png");
const imgArrowUp = require("../images/arrow_up_1.png");

class Faq extends Component {
  constructor(props) {
    super(props);
    this._renderItem = this._renderItem.bind(this);
    this.collapse = createRef();

    this.state = {
      faqs: [],
      ActivityIndicator: false,
    };
  }

  onClickItem = (index, link) => {
    this.collapse.current.setState({ activeIndex: index });
    functions.gotoScreen(this.props.navigation, link);
  };

  _renderItem = ({ item, index }) => {
    let height = item.border == "none" ? 0 : 2;
    let link = item.link != null ? item.link : "HomeScreen";

    var bgColor =
      this.collapse.current != null &&
        index == this.collapse.current.state.activeIndex
        ? bgFocus
        : bgDefault;

    var heightContainer =
      this.collapse.current != null &&
        index == this.collapse.current.state.activeIndex
        ? "auto"
        : "auto";

    var display =
      this.collapse.current != null &&
        index == this.collapse.current.state.activeIndex
        ? "flex"
        : "none";

    var img =
      this.collapse.current != null &&
        index == this.collapse.current.state.activeIndex
        ? imgArrowUp
        : imgArrowDown;

    try {
      item.name = item.name.replace("<sub>", "");
      item.name = item.name.replace("</sub>", "");
    } catch (error) {
      console.log(error);
    }

    return (
      <TouchableOpacity
        style={[
          styles.collapse,
          { backgroundColor: bgColor, height: heightContainer },
        ]}
        onPress={() => this.onClickItem(index, "")}
        onBlur={() => this.collapse.setState({ activeIndex: -1 })}
      >
        <View style={[styles.flexRowStart, styles.fullWith]}>
          <View style={styles.flexFull}>
            {/*borderTop*/}
            <View style={[styles.flexRowStart, styles.listView, style.view1]}>
              <Text
                style={[
                  styles.fontBoldSmall,
                  styles.textCapitalize,
                  { marginRight: 10, with: "100%" },
                ]}
              >
                {item.name}
              </Text>
              <Image style={[style.img1]} source={img} />
            </View>
            <Text
              style={[
                style.text1,
                styles.fontNormalSmall,
                { display: display },
              ]}
            >
              {item.faq}
            </Text>
            {/*borderBottom*/}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  componentDidMount = async () => {
    functions.getFaq(this, "de");
  };

  static navigationOptions = ({ navigation }) => ({
    title: "",
  });

  render() {
    var commonData = global.commonData.languages;

    try {
      var text1 = commonData.faq;
    } catch (error) {
      console.log(error);
    }

    return (
      <View style={styles.flexFull}>
        <Header component={this} />
        <ScrollView contentContainerStyle={styles.scroll}>
          <Background>
            <TextHeader style={[style.textHeader1]} text2={text1} />
            <ActivityIndicator
              size="large"
              animating={this.state.ActivityIndicator}
            />
            <Collapse
              title=""
              style={style.collapse}
              data={this.state.faqs}
              renderItem={this._renderItem}
              col={1}
              ref={this.collapse}
              navigation={this.props.navigation}
            />
            <BackNext
              nextScreen="HomeScreen"
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
  root: {
    marginBottom: 5,
    height: 35,
  },

  borderBottom: {
    marginTop: 7,
  },

  view1: {
    paddingRight: 30,
    paddingTop: 10,
    paddingBottom: 10,
  },

  text1: {
    paddingLeft: 30,
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: 20,
    color: "#E4E4E4",
  },

  img1: {
    top: 15,
    position: "absolute",
    right: 20,
  },

  textHeader1: {
    marginBottom: 20,
  },
});

export default Faq;

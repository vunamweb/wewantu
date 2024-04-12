import React, { Component, createRef } from "react";
import {
  Text,
  View,
  SafeAreaView,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

import Carousel, { Pagination } from "react-native-snap-carousel";

import Href from "../components/Href";
import Image from "../components/Image";
import functions from "../function/function";

import styles from "../../app/style/style";

const imgBack = require("../images/arrow_back.png");
const imgNext = require("../images/arrow_next.png");

let currentDate = new Date();
let currentYear = currentDate.getFullYear();

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default class MyCarousel extends React.Component {
  constructor(props) {
    super(props);

    this.carousel = createRef();

    this.state = {
      activeIndex: this.props.activeIndex ? this.props.activeIndex : 0,
      height: 0,
      animating: false,
      loading: true,
      ActivityIndicator: false,
    };
  }

  componentDidMount() {}

  back = () => {
    if (this.props.component.index == -1) {
      this.setState({ ActivityIndicator: true });
      this.carousel.current.snapToPrev();
    } else functions.gotoScreen(this.props.component.props.navigation, "Wlb");
  };

  next = () => {
    if (this.props.component.index == -1) {
      this.setState({ ActivityIndicator: true });
      this.carousel.current.snapToNext();
    } else functions.gotoScreen(this.props.component.props.navigation, "Wlb");
  };

  pagination = () => {
    return (
      <Pagination
        dotsLength={this.props.data.length}
        activeDotIndex={this.state.activeIndex}
        containerStyle={[this.props.stylePagination, { marginTop: -15 }]}
        dotStyle={style.dotStyle}
        inactiveDotStyle={style.inactiveDotStyle}
        inactiveDotOpacity={0.8}
        inactiveDotScale={0.8}
      />
    );
  };

  pagination_1 = () => {
    return (
      <View style={style.pagination}>
        <Text style={[styles.fontBoldSmall, style.textChart]}>
          {this.props.activeIndex != this.state.activeIndex
            ? monthNames[this.state.activeIndex]
            : monthNames[this.props.activeIndex]}
        </Text>
        <Text style={[styles.fontBoldSmall, style.textChart]}>
          {currentYear}
        </Text>
      </View>
    );
  };

  render() {
    var pagination = this.props.pagination
      ? this.pagination()
      : this.pagination_1();

    var display = (this.state.ActivityIndicator) ? 'none' : 'flex';   

    return (
      <View style={this.props.styleParent}>
        <ActivityIndicator
          size="small"
          animating={this.state.ActivityIndicator}
        />
        <Carousel
          ref={this.carousel}
          sliderWidth={Dimensions.get("window").width}
          firstItem={this.state.activeIndex}
          {...this.props}
          onSnapToItem={(index) =>
            this.setState({
              activeIndex: index,
              height: 0,
              ActivityIndicator: false,
            })
          }
          //inactiveSlideOpacity={1}
        />
        <View>
          {pagination}
          <Href style={[style.back, { display: display }]} onPress={() => this.back()}>
            <Image source={imgBack} />
          </Href>
          <Href style={[style.next, { display: display }]} onPress={() => this.next()}>
            <Image source={imgNext} />
          </Href>
        </View>
      </View>
    );
  }
}

const style = StyleSheet.create({
  dotStyle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: -8,
    backgroundColor: "#898166",
  },

  inactiveDotStyle: {
    width: 10,
    height: 10,
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: -8,
    backgroundColor: "#fff",
  },

  back: {
    position: "absolute",
    left: 20,
    top: 0,
    paddingLeft: 40,
    paddingRight: 40,
    paddingBottom: 20,
    paddingTop: 10,
    //backgroundColor: 'red'
  },

  next: {
    position: "absolute",
    right: 0,
    top: 0,
    paddingLeft: 40,
    paddingRight: 40,
    paddingBottom: 20,
    paddingTop: 10,
    //backgroundColor: 'red'
  },

  pagination: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    marginTop: 10,
    //flex: 2
  },

  textChart: {
    color: "#fff",
    marginLeft: 5,
  },
});

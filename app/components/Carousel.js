import React, { Component, createRef } from "react";
import { Text, View, SafeAreaView, Dimensions, StyleSheet } from "react-native";

import Carousel, { Pagination } from "react-native-snap-carousel";

import Href from "../components/Href";
import Image from "../components/Image";
import functions from "../function/function";

const imgBack = require("../images/arrow_back.png");
const imgNext = require("../images/arrow_next.png");

export default class MyCarousel extends React.Component {
  constructor(props) {
    super(props);

    this.carousel = createRef();

    this.state = {
      activeIndex: (this.props.activeIndex) ? this.props.activeIndex : 0,
      height: 0,
      animating: false,
      loading: true,
    };
  }

  
  componentDidMount() {}

  back = () => {
     if(this.props.component.index == -1)
     this.carousel.current.snapToPrev();
     else 
     functions.gotoScreen(this.props.component.props.navigation, 'Wlb');
  }

  next = () => {
    if(this.props.component.index == -1)
    this.carousel.current.snapToNext();
    else 
    functions.gotoScreen(this.props.component.props.navigation, 'Wlb');
 }

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

  render() {
    var pagination = this.props.pagination ? this.pagination() : this.props.pagination_1();

    return (
      <View style={this.props.styleParent}>
        <Carousel
          ref={this.carousel}
          sliderWidth={Dimensions.get("window").width}
          firstItem={this.state.activeIndex}
          {...this.props}
          onSnapToItem={(index) => this.setState({ activeIndex: index, height: 0 })}
          //inactiveSlideOpacity={1}
        />
        <View>
          {pagination}
          <Href
            style={style.back}
            onPress={() => this.back()}
          >
            <Image source={imgBack} />
          </Href>
          <Href
            style={style.next}
            onPress={() => this.next()}
          >
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
    top: 10,
  },

  next: {
    position: "absolute",
    right: 0,
    top: 10,
  },
});

import React, { Component, createRef } from "react";
import {
  StyleSheet,
  View,
  AsyncStorage,
  Dimensions,
  ActivityIndicator,
} from "react-native";

import Video from "react-native-video";

import { ScrollView } from "react-native-gesture-handler";

import Background from "../components/Background";
import TextHeader from "../components/TextHeader";
import IconBottom from "../components/IconBottom";
import Image from "../components/Image";
import CheckBox from "../components/Checkbox";
import BackNext from "../components/BackNext";
import HeadLine from "../components/HeadLine";
import Carousel from "../components/Carousel";
import Href from "../components/Href";
import Header from "../components/Header";

import styles from "../../app/style/style";

const borderColor = "#000";

const iconPlay = require("../images/play.png");

const data = [
  {
    label: "Is ja gut, ich habs verstanden",
    require: false,
  },
];

const data1 = [
  {
    link: "https://morpheus-cms.de/vu/video2.mp4",
  },

  {
    link: "https://morpheus-cms.de/vu/video1.mp4",
  },

  {
    link: "https://morpheus-cms.de/vu/video3.mp4",
  },
];

class WorkLife extends Component {
  constructor(props) {
    super(props);

    this._renderItem.bind(this);

    this.carousel = createRef();
    this.video = [];
    this.index = -1;
  }

  componentDidMount = () => {
    data1.map((item, index) => {
      this.video[index] = createRef();
    });
  };

  static navigationOptions = ({ navigation }) => ({
    title: "",
  });

  callBack = (index) => {
    this.index = index;
  };

  play = (index) => {
    this.carousel.current.setState({ height: 100 });

    if (this.video[index].current) {
      this.video[index].current.seek(0);
    }
  };

  start = () => {
    this.carousel.current.setState({ animating: false, height: 100 });
  };

  load = () => {
    this.carousel.current.setState({ loading: false });
  };

  _renderItem = ({ item, index }) => {
    var height =
      this.carousel.current.state.height == 100 &&
      this.carousel.current.state.activeIndex == index
        ? "100%"
        : 0;
    var pause =
      this.carousel.current.state.height == 100 &&
      this.carousel.current.state.activeIndex == index
        ? false
        : true;
    var display =
      this.carousel.current.state.height == 100 &&
      this.carousel.current.state.activeIndex == index
        ? "none"
        : "flex";
    var background =
      this.carousel.current.state.height == 100 &&
      this.carousel.current.state.activeIndex == index
        ? "#000"
        : "#393939";

    //var animating = (display == 'none') ? true : false;
    var view = this.carousel.current.state.loading ? (
      <ActivityIndicator size="large" />
    ) : (
      <Href onPress={() => this.play(index)} style={{ display: display }}>
        <Image source={iconPlay} />
      </Href>
    );

    return (
      <View style={[style.styleRender, { backgroundColor: background }]}>
        <Video
          source={{
            uri: item.link,
          }} // Can be a URL or a local file.
          style={[{ height: height, width: "100%" }]}
          paused={pause}
          onEnd={() => this.carousel.current.setState({ height: 0 })}
          onLoad={() => this.load()}
          //onProgress={() => console.log('start')}
          ref={this.video[index]}
        />
        {view}
      </View>
    );
  };

  render() {
    return (
      <View style={styles.flexFull}>
        <Header component={this} />
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <Background>
            <TextHeader text1="so" text2="LÄUFTS" style={style.textHeader} />
            <HeadLine style={style.headLine1} text="Deine WLB" />
            <Carousel
              data={data1}
              ref={this.carousel}
              styleParent={style.styleParent}
              stylePagination={style.stylePagination}
              pagination={true}
              component={this}
              renderItem={this._renderItem}
              itemWidth={Dimensions.get("window").width}
              loop={false}
            />
            <CheckBox
              data={data}
              callBack={this.callBack}
              style={style.checkbox}
            />
            <BackNext
              nextScreen="Wlb"
              position="absolute"
              backEnable={false}
              callBack={() => true}
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
  styleParent: {
    width: "100%",
    flex: 7,
    marginTop: 10,
  },

  stylePagination: {},

  textHeader: {
    marginTop: 30,
  },

  headLine1: {
    marginTop: 50,
  },

  styleRender: {
    height: "100%",
    borderRadius: 5,
    backgroundColor: "#393939",
    marginRight: 20,
    alignItems: "center",
    justifyContent: "center",
  },

  checkbox: {
    flex: 3,
    width: "100%",
    paddingLeft: 17,
    marginBottom: 30,
  },
});

export default WorkLife;

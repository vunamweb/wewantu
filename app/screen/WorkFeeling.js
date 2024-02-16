import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, Dimensions, AsyncStorage, Text } from "react-native";

import { Provider, Portal, Modal } from "react-native-paper";

import { ScrollView } from "react-native-gesture-handler";
import { hideNavigationBar } from "react-native-navigation-bar-color";
import { SvgUri, SvgXml, Svg, Circle, Path, G, SvgCss, SvgWithCss} from 'react-native-svg';

import IconFontAwesome from "react-native-vector-icons/FontAwesome";

import Background from "../components/Background";
import TextHeader from "../components/TextHeader";
import IconBottom from "../components/IconBottom";
import BackNext from "../components/BackNext";
import Image from "../components/Image";
import Href from "../components/Href";
import Header from "../components/Header";
import Button from "../components/Button";

import styles from "../../app/style/style";
import functions from "../../app/function/function";

const windowHeight = Dimensions.get("window").height;

const MARGIN_TOP_1 = windowHeight / 8;
const MARGIN_TOP_2 = windowHeight / 12;

var dataParam;

const svgCode1 = `
<svg xmlns="http://www.w3.org/2000/svg" width="50" height="69.386" viewBox="0 0 50 69.386">
  <g id="Group_523" data-name="Group 523" transform="translate(0 0)">
    <g id="Group_525" data-name="Group 525" transform="translate(0 0)">
      <path id="Path_247" data-name="Path 247" d="M48.588,61.99a5.979,5.979,0,0,1-5.966,5.984H6.88a6.024,6.024,0,0,1-6-5.984L.708,6.692A5.98,5.98,0,0,1,6.674.708H42.416a6.024,6.024,0,0,1,6,5.984Z" transform="translate(0.351 0.351)" fill="#e4e4e4"/>
      <path id="Path_248" data-name="Path 248" d="M42.974,69.386H7.231a7.076,7.076,0,0,1-7.062-7.04L0,7.046A7.035,7.035,0,0,1,7.025,0H42.767a7.075,7.075,0,0,1,7.062,7.04L50,62.338a7.041,7.041,0,0,1-7.026,7.047M7.025,2.12A4.918,4.918,0,0,0,2.12,7.04l.169,55.3a4.952,4.952,0,0,0,4.943,4.928H42.974a4.921,4.921,0,0,0,4.907-4.92h0l-.171-55.3A4.952,4.952,0,0,0,42.767,2.12Z" transform="translate(0 0)" fill="#898166"/>
      <path id="Path_249" data-name="Path 249" d="M20.44,24.823a1.24,1.24,0,0,1-.877-2.117l7.442-7.444a1.24,1.24,0,1,1,1.755,1.753L21.317,24.46a1.233,1.233,0,0,1-.877.364" transform="translate(9.522 7.389)" fill="#898166"/>
      <path id="Path_250" data-name="Path 250" d="M27.884,24.823a1.233,1.233,0,0,1-.877-.364l-7.444-7.444a1.24,1.24,0,1,1,1.755-1.753l7.442,7.444a1.24,1.24,0,0,1-.877,2.117" transform="translate(9.522 7.389)" fill="#898166"/>
      <path id="Path_251" data-name="Path 251" d="M16.274,24.823a1.233,1.233,0,0,1-.877-.364L7.954,17.016a1.24,1.24,0,1,1,1.755-1.753l7.442,7.444a1.24,1.24,0,0,1-.877,2.117" transform="translate(3.764 7.389)" fill="#898166"/>
      <path id="Path_252" data-name="Path 252" d="M8.83,24.823a1.24,1.24,0,0,1-.877-2.117L15.4,15.263a1.24,1.24,0,1,1,1.755,1.753L9.707,24.46a1.233,1.233,0,0,1-.877.364" transform="translate(3.764 7.389)" fill="#898166"/>
      <path id="Path_253" data-name="Path 253" d="M26.2,33.952a1.233,1.233,0,0,1-.877-.364L21.234,29.5,17.15,33.588a1.238,1.238,0,0,1-1.755,0L11.312,29.5l-1.605,1.6a1.24,1.24,0,0,1-1.753-1.753l2.48-2.48a1.238,1.238,0,0,1,1.755,0l4.085,4.084,4.084-4.084a1.238,1.238,0,0,1,1.755,0L26.2,30.957l4.085-4.084a1.236,1.236,0,0,1,1.753,0l2.482,2.48a1.24,1.24,0,0,1-1.755,1.753l-1.6-1.6-4.085,4.085a1.233,1.233,0,0,1-.877.364" transform="translate(3.764 13.147)" fill="#898166"/>
    </g>
  </g>
</svg>
`;

const svgCode2 = `
<svg xmlns="http://www.w3.org/2000/svg" width="50" height="69.386" viewBox="0 0 50 69.386">
  <g id="Group_524" data-name="Group 524" transform="translate(0 0)">
    <g id="Group_528" data-name="Group 528" transform="translate(0 0)">
      <path id="Path_254" data-name="Path 254" d="M48.588,61.99a5.979,5.979,0,0,1-5.966,5.984H6.88a6.024,6.024,0,0,1-6-5.984L.708,6.692A5.98,5.98,0,0,1,6.674.708H42.416a6.024,6.024,0,0,1,6,5.984Z" transform="translate(0.351 0.351)" fill="#e4e4e4"/>
      <path id="Path_255" data-name="Path 255" d="M42.974,69.386H7.231a7.076,7.076,0,0,1-7.062-7.04L0,7.046A7.035,7.035,0,0,1,7.025,0H42.767a7.075,7.075,0,0,1,7.062,7.04L50,62.338a7.041,7.041,0,0,1-7.026,7.047M7.025,2.12A4.918,4.918,0,0,0,2.12,7.04l.169,55.3a4.952,4.952,0,0,0,4.943,4.928H42.974a4.921,4.921,0,0,0,4.907-4.92h0l-.171-55.3A4.952,4.952,0,0,0,42.767,2.12Z" transform="translate(0 0)" fill="#898166"/>
      <path id="Path_256" data-name="Path 256" d="M15.863,19.035a3.722,3.722,0,1,1-3.722-3.722,3.722,3.722,0,0,1,3.722,3.722" transform="translate(4.175 7.594)" fill="#898166"/>
      <path id="Path_257" data-name="Path 257" d="M27.473,19.035a3.722,3.722,0,1,1-3.722-3.722,3.722,3.722,0,0,1,3.722,3.722" transform="translate(9.933 7.594)" fill="#898166"/>
      <path id="Path_258" data-name="Path 258" d="M27.857,33.538a1.245,1.245,0,0,1-.343-.048L10.147,28.528a1.241,1.241,0,0,1,.682-2.386L28.2,31.1a1.241,1.241,0,0,1-.34,2.434" transform="translate(4.586 12.941)" fill="#898166"/>
    </g>
  </g>
</svg>
`;

const svgCode3 = `
<svg xmlns="http://www.w3.org/2000/svg" width="50" height="69.386" viewBox="0 0 50 69.386">
  <g id="Group_525" data-name="Group 525" transform="translate(0 0)">
    <g id="Group_531" data-name="Group 531" transform="translate(0 0)">
      <path id="Path_259" data-name="Path 259" d="M48.588,61.99a5.979,5.979,0,0,1-5.966,5.984H6.88a6.024,6.024,0,0,1-6-5.984L.708,6.692A5.98,5.98,0,0,1,6.674.708H42.416a6.024,6.024,0,0,1,6,5.984Z" transform="translate(0.351 0.351)" fill="#e4e4e4"/>
      <path id="Path_260" data-name="Path 260" d="M42.974,69.386H7.231a7.076,7.076,0,0,1-7.062-7.04L0,7.046A7.035,7.035,0,0,1,7.025,0H42.767a7.075,7.075,0,0,1,7.062,7.04L50,62.338a7.041,7.041,0,0,1-7.026,7.047M7.025,2.12A4.918,4.918,0,0,0,2.12,7.04l.169,55.3a4.952,4.952,0,0,0,4.943,4.928H42.974a4.921,4.921,0,0,0,4.907-4.92h0l-.171-55.3A4.952,4.952,0,0,0,42.767,2.12Z" transform="translate(0 0)" fill="#898166"/>
      <path id="Path_261" data-name="Path 261" d="M15.863,19.864a3.722,3.722,0,1,1-3.722-3.722,3.722,3.722,0,0,1,3.722,3.722" transform="translate(4.175 8.006)" fill="#898166"/>
      <path id="Path_262" data-name="Path 262" d="M27.473,19.864a3.722,3.722,0,1,1-3.722-3.722,3.722,3.722,0,0,1,3.722,3.722" transform="translate(9.933 8.006)" fill="#898166"/>
      <path id="Path_263" data-name="Path 263" d="M28.685,31.062H11.317a1.24,1.24,0,1,1,0-2.48H28.685a1.24,1.24,0,0,1,0,2.48" transform="translate(4.997 14.175)" fill="#898166"/>
    </g>
  </g>
</svg>
`;

const svgCode4 = `
<svg xmlns="http://www.w3.org/2000/svg" width="50" height="69.386" viewBox="0 0 50 69.386">
  <g id="Group_526" data-name="Group 526" transform="translate(0 0)">
    <g id="Group_534" data-name="Group 534" transform="translate(0 0)">
      <path id="Path_264" data-name="Path 264" d="M48.588,61.99a5.979,5.979,0,0,1-5.966,5.984H6.88a6.024,6.024,0,0,1-6-5.984L.708,6.692A5.98,5.98,0,0,1,6.674.708H42.416a6.024,6.024,0,0,1,6,5.984Z" transform="translate(0.351 0.351)" fill="#e4e4e4"/>
      <path id="Path_265" data-name="Path 265" d="M42.974,69.386H7.231a7.076,7.076,0,0,1-7.062-7.04L0,7.046A7.035,7.035,0,0,1,7.025,0H42.767a7.075,7.075,0,0,1,7.062,7.04L50,62.338a7.041,7.041,0,0,1-7.026,7.047M7.025,2.12A4.918,4.918,0,0,0,2.12,7.04l.169,55.3a4.952,4.952,0,0,0,4.943,4.928H42.974a4.921,4.921,0,0,0,4.907-4.92h0l-.171-55.3A4.952,4.952,0,0,0,42.767,2.12Z" transform="translate(0 0)" fill="#898166"/>
      <path id="Path_266" data-name="Path 266" d="M15.863,18.2a3.722,3.722,0,1,1-3.722-3.722A3.722,3.722,0,0,1,15.863,18.2" transform="translate(4.175 7.183)" fill="#898166"/>
      <path id="Path_267" data-name="Path 267" d="M27.473,18.2a3.722,3.722,0,1,1-3.722-3.722A3.722,3.722,0,0,1,27.473,18.2" transform="translate(9.933 7.183)" fill="#898166"/>
      <path id="Path_268" data-name="Path 268" d="M20.306,35.19a11.155,11.155,0,0,1-10.8-8.374,1.24,1.24,0,1,1,2.4-.619,8.672,8.672,0,0,0,16.8,0,1.241,1.241,0,0,1,2.4.619,11.156,11.156,0,0,1-10.8,8.374" transform="translate(4.694 12.529)" fill="#898166"/>
    </g>
  </g>
</svg>
`;

const svgCode5 = `
<svg xmlns="http://www.w3.org/2000/svg" width="50" height="69.386" viewBox="0 0 50 69.386">
  <g id="Group_527" data-name="Group 527" transform="translate(0 0)">
    <g id="Group_537" data-name="Group 537" transform="translate(0 0)">
      <path id="Path_269" data-name="Path 269" d="M48.588,61.99a5.979,5.979,0,0,1-5.966,5.984H6.88a6.024,6.024,0,0,1-6-5.984L.708,6.692A5.98,5.98,0,0,1,6.674.708H42.416a6.024,6.024,0,0,1,6,5.984Z" transform="translate(0.351 0.351)" fill="#e4e4e4"/>
      <path id="Path_270" data-name="Path 270" d="M42.974,69.386H7.231a7.076,7.076,0,0,1-7.062-7.04L0,7.046A7.035,7.035,0,0,1,7.025,0H42.767a7.075,7.075,0,0,1,7.062,7.04L50,62.338a7.041,7.041,0,0,1-7.026,7.047M7.025,2.12A4.918,4.918,0,0,0,2.12,7.04l.169,55.3a4.952,4.952,0,0,0,4.943,4.928H42.974a4.921,4.921,0,0,0,4.907-4.92h0l-.171-55.3A4.952,4.952,0,0,0,42.767,2.12Z" transform="translate(0 0)" fill="#898166"/>
      <path id="Path_271" data-name="Path 271" d="M17.1,20.788a1.24,1.24,0,0,1-1.24-1.24,3.1,3.1,0,1,0-6.2,0,1.24,1.24,0,0,1-2.48,0,5.582,5.582,0,1,1,11.164,0,1.24,1.24,0,0,1-1.24,1.24" transform="translate(3.558 6.926)" fill="#898166"/>
      <path id="Path_272" data-name="Path 272" d="M28.709,20.788a1.24,1.24,0,0,1-1.24-1.24,3.1,3.1,0,1,0-6.2,0,1.24,1.24,0,0,1-2.48,0,5.582,5.582,0,1,1,11.164,0,1.24,1.24,0,0,1-1.24,1.24" transform="translate(9.316 6.926)" fill="#898166"/>
      <path id="Path_273" data-name="Path 273" d="M20.306,35.708a11.155,11.155,0,0,1-10.8-8.374,1.239,1.239,0,0,1,1.2-1.55H29.9a1.239,1.239,0,0,1,1.2,1.55,11.153,11.153,0,0,1-10.8,8.374m-7.839-7.444a8.67,8.67,0,0,0,15.676,0Z" transform="translate(4.694 12.787)" fill="#898166"/>
    </g>
  </g>
</svg>
`;

const data = [
  {
    code: svgCode1
  },

  {
    code: svgCode2
  },

  {
    code: svgCode3
  },

  {
    code: svgCode4
  },

  {
    code: svgCode5
  },
];


class WorkFeeling extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chart: []
    };
  }

  componentDidMount = async () => {
    var chart = await functions.getDataAsyncStorage("chart_work");

    this.setState({ chart: chart });
  };

  static navigationOptions = ({ navigation }) => ({
    title: "",
  });

  callBack = (check, index) => {
    return;
  };

  gotoScreenWithParam = (typeFell) => {
    var data = {};

    data.type = dataParam.type;
    data.value = typeFell

    functions.gotoScreenWithParam(JSON.stringify(data), this.props.navigation, "WorkChart");
  };

  render() {
  var title;

    try{
      dataParam = this.props.navigation.state.params.data;
      dataParam = JSON.parse(dataParam);
    } catch(error) {
      dataParam = {};
      dataParam.type = 1;
      dataParam.value = 0;
    }
    
var position = dataParam.value;

var dataBackNext = {};

    dataBackNext.type = dataParam.type;
    dataBackNext.value = 0;

switch(dataParam.type) {
  case 2:
    title = 'LIFE';
    break;

    case 3: 
    title = 'BALANCE';
    break;

    default:
      title = 'WORK';
}

    return (
      <View style={styles.flexFull}>
        <Header component={this} Notification={false} />
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <Background>
          <TextHeader text1={title} />
         <View style={[styles.fullWith, style.root]}>
              {data.map((item, index) => {
                if (position == index + 1)
                  return (
                    <Href
                      style={style.active}
                      onPress={() => this.gotoScreenWithParam(index + 1)}
                    >
                      <SvgXml xml={item.code} width="50" height="70" />
                    </Href>
                  );
                else
                  return (
                    <Href onPress={() => this.gotoScreenWithParam(index + 1)}>
                      <SvgXml xml={item.code} width="50" height="70" />
                    </Href>
                  );
              })}
            </View>
            <Button
              color="white"
              text="HOUSTON, WE HAVE A PROBLEM!"
              style={[styles.button, style.button]}
              onPress={() => this.gotoScreenWithParam(1)}
            />
            <BackNext
              nextScreen="WorkChart"
              data={JSON.stringify(dataBackNext)}
              position="absolute"
              //text1="VIDEO"
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
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: MARGIN_TOP_1,
  },

  button: {
    backgroundColor: "#313131",
    marginTop: MARGIN_TOP_2,
  },

  active: {
    padding: 5,
    borderRadius: 10,
    borderColor: "#898166",
    borderWidth: 1,
  },
});

export default WorkFeeling;

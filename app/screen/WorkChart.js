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

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";

import {
  SvgUri,
  SvgXml,
  Svg,
  Circle,
  Path,
  G,
  SvgCss,
  SvgWithCss,
} from "react-native-svg";

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
import Text from "../components/Paragraph";

import styles from "../../app/style/style";
import functions from "../function/function";

let currentDate = new Date();
let currentDay = currentDate.getDate();
let currentMonth = currentDate.getMonth() + 1;
let currentYear = currentDate.getFullYear();

//const screenWidth = Dimensions.get("window").width;
//const screenHeight = Dimensions.get("window").height;

const space = 20;
var screenWidth;
const screenHeight = Dimensions.get("window").height;
var params, typeFeeling;
var strStorage;

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

class WorkChart extends Component {
  constructor(props) {
    super(props);

    this._renderItem.bind(this);
    this.pagination_1.bind(this);

    this.carousel = createRef();
    this.video = [];
    this.index = -1;

    this.state = {
      chart: [],
    };
  }

  componentDidMount = async () => {
    var data = this.props.navigation.state.params.data;
    var chart;

    if (!Array.isArray(JSON.parse(data))) {
      chart = await this.initChart();

      functions.setDataAsyncStorage(strStorage, JSON.stringify(chart));
    } else {
      chart = JSON.parse(data);
    }

    this.setState({ chart: chart });
  };

  static navigationOptions = ({ navigation }) => ({
    title: "",
  });

  callBack = (index) => {
    this.index = index;
  };

  _renderItem = ({ item, index }) => {
    var labels = [];
    var datas = [];

    for (let i = 1; i <= 30; i++) labels.push(i);

    for (let i = 1; i <= 30; i++) datas.push(item[i - 1]);

    const data = {
      labels: labels,
      datasets: [
        {
          data: datas,
        },
      ],
    };

    const chartConfig = {
      fillShadowGradient: "#898166",
      fillShadowGradientOpacity: 1,
      //yAxisInterval: 1,
      //yAxisMin: 1,
      //yAxisMax: 5,
      //ackgroundGradientFrom: "red",
      //backgroundGradientFromOpacity: 1,
      //backgroundGradientTo: "#898166",
      //backgroundGradientToOpacity: 1,
      color: (opacity = 1) => "#898166",
      strokeWidth: 0, // optional, default 3
      barPercentage: 0.1,
      //useShadowColorFromDataset: false, // optional
      propsforlabels: {
        //paddingLeft: 30
      },
      bezier: false,
    };

    const yAxisConfig = {
      min: 1, // Minimum value
      max: 5, // Maximum value
      stepSize: 1, // Optional - define step size for Y-axis labels
    };

    return (
      <View style={[style.styleRender]}>
        <ScrollView style={{ flex: 1, flexGrow: 1 }} horizontal={true}>
          <BarChart
            data={data}
            width={screenWidth}
            height={screenHeight / 3}
            //yAxisLabel="$"
            chartConfig={chartConfig}
            //yAxisLabel={yAxisConfig}
            style={{
              width: "100%",
              flex: 1,
            }}
            verticalLabelRotation={30}
            withHorizontalLines={false}
            withInnerLines={false}
            fromZero={true}
          />
        </ScrollView>
      </View>
    );
  };

  pagination_1 = () => {
    return (
      <View style={style.pagination}>
        <Text style={[styles.fontBoldSmall, style.textChart]}>
          {this.carousel.current != undefined
            ? monthNames[this.carousel.current.state.activeIndex]
            : null}
        </Text>
        <Text style={[styles.fontBoldSmall, style.textChart]}>
          {currentYear}
        </Text>
      </View>
    );
  };

  initChart = async () => {
    var chart_work = await functions.getDataAsyncStorage(strStorage);

    var data = chart_work == null ? [] : JSON.parse(chart_work);

    let number = this.props.navigation.state.params.data;
    number = JSON.parse(number);
    number = number.value;

    for (let i = 0; i <= 11; i++) {
      data[i] = data[i] == undefined ? [] : data[i];

      for (let j = 1; j <= 30; j++) {
        if (i + 1 == currentMonth && j == currentDay) data[i][j - 1] = number;
        else data[i][j - 1] = data[i][j - 1] == undefined ? 0 : data[i][j - 1];
      }
    }

    return data;
  };

  render() {
    var chart = this.state.chart;
    var title;

    try {
      screenWidth = chart[0].length * space;
    } catch (error) {
      screenWidth = 600;

      console.log(error);
    }

    params = this.props.navigation.state.params.data;
    params = JSON.parse(params);
    typeFeeling = params.type;

    switch (params.type) {
      case 2:
        title = "LIFE";
        break;

      case 3:
        title = "BALANCE";
        break;

      default:
        title = "WORK";
    }

    switch (typeFeeling) {
      case 2:
        strStorage = "chart_file";
        break;

      case 3:
        strStorage = "chart_balance";
        break;

      default:
        strStorage = "chart_work";
    }

    return (
      <View style={styles.flexFull}>
        <Header component={this} />
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <Background>
            <TextHeader text1={title} style={style.textHeader} />
            <Carousel
              data={chart}
              ref={this.carousel}
              activeIndex={currentMonth - 1}
              styleParent={style.styleParent}
              stylePagination={style.stylePagination}
              pagination_1={() => this.pagination_1()}
              component={this}
              renderItem={this._renderItem}
              itemWidth={Dimensions.get("window").width}
              loop={false}
            />
            <View style={style.checkbox}>
              <View style={style.statusFeeling}>
                <Text style={[styles.textAlignCenter, styles.fontBoldSmall]}>
                  THROUGHOUT{"\n"}
                  HAPPYNESS IN{"\n"}
                  {monthNames[currentMonth - 1]}
                </Text>
                <SvgXml xml={svgCode3} width="50" height="70" />
              </View>
              <View style={style.statusFeeling}>
                <Text style={[styles.textAlignCenter, styles.fontBoldSmall]}>
                  INTERPRETATIONS{"\n"}
                  HAPPYNESS IN{"\n"}
                  2023
                </Text>
                <SvgXml xml={svgCode3} width="50" height="70" />
              </View>
            </View>
            <BackNext
              nextScreen="Wlb"
              backScreen="WorkFeeling"
              dataBack={this.props.navigation.state.params.data}
              position="absolute"
              //backEnable={false}
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
    //borderRadius: 5,
    //backgroundColor: "#393939",
    marginRight: 20,
    //alignItems: "center",
    //justifyContent: "center",
    flex: 1,
    //height: '100%',
    overflow: "hidden",
  },

  checkbox: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    //paddingLeft: 17,
    marginBottom: 30,
    marginTop: 30,
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

  statusFeeling: {
    alignItems: "center",
  },

  iconFeeling: {
    marginTop: 5,
  },
});

export default WorkChart;

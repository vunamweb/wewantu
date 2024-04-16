import React, { Fragment, Component } from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  StatusBar,
  Image,
  Alert,
  AppRegistry,
  TouchableOpacity,
} from "react-native";

import Text from "./Paragraph";

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

import styles from "../../app/style/style";
import functions from "../../app/function/function";
import FlatListViewNormal from "../../app/components/library/FlatListViewNormal";

const svgCode1 = `
<?xml version="1.0" encoding="utf-8"?>
<!-- Generator: Adobe Illustrator 28.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<svg version="1.1" id="Ebene_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 25 25" style="enable-background:new 0 0 25 25;" xml:space="preserve">
<style type="text/css">
	.st0{fill:#E4E4E4;}
</style>
<g>
	<path class="st0" d="M12.5,14.3c4,0,7.2-3.2,7.2-7.1S16.4,0,12.5,0c-4,0-7.2,3.2-7.2,7.1C5.3,11.1,8.5,14.3,12.5,14.3z M6.6,7.1
		c0-3.2,2.6-5.8,5.9-5.8c3.2,0,5.9,2.6,5.9,5.8S15.7,13,12.5,13C9.2,13,6.6,10.4,6.6,7.1z"/>
	<path class="st0" d="M18.7,13.5c-0.3-0.2-0.6-0.1-0.8,0.2c0,0-1.6,2-5.3,2s-5.3-1.9-5.3-2c-0.2-0.3-0.6-0.3-0.8-0.2
		C2.4,15.7,0,19.9,0,24.3C0,24.7,0.3,25,0.7,25h23.7c0.4,0,0.7-0.3,0.7-0.6C25,19.9,22.6,15.7,18.7,13.5z M23.6,23.7H1.3
		c0.2-3.6,2.1-6.8,5.2-8.8c0.7,0.7,2.6,2.1,6,2.1c3.3,0,5.2-1.4,6-2.1C21.5,16.9,23.4,20.1,23.6,23.7z"/>
</g>
</svg>
`;

const svgCode2 = `
<?xml version="1.0" encoding="utf-8"?>
<!-- Generator: Adobe Illustrator 28.1.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<svg version="1.1" id="Ebene_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 25 25" style="enable-background:new 0 0 25 25;" xml:space="preserve">
<style type="text/css">
	.st0{fill:#E4E4E4;}
</style>
<g>
	<path class="st0" d="M21.8,2.8c0-1.5-1.3-2.7-2.9-2.7H5.6c-1.6,0-2.9,1.2-2.9,2.7l0,19.3c0,1.5,1.3,2.7,2.9,2.7H19
		c1.6,0,2.9-1.2,2.9-2.7L21.8,2.8z M5.6,1.4h13.4c0.9,0,1.6,0.7,1.6,1.5l0.1,19.3c0,0.8-0.7,1.5-1.6,1.5H5.6C4.8,23.6,4,23,4,22.2
		L4,2.9C4,2,4.7,1.4,5.6,1.4z"/>
	<path class="st0" d="M9.1,11.6c0.9,0,1.6-0.7,1.6-1.6S10,8.3,9.1,8.3C8.2,8.3,7.4,9,7.4,9.9C7.4,10.8,8.2,11.6,9.1,11.6z"/>
	<path class="st0" d="M15.6,11.6c0.9,0,1.6-0.7,1.6-1.6s-0.7-1.6-1.6-1.6S13.9,9,13.9,9.9C13.9,10.8,14.7,11.6,15.6,11.6z"/>
	<path class="st0" d="M9.4,14.9L9.4,14.9c-0.1-0.4-0.5-0.6-0.9-0.5c-0.4,0.1-0.6,0.5-0.5,0.9c0.5,2,2.3,3.3,4.3,3.3
		c2,0,3.8-1.4,4.2-3.3c0.1-0.3-0.1-0.7-0.5-0.8c-0.4-0.1-0.8,0.1-0.9,0.5c-0.2,1-1.1,1.9-2.1,2.1C11.4,17.4,9.8,16.4,9.4,14.9z"/>
</g>
</svg>
`;

const svgCode3 = `
<?xml version="1.0" encoding="utf-8"?>
<!-- Generator: Adobe Illustrator 28.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<svg version="1.1" id="Ebene_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 25 25" style="enable-background:new 0 0 25 25;" xml:space="preserve">
<style type="text/css">
	.st0{fill:#E4E4E4;}
</style>
<path class="st0" d="M12.5,0C5.6,0,0,5.6,0,12.5S5.6,25,12.5,25S25,19.4,25,12.5S19.4,0,12.5,0z M23.6,11.8h-4.4
	c-0.3-3.2-2.9-5.7-6-6V1.4C18.8,1.8,23.2,6.2,23.6,11.8z M13.2,11.8V7.2c2.4,0.3,4.3,2.2,4.6,4.6C17.8,11.8,13.2,11.8,13.2,11.8z
	 M13.2,19.2c3.2-0.3,5.7-2.9,6-6h4.4c-0.3,5.6-4.8,10.1-10.4,10.4L13.2,19.2L13.2,19.2z M13.2,17.8v-4.7h4.6
	C17.5,15.6,15.6,17.5,13.2,17.8z M1.4,13.2h4.4c0.3,3.2,2.9,5.7,6,6v4.4C6.2,23.2,1.8,18.8,1.4,13.2z M11.8,13.2v4.7
	c-2.4-0.3-4.3-2.2-4.6-4.7H11.8z M11.8,5.8c-3.2,0.3-5.7,2.9-6,6H1.4c0.4-5.6,4.9-10,10.4-10.4V5.8L11.8,5.8z M11.8,7.2v4.6H7.2
	C7.5,9.4,9.4,7.5,11.8,7.2z"/>
</svg>
`;

const svgCode4 = `
<?xml version="1.0" encoding="utf-8"?>
<!-- Generator: Adobe Illustrator 28.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<svg version="1.1" id="Ebene_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 25 25" style="enable-background:new 0 0 25 25;" xml:space="preserve">
<style type="text/css">
	.st0{fill:#E4E4E4;}
</style>
<path class="st0" d="M12.5,1.3C5.6,1.3,0,5.7,0,11.1c0,2.7,1.4,5.3,3.9,7.1V23c0,0.3,0.2,0.5,0.4,0.6c0.1,0,0.2,0,0.3,0
	c0.2,0,0.3-0.1,0.5-0.2l3.2-3.2c1.4,0.4,2.8,0.6,4.3,0.6c6.9,0,12.5-4.4,12.5-9.8C25,5.7,19.4,1.3,12.5,1.3z M4.9,17.3
	c-2.3-1.6-3.6-3.9-3.6-6.2c0-4.7,5-8.5,11.2-8.5s11.2,3.8,11.2,8.5s-5,8.5-11.2,8.5c-1.5,0-2.9-0.2-4.3-0.6c-0.2-0.1-0.5,0-0.7,0.2
	l-2.3,2.3V18C5.2,17.7,5.1,17.5,4.9,17.3z"/>
</svg>
`;

const svgCode5 = `
<?xml version="1.0" encoding="utf-8"?>
<!-- Generator: Adobe Illustrator 28.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<svg version="1.1" id="Ebene_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 25 25" style="enable-background:new 0 0 25 25;" xml:space="preserve">
<style type="text/css">
	.st0{fill:#E4E4E4;}
</style>
<g>
	<g id="Gruppe_13">
		<g>
			<g>
				<path class="st0" d="M1.1,7.5C-1.7,13.8,1.2,21.2,7.5,24s13.7-0.1,16.5-6.4c2.2-5.1,0.8-11-3.4-14.6l-0.4,2c2,2,3.1,4.7,3.1,7.5
					S22.2,18,20.2,20s-4.7,3.1-7.5,3.1l0,0C9.7,23.1,7,22,5,20C0.8,15.9,0.8,9.1,5,4.9c3.2-3.2,8-4,12.1-2.1L17.4,1
					c-1.6-0.7-3.3-1-4.9-1C7.7,0,3.1,2.8,1.1,7.5z"/>
			</g>
			<path class="st0" d="M20.5,2.7L20.5,2.7L20.5,2.7z"/>
		</g>
		<path id="Pfad_22" class="st0" d="M18.7-2.9l-0.8,4l-0.4,2.1l-1.8,9.3c-0.3,1.2-0.4,2-0.5,2.5c0-0.4-0.1-0.9-0.3-1.7
			c-0.1-0.8-0.3-1.4-0.4-2l-0.8-3.6h-2.4l-0.8,3.6c-0.1,0.5-0.3,1.1-0.4,1.9C9.9,14,9.8,14.6,9.8,15c-0.1-0.6-0.2-1.5-0.5-2.6
			l-1-4.8H5.7l2.4,9.6h3.1c0.6-2.5,0.9-4,1-4.3c0.1-0.4,0.1-0.7,0.2-1.2c0.1-0.4,0.1-0.8,0.2-1.1c0,0.3,0.1,0.8,0.2,1.3
			c0.1,0.5,0.2,0.9,0.2,1l0.9,4.2H17l2.7-12.6l0.5-2.3l1.1-5.3h-2.6V-2.9z"/>
	</g>
</g>
</svg>
`;

class IconBottom extends Component {
  render() {
    global.notification =
      global.notification != undefined ? global.notification : [];

    var commonData = global.commonData.languages;

    try {
      var text1 = commonData.home;
      var text2 = commonData.worklife;
      var text3 = commonData.radar;
      var text4 = commonData.messages;
      var text5 = commonData.wewantu;
    } catch (error) {
      console.log(error);
    }

    const data = [
      {
        title: text1,
        src: svgCode1,
        link: "HomeScreen",
      },
      {
        title: text2,
        src: svgCode2,
        link: "WorkLife",
      },
      {
        title: text3,
        src: svgCode3,
        link: "Job",
      },
      {
        title: text4,
        src: svgCode4,
        link: "Message",
        text:
          functions.getCountNotification() > 0
            ? functions.getCountNotification()
            : null,
      },
      {
        title: text5,
        src: svgCode5,
        link: "Info",
      },
    ];

    const renderItem = ({ item, index }) => {
      var bg;

      switch (index) {
        case 1:
          bg = "red";
          break;

        case 2:
          bg = "blue";
          break;

        case 3:
          bg = "blue";
          break;

        case 4:
          bg = "green";
          break;

        default:
          bg = "black";
          break;
      }
      return (
        <TouchableOpacity
          style={[styles.touchableOpacityBottom, { backgroundColor: null }]}
          onPress={() =>
            functions.gotoScreen(
              this.props.component.props.navigation,
              item.link
            )
          }
        >
          {item.text != undefined ? (
            <View style={style.textNumber}>
              <Text style={style.text1}>{item.text}</Text>
            </View>
          ) : null}
          <SvgWithCss xml={item.src} width="25" height="25" />
          {/*<Image style={[styles.img]} source={item.src} />*/}
          <Text style={[style.TextNavigation, styles.fontSemilBoldSmall]}>
            {item.title}
          </Text>
        </TouchableOpacity>
      );
    };

    return (
      <View style={styles.iconBottom}>
        <FlatListViewNormal
          style={style.container}
          data={data}
          renderItem={renderItem}
          horizontal={true}
        />
      </View>
    );
  }
}

const style = StyleSheet.create({
  TextNavigation: {
    color: "#fff",
    textTransform: "uppercase",
    marginTop: 5,
  },

  container: {
    width: "100%",
    justifyContent: "space-around",
    flexDirection: "row",
  },

  textNumber: {
    position: "absolute",
    top: 10,
    right: 15,
    borderRadius: 10,
    borderColor: "#000",
    borderWidth: 1,
    backgroundColor: "#FF0000",
    alignItems: "center",
    width: 20,
    height: 20,
    zIndex: 3,
  },

  text1: {
    color: "white",
    fontSize: 13,
  },
});

export default IconBottom;

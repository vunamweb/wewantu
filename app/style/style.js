import { StyleSheet, PixelRatio, Dimensions } from "react-native";

import '../config/config';

const pixelRatio = global.pixelRatio;
//const windowHeight = Dimensions.get("window").height;

// SET FONT SIZE
const FONT_BOLD_SPECIAL = (77 * pixelRatio);
const FONT_BOLD_SPECIAL_OF_SPECIAL =  (55 * pixelRatio);
const FONT_BOLD_LARGE = (30 * pixelRatio);
const FONT_BOLD_LARGE_MEDIUM = (18 * pixelRatio);
const FONT_BOLD_LARGE_NORMAL = (24 * pixelRatio);
const FONT_BOLD_NORMAL = (16 * pixelRatio);
const FONT_BOLD_SMALL = (14 * pixelRatio);
const FONT_BOLD_SMALL_SMALL = (12 * pixelRatio);

const FONT_NORMAL = (16 * pixelRatio);
const FONT_NORMAL_SMALL = (14 * pixelRatio);

const FONT_SEMIAL_BOLD_NORMAL = (12 * pixelRatio);
const FONT_SEMIAL_BOLD_SMALL = (10 * pixelRatio);

const FONT_GENRAL = (14 * pixelRatio);

const FONT_HEADLINE = (16 * pixelRatio);

// SET MARGIN FOR TEXT_HEADER_2
const MARGIN_TOP_TEXT_HEADER_2 = (-8 * pixelRatio);
const MARGIN_BOTTOM_TEXT_HEADER_2 = (10 * pixelRatio);

// SET MARGIN FOR TEXT_HEADER_3
const MARGIN_TOP_TEXT_HEADER_3 = (-8 * pixelRatio);
const MARGIN_BOTTOM_TEXT_HEADER_3 = MARGIN_BOTTOM_TEXT_HEADER_2;

// SET TOP, RIGHT FOR DRAWER
const TOP_DRAWER = (-20 * pixelRatio);
const RIGHT_DRAWER = (-20 * pixelRatio);

// SET TOP, RIGHT FOR MENU
const TOP_MENU = (80 * pixelRatio);
const RIGHT_MENU = (30 * pixelRatio);
const TOP_CLOSE_MENU = (50 * pixelRatio);
const RIGHT_CLOSE_MENU = (50 * pixelRatio);

// SET TOP FOR LOGO
const TOP_LOGO_0 = (50 * pixelRatio);
const TOP_LOGO_1 = (50 * pixelRatio);

module.exports = StyleSheet.create({
  /* GENERAL COLOR AND PADDING */
  error: {
    color: "red",
  },

  success: {
    color: "green",
  },

  padding: {
    padding: 20,
  },

  paddingSmall: {
    padding: 10,
  },

  margin: {
    margin: 20,
  },

  paddingLeft: {
    paddingLeft: 20,
  },

  marginLeft10: {
    marginLeft: 10,
  },

  marginLeft5: {
    marginLeft: 5,
  },

  marginTop0: {
    marginTop: 0,
  },

  marginTop10: {
    marginTop: 10,
  },
  marginTop15: {
    marginTop: 15,
  },

  marginTop5: {
    marginTop: 5,
  },

  marginTop20: {
    marginTop: 20,
  },

  marginTop30: {
    marginTop: 30,
  },

  marginBottom30: {
    marginBottom: 30,
  },

  marginBottom20: {
    marginBottom: 20,
  },

  marginBottom15: {
    marginBottom: 15,
  },

  marginBottom10: {
    marginBottom: 10,
  },

  marginBottom0: {
    marginBottom: 0,
  },

  paddingBottom20: {
    paddingBottom: 20,
  },
  /* END GENERAL COLOR AND PADDING */

  /* GENERAL OF FLEX */
  flexRow: {
    flexDirection: "row",
  },

  flexRowStart: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },

  flexRowEnd: {
    flexDirection: "row",
    justifyContent: "flex-end",
    flex: 1,
  },

  flexFull: {
    flex: 1,
  },

  scroll: {
    flexGrow: 1,
  },

  alignCenter: {
    alignItems: "center",
  },

  container_root_align_center_full: {
    flex: 1,
    padding: 20,
    width: "100%",
    alignItems: "center",
  },

  center: {
    justifyContent: "center",
    flex: 1,
    alignItems: "center",
  },

  textCenter: {
    textAlign: "center",
  },

  fullWith: {
    width: "100%",
  },
  /* END GENERAL OF FLEX */

  /* GENERAL OF TEXT */
  textCapitalize: {
    textTransform: "capitalize",
  },

  textAlignCenter: {
    textAlign: 'center'
  },
  /* END GENERAL OF TEXT */

  /* BUTTON */
  button: {
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginTop: 20,
    borderRadius: 10,
    width: "100%",
  },

  buttonNotFull: {
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 50,
    marginTop: 20,
    borderRadius: 16,
  },
  /* END BUTTON */

  /* TEXTINPUT */
  textInput: {
    width: "100%",
    height: 50,
  },

  textInputSmall: {
    width: 40,
    height: 65,
  },

  textInputSmall1: {
    width: 40,
    height: 40,
  },
  /* END TEXTINPUT */

  /* SHOW AND HIDE */
  show: {
    display: "flex",
  },

  hide: {
    display: "none",
  },
  /* END SHOW AND HIDE */

  /* CIRCLE */
  circle: {
    width: 56,
    height: 56,
    borderRadius: 56 / 2,
    backgroundColor: "#3187EA",
  },

  circleSmall: {
    width: 20,
    height: 20,
    borderRadius: 20 / 2,
  },

  circleSmallOfSmall: {
    width: 15,
    height: 15,
    borderRadius: 15 / 2,
  },

  circleSmall: {
    width: 20,
    height: 20,
    borderRadius: 20 / 2,
    borderColor: "#ccc",
    borderWidth: 1,
    alignItems: "center",
  },
  /* END CIRCLE */

  /* BORDER */
  borderNormal: {
    borderRadius: 10,
  },
  /* END BORDER */

  /* BACKGROUND */
  bgWhite: {
    backgroundColor: "white",
  },
  /* END BACKGROUND */

  /* FONT */
  fontNormal: {
    fontFamily: "OpenSans-Regular",
    fontSize: FONT_NORMAL,
    color: "white",
  },

  fontNormalSmall: {
    fontFamily: "OpenSans-Regular",
    fontSize: FONT_NORMAL_SMALL,
  },

  fontBoldNormal: {
    fontFamily: "OpenSans-Bold",
    fontSize: FONT_BOLD_NORMAL,
  },

  fontBoldLargeNormal: {
    fontFamily: "OpenSans-Bold",
    fontSize: FONT_BOLD_LARGE_NORMAL,
  },

  fontBoldSmall: {
    fontFamily: "OpenSans-Bold",
    fontSize: FONT_BOLD_SMALL,
  },

  fontBoldSmallOfSmall: {
    fontFamily: "OpenSans-Bold",
    fontSize: FONT_BOLD_SMALL_SMALL,
  },

  fontBoldLarge: {
    fontFamily: "OpenSans-Bold",
    fontSize: FONT_BOLD_LARGE,
  },

  fontBoldLargeMedium: {
    fontFamily: "OpenSans-Bold",
    fontSize: FONT_BOLD_LARGE_MEDIUM,
  },

  fontBoldSpecial: {
    fontFamily: "OpenSans-Bold",
    fontSize: FONT_BOLD_SPECIAL,
  },

  fontBoldSpecialOfSpecial: {
    fontFamily: "OpenSans-Bold",
    fontSize: FONT_BOLD_SPECIAL_OF_SPECIAL,
  },

  fontSemilBoldNormal: {
    fontFamily: "OpenSans-SemiBold",
    fontSize: FONT_SEMIAL_BOLD_NORMAL,
  },

  fontSemilBoldSmall: {
    fontFamily: "OpenSans-SemiBold",
    fontSize: FONT_SEMIAL_BOLD_SMALL,
  },
  /* END FONT */

  /* OTHER */
  href: {
    fontSize: 18,
    color: "#3187EA",
  },

  line: {
    height: 1,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },

  background_1: {
    flex: 1,
    width: "100%",
    backgroundColor: "black",
  },

  container_root_full_center: {
    flex: 1,
    padding: 20,
    //width: "100%",
    //maxWidth: 340,
    //alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },

  container_root_align_center: {
    flex: 1,
    padding: 20,
    width: "100%",
    //maxWidth: 340,
    alignItems: "center",
  },

  textSplash: {
    fontSize: 24,
    marginTop: 20,
  },

  textGeneral: {
    fontSize: FONT_GENRAL,
  },

  forgotPassword: {
    marginBottom: 24,
  },

  remember: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
  },

  row: {
    flexDirection: "row",
    marginTop: 4,
  },

  forgot: {
    fontSize: 13,
    color: "#3187EA",
    //color: theme.colors.secondary,
  },

  link: {
    color: "#fff",
    textDecorationLine: "underline",
    //color: theme.colors.primary,
  },

  numberCart: {
    backgroundColor: "white",
  },

  bgComomon: {
    backgroundColor: "black",
  },
  colorCommon: {
    color: "#4b4737",
  },

  colorTextCommon: {
    color: "#fff",
  },

  logo_0: {
    position: "absolute",
    top: TOP_LOGO_0,
  },

  logo_1: {
    marginTop: TOP_LOGO_1,
  },

  textHeader_1: {
    color: "#fff",
    textTransform: "uppercase",
    //marginBottom: 5
  },

  textHeader_2: {
    color: "#898166",
    //marginBottom: MARGIN_BOTTOM_TEXT_HEADER_2,
    //marginTop: MARGIN_TOP_TEXT_HEADER_2,
    textTransform: "uppercase",
    textAlign: 'center',
    lineHeight: 30
  },

  textHeader_3: {
    color: "#898166",
    //marginBottom: MARGIN_BOTTOM_TEXT_HEADER_3,
    //marginTop: MARGIN_TOP_TEXT_HEADER_3,
    textTransform: "uppercase",
    lineHeight: 30
  },
  textHeadLine: {
    color: "#fff",
    fontSize: FONT_HEADLINE,
    marginLeft: 5,
  },

  Bottome_1: {
    position: "absolute",
    bottom: 20,
  },

  Drawer: {
    position: "absolute",
    right: RIGHT_DRAWER,
    top: TOP_DRAWER,
    //height: windowHeight,
    width: "90%",
  },

  Menu: {
    position: "absolute",
    top: TOP_MENU - 50,
    right: RIGHT_MENU - 50,
  },

  CloseMenu: {
    position: "absolute",
    top: TOP_CLOSE_MENU,
    right: RIGHT_CLOSE_MENU,
    //backgroundColor: 'red',
    padding: 20
  },

  borderTopAndBottom: {
    backgroundColor: "#292929",
  },

  listView: {
    justifyContent: "space-between",
    paddingLeft: 30,
    paddingTop: 15,
    paddingBottom: 0,
    width: "100%",
  },

  bottomNavigation: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
    backgroundColor: "red",
  },

  marginTopNavigation: {
    marginTop: 0,
  },

  iconBottom: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#898166",
    justifyContent: "center",
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10
  },

  touchableOpacityBottom: {
    alignItems: "center",
    alignSelf: 'center',
    justifyContent: "center",
    paddingTop: 10,
    paddingBottom: 10,
    width: 100
  },

  collapse: {
    marginBottom: 5,
    borderRadius: 5,
    height: 50
  },

  titleJob: {
    //fontSize: 14,
    //marginBottom: 20
    width: 100
  },

  descriptionJob: {
    //fontSize: 14
  },

  scrollView: {
    flexGrow: 1
  },

  rowCheckbox: {
    marginBottom: 15
  },

  header: {
    width: '100%', 
    alignItems: 'center', 
    zIndex: 3, 
    backgroundColor: '#000'
  },

  modalDeleteRoot: {
    width: "80%",
    height: 150,
    marginLeft: "10%",
    marginRight: "10%",
    backgroundColor: "#898166",
    justifyContent: "center",
    borderRadius: 10,
  },

  textHeaderModal: {
    textAlign: "center",
    marginBottom: 20,
  },

  modalDelete: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",
  },

  modal1: {
    width: "100%",
    //marginLeft: "5%",
    //marginRight: "5%",
    //paddingLeft: 30,
    //paddingRight: 30,
    //paddingTop: 50,
    height: "100%",
    backgroundColor: "#363636",
    opacity: 0.8,
    //backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
    //zIndex: -1
  },

  parentConfirm: {
    marginTop: 30,
  },

  confirmYesNo: {
    borderColor: "#898166",
    borderWidth: 2,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 50,
    paddingRight: 50,
    marginRight: 20,
    backgroundColor: "#363636",
    //zIndex: 9999999
  },

  modal: {
    width: "100%",
    //marginLeft: "5%",
    //marginRight: "5%",
    //marginTop: 70,
    //paddingLeft: 30,
    //paddingRight: 30,
    //paddingTop: 50,
    //height: "100%",
    //backgroundColor: "#323232",
    //alignItems: "center",
    borderColor: "#898166",
    borderWidth: 0,
  },

  modal2: {
    /*width: "80%",
    marginLeft: "10%",
    marginRight: "10%",*/
    marginLeft: -20
  },

  childRen_1: {
    flex: 8,
  },

  children_2: {
    paddingLeft: 20,
    paddingRight: 20,
  },

  childRen: {
    flex: 1,
    padding: 20,
    borderWidth: 1,
    borderColor: "#898166",
    backgroundColor: "#363636",
    height: "100%",
  },

  containerJob: {
    marginBottom: 3,
    borderBottomColor: "#ccc",
    borderBottomWidth: 0,
    paddingBottom: 0,
    paddingTop: 0,
    paddingRight: 10,
    //alignItems: "center",
    //backgroundColor: 'red',
    //justifyContent: 'center'
  },

  containerJob1: {
    marginBottom: 10,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    paddingBottom: 10,
    paddingTop: 0,
    paddingRight: 100,
    alignItems: "center",
    flexWrap: 'nowrap',
    //backgroundColor: 'red',
    //justifyContent: 'center'
  },

  inActivated: {
    opacity: 0.5
  }

  /* END OTHER */
});

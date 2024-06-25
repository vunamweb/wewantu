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
import Switch from "../components/Switch";

import styles from "../../app/style/style";
import functions from "../../app/function/function";

const borderColor = "#000";
const bgDefault = "#2B2B2B";
const bgFocus = "#2B2B2B";
const imgFillProlie = require("../images/filled_profile.png");
const alert = require("../images/Chat_Alert.png");
const newJob = require("../images/Neue_Jobs_Alert.png");

class Notification extends Component {
    constructor(props) {
        super(props);
        this._renderItem = this._renderItem.bind(this);
        this.collapse = createRef();

        this.switch = [];
    }

    state = {};

    onClickItem = (index, link) => {
        this.collapse.current.setState({ activeIndex: index });
        functions.gotoScreen(this.props.navigation, link);
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

    callBack = (job, is_activate, index) => {
        is_activate = (is_activate) ? 1 : 0;

        global.commonData.user.another.notification_message = is_activate;

        let obj = {};

        obj.notification_message = is_activate;
        obj.user_id = global.commonData.user.user_id;

        functions.updateUser(this, obj, 9);
    }

    callBack1 = (job, is_activate, index) => {
        is_activate = (is_activate) ? 1 : 0;

        global.commonData.user.another.notification_job = is_activate;

        let obj = {};

        obj.notification_job = is_activate;
        obj.user_id = global.commonData.user.user_id;

        functions.updateUser(this, obj, 10);
    }

    render() {
        var commonData = global.commonData.languages;

        try {
            var text1 = commonData.notification;
            var text2 = commonData.messages;
            var text3 = commonData.t_jobs;
        } catch (error) {
            console.log(error);
        }

        let notification_message = (global.commonData.user.another.notification_message == 1 || global.commonData.user.another.notification_message == null || global.commonData.user.another.notification_message == undefined) ? true : false;
        let notification_job = (global.commonData.user.another.notification_job == 1 || global.commonData.user.another.notification_job == null || global.commonData.user.another.notification_job == undefined) ? true : false;

        return (
            <View style={styles.flexFull}>
                <Header component={this} />
                <ScrollView contentContainerStyle={styles.scroll}>
                    <Background>
                        <TextHeader text2={text1} />
                        <View style={[styles.flexRow, styles.fullWith, styles.marginTop15]}>
                            <Text style={style.label}>{text2}</Text>
                            <Switch
                                activeTrackColor={"#898166"}
                                inactiveTrackColor={"#898166"}
                                activeThumbColor={"#fff"}
                                inactiveThumbColor={"#3e3e3e"}
                                size={30}
                                component={this}
                                callBack={this.callBack}
                                visible={notification_message}
                                container={style.container}
                                additionalThumb={style.additionalThumb}
                            />
                        </View>
                        <View style={[styles.flexRow, styles.fullWith, styles.marginTop10]}>
                            <Text style={style.label}>{text3}</Text>
                            <Switch
                                activeTrackColor={"#898166"}
                                inactiveTrackColor={"#898166"}
                                activeThumbColor={"#fff"}
                                inactiveThumbColor={"#3e3e3e"}
                                size={30}
                                component={this}
                                callBack={this.callBack1}
                                visible={notification_job}
                                container={style.container}
                                additionalThumb={style.additionalThumb}
                            />
                        </View>

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
    collapse: {
        marginBottom: 60,
    },

    label: {
        //marginRight: 10
        width: 120
    },

    additionalThumb: {
        height: 0,
        width: 25,
        borderRadius: 5,
        paddingTop: 15,
    },

    container: {
        height: 25,
        width: 60,
        borderWidth: 0,
    },
});

export default Notification;

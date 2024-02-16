import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, Dimensions } from "react-native";

import { Drawer } from "react-native-drawer-layout";

import Button from "../components/Button";
import Image from "../components/Image";
import Menu from "../menu/Menu"

import styles from "../../app/style/style";

const menu = require("../images/menu.png");
const closeMenu = require("../images/close.png");

const windowHeight = Dimensions.get("window").height;

export default class MyDrawer extends Component {
  constructor(props) {
    super(props);
    this.drawOpen = false;
    this.drawClose = false;
  }

  state = {
    open: false,
    zIndex: -1,
    display: "flex",
    height: '100%',
  };

  componentDidMount = () => {
    this.didFocusSubscription = this.props.component.props.navigation.addListener(
      'didFocus',
      payload => {
        // Logic to handle when the screen comes into focus (navigated back)
        console.log('Screen focused again:', payload);
        if (this.drawOpen) {
          this.setState({ zIndex: -1, open: false, display: "flex", height: 0 });
          this.drawOpen = false;
          this.drawClose = true;
        }
        // You can perform actions or update state upon returning to this screen
      }
    );
  };

  onCloseDrawer = () => {
    if (this.drawOpen) {
      this.setState({ zIndex: -1, open: false, display: "flex", height: 0 });
      this.drawOpen = false;
      this.drawClose = true;
    }
  };

  onOpenDrawer = () => {
    if (this.drawClose) {
      this.setState({ display: "none", height: windowHeight });
      this.drawClose = false;
    }
  };

  onButtonOpenDrawer = () => {
    this.drawOpen = true;
    this.setState({ open: true, zIndex: 1, display: "none", height: windowHeight });
  };

  onButtonCloseDrawer = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <View style={[styles.Drawer, { zIndex: this.state.zIndex, height: this.state.height }]}>
        <Drawer
          open={this.state.open}
          drawerPosition="right"
          drawerType="front"
          drawerStyle={style.drawerStyle}
          onOpen={() => this.onOpenDrawer()}
          onClose={() => this.onCloseDrawer()}
          renderDrawerContent={() => (
            <View style={style.renderDrawerContent}>
              <TouchableOpacity
                style={styles.CloseMenu}
                onPress={() => this.onButtonCloseDrawer()}
              >
                <Image source={closeMenu} />
              </TouchableOpacity>
              <Menu navigation={this.props.component.props.navigation} />
            </View>
          )}
        />
        <View style={[{ display: this.state.display }, styles.Menu]}>
          <TouchableOpacity onPress={() => this.onButtonOpenDrawer()}>
            <Image source={menu} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const style = StyleSheet.create({
  drawerStyle: {
    width: "100%",
    height: "100%",
  },

  renderDrawerContent: {
    height: "100%",
    width: "100%",
    backgroundColor: "#2B2B2B",
    paddingTop: 100
  },
});
